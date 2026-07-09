import { cacheLife, cacheTag } from "next/cache";
import { defineQuery } from "next-sanity";
import { client } from "@/sanity/client";

const PERSONAS_QUERY = defineQuery(
  `*[_type == "persona"] | order(nombre asc) {
    _id,
    nombre,
    slug,
  }`
);

export async function getPersonas() {
  "use cache";
  cacheLife("max");
  cacheTag("persona");
  cacheTag("sanity");
  return client.fetch(PERSONAS_QUERY);
}
