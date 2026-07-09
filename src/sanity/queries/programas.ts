import { cacheLife, cacheTag } from "next/cache";
import { defineQuery } from "next-sanity";
import { client } from "@/sanity/client";

const PROGRAMAS_QUERY = defineQuery(
  `*[_type == "programa"] {
    _id,
    titulo,
    slug,
    contexto,
    fecha,
    descripcion,
    descripcionCorta,
    imagen,
    coproduccion,
    tags,
  }`
);

export async function getProgramas() {
  "use cache";
  cacheLife("max");
  cacheTag("programa");
  cacheTag("sanity");
  return client.fetch(PROGRAMAS_QUERY);
}
