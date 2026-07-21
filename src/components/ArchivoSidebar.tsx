"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Badge from "@/components/ui/Badge";
import type {
  CONTEXTOS_QUERY_RESULT,
  PROGRAMAS_QUERY_RESULT,
  TIPOS_DE_CONTEXTO_QUERY_RESULT,
} from "@/sanity/types";

export default function ArchivoSidebar({
  contextos,
  programas,
  tiposDeContexto,
}: {
  contextos: CONTEXTOS_QUERY_RESULT;
  programas: PROGRAMAS_QUERY_RESULT;
  tiposDeContexto: TIPOS_DE_CONTEXTO_QUERY_RESULT;
}) {
  const pathname = usePathname();
  const contextoSlug = pathname.match(/^\/archivo\/contexto\/([^/]+)/)?.[1];
  const programaSlug = pathname.match(/^\/archivo\/programa\/([^/]+)/)?.[1];
  const hasSelection = Boolean(contextoSlug || programaSlug);
  const selectedContexto = contextos.find(
    (c) => c.slug?.current === contextoSlug
  );
  const visibleProgramas = selectedContexto
    ? programas.filter((p) => p.contexto?._ref === selectedContexto._id)
    : programas;

  return (
    <div className="font-ibm flex h-full w-60 flex-col border-r text-sm">
      <div className="h-8 border-b px-6 py-2">
        {hasSelection ? (
          <Link href="/archivo">Ver todo el archivo</Link>
        ) : (
          <span className="font-bold"> </span>
        )}
      </div>

      <div className="flex min-h-0 flex-1 flex-col border-b">
        <h2 className="border-b text-center">Contextos</h2>
        <ul className="flex flex-wrap gap-2 px-6 py-2">
          {tiposDeContexto.map((t) => (
            <li key={t._id}>
              <Badge variant="context">{t.tipoDeContexto}</Badge>
            </li>
          ))}
        </ul>
        <ul className="min-h-0 flex-1 overflow-y-auto px-6 pb-2">
          {contextos.map((c) => {
            const isSelected = c.slug?.current === contextoSlug;
            return (
              <li key={c._id}>
                <Link
                  href={
                    isSelected
                      ? "/archivo"
                      : `/archivo/contexto/${c.slug?.current}`
                  }
                  className={isSelected ? "font-bold" : ""}
                >
                  {c.titulo}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="flex min-h-0 flex-1 flex-col">
        <h2 className="border-b text-center">Programas</h2>
        <ul className="min-h-0 flex-1 overflow-y-auto px-6 py-2">
          {visibleProgramas.map((p) => {
            const isSelected = p.slug?.current === programaSlug;
            return (
              <li key={p._id}>
                <Link
                  href={
                    isSelected
                      ? "/archivo"
                      : `/archivo/programa/${p.slug?.current}`
                  }
                  className={isSelected ? "font-bold" : ""}
                >
                  {p.titulo}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
