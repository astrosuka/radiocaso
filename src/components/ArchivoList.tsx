"use client";
import { useState, useTransition } from "react";
import TransmissionsListItem from "@/components/TransmissionsListItem";
import { loadMoreArchivo } from "@/app/archivo/actions";
import type { ARCHIVO_QUERY_RESULT } from "@/sanity/types";

type Item = ARCHIVO_QUERY_RESULT["items"][number];

export default function ArchivoList({
  initialItems,
  total,
  q,
  tagIds,
}: {
  initialItems: Item[];
  total: number;
  q?: string;
  tagIds: string[];
}) {
  const [items, setItems] = useState(initialItems);
  const [isPending, startTransition] = useTransition();
  const hasMore = items.length < total;

  function handleLoadMore() {
    const cursor = items.at(-1)?.fecha;
    if (!cursor) return;
    startTransition(async () => {
      const more = await loadMoreArchivo({ q, tagIds, cursor });
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
        <button
          onClick={handleLoadMore}
          disabled={isPending}
          className="mx-auto my-6 block"
        >
          {isPending ? "Cargando…" : "Cargar más"}
        </button>
      )}
    </>
  );
}
