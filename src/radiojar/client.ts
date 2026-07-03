import type { z } from "zod";

export async function radiojarFetch<T>(
  url: string,
  schema: z.ZodType<T>
): Promise<T> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Radiojar request failed: ${response.status}`);
  }

  const data = await response.json();
  return schema.parse(data);
}
