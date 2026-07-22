"use client";
import { useState, useTransition } from "react";
import TransmissionsListItem from "@/components/TransmissionsListItem";
import { loadMoreArchivo } from "@/app/archivo/actions";
import type { ARCHIVO_QUERY_RESULT } from "@/sanity/types";
import Button from "./ui/Button";

type Item = ARCHIVO_QUERY_RESULT["items"][number];

export default function ArchivoList({
  initialItems,
  total,
  q,
  tagIds,
  contextoId,
  programaId,
}: {
  initialItems: Item[];
  total: number;
  q?: string;
  tagIds: string[];
  contextoId?: string;
  programaId?: string;
}) {
  const [items, setItems] = useState(initialItems);
  const [isPending, startTransition] = useTransition();
  const hasMore = items.length < total;

  function handleLoadMore() {
    const cursor = items.at(-1)?.fecha;
    if (!cursor) return;
    startTransition(async () => {
      const more = await loadMoreArchivo({
        q,
        tagIds,
        cursor,
        contextoId,
        programaId,
      });
      setItems((prev) => [...prev, ...more.items]);
    });
  }

  return (
    <>
      <ul>
        {items.map((t) => (
          <li key={t._id}>
            <TransmissionsListItem transmission={t} />
          </li>
        ))}
      </ul>
      {hasMore && (
        <div className="my-6 flex w-full justify-center">
          <Button onClick={handleLoadMore} disabled={isPending}>
            {isPending ? "Cargando…" : "Cargar más"}
          </Button>
        </div>
      )}
    </>
  );
}
