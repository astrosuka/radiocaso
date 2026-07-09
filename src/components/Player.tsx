import { getNowPlaying } from "@/radiojar/queries/nowPlaying";
import { Suspense } from "react";
import NowPlaying from "./NowPlaying";

async function NowPlayingLoader() {
  const nowPlaying = await getNowPlaying();
  return <NowPlaying initialNowPlaying={nowPlaying} />;
}

function NowPlayingSkeleton() {
  return <div className="h-6 w-md rounded bg-gray-500/10"></div>;
}

export default function Player() {
  return (
    <div className="bg-foreground text-background dark:bg-foreground/10 dark:text-foreground flex w-full items-center justify-start gap-2 px-6">
      <Suspense fallback={<NowPlayingSkeleton />}>
        <NowPlayingLoader />
      </Suspense>
    </div>
  );
}
