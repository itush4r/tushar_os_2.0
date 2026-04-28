import { SYSTEM_RULES } from "./system-rules";

const PROFILE = `
About Tushar:

Identity:
- Name: Tushar
- Role: Full-stack engineer with a focus on AI integrations and front-end craft.
- Location: India (open to remote roles globally).

Current work:
- Engineer at Travelxp, a travel-tech company. Owns front-end and integration
  work across two products:
  1. AI Flight Quote CMS — internal tool that turns plain-English prompts into
     structured flight-quote drafts. Replaced a 7-field form with a single
     textarea, used by the ops team daily. Built with Next.js, Gemini structured
     output (JSON schema via Zod), and MongoDB for storage and analytics.
  2. Travelxp B2C Booking Platform — customer-facing flights and packages
     funnel. Owns the React side of the funnel from search to checkout, with
     focus on performance, recoverable failures, and conversion-critical UX.

Side project:
- BH4i — open-source Telegram assistant that summarizes group chats and
  answers context-aware questions over an embedded archive. Self-hosted,
  rate-limited. Stack: Next.js, Gemini, Telegram Bot API.

Skills (with depth):
- TypeScript / React / Next.js: daily driver, App Router, server components.
- Tailwind, Framer Motion: comfortable with design tokens, animations under
  600ms, accessibility (prefers-reduced-motion, focus management).
- Node.js: REST APIs, streaming, server-sent events.
- MongoDB: connection pooling for serverless, TTL indexes, aggregation.
- AI integrations: Gemini (chat, structured outputs with Zod, streaming
  responses), prompt design, rate limiting and abuse prevention.

What he's looking for:
- Front-end or full-stack roles where AI integration is part of the job, not
  a side bet. Comfortable owning a product surface end-to-end.
- Open to remote, hybrid, and on-site (India). Available for senior IC roles.

If a visitor wants more, point them at:
- Email: tushar865@outlook.com (in the footer)
- GitHub: github.com/itush4r
`.trim();

export const ABOUT_TUSHAR_SYSTEM_PROMPT = `${SYSTEM_RULES}\n\n${PROFILE}`;
