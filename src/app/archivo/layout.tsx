import ArchivoSidebar from "@/components/ArchivoSidebar";
import { getContextos, getTiposDeContexto } from "@/sanity/queries/contextos";
import { getProgramas } from "@/sanity/queries/programas";
import { getPersonas } from "@/sanity/queries/personas";
import { getGrupos } from "@/sanity/queries/grupos";
import { getEspacios } from "@/sanity/queries/espacios";

export default async function ArchivoLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [contextos, programas, tiposDeContexto, personas, grupos, espacios] =
    await Promise.all([
      getContextos(),
      getProgramas(),
      getTiposDeContexto(),
      getPersonas(),
      getGrupos(),
      getEspacios(),
    ]);

  return (
    <div className="flex min-h-0 flex-1">
      <ArchivoSidebar
        contextos={contextos}
        programas={programas}
        tiposDeContexto={tiposDeContexto}
      />
      <main className="flex flex-1 flex-col overflow-y-auto border-r">
        {children}
      </main>
      <div className="font-ibm flex h-full w-60 flex-col text-sm">
        <div className="flex h-[50%] min-h-0 flex-col border-b">
          <h2 className="border-b text-center">Personas</h2>
          <ul className="min-h-0 flex-1 overflow-y-auto px-6">
            {personas?.map((p) => (
              <li key={p._id}>
                <div>{p.nombre}</div>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex h-[25%] min-h-0 flex-col border-b">
          <h2 className="border-b text-center">Grupos</h2>
          <ul className="min-h-0 flex-1 overflow-y-auto px-6">
            {grupos?.map((g) => (
              <li key={g._id}>
                <div>{g.nombre}</div>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex h-[25%] min-h-0 flex-col">
          <h2 className="border-b text-center">Espacios</h2>
          <ul className="min-h-0 flex-1 overflow-y-auto px-6">
            {espacios?.map((e) => (
              <li key={e._id}>
                <div>{e.nombre}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
