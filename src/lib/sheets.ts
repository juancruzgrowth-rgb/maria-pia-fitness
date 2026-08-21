import { google } from "googleapis";
import { env } from "@/lib/env";

let cachedSheets: ReturnType<typeof google.sheets> | null = null;

function getSheetsClient() {
  if (
    !env.GOOGLE_SERVICE_ACCOUNT_EMAIL ||
    !env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY ||
    !env.GOOGLE_SHEETS_SHEET_ID
  ) {
    throw new Error("Google Sheets is not fully configured");
  }
  if (cachedSheets) return cachedSheets;

  const auth = new google.auth.JWT({
    email: env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    key: env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY.replace(/\\n/g, "\n"),
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  cachedSheets = google.sheets({ version: "v4", auth });
  return cachedSheets;
}

export type SheetTab = "leads" | "ventas" | "comunidad" | "bajas" | "contactos";

/**
 * Neutraliza la inyección de fórmulas.
 *
 * Sheets interpreta como fórmula cualquier celda que arranque con `=`, `+`,
 * `-`, `@` o un tab. Como estos valores vienen de un formulario público, un
 * nombre que empiece con `=` puede terminar ejecutando `IMPORTXML` contra la
 * planilla de Pía. Se antepone un apóstrofe: Sheets lo trata como texto y no
 * lo muestra.
 */
export function sanitizeCell(value: string | number): string | number {
  if (typeof value === "number") return value;
  const trimmed = value.trim();
  if (/^[=+\-@\t\r]/.test(trimmed)) return `'${trimmed}`;
  return trimmed;
}

export async function appendRow(tab: SheetTab, values: (string | number)[]) {
  const sheets = getSheetsClient();
  return sheets.spreadsheets.values.append({
    spreadsheetId: env.GOOGLE_SHEETS_SHEET_ID,
    range: `${tab}!A:Z`,
    valueInputOption: "RAW",
    insertDataOption: "INSERT_ROWS",
    requestBody: {
      values: [values.map(sanitizeCell)],
    },
  });
}

export interface LeadRow {
  email: string;
  firstName?: string;
  source: "newsletter" | "contact" | "checkout";
  utm?: string;
}

export async function appendLead(lead: LeadRow) {
  const now = new Date().toISOString();
  return appendRow("leads", [
    now,
    lead.email,
    lead.firstName ?? "",
    lead.source,
    lead.utm ?? "",
  ]);
}

/* -------------------------------------------------------------------------- */
/*  ventas — una fila por clienta, desde el intento de pago hasta la baja      */
/* -------------------------------------------------------------------------- */

/**
 * Encabezado de la pestaña `ventas`, en orden. Es el contrato con n8n y con
 * docs/setup/sheets/ventas.csv: si se agrega o mueve una columna hay que
 * tocar los tres lados.
 *
 * `external_reference` va al final —y no en la primera columna, que sería más
 * natural— para no correr los índices de las columnas que los flujos ya leen.
 */
export const VENTAS_COLUMNS = [
  "fecha",
  "nombre",
  "email",
  "whatsapp",
  "plan",
  "monto",
  "moneda",
  "metodo_pago",
  "pago_id",
  "suscripcion_id",
  "estado",
  "estado_suscripcion",
  "proximo_cobro",
  "acceso_skool",
  "acceso_vence",
  "renovaciones",
  "notas",
  "external_reference",
] as const;

export type VentasColumn = (typeof VENTAS_COLUMNS)[number];

/** Última columna del rango, calculada del largo del encabezado (A..R). */
const VENTAS_LAST_COLUMN = String.fromCharCode(
  "A".charCodeAt(0) + VENTAS_COLUMNS.length - 1,
);

export interface PendingSale {
  /** Id nuestro. Es la clave del cruce con el webhook de MercadoPago. */
  externalReference: string;
  /** Nombre y email TAL COMO los dejó ella en nuestro formulario. */
  customerName: string;
  customerEmail: string;
  planId: string;
  amountARS: number;
}

/**
 * Escribe la fila apenas se crea el checkout, antes de mandarla a MercadoPago.
 *
 * El email es el de NUESTRO formulario, no el que devuelve MP: ella puede
 * pagar con la cuenta del marido o de la madre, y ese email no sirve para
 * invitarla a Skool ni para cruzar nada después.
 * Ver docs/estrategia/24-acceso-skool-desde-mercadopago.md §4.
 */
export async function appendPendingSale(sale: PendingSale) {
  return appendRow("ventas", [
    new Date().toISOString(),
    sale.customerName,
    sale.customerEmail,
    "",
    sale.planId,
    sale.amountARS,
    "ARS",
    "mercadopago",
    "",
    "",
    "pendiente",
    "",
    "",
    "no",
    "",
    0,
    "",
    sale.externalReference,
  ]);
}

/** Campos que el webhook puede pisar de una fila ya escrita. */
export type SaleUpdate = Partial<Record<VentasColumn, string | number>>;

/**
 * Busca la fila por `external_reference` y le aplica el parche.
 *
 * Devuelve false si no encontró la fila —pasa cuando el webhook llega antes
 * de que termine el append, o cuando el pago no nació de nuestro checkout—.
 * Quien llama decide qué hacer con eso; acá no se inventa una fila nueva.
 */
export async function updateSaleByReference(
  externalReference: string,
  patch: SaleUpdate,
): Promise<boolean> {
  const sheets = getSheetsClient();
  const referenceColumn = VENTAS_LAST_COLUMN;

  const lookup = await sheets.spreadsheets.values.get({
    spreadsheetId: env.GOOGLE_SHEETS_SHEET_ID,
    range: `ventas!${referenceColumn}:${referenceColumn}`,
  });

  const values = lookup.data.values ?? [];
  const index = values.findIndex((row) => row[0] === externalReference);
  if (index === -1) return false;

  const rowNumber = index + 1;
  const range = `ventas!A${rowNumber}:${VENTAS_LAST_COLUMN}${rowNumber}`;

  const current = await sheets.spreadsheets.values.get({
    spreadsheetId: env.GOOGLE_SHEETS_SHEET_ID,
    range,
  });

  const row = [...(current.data.values?.[0] ?? [])];
  while (row.length < VENTAS_COLUMNS.length) row.push("");

  for (const [column, value] of Object.entries(patch)) {
    const position = VENTAS_COLUMNS.indexOf(column as VentasColumn);
    if (position === -1) continue;
    row[position] = sanitizeCell(value);
  }

  await sheets.spreadsheets.values.update({
    spreadsheetId: env.GOOGLE_SHEETS_SHEET_ID,
    range,
    valueInputOption: "RAW",
    requestBody: { values: [row] },
  });

  return true;
}

/** Lee el valor actual de una columna de la fila. Lo usa el contador de renovaciones. */
export async function readSaleField(
  externalReference: string,
  column: VentasColumn,
): Promise<string | null> {
  const sheets = getSheetsClient();
  const referenceColumn = VENTAS_LAST_COLUMN;

  const lookup = await sheets.spreadsheets.values.get({
    spreadsheetId: env.GOOGLE_SHEETS_SHEET_ID,
    range: `ventas!${referenceColumn}:${referenceColumn}`,
  });

  const values = lookup.data.values ?? [];
  const index = values.findIndex((row) => row[0] === externalReference);
  if (index === -1) return null;

  const position = VENTAS_COLUMNS.indexOf(column);
  const letter = String.fromCharCode("A".charCodeAt(0) + position);
  const cell = await sheets.spreadsheets.values.get({
    spreadsheetId: env.GOOGLE_SHEETS_SHEET_ID,
    range: `ventas!${letter}${index + 1}`,
  });

  return cell.data.values?.[0]?.[0] ?? "";
}

/* -------------------------------------------------------------------------- */
/*  bajas — botón de arrepentimiento y pedidos de cancelación                  */
/* -------------------------------------------------------------------------- */

export interface CancellationRequest {
  customerName: string;
  customerEmail: string;
  /** "arrepentimiento" (art. 34) o "baja" (cancelar la renovación). */
  kind: string;
  reason: string;
}

export async function appendCancellation(request: CancellationRequest) {
  return appendRow("bajas", [
    new Date().toISOString(),
    request.customerName,
    request.customerEmail,
    request.kind,
    request.reason,
    "pendiente",
  ]);
}
