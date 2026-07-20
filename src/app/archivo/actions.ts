"use server";
import { getArchivo } from "@/sanity/queries/transmisiones";

export async function loadMoreArchivo({
  q,
  tagIds,
  cursor,
}: {
  q?: string;
  tagIds: string[];
  cursor?: string;
}) {
  return getArchivo({ q, tagIds, cursor });
}
