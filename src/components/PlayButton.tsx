"use client";

import { PauseIcon, PlayIcon } from "@phosphor-icons/react";
import { usePlayer } from "./PlayerProvider";

export default function PlayButton({
  url,
  title,
  subtitle,
}: {
  url: string;
  title: string;
  subtitle?: string;
}) {
  const { current, isPlaying, playArchive, toggle } = usePlayer();
  const isActive = current.type === "archive" && current.url === url;

  function handleClick() {
    if (isActive) {
      toggle();
    } else {
      playArchive({ url, title, subtitle });
    }
  }

  return (
    <button
      onClick={handleClick}
      aria-label={isActive && isPlaying ? "Pausar" : "Reproducir"}
      className="shrink-0"
    >
      {isActive && isPlaying ? <PauseIcon /> : <PlayIcon />}
    </button>
  );
}
