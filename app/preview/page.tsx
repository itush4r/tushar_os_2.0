import {
  Card,
  Container,
  FeaturedCard,
  MetricStat,
  Section,
  SectionLabel,
  TechPill,
} from "@/components/ui";

export default function PreviewPage() {
  return (
    <Container className="py-12">
      <h1 className="text-2xl font-semibold text-foreground">UI Primitives</h1>
      <p className="mt-2 text-sm text-muted">
        Visual QA for layout and content primitives.
      </p>

      <Section className="!py-12">
        <SectionLabel>Section Label</SectionLabel>
        <h2 className="mt-3 text-xl text-foreground">Section heading</h2>
        <p className="mt-2 text-sm text-muted">
          Section + SectionLabel + Container set the rhythm for every block.
        </p>
      </Section>

      <Section className="!py-12">
        <SectionLabel>Tech Pills</SectionLabel>
        <div className="mt-4 flex flex-wrap gap-2">
          <TechPill>Next.js</TechPill>
          <TechPill>TypeScript</TechPill>
          <TechPill>Tailwind</TechPill>
          <TechPill>MongoDB</TechPill>
          <TechPill>Gemini</TechPill>
        </div>
      </Section>

      <Section className="!py-12">
        <SectionLabel>Cards</SectionLabel>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <Card>
            <p className="text-sm font-medium text-foreground">Standard card</p>
            <p className="mt-1 text-xs text-muted">
              Border + surface bg, hover lifts the border.
            </p>
          </Card>
          <FeaturedCard>
            <p className="text-sm font-medium text-foreground">Featured card</p>
            <p className="mt-1 text-xs text-muted">
              Accent gradient for hero project.
            </p>
          </FeaturedCard>
        </div>
      </Section>

      <Section className="!py-12">
        <SectionLabel>Metrics</SectionLabel>
        <div className="mt-4 grid gap-6 sm:grid-cols-3">
          <MetricStat value="95%" label="Lighthouse" />
          <MetricStat value="2.0s" label="LCP" />
          <MetricStat value="200KB" label="JS bundle" />
        </div>
      </Section>
    </Container>
  );
}
