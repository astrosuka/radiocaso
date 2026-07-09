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
    <div className="bg-foreground text-background flex w-full items-center justify-center gap-2">
      <Suspense fallback={<NowPlayingSkeleton />}>
        <NowPlayingLoader />
      </Suspense>
    </div>
  );
}
