import { cacheLife, cacheTag } from "next/cache";
import { defineQuery } from "next-sanity";
import { client } from "@/sanity/client";

const CONTEXTOS_QUERY = defineQuery(
  `*[_type == "contexto"] {
    _id,
    titulo,
    slug,
    contexto,
    fecha,
    fechaFinal,
    descripcion,
    tiposDeContexto,
    imagen,
    produccion,
    tags,
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
