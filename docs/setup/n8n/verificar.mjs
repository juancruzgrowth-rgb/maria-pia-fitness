/**
 * Verificador de los flujos de n8n. Se corre con `node docs/setup/n8n/verificar.mjs`
 * y no necesita n8n, ni credenciales, ni internet.
 *
 * Hace dos cosas:
 *
 *   1. Revisa que los archivos sean importables: JSON válido, conexiones que
 *      apuntan a nodos que existen, y el JavaScript de cada nodo de código
 *      sintácticamente correcto. Un error de tipeo en un nodo de código no se
 *      ve hasta que el flujo corre en producción con una venta real adentro.
 *
 *   2. Ejecuta la lógica de negocio contra casos armados a mano. Los dos nodos
 *      que piensan —"Decidir" de A3 y "Buscar la venta" de A3-bis— se extraen
 *      del JSON y se corren con los helpers de n8n reemplazados por datos de
 *      prueba. Es la única forma de verificar la idempotencia sin mandarle
 *      mensajes de verdad a nadie.
 *
 * Si se toca cualquiera de esos dos nodos, esto se vuelve a correr antes de
 * subir el flujo a n8n.
 */

import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const DIR = path.dirname(fileURLToPath(import.meta.url));

let fallas = 0;
const chequear = (titulo, ok) => {
  console.log(`${ok ? "  ok   " : "  FALLA"}  ${titulo}`);
  if (!ok) fallas++;
};

// ---------------------------------------------------------------------------
// 1 · Los archivos se pueden importar
// ---------------------------------------------------------------------------

console.log("\nArchivos\n");

const flujos = {};

for (const archivo of fs.readdirSync(DIR).filter((f) => f.endsWith(".json")).sort()) {
  let wf;
  try {
    wf = JSON.parse(fs.readFileSync(path.join(DIR, archivo), "utf8"));
  } catch (e) {
    chequear(`${archivo} · JSON inválido: ${e.message}`, false);
    continue;
  }
  flujos[archivo] = wf;

  const nombres = new Set(wf.nodes.map((n) => n.name));
  let conexionesOk = true;

  for (const [origen, conexion] of Object.entries(wf.connections)) {
    if (!nombres.has(origen)) conexionesOk = false;
    for (const salida of conexion.main ?? []) {
      for (const destino of salida ?? []) {
        if (!nombres.has(destino.node)) conexionesOk = false;
      }
    }
  }

  let codigoOk = true;
  for (const nodo of wf.nodes.filter((n) => n.type === "n8n-nodes-base.code")) {
    try {
      new vm.Script(`(async () => {${nodo.parameters.jsCode}})`);
    } catch (e) {
      console.log(`         JavaScript roto en "${nodo.name}": ${e.message}`);
      codigoOk = false;
    }
  }

  // Las expresiones `={{ JSON.stringify({...}) }}` de los nodos HTTP arman el
  // cuerpo de la llamada a Meta y a Brevo. Un paréntesis de más acá adentro
  // rompe una venta, así que también se validan.
  let expresionesOk = true;
  for (const nodo of wf.nodes.filter(
    (n) => n.type === "n8n-nodes-base.httpRequest" && n.parameters.jsonBody,
  )) {
    const cuerpo = nodo.parameters.jsonBody.replace(/^=\{\{/, "").replace(/\}\}$/, "");
    try {
      new vm.Script(`(${cuerpo})`);
    } catch (e) {
      console.log(`         Expresión rota en "${nodo.name}": ${e.message}`);
      expresionesOk = false;
    }
  }

  chequear(
    `${archivo} · ${wf.nodes.length} nodos`,
    conexionesOk && codigoOk && expresionesOk,
  );
}

// ---------------------------------------------------------------------------
// 2 · La lógica de A3 — "Decidir"
// ---------------------------------------------------------------------------

/** Extrae un nodo de código y lo corre con los helpers de n8n simulados. */
function correrNodo(archivo, nombreNodo, contexto, filas) {
  const nodo = flujos[archivo].nodes.find((n) => n.name === nombreNodo);
  if (!nodo) throw new Error(`No existe el nodo "${nombreNodo}" en ${archivo}`);
  const $ = (n) => {
    const filas = Array.isArray(contexto[n]) ? contexto[n] : [contexto[n]];
    return { first: () => ({ json: filas[0] }), all: () => filas.map((json) => ({ json })) };
  };
  const $input = { all: () => filas.map((json) => ({ json })) };
  return new Function("$", "$input", `${nodo.parameters.jsCode}\n`)($, $input)[0].json;
}

/** Deja la fila como queda después de escribirse en la planilla. */
const comoFila = (salida, extra = {}) => {
  const fila = { ...salida, ...extra };
  for (const c of ["accion", "faltan", "faltanTexto", "esNueva", "adjuntoId"]) delete fila[c];
  return fila;
};

const decidir = (mensaje, filas) =>
  correrNodo(
    "A3-recepcion-comprobante.json",
    "Decidir",
    {
      "Configuración": {},
      "Leer los datos del mensaje": mensaje,
    },
    filas,
  );

console.log("\nA3 · la máquina de estados de una venta\n");

// El camino normal: la clienta usa el mensaje precargado de la web, que llega
// como texto, y después manda la foto en un segundo mensaje.
let r = decidir(
  { whatsapp: "5493415551234", nombre: "Carolina", email: "caro@gmail.com", plan: "nivel-mensual", adjuntoId: "" },
  [],
);
chequear("Primer mensaje con datos pero sin foto → faltan datos", r.accion === "faltan_datos");
chequear("  le pide sólo la foto, no todo de nuevo", r.faltanTexto === "la foto del comprobante");
chequear("  ya tiene código de 4 dígitos desde el primer contacto", /^\d{4}$/.test(r.codigo));
const codigo = r.codigo;
const trasPrimero = comoFila(r);

r = decidir({ whatsapp: "5493415551234", nombre: "", email: "", plan: "", adjuntoId: "MEDIA123" }, [trasPrimero]);
chequear("Llega la foto → la venta se completa", r.accion === "completar_con_adjunto");
chequear("  un mensaje vacío NO borra el nombre anterior", r.nombre === "Carolina");
chequear("  ni el email", r.email === "caro@gmail.com");
chequear("  mantiene el mismo código", r.codigo === codigo);
chequear("  pasa a pendiente de verificación", r.estado === "pendiente");

r = decidir(
  { whatsapp: "5493415551234", nombre: "", email: "", plan: "", adjuntoId: "MEDIA999" },
  [comoFila(r, { comprobante_url: "https://drive/x" })],
);
chequear("IDEMPOTENCIA · reenviar la foto no le avisa dos veces a Pía", r.accion === "ya_avisado");

// El orden inverso: manda la foto primero y escribe los datos después.
r = decidir({ whatsapp: "549341999", nombre: "", email: "", plan: "", adjuntoId: "M1" }, []);
chequear("Foto primero → pide los datos que faltan", r.faltanTexto === "tu nombre y tu email");
r = decidir(
  { whatsapp: "549341999", nombre: "Ana", email: "ana@x.com", plan: "pack-3-niveles", adjuntoId: "" },
  [comoFila(r, { comprobante_url: "https://drive/y" })],
);
chequear("  después los datos → se completa igual", r.accion === "completar_sin_adjunto");
chequear("  conserva el comprobante ya guardado", r.comprobante_url === "https://drive/y");

// Una alumna que ya compró vuelve meses después por el nivel 2.
r = decidir(
  { whatsapp: "549341777", nombre: "Sol", email: "sol@x.com", plan: "nivel-mensual", adjuntoId: "M2" },
  [{ codigo: "1111", whatsapp: "549341777", estado: "confirmado", nombre: "Sol", email: "sol@x.com" }],
);
chequear("Una venta cerrada no se pisa: arranca una nueva", r.accion === "completar_con_adjunto" && r.codigo !== "1111");

// Colisión de códigos con muchas ventas abiertas a la vez.
const enUso = Array.from({ length: 50 }, (_, i) => ({
  codigo: String(1000 + i), whatsapp: `999${i}`, estado: "pendiente",
}));
const generados = new Set();
for (let i = 0; i < 300; i++) {
  generados.add(decidir({ whatsapp: "5490", nombre: "x", email: "x@x.com", plan: "", adjuntoId: "m" }, enUso).codigo);
}
chequear(
  "Nunca reusa un código de una venta abierta (300 intentos)",
  ![...generados].some((c) => enUso.some((u) => u.codigo === c)),
);

r = decidir({ whatsapp: "+54 9 341 555-1234", nombre: "", email: "", plan: "", adjuntoId: "M3" }, [trasPrimero]);
chequear("El mismo teléfono con espacios y guiones es la misma persona", r.codigo === codigo);

// ---------------------------------------------------------------------------
// 3 · La lógica de A3-bis — "Buscar la venta"
// ---------------------------------------------------------------------------

const confirmar = (comando, filas) =>
  correrNodo(
    "A3bis-confirmacion.json",
    "Buscar la venta",
    {
      "Configuración": {
        precioNivel: 55000,
        precioPack: 130000,
        accesoDias: 28,
        ventanaPackMeses: 6,
        ...comando,
      },
    },
    filas,
  );

console.log("\nA3-bis · lo que pasa cuando Pía responde\n");

const pendiente = {
  codigo: "4821", whatsapp: "549341555", estado: "pendiente", nombre: "Carolina",
  email: "c@x.com", plan: "nivel-mensual", renovaciones: 0, row_number: 7,
};

/** Días entre hoy y una fecha YYYY-MM-DD. */
const diasHasta = (iso) => (new Date(iso) - new Date()) / 86400000;

r = confirmar({ comandoVerbo: "OK", comandoCodigo: "4821" }, [pendiente]);
chequear("OK sobre una venta pendiente → confirma", r.accion === "confirmar");
chequear("  el monto sale del plan, no lo escribe nadie", r.fila.monto === 55000);
chequear("  el pack cotiza distinto", confirmar({ comandoVerbo: "OK", comandoCodigo: "4821" }, [{ ...pendiente, plan: "pack-3-niveles" }]).fila.monto === 130000);
chequear(
  "  un nivel da 28 días de acceso",
  diasHasta(r.fila.acceso_vence) > 26.9 && diasHasta(r.fila.acceso_vence) < 28.1,
);
chequear(
  "  el pack no vence a los 28 días: da la ventana de 6 meses",
  diasHasta(
    confirmar({ comandoVerbo: "OK", comandoCodigo: "4821" }, [{ ...pendiente, plan: "pack-3-niveles" }]).fila.acceso_vence,
  ) > 150,
);
chequear(
  "  no pisa el contador de renovaciones de quien ya renovó",
  confirmar({ comandoVerbo: "OK", comandoCodigo: "4821" }, [{ ...pendiente, renovaciones: 2 }]).fila.renovaciones === 2,
);
chequear("  no arrastra row_number a la planilla", !("row_number" in r.fila));

chequear(
  "IDEMPOTENCIA · el segundo OK no genera un segundo acceso",
  confirmar({ comandoVerbo: "OK", comandoCodigo: "4821" }, [{ ...pendiente, estado: "confirmado" }]).accion === "ya_procesado",
);
chequear(
  "Una venta devuelta no se reabre con un OK",
  confirmar({ comandoVerbo: "OK", comandoCodigo: "4821" }, [{ ...pendiente, estado: "devuelto" }]).accion === "ya_procesado",
);

r = confirmar({ comandoVerbo: "NO", comandoCodigo: "4821" }, [pendiente]);
chequear("NO → rechaza", r.accion === "rechazar");
chequear("  y no le da acceso", r.fila.acceso_vence === "");

chequear(
  "Un código que no existe no escribe nada",
  confirmar({ comandoVerbo: "OK", comandoCodigo: "9999" }, [pendiente]).accion === "no_existe",
);
chequear(
  "Sin plan, el monto queda vacío en vez de inventado",
  confirmar({ comandoVerbo: "OK", comandoCodigo: "4821" }, [{ ...pendiente, plan: "" }]).fila.monto === "",
);
chequear(
  "Google Sheets devuelve el código como número y matchea igual",
  confirmar({ comandoVerbo: "OK", comandoCodigo: "4821" }, [{ ...pendiente, codigo: 4821 }]).accion === "confirmar",
);

// ---------------------------------------------------------------------------
// 4 · La lógica de A30 — "Cruzar las dos listas"
// ---------------------------------------------------------------------------
//
// Es el nodo que decide a quién se saca de la comunidad. Un falso positivo acá
// echa a una clienta que paga todos los meses, así que se prueba entero: los
// dos criterios de baja, la repesca por horas y —sobre todo— que lo que no
// matchea por email nunca caiga en "sacar".

const hace = (dias) => new Date(Date.now() - dias * 86400000).toISOString();

const cruzar = (ventas, miembros) =>
  correrNodo(
    "A30-conciliacion-semanal.json",
    "Cruzar las dos listas",
    {
      "Configuración": { horasParaRepescar: 48, diasDelPack: 90 },
      "Leer las ventas": ventas,
    },
    miembros,
  );

const emails = (lista) => lista.map((x) => x.email).sort();

console.log("\nA30 · el cruce contra Skool\n");

const activa = {
  fecha: hace(40), nombre: "Carolina", email: "caro@gmail.com", plan: "nivel-mensual",
  estado: "pagado", estado_suscripcion: "authorized", acceso_skool: "invitada", acceso_vence: "",
};
const cancelada = { ...activa, nombre: "Sol", email: "sol@gmail.com", estado: "cancelado", estado_suscripcion: "cancelled" };

r = cruzar([activa, cancelada], [{ email: "caro@gmail.com" }, { email: "sol@gmail.com" }]);
chequear("La que canceló se saca", emails(r.sacar).join() === "sol@gmail.com");
chequear("  y la que sigue pagando no se toca", r.repescar.length === 0 && r.revisar.length === 0);

r = cruzar([activa], [{ email: "CARO@Gmail.com  " }]);
chequear("El email matchea con mayúsculas y espacios de más", r.sacar.length === 0 && r.revisar.length === 0);

// El §4 del doc 24: pagó con la cuenta del marido y se creó Skool con su correo.
r = cruzar([activa], [{ email: "caro@gmail.com" }, { email: "otra@gmail.com", nombre: "Vale" }]);
chequear("La que está en Skool sin venta NO se saca: se manda a revisar", r.sacar.length === 0);
chequear("  y aparece en la lista de revisar", emails(r.revisar).join() === "otra@gmail.com");

// El pack: nadie escribe acceso_vence hoy, así que se calcula desde la compra.
const packVivo = { ...activa, nombre: "Ana", email: "ana@x.com", plan: "trimestral", fecha: hace(30) };
const packVencido = { ...packVivo, email: "vieja@x.com", fecha: hace(100) };
r = cruzar([packVivo, packVencido], [{ email: "ana@x.com" }, { email: "vieja@x.com" }]);
chequear("El pack de hace 100 días está vencido y se saca", emails(r.sacar).join() === "vieja@x.com");
chequear("  el de hace 30 días sigue adentro", r.sacar.length === 1);

r = cruzar([{ ...packVivo, acceso_vence: hace(5).slice(0, 10) }], [{ email: "ana@x.com" }]);
chequear("Si la columna acceso_vence tiene fecha, manda ella y no el cálculo", r.sacar.length === 1);

// Repesca.
r = cruzar([{ ...activa, fecha: hace(5) }], []);
chequear("Pagó hace 5 días y no está en Skool → repescar", emails(r.repescar).join() === "caro@gmail.com");
r = cruzar([{ ...activa, fecha: new Date().toISOString() }], []);
chequear("  pero la que compró recién no se levanta todavía", r.repescar.length === 0);
r = cruzar([{ ...activa, fecha: hace(5), acceso_skool: "no" }], []);
chequear("  ni la que nunca recibió la invitación (A4 no llegó a correr)", r.repescar.length === 0);
r = cruzar([{ ...cancelada, fecha: hace(5) }], []);
chequear("  ni la que canceló y ya no está adentro", r.repescar.length === 0);

// Cobro rechazado: no se saca de una, se mira.
r = cruzar([{ ...activa, estado: "cobro_rechazado" }], [{ email: "caro@gmail.com" }]);
chequear("Un cobro rechazado va a revisar, no a sacar", r.sacar.length === 0 && r.revisar.length === 1);

// Varias filas de la misma persona: vale la última.
r = cruzar(
  [
    { ...activa, fecha: hace(200), estado: "cancelado", estado_suscripcion: "cancelled" },
    { ...activa, fecha: hace(10) },
  ],
  [{ email: "caro@gmail.com" }],
);
chequear("Volvió después de darse de baja: manda la venta más nueva", r.sacar.length === 0);

// La pestaña de Skool sin actualizar.
r = cruzar([{ ...activa, fecha: hace(10) }], []);
chequear("Pestaña de Skool vacía → nadie se saca, todo cae en repescar", r.sacar.length === 0 && r.repescar.length === 1);

// Filas basura.
r = cruzar([activa, { fecha: hace(3), email: "", estado: "pagado" }], [{ email: "" }, { email: "caro@gmail.com" }]);
chequear("Las filas sin email se ignoran de los dos lados", r.sacar.length === 0 && r.repescar.length === 0 && r.revisar.length === 0);

// ---------------------------------------------------------------------------

console.log(fallas === 0 ? "\nTodo bien.\n" : `\n${fallas} fallas.\n`);
process.exit(fallas === 0 ? 0 : 1);
