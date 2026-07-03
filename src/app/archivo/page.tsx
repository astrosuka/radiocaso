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
          <li key={item._id}>{item.titulo}</li>
        ))}
      </ul>
    </main>
  );
}
