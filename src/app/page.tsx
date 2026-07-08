import { getGeneralInfo } from "@/sanity/queries/infoGeneral";

export default async function Home() {
  const data = await getGeneralInfo();

  return (
    <main className="flex flex-col gap-2">
      <section>
        <h2 className="text-xs font-black text-gray-500 uppercase">
          destacados:
        </h2>
        {data?.destacados?.map((item) => (
          <div
            key={item._id}
            className="flex items-center justify-between gap-2"
          >
            <div>
              <span>{item.titulo}</span>
              <span className="ml-2 text-xs text-gray-500">{item.fecha}</span>
            </div>
            <span className="rounded border border-gray-700 px-1 text-xs text-gray-200 lowercase">
              {item._type}
            </span>
          </div>
        ))}
      </section>
    </main>
  );
}
