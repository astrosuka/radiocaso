"use client";

import { PauseIcon, PlayIcon } from "@phosphor-icons/react";
import { usePlayer } from "./PlayerProvider";

export default function PlayerControls({
  livelabel,
}: {
  livelabel: React.ReactNode;
}) {
  const { current, isPlaying, playLive, toggle, handleVolumeChange } =
    usePlayer();

  return (
    <div className="flex w-full items-center justify-start gap-2 border-t px-6">
      <button
        className="flex size-8 cursor-pointer items-center justify-center"
        onClick={toggle}
        aria-label={isPlaying ? "Pausar" : "Reproducir"}
      >
        {isPlaying ? <PauseIcon /> : <PlayIcon />}
      </button>

      <div className="min-w-0 flex-1 truncate">
        {current.type === "live" ? (
          livelabel
        ) : (
          <span>
            {current.title}
            {current.subtitle && <span> — {current.subtitle}</span>}
          </span>
        )}
      </div>

      {current.type === "archive" ? (
        <button
          onClick={playLive}
          className="cursor-pointer border px-2 text-sm"
        >
          escuchar vivo
        </button>
      ) : (
        <div className="mr-2 flex items-center gap-2 text-sm">
          <span>en vivo</span>
          <div className="size-2 animate-pulse rounded-full bg-red-500" />
        </div>
      )}
      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        defaultValue="1"
        className="ml-auto h-0.5 w-35 cursor-pointer appearance-auto rounded bg-white accent-white"
        onChange={handleVolumeChange}
      />
    </div>
  );
}
