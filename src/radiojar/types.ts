import { z } from "zod";

export const ScheduleResponseSchema = z.object({
  title: z
    .string()
    .nullable()
    .transform((t) => t ?? ""),
  start_date: z.string(),
  end_date: z.string(),
  key: z.string(),
});

export type ScheduleResponse = z.infer<typeof ScheduleResponseSchema>;

export const NowPlayingSchema = z.object({
  title: z
    .string()
    .nullable()
    .transform((t) => t ?? ""),
  artist: z
    .string()
    .nullable()
    .transform((a) => a ?? ""),
  duration: z.string(),
});

export type NowPlaying = z.infer<typeof NowPlayingSchema>;
