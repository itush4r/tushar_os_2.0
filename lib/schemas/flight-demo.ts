import { z } from "zod";

export const flightQuoteSchema = z.object({
  origin: z.string().describe("IATA airport code, e.g. BOM"),
  destination: z.string().describe("IATA airport code"),
  departureDate: z.string().describe("ISO date YYYY-MM-DD"),
  returnDate: z.string().nullable(),
  paxAdults: z.number().int().min(1).max(9),
  paxChildren: z.number().int().min(0).max(9),
  cabinClass: z.enum(["economy", "premium_economy", "business", "first"]),
});

export const flightDemoSchema = z.object({
  prompt: z.string(),
  generatedQuote: flightQuoteSchema,
  createdAt: z.date(),
  isPublic: z.boolean(),
});

export type FlightQuote = z.infer<typeof flightQuoteSchema>;
export type FlightDemo = z.infer<typeof flightDemoSchema>;
