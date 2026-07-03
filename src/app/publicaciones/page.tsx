import { client } from "@/sanity/client";
import { PUBLICACIONES_QUERY } from "@/sanity/queries/publicaciones";

export default async function Publicaciones() {
  const data = await client.fetch(PUBLICACIONES_QUERY);

  return (
    <main>
      <ul className="flex w-full flex-col">
        {data?.map((item) => {
          return (
            <li
              key={item._id}
              className="flex w-full items-center justify-between"
            >
              <div>
                <span className="mr-2 text-xs text-gray-500">{item.fecha}</span>
                <span>{item.titulo}</span>
              </div>
              <div className="flex gap-1">
                {item?.tipo?.length
                  ? item.tipo.map((tipo) => (
                      <span
                        key={tipo._id}
                        className="rounded border border-gray-700 px-1 text-xs text-gray-200 lowercase"
                      >
                        {tipo.tipoDePublicacion}
                      </span>
                    ))
                  : "-"}
              </div>
            </li>
          );
        })}
      </ul>
    </main>
  );
}
