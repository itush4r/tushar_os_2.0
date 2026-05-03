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
            I&apos;m a full-stack engineer at Travelxp, where I work across
            the B2C booking platform, the OTT subscription product, and the
            internal CMS tooling that powers both. The work I&apos;m most
            proud of is the AI Flight Quote CMS — turning a 7-field manual
            entry form into a single prompt cut quote-drafting from roughly
            4 hours to 10 minutes for the ops team.
          </p>
          <p>
            My path here wasn&apos;t the standard one: I came into engineering
            after an MBA, which means I tend to think about the business
            problem first and the implementation second. That habit ends up
            mattering more than I expected — most of the production systems
            I&apos;ve shipped started as &quot;why is this slow?&quot;
            conversations with the people doing the work.
          </p>
          <p>
            Outside Travelxp I run BH4i, a self-hosted AI assistant on
            Telegram that started because I wanted my own inbox triaged
            without paying a SaaS for it. It&apos;s open source, lives on
            Vercel, and doubles as the place I try things before they show
            up in production code.
          </p>
        </div>
      </Container>
    </Section>
  );
}
