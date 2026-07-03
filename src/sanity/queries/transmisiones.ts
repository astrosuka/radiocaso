import { cacheLife, cacheTag } from "next/cache";
import { defineQuery } from "next-sanity";
import { client } from "@/sanity/client";

const TRANSMISIONES_QUERY = defineQuery(
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

export async function getTransmisiones() {
  "use cache";
  cacheLife("max");
  cacheTag("transmision");
  cacheTag("sanity");
  return client.fetch(TRANSMISIONES_QUERY);
}
