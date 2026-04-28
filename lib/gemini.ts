import {
  GoogleGenerativeAI,
  HarmBlockThreshold,
  HarmCategory,
  type GenerativeModel,
  type ModelParams,
} from "@google/generative-ai";

export type ModelName = "flash" | "pro";

// Model selection notes:
// - 1.5 family is retired; current stable line is 2.0/2.5.
// - We pin to specific 2.5 IDs (not "latest" aliases) for predictability.
// - Override per-environment with GEMINI_MODEL_FLASH / GEMINI_MODEL_PRO.
const MODEL_IDS: Record<ModelName, string> = {
  flash: process.env.GEMINI_MODEL_FLASH ?? "gemini-2.5-flash-lite",
  pro: process.env.GEMINI_MODEL_PRO ?? "gemini-2.5-flash",
};

const DEFAULT_SAFETY = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
];

let cachedClient: GoogleGenerativeAI | null = null;

function client(): GoogleGenerativeAI {
  if (cachedClient) return cachedClient;
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not set");
  }
  cachedClient = new GoogleGenerativeAI(apiKey);
  return cachedClient;
}

export type GetModelOpts = {
  systemInstruction?: string;
  temperature?: number;
  responseMimeType?: "text/plain" | "application/json";
  responseSchema?: ModelParams["generationConfig"] extends infer T
    ? T extends { responseSchema?: infer S }
      ? S
      : never
    : never;
};

export function getModel(name: ModelName, opts: GetModelOpts = {}): GenerativeModel {
  return client().getGenerativeModel({
    model: MODEL_IDS[name],
    systemInstruction: opts.systemInstruction,
    safetySettings: DEFAULT_SAFETY,
    generationConfig: {
      temperature: opts.temperature ?? 0.6,
      ...(opts.responseMimeType ? { responseMimeType: opts.responseMimeType } : {}),
      ...(opts.responseSchema ? { responseSchema: opts.responseSchema } : {}),
    },
  });
}
