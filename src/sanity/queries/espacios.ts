import { cacheLife, cacheTag } from "next/cache";
import { defineQuery } from "next-sanity";
import { client } from "@/sanity/client";

const ESPACIOS_QUERY = defineQuery(
  `*[_type == "espacio"] | order(nombre asc) {
    _id,
    nombre,
    slug,
  }`
);

export async function getEspacios() {
  "use cache";
  cacheLife("max");
  cacheTag("espacio");
  cacheTag("sanity");
  return client.fetch(ESPACIOS_QUERY);
}
