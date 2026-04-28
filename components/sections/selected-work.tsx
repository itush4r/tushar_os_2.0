import { ArrowUpRight, Github } from "lucide-react";
import {
  Card,
  Container,
  FeaturedCard,
  MetricStat,
  Reveal,
  Section,
  SectionLabel,
  TechPill,
} from "@/components/ui";
import { PromptToFormDemo } from "@/components/ai/prompt-to-form";

export function SelectedWork() {
  return (
    <Section id="work">
      <Container>
        <SectionLabel>Selected Work</SectionLabel>
        <h2 className="mt-3 text-2xl font-semibold text-foreground sm:text-3xl">
          Three projects worth showing.
        </h2>

        <div className="mt-8 space-y-5">
          <FeaturedCard>
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-wider text-accent">
                  Featured · Travelxp
                </p>
                <h3 className="mt-2 text-lg font-medium text-foreground">
                  AI Flight Quote CMS
                </h3>
                <p className="mt-2 max-w-[55ch] text-sm leading-relaxed text-muted">
                  Internal CMS that turns plain-English prompts into
                  structured flight-quote drafts. Replaced a 7-field form with
                  a single textarea and shipped a measurable speed-up to the
                  ops team.
                </p>
              </div>
              <span className="hidden rounded-full border border-border px-2 py-1 text-[11px] uppercase tracking-wider text-muted sm:inline-block">
                Production
              </span>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              <TechPill>Next.js</TechPill>
              <TechPill>Gemini</TechPill>
              <TechPill>Zod</TechPill>
              <TechPill>MongoDB</TechPill>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-4 border-t border-border pt-5">
              <MetricStat value="95%" label="Faster Drafts" countTo={95} countSuffix="%" />
              <MetricStat value="7→1" label="Form Fields" />
              <MetricStat value="Live" label="Demo below" />
            </div>

            <div className="mt-6">
              <PromptToFormDemo />
            </div>
          </FeaturedCard>

          <Card>
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-wider text-muted">
                  Travelxp
                </p>
                <h3 className="mt-2 text-base font-medium text-foreground">
                  Travelxp B2C Booking Platform
                </h3>
                <p className="mt-2 max-w-[55ch] text-sm leading-relaxed text-muted">
                  End-user booking flows for flights and packages. Owned the
                  React side of the funnel from search to checkout, focused on
                  performance and recoverable failures.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <TechPill>React</TechPill>
                  <TechPill>Next.js</TechPill>
                  <TechPill>Node</TechPill>
                </div>
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-wider text-muted">
                  Side Project
                </p>
                <h3 className="mt-2 text-base font-medium text-foreground">
                  BH4i — AI Telegram Assistant
                </h3>
                <p className="mt-2 max-w-[55ch] text-sm leading-relaxed text-muted">
                  Telegram bot that summarizes group chats and answers
                  context-aware questions over an embedded archive. Self-hosted,
                  rate-limited, fully open source.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <TechPill>Python</TechPill>
                  <TechPill>OpenAI</TechPill>
                  <TechPill>Telegram</TechPill>
                </div>
              </div>
              <a
                href="https://github.com/itush4r"
                target="_blank"
                rel="noreferrer noopener"
                aria-label="View on GitHub"
                className="rounded-full border border-border p-2 text-muted transition-colors hover:border-muted/50 hover:text-foreground"
              >
                <Github className="h-4 w-4" />
              </a>
            </div>
          </Card>
        </div>

        <a
          href="https://github.com/itush4r"
          target="_blank"
          rel="noreferrer noopener"
          className="mt-6 inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-foreground"
        >
          More on GitHub
          <ArrowUpRight className="h-3.5 w-3.5" />
        </a>
      </Container>
    </Section>
  );
}
