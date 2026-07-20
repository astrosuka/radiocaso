import ArchivoList from "@/components/ArchivoList";
import { getArchivo } from "@/sanity/queries/transmisiones";
import {
  parseArchivoSearchParams,
  type ArchivoSearchParams,
} from "@/utils/parseArchivoSearchParams";

export default async function ArchivoResults({
  searchParams,
}: {
  searchParams: Promise<ArchivoSearchParams>;
}) {
  const { q, tagIds } = parseArchivoSearchParams(await searchParams);
  const { items, total } = await getArchivo({ q, tagIds }); // no cursor on first load

  return (
    <ArchivoList
      key={`${q ?? ""}:${tagIds.slice().sort().join(",")}`}
      initialItems={items}
      total={total}
      q={q}
      tagIds={tagIds}
    />
  );
}
