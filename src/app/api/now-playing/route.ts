import { getNowPlaying } from "@/radiojar/queries/nowPlaying";
import { NextResponse } from "next/server";

export async function GET() {
  const nowPlaying = await getNowPlaying();
  return NextResponse.json(nowPlaying);
}
