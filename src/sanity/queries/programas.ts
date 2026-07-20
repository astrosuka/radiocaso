import { cacheLife, cacheTag } from "next/cache";
import { defineQuery } from "next-sanity";
import { client } from "@/sanity/client";

const PROGRAMAS_QUERY = defineQuery(
  `*[
    _type == "programa"
    && (!defined($q) || titulo match $q + "*")
    && (count($tagIds) == 0 || count((tags[]->_id)[@ in $tagIds]) > 0)
  ] {
    _id,
    titulo,
    slug,
    contexto,
    fecha,
    descripcionCorta,
    coproduccion,
    tags[]->{_id, tag},
  }`
);

export async function getProgramas({
  q,
  tagIds,
}: { q?: string; tagIds?: string[] } = {}) {
  "use cache";
  cacheLife("minutes");
  cacheTag("programa");
  cacheTag("sanity");
  return client.fetch(PROGRAMAS_QUERY, { q: q ?? null, tagIds: tagIds ?? [] });
}

const PROGRAMA_BY_SLUG_QUERY = defineQuery(
  `*[_type == "programa" && slug.current == $slug][0] {
    _id,
    titulo,
    slug,
    contexto,
    fecha,
    descripcion,
    descripcionCorta,
    tiposDeContexto,
    imagen,
    coproduccion[]->{_id, nombre},
    tags,
  }`
);

export async function getProgramaBySlug(slug: string) {
  "use cache";
  cacheLife("max");
  cacheTag("programa");
  cacheTag("sanity");
  return client.fetch(PROGRAMA_BY_SLUG_QUERY, { slug });
}
