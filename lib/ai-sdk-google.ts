import { createGoogleGenerativeAI } from "@ai-sdk/google";

// Wires the AI SDK's Google provider to our GEMINI_API_KEY env var.
// The default `google` import reads GOOGLE_GENERATIVE_AI_API_KEY, which
// would mean two env names for the same key.
export const google = createGoogleGenerativeAI({
  apiKey: process.env.GEMINI_API_KEY,
});
