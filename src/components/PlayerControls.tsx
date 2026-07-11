"use client";

import { usePlayer } from "./PlayerProvider";

export default function PlayerControls({
  livelabel,
}: {
  livelabel: React.ReactNode;
}) {
  const { current, isPlaying, playLive, toggle } = usePlayer();

  return (
    <div className="bg-foreground text-background dark:bg-foreground/10 dark:text-foreground flex w-full items-center justify-start gap-2 px-6">
      <button
        className="bg-foreground text-background flex size-6 items-center justify-center"
        onClick={toggle}
        aria-label={isPlaying ? "Pausar" : "Reproducir"}
      >
        {isPlaying ? "❚❚" : "▶"}
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
    </div>
  );
}
