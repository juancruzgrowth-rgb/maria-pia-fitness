type ClassValue =
  | string
  | number
  | null
  | undefined
  | false
  | Record<string, boolean | undefined | null>
  | ClassValue[];

export function cn(...inputs: ClassValue[]): string {
  const result: string[] = [];
  for (const input of inputs) {
    if (!input) continue;
    if (typeof input === "string" || typeof input === "number") {
      result.push(String(input));
    } else if (Array.isArray(input)) {
      const inner = cn(...input);
      if (inner) result.push(inner);
    } else if (typeof input === "object") {
      for (const [key, value] of Object.entries(input)) {
        if (value) result.push(key);
      }
    }
  }
  return result.join(" ");
}
