import { env } from "@/lib/env";

const BREVO_BASE = "https://api.brevo.com/v3";

export interface AddContactInput {
  email: string;
  firstName?: string;
  attributes?: Record<string, string | number | boolean>;
}

export interface AddContactResult {
  ok: boolean;
  status: number;
  body: unknown;
}

export async function addContact(
  input: AddContactInput,
): Promise<AddContactResult> {
  if (!env.BREVO_API_KEY || !env.BREVO_LIST_ID) {
    throw new Error("BREVO_API_KEY or BREVO_LIST_ID is not configured");
  }

  const listId = Number.parseInt(env.BREVO_LIST_ID, 10);
  if (Number.isNaN(listId)) {
    throw new Error(`BREVO_LIST_ID must be a number, got: ${env.BREVO_LIST_ID}`);
  }

  const response = await fetch(`${BREVO_BASE}/contacts`, {
    method: "POST",
    headers: {
      "api-key": env.BREVO_API_KEY,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      email: input.email,
      attributes: {
        FIRSTNAME: input.firstName ?? "",
        ...input.attributes,
      },
      listIds: [listId],
      updateEnabled: true,
    }),
  });

  const body = (await response.json().catch(() => null)) as unknown;

  return {
    ok: response.ok,
    status: response.status,
    body,
  };
}
