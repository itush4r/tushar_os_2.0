import { google } from '@ai-sdk/google';
import { generateObject } from 'ai';
import { z } from 'zod';

export const runtime = 'edge';

const BriefSchema = z.object({
  enhancedMessage: z.string().describe("A professional and clear version of the original inquiry"),
  intent: z.string().describe("The core goal of the user's message"),
  suggestedAction: z.string().describe("What the recipient should do next"),
});

export async function POST(req: Request) {
  const { prompt } = await req.json();

  try {
    const result = await generateObject({
      model: google('gemini-1.5-flash'),
      schema: BriefSchema,
      prompt: `Act as a professional communication strategist. I have a rough drafted message for Tushar (a Full Stack Engineer). Please analyze it and provide a structured JSON object with an enhanced version of the message, the identified intent, and a suggested next step.

Draft: "${prompt}"`,
    });

    return new Response(JSON.stringify(result.object), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('AI Strategy Error:', error);
    return new Response(JSON.stringify({ error: 'Failed to generate AI brief' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
