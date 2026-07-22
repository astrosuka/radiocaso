import Link from "next/link";
import Badge from "@/components/ui/Badge";
import { getTagsForArchivo } from "@/sanity/queries/tags";
import {
  parseArchivoSearchParams,
  type ArchivoSearchParams,
} from "@/utils/parseArchivoSearchParams";

function buildTagHref(
  current: URLSearchParams,
  tagId: string,
  isSelected: boolean,
  basePath: string
) {
  const params = new URLSearchParams(current);
  const next = isSelected
    ? params.getAll("tag").filter((id) => id !== tagId)
    : [...params.getAll("tag"), tagId];
  params.delete("tag");
  next.forEach((id) => params.append("tag", id));
  return `${basePath}?${params.toString()}`;
}

export default async function ArchivoTags({
  searchParams,
  basePath = "/archivo",
  filter,
}: {
  searchParams: Promise<ArchivoSearchParams>;
  basePath?: string;
  filter?: { contextoId?: string; programaId?: string };
}) {
  const params = await searchParams;
  const { tagIds } = parseArchivoSearchParams(params);

  const current = new URLSearchParams(
    Object.entries(params).flatMap(([k, v]) =>
      Array.isArray(v) ? v.map((x) => [k, x]) : v ? [[k, v]] : []
    )
  );

  const tags = await getTagsForArchivo({
    contextoId: filter?.contextoId,
    programaId: filter?.programaId,
  });

  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((t) => {
        const isSelected = tagIds.includes(t._id);
        return (
          <Link
            key={t._id}
            href={buildTagHref(current, t._id, isSelected, basePath)}
          >
            <Badge variant={isSelected ? "tag-active" : "tag"}>{t.tag}</Badge>
          </Link>
        );
      })}
    </div>
  );
}
