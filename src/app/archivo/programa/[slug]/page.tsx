import { notFound } from "next/navigation";
import { getProgramas, getProgramaBySlug } from "@/sanity/queries/programas";
import { PortableText } from "next-sanity";
import ArchivoTransmisiones from "@/components/ArchivoTransmisiones";
import type { ArchivoSearchParams } from "@/utils/parseArchivoSearchParams";

export async function generateStaticParams() {
  const programas = await getProgramas();
  return programas
    .filter((p) => p.slug?.current)
    .map((p) => ({ slug: p.slug!.current! }));
}

export default async function ProgramaPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<ArchivoSearchParams>;
}) {
  const { slug } = await params;
  const programa = await getProgramaBySlug(slug);

  if (!programa) return notFound();
  return (
    <>
      <section className="flex flex-col gap-2 border-b p-6">
        <h1 className="font-ibm text-xl">{programa.titulo}</h1>
        <h2>
          <span>coproducción: </span>
          {/* TODO: agregar comas o separadores */}
          {programa.coproduccion?.map((c) => (
            <span key={c._id} className="mr-1">
              {c.nombre}
            </span>
          ))}
        </h2>
        {programa.descripcion && (
          <div className="max-w-prose">
            <PortableText value={programa.descripcion} />
          </div>
        )}
      </section>

      <ArchivoTransmisiones
        searchParams={searchParams}
        basePath={`/archivo/programa/${slug}`}
        filter={{ programaId: programa._id }}
      />
    </>
  );
}
