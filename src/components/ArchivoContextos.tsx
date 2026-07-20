import Link from "next/link";
import { getContextos } from "@/sanity/queries/contextos";
import {
  parseArchivoSearchParams,
  type ArchivoSearchParams,
} from "@/utils/parseArchivoSearchParams";

export default async function ArchivoContextos({
  searchParams,
}: {
  searchParams: Promise<ArchivoSearchParams>;
}) {
  const { q, tagIds } = parseArchivoSearchParams(await searchParams);
  const contextos = await getContextos({ q, tagIds });

  return (
    <ul className="font-ibm flex flex-wrap gap-2">
      {contextos.map((c) => (
        <li key={c._id} className="mr-6">
          <Link href={`/archivo/contexto/${c.slug?.current}`}>
            {c.titulo}
          </Link>
        </li>
      ))}
    </ul>
  );
}
