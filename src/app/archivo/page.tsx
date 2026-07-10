import TransmissionsListItem from "@/components/TransmissionsListItem";
import Badge from "@/components/ui/Badge";
import { getContextos, getTiposDeContexto } from "@/sanity/queries/contextos";
import { getProgramas } from "@/sanity/queries/programas";
import { getTags } from "@/sanity/queries/tags";
import {
  getTiposDeTransmision,
  getTransmisiones,
} from "@/sanity/queries/transmisiones";
import Link from "next/link";

export default async function Archivo() {
  const [
    tags,
    tiposDeContexto,
    contextos,
    programas,
    tiposDeTransmision,
    transmisiones,
  ] = await Promise.all([
    getTags(),
    getTiposDeContexto(),
    getContextos(),
    getProgramas(),
    getTiposDeTransmision(),
    getTransmisiones(),
  ]);

  return (
    <>
      <section className="border-b px-6 py-6">
        <div className="flex flex-wrap gap-2">
          {tags.map((t) => (
            <Badge key={t._id}>{t.tag}</Badge>
          ))}
        </div>
      </section>

      <section className="border-b px-6 py-6">
        <ul className="flex flex-wrap gap-2 pb-6">
          {tiposDeContexto.map((t) => (
            <li key={t._id}>
              <Badge variant="context">{t.tipoDeContexto}</Badge>
            </li>
          ))}
        </ul>
        <ul className="font-ibm flex flex-wrap gap-2">
          {contextos.map((c) => (
            <li key={c._id} className="mr-6">
              <Link href={`/archivo/contexto/${c.slug?.current}`}>
                {c.titulo}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="font-ibm border-b px-6 py-6">
        <ul className="flex flex-wrap gap-2">
          {programas.map((p) => (
            <li key={p._id} className="mr-6">
              <Link href={`/archivo/programa/${p.slug?.current}`}>
                {p.titulo}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="py-6">
        <ul className="flex flex-wrap gap-2 px-6 pb-6">
          {tiposDeTransmision.map((t) => (
            <li key={t._id}>
              <Badge variant="transmission">{t.tipoDeTransmision}</Badge>
            </li>
          ))}
        </ul>
        <ul>
          {transmisiones?.map((t) => (
            <li key={t._id}>
              <TransmissionsListItem transmission={t} />
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
