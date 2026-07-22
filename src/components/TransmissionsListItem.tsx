import type {
  ARCHIVO_QUERY_RESULT,
  TRANSMISIONES_QUERY_RESULT,
  ULTIMAS_TRANSMISIONES_QUERY_RESULT,
} from "@/sanity/types";
import Badge from "./ui/Badge";
import DateBadge from "./ui/DateBadge";
import PlayButton from "./PlayButton";

type Transmission =
  | ULTIMAS_TRANSMISIONES_QUERY_RESULT[number]
  | TRANSMISIONES_QUERY_RESULT[number]
  | ARCHIVO_QUERY_RESULT["items"][number];

export default function TransmissionsListItem({
  transmission,
}: {
  transmission: Transmission;
}) {
  return (
    <div className="border-b-foreground/20 mb-3 grid w-full grid-cols-1 items-start gap-2 border-b px-6 pb-2 md:grid-cols-[3fr_2fr_1fr]">
      <div className="flex flex-col items-start md:flex-row md:gap-4">
        <div className="w-2">
          {transmission.audio?.url?.endsWith(".mp3") && (
            <PlayButton
              url={transmission.audio.url}
              title={transmission.titulo ?? ""}
              subtitle={transmission.programa?.titulo ?? ""}
            />
          )}
        </div>
        <span className="pt-0.5">
          {transmission.fecha && <DateBadge date={transmission.fecha} />}
        </span>
        <span>{transmission.titulo}</span>
      </div>
      <span>{transmission.programa?.titulo}</span>
      <span className="flex w-full flex-wrap gap-1 md:justify-end">
        {transmission.tipoDeTransmision?.map((t) => (
          <Badge key={t._id} variant="tipo">
            {t.tipoDeTransmision}
          </Badge>
        ))}
      </span>
    </div>
  );
}
