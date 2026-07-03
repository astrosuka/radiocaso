import { getSchedule } from "@/radiojar/queries/schedule";

export default async function Agenda() {
  const data = await getSchedule();

  return (
    <main>
      <ul>
        {data?.map((item) => {
          const startDate = new Date(item.start_date).toLocaleString("es");
          const endDate = new Date(item.end_date).toLocaleString("es");
          return (
            <li key={item.key} className="flex items-center gap-2">
              <div>
                <span className="text-xs text-gray-500">{startDate}</span>
                <span className="text-xs text-gray-500"> - {endDate}</span>
              </div>
              <span> {item.title}</span>
            </li>
          );
        })}
      </ul>
    </main>
  );
}
