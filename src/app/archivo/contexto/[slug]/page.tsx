import { notFound } from "next/navigation";
import { getContextos, getContextoBySlug } from "@/sanity/queries/contextos";
import { PortableText } from "next-sanity";

export async function generateStaticParams() {
  const contextos = await getContextos();
  return contextos
    .filter((c) => c.slug?.current)
    .map((c) => ({ slug: c.slug!.current! }));
}

export default async function ContextoPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const contexto = await getContextoBySlug(slug);

  if (!contexto) return notFound();
  return (
    <main className="flex flex-col gap-2 p-6">
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
    </main>
  );
}
