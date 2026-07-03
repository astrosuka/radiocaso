import { z } from "zod";
import { radiojarFetch } from "../client";
import { ScheduleResponseSchema, type ScheduleResponse } from "../types";
import { cacheLife } from "next/cache";

export async function getSchedule(): Promise<ScheduleResponse[]> {
  "use cache";
  cacheLife("hours");
  return radiojarFetch(
    process.env.RADIOJAR_API_URL! + "schedules/",
    z.array(ScheduleResponseSchema)
  );
}
