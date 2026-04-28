import { Container, Section, SectionLabel } from "@/components/ui";

export function About() {
  return (
    <Section id="about">
      <Container>
        <SectionLabel>About</SectionLabel>
        <h2 className="mt-3 text-2xl font-semibold text-foreground sm:text-3xl">
          A bit about me.
        </h2>
        <div className="mt-6 space-y-4 text-base leading-relaxed text-muted">
          <p>
            I&apos;m a full-stack engineer based in India, currently building
            internal tooling and customer-facing flows at Travelxp. Most of my
            work right now lives at the intersection of clean React UI and
            practical AI — structured outputs, streaming, and the unglamorous
            plumbing that makes them reliable.
          </p>
          <p>
            Outside work I tinker with side projects that scratch a real itch.
            I care about shipping, not perfecting; about reading code carefully
            before adding more of it; and about building things people actually
            use rather than things that look impressive in a screenshot.
          </p>
        </div>
      </Container>
    </Section>
  );
}
