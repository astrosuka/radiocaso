import { cacheLife, cacheTag } from "next/cache";
import { defineQuery } from "next-sanity";
import { client } from "@/sanity/client";

const PUBLICACIONES_QUERY = defineQuery(
  `*[_type == "publicacion"] | order(fecha desc){
    _id,
    titulo,
    slug,
    fecha,
    tipo[]->{...},
    serie,
    descripcion,
    recursos,
    creditos,
  }`
);

export async function getPublicaciones() {
  "use cache";
  cacheLife("max");
  cacheTag("publicacion");
  cacheTag("sanity");
  return client.fetch(PUBLICACIONES_QUERY);
}
