# tushar_os_2.0

Personal portfolio + AI playground.

**Live:** https://tushar-os-2-0.vercel.app

## Stack

- Next.js 14 (App Router) + TypeScript
- Tailwind CSS (dark by default)
- Framer Motion · lucide-react · zod
- MongoDB Atlas (chat sessions, analytics, demos)
- Google Gemini (chat, structured output, moderation)

## Getting started

```bash
npm install
cp .env.example .env.local   # fill in keys
npm run dev
```

Open http://localhost:3000.

## Scripts

- `npm run dev` — dev server
- `npm run build` — production build
- `npm run lint` — ESLint
- `npm run format` — Prettier write

## Project structure

```
app/         # Next.js App Router routes
  api/       # API endpoints
components/  # UI primitives, sections, AI features
lib/         # Shared helpers (mongo, gemini, rate-limit, schemas, prompts)
types/       # Shared types
```
