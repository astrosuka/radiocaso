import { Suspense } from "react";
import ArchivoResults from "@/components/ArchivoResults";
import ArchivoSearchInput from "@/components/ArchivoSearchInput";
import ArchivoTags from "@/components/ArchivoTags";
import ArchivoTipos from "@/components/ArchivoTipos";
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
          <ArchivoTags
            searchParams={searchParams}
            basePath={basePath}
            filter={filter}
          />
        </Suspense>
      </section>

      <section className="py-6">
        <Suspense fallback={<div className="px-6 pb-6">Cargando…</div>}>
          <ArchivoTipos
            searchParams={searchParams}
            basePath={basePath}
            filter={filter}
          />
        </Suspense>

        <Suspense fallback={<div className="px-6">Cargando…</div>}>
          <ArchivoResults searchParams={searchParams} filter={filter} />
        </Suspense>
      </section>
    </>
  );
}
