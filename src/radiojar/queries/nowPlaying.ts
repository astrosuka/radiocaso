import { radiojarFetch } from "../client";
import { NowPlayingSchema, type NowPlaying } from "../types";

export async function getNowPlaying(): Promise<NowPlaying> {
  return radiojarFetch(
    process.env.RADIOJAR_API_URL! + "now_playing/",
    NowPlayingSchema
  );
}
