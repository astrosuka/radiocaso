import { z } from "zod";
import { radiojarFetch } from "../client";
import { ScheduleResponseSchema, type ScheduleResponse } from "../types";

export async function getSchedule(): Promise<ScheduleResponse[]> {
  return radiojarFetch(
    process.env.RADIOJAR_API_URL! + "schedules/",
    z.array(ScheduleResponseSchema)
  );
}
