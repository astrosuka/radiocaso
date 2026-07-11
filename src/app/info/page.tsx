import { getGeneralInfo } from "@/sanity/queries/infoGeneral";
import { PortableText } from "next-sanity";

export default async function Info() {
  const data = await getGeneralInfo();

  return (
    <main className="flex flex-col gap-2">
      {data?.descripcion && (
        <div className="max-w-prose p-6">
          <PortableText value={data.descripcion} />
        </div>
      )}
      {data?.contacto && (
        <a href={`mailto:${data.contacto}`} className="p-6 font-mono underline">
          {data.contacto}
        </a>
      )}
    </main>
  );
}
