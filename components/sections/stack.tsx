import { Container, Section, SectionLabel, TechPill } from "@/components/ui";
import { cn } from "@/lib/utils";

type Group = {
  label: string;
  items: string[];
  highlight?: boolean;
};

const groups: Group[] = [
  {
    label: "Frontend",
    items: ["TypeScript", "React", "Next.js", "Tailwind CSS", "JavaScript", "HTML/CSS"],
  },
  {
    label: "Backend",
    items: ["Node.js", "REST APIs", "MongoDB", "Zod"],
  },
  {
    label: "AI / LLM",
    items: ["Vercel AI SDK", "Google Gemini", "useObject", "Schema-validated outputs", "Streaming"],
    highlight: true,
  },
  {
    label: "Tooling & Deploy",
    items: ["Git", "Vercel", "CI/CD", "Env config"],
  },
];

const exploring = ["RudderStack analytics", "Next.js SSR optimization"];

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
              <p
                className={cn(
                  "text-xs uppercase tracking-wider",
                  g.highlight ? "text-accent" : "text-muted",
                )}
              >
                {g.label}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {g.items.map((item) => (
                  <TechPill
                    key={item}
                    className={g.highlight ? "border-accent/40 text-foreground" : undefined}
                  >
                    {item}
                  </TechPill>
                ))}
              </div>
            </div>
          ))}
        </div>
        <p className="mt-8 border-t border-border pt-4 text-xs text-muted">
          <span className="uppercase tracking-wider">Currently exploring</span> —{" "}
          {exploring.join(", ")}
        </p>
      </Container>
    </Section>
  );
}
