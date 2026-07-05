import { z } from "zod";

export const TRIP_TYPES = [
  { value: "oneway", label: "One Way" },
  { value: "roundtrip", label: "Round Trip" },
] as const;

export const quoteSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name"),
  mobile: z
    .string()
    .trim()
    .regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit mobile number"),
  pickup: z.string().trim().min(2, "Enter a pickup location"),
  destination: z.string().trim().min(2, "Enter a destination"),
  date: z.string().min(1, "Select a journey date"),
  time: z.string().min(1, "Select a journey time"),
  tripType: z.enum(["oneway", "roundtrip", "local", "airport"]),
  vehicle: z.string().optional().default("Swift Dzire"),
});

export type QuoteInput = z.input<typeof quoteSchema>;
