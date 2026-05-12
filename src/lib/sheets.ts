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

export type SheetTab = "leads" | "ventas" | "contactos";

export async function appendRow(tab: SheetTab, values: (string | number)[]) {
  const sheets = getSheetsClient();
  return sheets.spreadsheets.values.append({
    spreadsheetId: env.GOOGLE_SHEETS_SHEET_ID,
    range: `${tab}!A:Z`,
    valueInputOption: "RAW",
    insertDataOption: "INSERT_ROWS",
    requestBody: {
      values: [values],
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

export interface SaleRow {
  externalReference: string;
  gateway: "mercadopago" | "stripe";
  paymentId: string;
  status: string;
  customerEmail: string;
  customerName: string;
  totalAmount: number;
  currency: "ARS" | "USD";
  productIds: string;
}

export async function appendSale(sale: SaleRow) {
  const now = new Date().toISOString();
  return appendRow("ventas", [
    now,
    sale.externalReference,
    sale.gateway,
    sale.paymentId,
    sale.status,
    sale.customerEmail,
    sale.customerName,
    sale.totalAmount,
    sale.currency,
    sale.productIds,
  ]);
}
