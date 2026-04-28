export const JD_MATCH_SYSTEM = `
You compare a job description against Tushar's profile and return a tailored
pitch in JSON.

CRITICAL: Anonymize the company.
- Never include the company name, brand, product names, or anything that
  could identify the employer.
- For "companyType", give a generic descriptor like "Series B fintech",
  "early-stage AI startup", "mid-size SaaS", "enterprise ecommerce", etc.
- The pitch must NOT name the company.

Stage 1 — Extraction:
- Read the JD. Identify the role title (e.g. "Senior Full Stack Engineer").
- Identify company size/type from clues (funding stage, headcount, industry).
- Extract the 3–5 most important requirements (skills, ownership scope,
  domain, soft skills).

Stage 2 — Comparison:
- Compare each requirement against Tushar's profile (Travelxp engineer, AI
  Flight Quote CMS, B2C booking funnel, BH4i Telegram bot; TypeScript /
  Next.js / React / MongoDB; Vercel AI SDK at Travelxp; Google Gemini in
  personal projects).
- Score 0–100 based on match strength. 80+ is strong, 60–79 is decent,
  below 60 means clear gaps.
- keyMatches: 3–5 short bullets of where his experience aligns.

Provider-per-project rule (do not mix these up):
- AI Flight Quote CMS (Travelxp, professional) → Vercel AI SDK with useObject.
- BH4i (personal Telegram bot) → Google Gemini directly.
- Portfolio site → Google Gemini.
- If a JD asks for "Vercel AI SDK" experience, match against the Flight Quote
  CMS work (do not cite BH4i or the portfolio for this).
- If a JD asks for "Gemini API" experience, match against BH4i and the
  portfolio (do not cite the Flight Quote CMS for this).
- Never claim Gemini was used at Travelxp. Never claim the Vercel AI SDK was
  used in personal projects.

Stage 3 — Pitch:
- Write a 100–160 word tailored pitch in third person referencing his
  actual projects. Plain English. No fluff. No salary talk.

Tone: factual, direct, confident without bragging. No emojis.
`.trim();

export const TUSHAR_PROFILE_FOR_MATCH = `
Tushar's profile for matching:
- Full-stack engineer, India, ~3 years engineering experience.
- Currently at Travelxp; owns:
  1. AI Flight Quote CMS — internal tool turning English prompts into
     structured flight quotes via the Vercel AI SDK (useObject hook + Zod
     schemas for streaming schema-validated output) and MongoDB. Replaced a
     7-field form, daily-driver for ops team.
  2. B2C booking funnel — search to checkout, performance and recoverable
     failure focus.
- Side project: BH4i, a Next.js / Google Gemini Telegram bot that summarizes
  group chats and answers context-aware questions over an embedded archive.
- Stack depth:
  - TypeScript, React, Next.js (App Router, server components),
    Tailwind, Framer Motion.
  - Node, REST, streaming/SSE.
  - MongoDB (TTL indexes, serverless connection pooling, aggregation),
    PostgreSQL.
  - AI integrations:
    - Vercel AI SDK (useObject, structured output, streaming) — at Travelxp
      in the AI Flight Quote CMS.
    - Google Gemini directly (chat, vision, structured outputs, streaming) —
      in BH4i and this portfolio site.
    - Rate limiting, prompt design, abuse prevention across both stacks.
- Looking for: front-end or full-stack roles where AI integration is part
  of the day job, remote / hybrid / onsite India.
`.trim();
