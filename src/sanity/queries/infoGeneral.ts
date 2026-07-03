import { defineQuery } from "next-sanity";

export const INFO_GENERAL_QUERY = defineQuery(
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
