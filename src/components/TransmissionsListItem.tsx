"use client";

import { Fragment } from "react";
import { PortableText } from "next-sanity";
import type {
  ARCHIVO_QUERY_RESULT,
  TRANSMISIONES_QUERY_RESULT,
  ULTIMAS_TRANSMISIONES_QUERY_RESULT,
} from "@/sanity/types";
import type { TransmisionDetail } from "@/sanity/queries/transmisiones";
import Badge from "./ui/Badge";
import DateBadge from "./ui/DateBadge";
import PlayButton from "./PlayButton";

export type Transmission =
  | ULTIMAS_TRANSMISIONES_QUERY_RESULT[number]
  | TRANSMISIONES_QUERY_RESULT[number]
  | ARCHIVO_QUERY_RESULT["items"][number];

type DetailRow = { label: string; node: React.ReactNode };

function personList(people: { nombre: string | null }[] | null) {
  return people?.length
    ? people
        .map((p) => p.nombre)
        .filter(Boolean)
        .join(", ")
    : null;
}

function buildDetailRows(detail: NonNullable<TransmisionDetail>): DetailRow[] {
  const ubicacion = [
    detail.locacionGeografica?.ciudad,
    detail.locacionGeografica?.provincia,
    detail.locacionGeografica?.pais,
  ]
    .filter(Boolean)
    .join(", ");

  return (
    [
      detail.contexto?.titulo && {
        label: "Contexto",
        node: detail.contexto.titulo,
      },
      detail.espacio?.nombre && {
        label: "Espacio",
        node: detail.espacio.nombre,
      },
      ubicacion && { label: "Ubicación", node: ubicacion },
      detail.fechaFinal && {
        label: "Finaliza",
        node: <DateBadge date={detail.fechaFinal} />,
      },
      detail.enVivo && { label: "En vivo", node: "Sí" },
      detail.esEpisodio && {
        label: "Episodio",
        node: `#${detail.numeroDeEpisodio ?? "-"}${
          detail.esParteDeUnaTemporada
            ? ` · Temporada ${detail.numeroDeTemporada ?? "-"}`
            : ""
        }`,
      },
      personList(detail.conduccion) && {
        label: "Conducción",
        node: personList(detail.conduccion),
      },
      personList(detail.invitadxs) && {
        label: "Invitadxs",
        node: personList(detail.invitadxs),
      },
      personList(detail.artistas) && {
        label: "Artistas",
        node: personList(detail.artistas),
      },
      personList(detail.coproduccion) && {
        label: "Co-producción",
        node: personList(detail.coproduccion),
      },
      personList(detail.piezasIncluidasDe) && {
        label: "Piezas incluidas de",
        node: personList(detail.piezasIncluidasDe),
      },
      detail.link?.url && {
        label: detail.link.titulo || "Link",
        node: (
          <a
            href={detail.link.url}
            target="_blank"
            rel="noreferrer"
            className="underline"
          >
            {detail.link.texto || detail.link.url}
          </a>
        ),
      },
      detail.archiveId && {
        label: "Archive.org",
        node: (
          <a
            href={`https://archive.org/details/${detail.archiveId}`}
            target="_blank"
            rel="noreferrer"
            className="underline"
          >
            {detail.archiveId}
          </a>
        ),
      },
    ] as (DetailRow | false | null | undefined)[]
  ).filter((r): r is DetailRow => Boolean(r));
}

function TransmissionDetailContent({
  detail,
}: {
  detail: NonNullable<TransmisionDetail>;
}) {
  const rows = buildDetailRows(detail);
  return (
    <div className="flex flex-col gap-2 text-sm">
      <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1">
        {rows.map((row) => (
          <Fragment key={row.label}>
            <dt className="font-bold">{row.label}</dt>
            <dd>{row.node}</dd>
          </Fragment>
        ))}
      </dl>
      {detail.descripcion && (
        <div className="max-w-prose">
          <PortableText value={detail.descripcion} />
        </div>
      )}
    </div>
  );
}

export default function TransmissionsListItem({
  transmission,
  isOpen,
  isLoadingDetail,
  detail,
  onToggleExpand,
}: {
  transmission: Transmission;
  isOpen: boolean;
  isLoadingDetail: boolean;
  detail: TransmisionDetail;
  onToggleExpand: () => void;
}) {
  return (
    <div>
      <div
        className={`border-b-foreground/20 group grid w-full cursor-pointer grid-cols-1 items-start gap-2 border-b py-2 pr-6 md:grid-cols-[3fr_2fr_1fr] ${isOpen ? "bg-foreground text-background" : "hover:bg-gray"}`}
        role="button"
        tabIndex={0}
        id={`transmission-toggle-${transmission._id}`}
        aria-expanded={isOpen}
        aria-controls={`transmission-panel-${transmission._id}`}
        onClick={onToggleExpand}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onToggleExpand();
          }
        }}
      >
        <div className="flex flex-col items-start md:flex-row md:gap-4">
          <div className="w-4">
            {transmission.audio?.url?.endsWith(".mp3") && (
              <div onClick={(e) => e.stopPropagation()}>
                <PlayButton
                  url={transmission.audio.url}
                  title={transmission.titulo ?? ""}
                  subtitle={transmission.programa?.titulo ?? ""}
                />
              </div>
            )}
          </div>
          <span className="pt-0.5">
            {transmission.fecha && <DateBadge date={transmission.fecha} />}
          </span>
          <div className="text-left underline-offset-2 group-hover:underline">
            {transmission.titulo}
          </div>
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

      {isOpen && (
        <div
          id={`transmission-panel-${transmission._id}`}
          role="region"
          aria-labelledby={`transmission-toggle-${transmission._id}`}
          className="bg-gray px-6 py-2"
        >
          {isLoadingDetail && <p className="text-sm">Cargando…</p>}
          {!isLoadingDetail && detail && (
            <TransmissionDetailContent detail={detail} />
          )}
        </div>
      )}
    </div>
  );
}
