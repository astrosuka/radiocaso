"use client";

import { createContext, useContext, useRef, useState } from "react";
import { toDirectArchiveUrl } from "@/utils/toDirectArchiveUrl";

type Track =
  | { type: "live" }
  | { type: "archive"; url: string; title: string; subtitle?: string };

type PlayerContextValue = {
  current: Track;
  isPlaying: boolean;
  audioRef: React.RefObject<HTMLAudioElement | null>;
  playLive: () => void;
  playArchive: (
    track: Omit<Extract<Track, { type: "archive" }>, "type">
  ) => void;
  toggle: () => void;
};

const PlayerContext = createContext<PlayerContextValue | null>(null);

function isSupersededPlay(err: unknown) {
  return err instanceof DOMException && err.name === "AbortError";
}

function loadAndPlay(audio: HTMLAudioElement | null, src: string) {
  if (!audio) return;
  audio.src = src;
  audio.load();
  audio.play().catch((err) => {
    if (isSupersededPlay(err)) return;
    console.error("play failed:", err.name, err.message);
  });
}

export function PlayerProvider({ children }: { children: React.ReactNode }) {
  const [current, setCurrent] = useState<Track>({ type: "live" });
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  function playLive() {
    setCurrent({ type: "live" });
    loadAndPlay(audioRef.current, process.env.NEXT_PUBLIC_RADIOJAR_STREAM_URL!);
  }

  function playArchive(
    track: Omit<Extract<Track, { type: "archive" }>, "type">
  ) {
    setCurrent({ type: "archive", ...track });
    loadAndPlay(audioRef.current, toDirectArchiveUrl(track.url));
  }

  function toggle() {
    const audio = audioRef.current;
    if (!audio) return;

    if (!audio.paused) {
      audio.pause();
      return;
    }

    const src =
      current.type === "live"
        ? process.env.NEXT_PUBLIC_RADIOJAR_STREAM_URL!
        : toDirectArchiveUrl(current.url);

    if (audio.src !== src) {
      audio.src = src;
      audio.load();
    }
    audio.play().catch((err) => {
      if (isSupersededPlay(err)) return;
      console.error("play failed:", err.name, err.message);
    });
  }

  return (
    <PlayerContext.Provider
      value={{ current, isPlaying, audioRef, playLive, playArchive, toggle }}
    >
      <audio
        ref={audioRef}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => setIsPlaying(false)}
        className="hidden"
      />
      {children}
    </PlayerContext.Provider>
  );
}

export function usePlayer() {
  const ctx = useContext(PlayerContext);
  if (!ctx) throw new Error("usePlayer must be used within a PlayerProvider");
  return ctx;
}
