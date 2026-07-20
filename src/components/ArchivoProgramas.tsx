import Link from "next/link";
import { getProgramas } from "@/sanity/queries/programas";
import {
  parseArchivoSearchParams,
  type ArchivoSearchParams,
} from "@/utils/parseArchivoSearchParams";

export default async function ArchivoProgramas({
  searchParams,
}: {
  searchParams: Promise<ArchivoSearchParams>;
}) {
  const { q, tagIds } = parseArchivoSearchParams(await searchParams);
  const programas = await getProgramas({ q, tagIds });

  return (
    <ul className="flex flex-wrap gap-2">
      {programas.map((p) => (
        <li key={p._id} className="mr-6">
          <Link href={`/archivo/programa/${p.slug?.current}`}>
            {p.titulo}
          </Link>
        </li>
      ))}
    </ul>
  );
}
