export type SchemaTranslator = (key: string, values?: Record<string, string | number | Date>) => string;

/**
 * Default translator for the backend.
 * Returns a JSON string so that the API can extract both the key and the dynamic parameters (like min/max).
 */

export const defaultTranslator: SchemaTranslator = (key, values) => {
  if (!values) return JSON.stringify({ key });

  const serializedValues: Record<string, number | string> = {};

  Object.entries(values).forEach(([k, v]) => {
    if (typeof v === "number" || typeof v === "string") {
      serializedValues[k] = v;
    } else if (v instanceof Date) {
      serializedValues[k] = v.toISOString();
    }
  });

  return JSON.stringify({ key, values: serializedValues });
};

/**
 * Helper to parse the structured message returned by defaultTranslator.
 */

export function parseZodMessage(msg: string) {
  try {
    const parsed = JSON.parse(msg);
    return { 
      key: parsed.key as string, 
      params: (parsed.values ?? {}) as Record<string, string | number> 
    };
  } catch {
    return { key: msg, params: {} as Record<string, string | number> };
  }
}
