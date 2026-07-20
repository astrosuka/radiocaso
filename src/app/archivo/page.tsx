import { Suspense } from "react";
import ArchivoContextos from "@/components/ArchivoContextos";
import ArchivoProgramas from "@/components/ArchivoProgramas";
import ArchivoResults from "@/components/ArchivoResults";
import ArchivoTags from "@/components/ArchivoTags";
import Badge from "@/components/ui/Badge";
import { getTiposDeContexto } from "@/sanity/queries/contextos";
import { getTiposDeTransmision } from "@/sanity/queries/transmisiones";
import type { ArchivoSearchParams } from "@/utils/parseArchivoSearchParams";

export default async function Archivo({
  searchParams,
}: {
  searchParams: Promise<ArchivoSearchParams>;
}) {
  const [tiposDeContexto, tiposDeTransmision] = await Promise.all([
    getTiposDeContexto(),
    getTiposDeTransmision(),
  ]);

  return (
    <>
      <section className="border-b px-6 py-6">
        <Suspense fallback={<div>Cargando…</div>}>
          <ArchivoTags searchParams={searchParams} />
        </Suspense>
      </section>

      <section className="border-b px-6 py-6">
        <ul className="flex flex-wrap gap-2 pb-6">
          {tiposDeContexto.map((t) => (
            <li key={t._id}>
              <Badge variant="context">{t.tipoDeContexto}</Badge>
            </li>
          ))}
        </ul>
        <Suspense fallback={<div className="font-ibm">Cargando…</div>}>
          <ArchivoContextos searchParams={searchParams} />
        </Suspense>
      </section>

      <section className="font-ibm border-b px-6 py-6">
        <Suspense fallback={<div>Cargando…</div>}>
          <ArchivoProgramas searchParams={searchParams} />
        </Suspense>
      </section>

      <section className="py-6">
        <ul className="flex flex-wrap gap-2 px-6 pb-6">
          {tiposDeTransmision.map((t) => (
            <li key={t._id}>
              <Badge variant="transmission">{t.tipoDeTransmision}</Badge>
            </li>
          ))}
        </ul>

        <Suspense fallback={<div className="px-6">Cargando…</div>}>
          <ArchivoResults searchParams={searchParams} />
        </Suspense>
      </section>
    </>
  );
}
