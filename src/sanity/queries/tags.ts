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
