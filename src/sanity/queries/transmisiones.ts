import { cacheLife, cacheTag } from "next/cache";
import { defineQuery } from "next-sanity";
import { client } from "@/sanity/client";

const ARCHIVO_QUERY = defineQuery(`{
  "items": *[
    _type == "transmision"
    && (!defined($q) || titulo match $q + "*" || programa->titulo match $q + "*")
    && (count($tagIds) == 0 || count((tags[]->_id)[@ in $tagIds]) > 0)
    && (!defined($cursor) || fecha < $cursor)
  ] | order(fecha desc) [0...$limit] {
    _id, titulo, fecha, audio,
    programa->{titulo},
    tags[]->{_id, tag},
    tipoDeTransmision[]->{_id, tipoDeTransmision}
  },
  "total": count(*[
    _type == "transmision"
    && (!defined($q) || titulo match $q + "*" || programa->titulo match $q + "*")
    && (count($tagIds) == 0 || count((tags[]->_id)[@ in $tagIds]) > 0)
  ])
}`);

export async function getArchivo({
  q,
  tagIds,
  cursor,
  limit = 30,
}: {
  q?: string;
  tagIds: string[];
  cursor?: string; // ISO date of the last item from the previous page
  limit?: number;
}) {
  "use cache";
  cacheLife("minutes");
  cacheTag("transmision");
  cacheTag("sanity");
  return client.fetch(ARCHIVO_QUERY, {
    q: q ?? null,
    tagIds,
    cursor: cursor ?? null,
    limit,
  });
}

// TODO: ver si dejaar
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
    tags[]->{_id, tag}
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
