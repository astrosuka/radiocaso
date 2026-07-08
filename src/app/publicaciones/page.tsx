import Badge from "@/components/ui/Badge";
import { getPublicaciones } from "@/sanity/queries/publicaciones";

export default async function Publicaciones() {
  const data = await getPublicaciones();

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
                      <Badge key={tipo._id}>{tipo.tipoDePublicacion}</Badge>
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
