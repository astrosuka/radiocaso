"use server";
import { getArchivo } from "@/sanity/queries/transmisiones";

export async function loadMoreArchivo({
  q,
  tagIds,
  cursor,
  contextoId,
  programaId,
}: {
  q?: string;
  tagIds: string[];
  cursor?: string;
  contextoId?: string;
  programaId?: string;
}) {
  return getArchivo({ q, tagIds, cursor, contextoId, programaId });
}
