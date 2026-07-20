import { Suspense } from "react";
import ArchivoSearchInput from "@/components/ArchivoSearchInput";
import { getPersonas } from "@/sanity/queries/personas";
import { getGrupos } from "@/sanity/queries/grupos";
import { getEspacios } from "@/sanity/queries/espacios";

export default async function ArchivoLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [personas, grupos, espacios] = await Promise.all([
    getPersonas(),
    getGrupos(),
    getEspacios(),
  ]);

  return (
    <>
      <div className="flex w-full items-center justify-center border-b px-6 py-4">
        <Suspense fallback={<div className="h-[calc(1lh+0.5rem+2px)] w-full" />}>
          <ArchivoSearchInput />
        </Suspense>
      </div>
      <div className="flex min-h-0 flex-1">
        <main className="flex flex-1 flex-col overflow-y-auto border-r">
          {children}
        </main>
        <div className="font-ibm flex h-full w-60 flex-col text-sm">
          <div className="flex h-[50%] flex-col border-b">
            <h2 className="border-b text-center">Personas</h2>
            <ul className="overflow-y-auto px-6">
              {personas?.map((p) => (
                <li key={p._id}>
                  <div>{p.nombre}</div>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex h-[25%] flex-col border-b">
            <h2 className="border-b text-center">Grupos</h2>
            <ul className="overflow-y-auto px-6">
              {grupos?.map((g) => (
                <li key={g._id}>
                  <div>{g.nombre}</div>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex h-[25%] flex-col">
            <h2 className="border-b text-center">Espacios</h2>
            <ul className="overflow-y-auto px-6">
              {espacios?.map((e) => (
                <li key={e._id}>
                  <div>{e.nombre}</div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
