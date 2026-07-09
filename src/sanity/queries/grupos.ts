import { cacheLife, cacheTag } from "next/cache";
import { defineQuery } from "next-sanity";
import { client } from "@/sanity/client";

const GRUPOS_QUERY = defineQuery(
  `*[_type == "grupo"] | order(nombre asc) {
    _id,
    nombre,
    slug,
    integrantes,
    tipoDeGrupo
  }`
);

export async function getGrupos() {
  "use cache";
  cacheLife("max");
  cacheTag("grupo");
  cacheTag("sanity");
  return client.fetch(GRUPOS_QUERY);
}
