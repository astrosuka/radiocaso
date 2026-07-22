export type ArchivoSearchParams = {
  tag?: string | string[];
  tipo?: string | string[];
  q?: string;
};

function toIds(value?: string | string[]) {
  return value ? (Array.isArray(value) ? value : [value]) : [];
}

export function parseArchivoSearchParams(params: ArchivoSearchParams) {
  const tagIds = toIds(params.tag);
  const tipoIds = toIds(params.tipo);
  const q = params.q?.trim() || undefined;
  return { q, tagIds, tipoIds };
}
