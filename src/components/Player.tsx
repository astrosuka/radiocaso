import { getNowPlaying } from "@/radiojar/queries/nowPlaying";
import { Suspense } from "react";
import NowPlaying from "./NowPlaying";
import PlayerControls from "./PlayerControls";

async function NowPlayingLoader() {
  const nowPlaying = await getNowPlaying();
  return <NowPlaying initialNowPlaying={nowPlaying} />;
}

function NowPlayingSkeleton() {
  return <div className="bg-gray h-6 w-md rounded"></div>;
}

export default function Player() {
  return (
    <PlayerControls
      livelabel={
        <Suspense fallback={<NowPlayingSkeleton />}>
          <NowPlayingLoader />
        </Suspense>
      }
    />
  );
}
