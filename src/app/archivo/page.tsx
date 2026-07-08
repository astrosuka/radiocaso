import TransmissionsListItem from "@/components/TransmissionsListItem";
import { getTransmisiones } from "@/sanity/queries/transmisiones";

export default async function Archivo() {
  const data = await getTransmisiones();

  return (
    <main>
      <h2 className="text-xs font-black text-gray-500 uppercase">
        transmisiones:
      </h2>
      <ul>
        {data?.map((item) => (
          <li key={item._id}>
            <TransmissionsListItem transmission={item} />
          </li>
        ))}
      </ul>
    </main>
  );
}
