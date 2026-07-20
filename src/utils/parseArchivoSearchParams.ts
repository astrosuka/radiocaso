export type ArchivoSearchParams = { tag?: string | string[]; q?: string };

export function parseArchivoSearchParams(params: ArchivoSearchParams) {
  const tagIds = params.tag
    ? Array.isArray(params.tag)
      ? params.tag
      : [params.tag]
    : [];
  const q = params.q?.trim() || undefined;
  return { q, tagIds };
}
