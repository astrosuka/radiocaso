import { client } from "@/sanity/client";
import { INFO_GENERAL_QUERY } from "@/sanity/queries/infoGeneral";
import { PortableText } from "next-sanity";

export default async function Info() {
  const data = await client.fetch(INFO_GENERAL_QUERY);

  return (
    <main className="flex flex-col gap-2">
      {data?.descripcion && (
        <div className="max-w-prose">
          <PortableText value={data.descripcion} />
        </div>
      )}
      {data?.contacto && (
        <a href={`mailto:${data.contacto}`} className="font-mono underline">
          {data.contacto}
        </a>
      )}
    </main>
  );
}
