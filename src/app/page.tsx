import TransmissionsListItem from "@/components/TransmissionsListItem";
import Badge from "@/components/ui/Badge";
import SectionHeader from "@/components/ui/SectionHeader";
import SectionTitle from "@/components/ui/SectionTitle";
import SeeMoreButton from "@/components/ui/SeeMoreButton";
import { getGeneralInfo } from "@/sanity/queries/infoGeneral";
import { getUltimasTransmisiones } from "@/sanity/queries/transmisiones";

export default async function Home() {
  const data = await getGeneralInfo();
  const transmisiones = await getUltimasTransmisiones();

  return (
    <main className="flex flex-1 flex-col gap-2 overflow-y-scroll">
      <section>
        <SectionTitle>Destacados</SectionTitle>
        {data?.destacados?.map((item) => (
          <div
            key={item._id}
            className="flex items-center justify-between gap-2"
          >
            <div>
              <span>{item.titulo}</span>
              <span className="ml-2 text-xs text-gray-500">{item.fecha}</span>
            </div>
            <Badge>{item._type}</Badge>
          </div>
        ))}
      </section>

      <section>
        <SectionHeader>
          <SectionTitle>Próximas transmisiones</SectionTitle>
          <SeeMoreButton link="/agenda">ver mas</SeeMoreButton>
        </SectionHeader>
        <div></div>
      </section>

      <section>
        <SectionHeader>
          <SectionTitle>Contextos</SectionTitle>
          <SeeMoreButton link="/archivo">ver mas</SeeMoreButton>
        </SectionHeader>
        <div></div>
      </section>

      <section>
        <SectionHeader>
          <SectionTitle>Programas</SectionTitle>
          <SeeMoreButton link="/archivo">ver mas</SeeMoreButton>
        </SectionHeader>
        <div></div>
      </section>

      <section>
        <SectionHeader>
          <SectionTitle>Transmisiones pasadas</SectionTitle>
          <SeeMoreButton link="/archivo">ver mas</SeeMoreButton>
        </SectionHeader>
        <ul>
          {transmisiones.map((t) => (
            <li key={t._id}>
              <TransmissionsListItem transmission={t} />
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
