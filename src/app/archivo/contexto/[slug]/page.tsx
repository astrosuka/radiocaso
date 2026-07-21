import { notFound } from "next/navigation";
import { getContextos, getContextoBySlug } from "@/sanity/queries/contextos";
import { PortableText } from "next-sanity";
import ArchivoTransmisiones from "@/components/ArchivoTransmisiones";
import type { ArchivoSearchParams } from "@/utils/parseArchivoSearchParams";

export async function generateStaticParams() {
  const contextos = await getContextos();
  return contextos
    .filter((c) => c.slug?.current)
    .map((c) => ({ slug: c.slug!.current! }));
}

export default async function ContextoPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<ArchivoSearchParams>;
}) {
  const { slug } = await params;
  const contexto = await getContextoBySlug(slug);

  if (!contexto) return notFound();
  return (
    <>
      <section className="flex flex-col gap-2 border-b p-6">
        <h1 className="font-ibm text-xl">{contexto.titulo}</h1>
        <h2>
          <span>producción: </span>
          {/* TODO: agregar comas o separadores */}
          {contexto.produccion?.map((p) => (
            <span key={p._id} className="mr-1">
              {p.nombre}
            </span>
          ))}
        </h2>
        {contexto.descripcion && (
          <div className="max-w-prose">
            <PortableText value={contexto.descripcion} />
          </div>
        )}
      </section>

      <ArchivoTransmisiones
        searchParams={searchParams}
        basePath={`/archivo/contexto/${slug}`}
        filter={{ contextoId: contexto._id }}
      />
    </>
  );
}
