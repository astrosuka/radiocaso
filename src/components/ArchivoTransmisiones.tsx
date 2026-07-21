import { Suspense } from "react";
import ArchivoResults from "@/components/ArchivoResults";
import ArchivoSearchInput from "@/components/ArchivoSearchInput";
import ArchivoTags from "@/components/ArchivoTags";
import Badge from "@/components/ui/Badge";
import { getTiposDeTransmision } from "@/sanity/queries/transmisiones";
import type { ArchivoSearchParams } from "@/utils/parseArchivoSearchParams";

export default async function ArchivoTransmisiones({
  searchParams,
  basePath = "/archivo",
  filter,
}: {
  searchParams: Promise<ArchivoSearchParams>;
  basePath?: string;
  filter?: { contextoId?: string; programaId?: string };
}) {
  const tiposDeTransmision = await getTiposDeTransmision();

  return (
    <>
      <div className="bg-foreground/10 flex w-full items-center justify-center border-b">
        <Suspense
          fallback={<div className="h-[calc(1lh+0.5rem+2px)] w-full" />}
        >
          <ArchivoSearchInput />
        </Suspense>
      </div>

      <section className="border-b px-6 py-6">
        <Suspense fallback={<div>Cargando…</div>}>
          <ArchivoTags searchParams={searchParams} basePath={basePath} />
        </Suspense>
      </section>

      <section className="px-6 py-6">
        <h2>Transmisiones</h2>
        <ul className="flex flex-wrap gap-2 pb-6">
          {tiposDeTransmision.map((t) => (
            <li key={t._id}>
              <Badge variant="transmission">{t.tipoDeTransmision}</Badge>
            </li>
          ))}
        </ul>

        <Suspense fallback={<div className="px-6">Cargando…</div>}>
          <ArchivoResults searchParams={searchParams} filter={filter} />
        </Suspense>
      </section>
    </>
  );
}
