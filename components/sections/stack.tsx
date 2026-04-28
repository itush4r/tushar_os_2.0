import {
  Container,
  Section,
  SectionLabel,
  TechPill,
} from "@/components/ui";

const groups = [
  {
    label: "Frontend",
    items: ["TypeScript", "React", "Next.js", "Tailwind", "Framer Motion"],
  },
  {
    label: "Backend",
    items: ["Node.js", "Express", "MongoDB", "PostgreSQL", "REST · tRPC"],
  },
  {
    label: "AI / LLM",
    items: ["Gemini", "Zod schemas", "Streaming outputs", "Structured outputs", "RAG"],
  },
  {
    label: "DevOps",
    items: ["Vercel", "GitHub Actions", "Docker", "Linux", "Cloudflare"],
  },
];

export function Stack() {
  return (
    <Section>
      <Container>
        <SectionLabel>Stack</SectionLabel>
        <h2 className="mt-3 text-2xl font-semibold text-foreground sm:text-3xl">
          Tools I reach for.
        </h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {groups.map((g) => (
            <div key={g.label}>
              <p className="text-xs uppercase tracking-wider text-muted">
                {g.label}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {g.items.map((item) => (
                  <TechPill key={item}>{item}</TechPill>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
