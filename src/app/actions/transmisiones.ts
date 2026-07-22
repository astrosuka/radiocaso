"use server";

import { getTransmisionDetail } from "@/sanity/queries/transmisiones";

export async function fetchTransmisionDetail(id: string) {
  return getTransmisionDetail(id);
}
