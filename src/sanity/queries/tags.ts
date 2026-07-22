import { cacheLife, cacheTag } from "next/cache";
import { defineQuery } from "next-sanity";
import { client } from "@/sanity/client";

const TAGS_QUERY = defineQuery(
  `*[_type == "tag"]{
    _id,
    tag,
  }`
);

export async function getTags() {
  "use cache";
  cacheLife("max");
  cacheTag("tag");
  cacheTag("sanity");
  return client.fetch(TAGS_QUERY);
}

const TAGS_FOR_ARCHIVO_QUERY = defineQuery(
  `*[_type == "tag" && _id in array::unique(*[
    _type == "transmision"
    && (!defined($contextoId) || contexto._ref == $contextoId || programa->contexto._ref == $contextoId)
    && (!defined($programaId) || programa._ref == $programaId)
  ].tags[]->_id)]{
    _id,
    tag,
  }`
);

export async function getTagsForArchivo({
  contextoId,
  programaId,
}: {
  contextoId?: string;
  programaId?: string;
}) {
  "use cache";
  cacheLife("minutes");
  cacheTag("transmision");
  cacheTag("tag");
  cacheTag("sanity");
  return client.fetch(TAGS_FOR_ARCHIVO_QUERY, {
    contextoId: contextoId ?? null,
    programaId: programaId ?? null,
  });
}
