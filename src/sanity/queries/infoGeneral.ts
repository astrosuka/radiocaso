import { cacheLife, cacheTag } from "next/cache";
import { defineQuery } from "next-sanity";
import { client } from "@/sanity/client";

const INFO_GENERAL_QUERY = defineQuery(
  `*[_type == "infoGeneral"][0]{
    titulo,
    destacados[]->{...},
    descripcion,
    contacto,
    redesSociales,
    configuracionDeTransmision,
    nowPlaying,
    mensajeGenericoDeTransmision,
    schedule,
  }`
);

export async function getGeneralInfo() {
  "use cache";
  cacheLife("max");
  cacheTag("infoGeneral");
  cacheTag("sanity");
  return client.fetch(INFO_GENERAL_QUERY);
}
