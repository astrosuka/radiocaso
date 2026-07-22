import ArchivoList from "@/components/ArchivoList";
import { getArchivo } from "@/sanity/queries/transmisiones";
import {
  parseArchivoSearchParams,
  type ArchivoSearchParams,
} from "@/utils/parseArchivoSearchParams";

export default async function ArchivoResults({
  searchParams,
  filter,
}: {
  searchParams: Promise<ArchivoSearchParams>;
  filter?: { contextoId?: string; programaId?: string };
}) {
  const { q, tagIds, tipoIds } = parseArchivoSearchParams(await searchParams);
  const contextoId = filter?.contextoId;
  const programaId = filter?.programaId;
  const { items, total } = await getArchivo({
    q,
    tagIds,
    tipoIds,
    contextoId,
    programaId,
  }); // no cursor on first load

  return (
    <ArchivoList
      key={`${q ?? ""}:${tagIds.slice().sort().join(",")}:${tipoIds.slice().sort().join(",")}:${contextoId ?? ""}:${programaId ?? ""}`}
      initialItems={items}
      total={total}
      q={q}
      tagIds={tagIds}
      tipoIds={tipoIds}
      contextoId={contextoId}
      programaId={programaId}
    />
  );
}
