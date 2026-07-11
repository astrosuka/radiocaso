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
    audio,
  }`
);

export async function getTransmisiones() {
  "use cache";
  cacheLife("max");
  cacheTag("transmision");
  cacheTag("sanity");
  return client.fetch(TRANSMISIONES_QUERY);
}

const ULTIMAS_TRANSMISIONES_QUERY = defineQuery(
  `*[_type == "transmision"] | order(fecha desc)[0...10]{
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
    audio,
  }`
);

export async function getUltimasTransmisiones() {
  "use cache";
  cacheLife("max");
  cacheTag("transmision");
  cacheTag("sanity");
  return client.fetch(ULTIMAS_TRANSMISIONES_QUERY);
}

const TIPOS_DE_TRANSMISION_QUERY = defineQuery(
  `*[_type == "tipoDeTransmision"] {
    _id,
    tipoDeTransmision
  }`
);

export async function getTiposDeTransmision() {
  "use cache";
  cacheLife("max");
  cacheTag("tipoDeTransmision");
  cacheTag("sanity");
  return client.fetch(TIPOS_DE_TRANSMISION_QUERY);
}
