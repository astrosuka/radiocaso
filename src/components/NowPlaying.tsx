"use client";

import { useState, useEffect } from "react";
import type { NowPlaying as NowPlayingType } from "@/radiojar/types";

const REFRESH_INTERVAL_MS = 15_000;

export default function NowPlaying({
  initialNowPlaying,
}: {
  initialNowPlaying: NowPlayingType;
}) {
  const [nowPlaying, setNowPlaying] = useState(initialNowPlaying);

  useEffect(() => {
    const interval = setInterval(async () => {
      const response = await fetch("api/now-playing", { cache: "no-store" });
      if (response.ok) {
        setNowPlaying(await response.json());
      }
    }, REFRESH_INTERVAL_MS);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      {nowPlaying.artist && <span>{nowPlaying.artist} - </span>}
      {nowPlaying.title && <span>{nowPlaying.title}</span>}
    </div>
  );
}
