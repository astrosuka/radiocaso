import ArchivoTransmisiones from "@/components/ArchivoTransmisiones";
import type { ArchivoSearchParams } from "@/utils/parseArchivoSearchParams";

export default async function Archivo({
  searchParams,
}: {
  searchParams: Promise<ArchivoSearchParams>;
}) {
  return <ArchivoTransmisiones searchParams={searchParams} />;
}
