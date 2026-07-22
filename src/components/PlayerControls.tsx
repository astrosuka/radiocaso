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
    <div className="bg-foreground text-background dark:bg-foreground/10 dark:text-foreground flex w-full items-center justify-start gap-2 px-6">
      <button
        className="bg-foreground text-background flex size-8 cursor-pointer items-center justify-center"
        onClick={toggle}
        aria-label={isPlaying ? "Pausar" : "Reproducir"}
      >
        {isPlaying ? <PauseIcon /> : <PlayIcon />}
      </button>

      {current.type === "archive" && (
        <button onClick={playLive}>En vivo</button>
      )}

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
