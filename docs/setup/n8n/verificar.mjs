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
  const $ = (n) => ({ first: () => ({ json: contexto[n] }) });
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
      "Configuración": { grupoActual: "Grupo fundador" },
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
    { "Configuración": { precioNivel: 40000, precioPack: 99000, garantiaDias: 10, ...comando } },
    filas,
  );

console.log("\nA3-bis · lo que pasa cuando Pía responde\n");

const pendiente = {
  codigo: "4821", whatsapp: "549341555", estado: "pendiente", nombre: "Carolina",
  email: "c@x.com", plan: "nivel-mensual", grupo: "Grupo fundador", row_number: 7,
};

r = confirmar({ comandoVerbo: "OK", comandoCodigo: "4821" }, [pendiente]);
chequear("OK sobre una venta pendiente → confirma", r.accion === "confirmar");
chequear("  el monto sale del plan, no lo escribe nadie", r.fila.monto === 40000);
chequear("  el pack cotiza distinto", confirmar({ comandoVerbo: "OK", comandoCodigo: "4821" }, [{ ...pendiente, plan: "pack-3-niveles" }]).fila.monto === 99000);
chequear("  arranca el reloj de la garantía a 10 días", (new Date(r.fila.garantia_vence) - new Date()) / 86400000 > 8.9);
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
chequear("  y no fija fecha de garantía", r.fila.garantia_vence === "");

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

console.log(fallas === 0 ? "\nTodo bien.\n" : `\n${fallas} fallas.\n`);
process.exit(fallas === 0 ? 0 : 1);
