/**
 * Verificador de A27. Corre la lógica del nodo "Decidir a quién le escribimos
 * hoy" —la lee del JSON, no de una copia— contra 13 filas de mentira y muestra
 * qué decide en cada una.
 *
 *   node docs/setup/n8n/verificar-a27.mjs
 *
 * Sirve para lo mismo que verificar.mjs: mirar si el candado aguanta sin tener
 * que importar el flujo a n8n ni tocar la planilla real. Correrlo después de
 * cambiar cualquier plazo (las 48 h, los 90 días, los 7 días de aviso).
 */
import { readFileSync } from 'node:fs';
const flujo = JSON.parse(readFileSync('docs/setup/n8n/A27-renovacion.json', 'utf8'));
const code = flujo.nodes.find(n => n.name === 'Decidir a quién le escribimos hoy').parameters.jsCode;

const cfg = { horasParaEscribir: 48, diasDelPack: 90, diasDeAvisoPrevio: 7, urlComprar: 'X', urlSuscripciones: 'Y' };
const hoy = new Date().toISOString().slice(0,10);
const hace = (d) => new Date(Date.now() - d*86400000).toISOString().slice(0,10);

function correr(filas) {
  const $ = () => ({ first: () => ({ json: cfg }) });
  const $input = { all: () => filas.map(json => ({ json })) };
  return new Function('$', '$input', code)($, $input);
}

const casos = [
  ['rechazo recién visto (no manda, deja marca)',
   [{ email:'a@a.com', external_reference:'R1', estado:'cobro_rechazado', plan:'nivel-mensual', nombre:'Ana Perez', avisos:'' }]],
  ['rechazo visto hace 1 día (no manda todavía)',
   [{ email:'a@a.com', external_reference:'R1', estado:'cobro_rechazado', plan:'nivel-mensual', nombre:'Ana', avisos:`rechazo-visto:${hace(1)}` }]],
  ['rechazo visto hace 3 días (MANDA)',
   [{ email:'a@a.com', external_reference:'R1', estado:'cobro_rechazado', plan:'nivel-mensual', nombre:'Ana', avisos:`rechazo-visto:${hace(3)}` }]],
  ['rechazo ya avisado (no repite)',
   [{ email:'a@a.com', external_reference:'R1', estado:'cobro_rechazado', plan:'nivel-mensual', nombre:'Ana', avisos:`rechazo-visto:${hace(9)},rechazo-avisado` }]],
  ['el cobro entró: limpia las marcas',
   [{ email:'a@a.com', external_reference:'R1', estado:'pagado', plan:'nivel-mensual', nombre:'Ana', avisos:`rechazo-visto:${hace(9)},rechazo-avisado` }]],
  ['trimestral con 90 días, recién comprado (silencio)',
   [{ email:'b@b.com', external_reference:'R2', estado:'pagado', plan:'trimestral', nombre:'Bea Lopez', fecha:hoy, avisos:'' }]],
  ['trimestral a 5 días de vencer (AVISO PREVIO)',
   [{ email:'b@b.com', external_reference:'R2', estado:'pagado', plan:'trimestral', nombre:'Bea', fecha:hace(85), avisos:'' }]],
  ['trimestral a 5 días, ya avisado (no repite)',
   [{ email:'b@b.com', external_reference:'R2', estado:'pagado', plan:'trimestral', nombre:'Bea', fecha:hace(85), avisos:'pack-previo' }]],
  ['trimestral vencido hoy (AVISO VENCIDO)',
   [{ email:'b@b.com', external_reference:'R2', estado:'pagado', plan:'trimestral', nombre:'Bea', fecha:hace(90), avisos:'pack-previo' }]],
  ['trimestral vencido, ya avisado (no repite)',
   [{ email:'b@b.com', external_reference:'R2', estado:'pagado', plan:'trimestral', nombre:'Bea', fecha:hace(95), avisos:'pack-previo,pack-vencido' }]],
  ['trimestral con acceso_vence explícito manda',
   [{ email:'b@b.com', external_reference:'R2', estado:'pagado', plan:'trimestral', nombre:'Bea', fecha:hace(10), acceso_vence:hace(-3), avisos:'' }]],
  ['fila sin email (se ignora)',
   [{ email:'', external_reference:'R3', estado:'cobro_rechazado', plan:'nivel-mensual', avisos:'' }]],
  ['fila pendiente (se ignora)',
   [{ email:'c@c.com', external_reference:'R4', estado:'pendiente', plan:'trimestral', nombre:'Cata', fecha:hace(95), avisos:'' }]],
];

for (const [nombre, filas] of casos) {
  const out = correr(filas);
  const r = out[0]?.json;
  const desc = out.length === 0 ? 'sin salida' : `mandar=${r.mandar} avisos="${r.avisos}"${r.mandar ? ` asunto="${r.asunto}"` : ''}`;
  console.log(`  ${nombre}\n    -> ${desc}`);
}
