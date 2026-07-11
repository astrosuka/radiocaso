import Badge from "@/components/ui/Badge";
import DateBadge from "@/components/ui/DateBadge";
import { getPublicaciones } from "@/sanity/queries/publicaciones";

export default async function Publicaciones() {
  const data = await getPublicaciones();

  return (
    <main>
      <ul className="flex w-full flex-col gap-2 p-6">
        {data?.map((item) => {
          return (
            <li
              key={item._id}
              className="flex w-full items-center justify-between"
            >
              <div className="flex items-center gap-2">
                {item.fecha && <DateBadge date={item.fecha} />}
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
