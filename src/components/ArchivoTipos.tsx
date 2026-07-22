import Link from "next/link";
import Badge from "@/components/ui/Badge";
import { getTiposDeTransmisionForArchivo } from "@/sanity/queries/transmisiones";
import {
  parseArchivoSearchParams,
  type ArchivoSearchParams,
} from "@/utils/parseArchivoSearchParams";

function buildTipoHref(
  current: URLSearchParams,
  tipoId: string,
  isSelected: boolean,
  basePath: string
) {
  const params = new URLSearchParams(current);
  const next = isSelected
    ? params.getAll("tipo").filter((id) => id !== tipoId)
    : [...params.getAll("tipo"), tipoId];
  params.delete("tipo");
  next.forEach((id) => params.append("tipo", id));
  return `${basePath}?${params.toString()}`;
}

export default async function ArchivoTipos({
  searchParams,
  basePath = "/archivo",
  filter,
}: {
  searchParams: Promise<ArchivoSearchParams>;
  basePath?: string;
  filter?: { contextoId?: string; programaId?: string };
}) {
  const params = await searchParams;
  const { tipoIds } = parseArchivoSearchParams(params);

  const current = new URLSearchParams(
    Object.entries(params).flatMap(([k, v]) =>
      Array.isArray(v) ? v.map((x) => [k, x]) : v ? [[k, v]] : []
    )
  );

  const tipos = await getTiposDeTransmisionForArchivo({
    contextoId: filter?.contextoId,
    programaId: filter?.programaId,
  });

  return (
    <ul className="flex flex-wrap gap-2 px-6 pb-6">
      {tipos.map((t) => {
        const isSelected = tipoIds.includes(t._id);
        return (
          <li key={t._id}>
            <Link href={buildTipoHref(current, t._id, isSelected, basePath)}>
              <Badge variant={isSelected ? "tipo-active" : "tipo"}>
                {t.tipoDeTransmision}
              </Badge>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
