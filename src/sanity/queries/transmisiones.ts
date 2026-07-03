import { defineQuery } from "next-sanity";

export const TRANSMISIONES_QUERY = defineQuery(
  `*[_type == "transmision"] | order(fecha desc){
    _id,
    titulo,
    fecha,
    tipoDeTransmision[]->{
      _id,
      tipoDeTransmision
    },
    programa->{
      _id,
      titulo},
    contexto->{
      _id,
      titulo},
    descripcionCorta,
  }`
);
