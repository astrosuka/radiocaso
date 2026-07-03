import { defineQuery } from "next-sanity";

export const PUBLICACIONES_QUERY = defineQuery(
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
