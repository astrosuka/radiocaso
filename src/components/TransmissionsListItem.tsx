import type {
  TRANSMISIONES_QUERY_RESULT,
  ULTIMAS_TRANSMISIONES_QUERY_RESULT,
} from "@/sanity/types";
import Badge from "./ui/Badge";
import DateBadge from "./ui/DateBadge";

type Transmission =
  | ULTIMAS_TRANSMISIONES_QUERY_RESULT[number]
  | TRANSMISIONES_QUERY_RESULT[number];

export default function TransmissionsListItem({
  transmission,
}: {
  transmission: Transmission;
}) {
  return (
    <div className="border-b-foreground/20 mb-3 grid w-full grid-cols-1 items-start gap-2 border-b px-6 pb-2 md:grid-cols-[auto_2fr_2fr_1fr]">
      <span className="w-16">
        {transmission.fecha && <DateBadge date={transmission.fecha} />}
      </span>
      <span>{transmission.titulo}</span>
      <span>{transmission.programa?.titulo}</span>
      <span className="flex w-full gap-1 md:justify-end">
        {transmission.tipoDeTransmision?.map((t) => (
          <Badge key={t._id}>{t.tipoDeTransmision}</Badge>
        ))}
      </span>
    </div>
  );
}
