"use client";

import { useRef, useState, useTransition } from "react";
import TransmissionsListItem, {
  type Transmission,
} from "./TransmissionsListItem";
import { fetchTransmisionDetail } from "@/app/actions/transmisiones";
import type { TransmisionDetail } from "@/sanity/queries/transmisiones";

export default function TransmissionsList({
  items,
}: {
  items: Transmission[];
}) {
  const [openId, setOpenId] = useState<string | null>(null);
  const [details, setDetails] = useState<Record<string, TransmisionDetail>>({});
  const fetchingIds = useRef(new Set<string>());
  const [, startTransition] = useTransition();

  function handleToggle(id: string) {
    setOpenId((prev) => (prev === id ? null : id));
    if (!details[id] && !fetchingIds.current.has(id)) {
      fetchingIds.current.add(id);
      startTransition(async () => {
        const detail = await fetchTransmisionDetail(id);
        setDetails((prev) => ({ ...prev, [id]: detail }));
        fetchingIds.current.delete(id);
      });
    }
  }

  return (
    <ul>
      {items.map((t) => (
        <li key={t._id}>
          <TransmissionsListItem
            transmission={t}
            isOpen={openId === t._id}
            isLoadingDetail={openId === t._id && !details[t._id]}
            detail={details[t._id] ?? null}
            onToggleExpand={() => handleToggle(t._id)}
          />
        </li>
      ))}
    </ul>
  );
}
