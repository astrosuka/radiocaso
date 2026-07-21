import { cacheLife, cacheTag } from "next/cache";
import { defineQuery } from "next-sanity";
import { client } from "@/sanity/client";

const CONTEXTOS_QUERY = defineQuery(
  `*[_type == "contexto"] {
    _id,
    titulo,
    slug,
    fecha,
    fechaFinal,
    tiposDeContexto,
    produccion,
    tags[]->{_id, tag},
  }`
);

export async function getContextos() {
  "use cache";
  cacheLife("max");
  cacheTag("contexto");
  cacheTag("sanity");
  return client.fetch(CONTEXTOS_QUERY);
}

const TIPOS_DE_CONTEXTO_QUERY = defineQuery(
  `*[_type == "tipoDeContexto"] {
    _id,
    tipoDeContexto
  }`
);

export async function getTiposDeContexto() {
  "use cache";
  cacheLife("max");
  cacheTag("tipoDeContexto");
  cacheTag("sanity");
  return client.fetch(TIPOS_DE_CONTEXTO_QUERY);
}

const CONTEXTO_BY_SLUG_QUERY = defineQuery(
  `*[_type == "contexto" && slug.current == $slug][0] {
    _id,
    titulo,
    slug,
    fecha,
    fechaFinal,
    descripcion,
    tiposDeContexto,
    imagen,
    produccion[]->{_id, nombre},
    tags,
  }`
);

export async function getContextoBySlug(slug: string) {
  "use cache";
  cacheLife("max");
  cacheTag("contexto");
  cacheTag("sanity");
  return client.fetch(CONTEXTO_BY_SLUG_QUERY, { slug });
}
