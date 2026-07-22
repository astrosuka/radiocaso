"use server";
import { getArchivo } from "@/sanity/queries/transmisiones";

export async function loadMoreArchivo({
  q,
  tagIds,
  tipoIds,
  cursor,
  contextoId,
  programaId,
}: {
  q?: string;
  tagIds: string[];
  tipoIds: string[];
  cursor?: string;
  contextoId?: string;
  programaId?: string;
}) {
  return getArchivo({ q, tagIds, tipoIds, cursor, contextoId, programaId });
}
