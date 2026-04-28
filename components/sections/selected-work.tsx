import { ArrowUpRight, Cpu, Github, Lock, Mail } from "lucide-react";
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
                <p className="text-xs uppercase tracking-wider text-accent">Featured · Travelxp</p>
                <h3 className="mt-2 text-lg font-medium text-foreground">AI Flight Quote CMS</h3>
                <p className="mt-2 max-w-[55ch] text-sm leading-relaxed text-muted">
                  Internal CMS that turns plain-English prompts into structured flight-quote drafts.
                  Replaced a 7-field form with a single textarea and shipped a measurable speed-up
                  to the ops team.
                </p>
              </div>
              <span className="hidden rounded-full border border-border px-2 py-1 text-[11px] uppercase tracking-wider text-muted sm:inline-block">
                Production
              </span>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              <TechPill>Next.js</TechPill>
              <TechPill>Vercel AI SDK</TechPill>
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
                <p className="text-xs uppercase tracking-wider text-muted">Travelxp</p>
                <h3 className="mt-2 text-base font-medium text-foreground">
                  Travelxp B2C Booking Platform
                </h3>
                <p className="mt-2 max-w-[55ch] text-sm leading-relaxed text-muted">
                  End-user booking flows for flights and packages. Owned the React side of the
                  funnel from search to checkout, focused on performance and recoverable failures.
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
                <p className="text-xs uppercase tracking-wider text-muted">Side Project</p>
                <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1">
                  <h3 className="text-base font-medium text-foreground">
                    BH4i — AI Personal Assistant on Telegram
                  </h3>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-success/30 bg-success/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-success">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75" />
                      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-success" />
                    </span>
                    Live
                  </span>
                </div>
                <p className="mt-2 max-w-[55ch] text-sm italic leading-relaxed text-foreground/80">
                  A multi-modal Telegram bot that runs your inbox, generates daily briefings, and
                  turns uploaded documents into AI-editable context.
                </p>
                <p className="mt-3 max-w-[55ch] text-sm leading-relaxed text-muted">
                  Personal AI assistant delivered through Telegram. Connects to Gmail/Outlook/IMAP
                  for AI-categorized email, generates personalized daily news briefings on a Vercel
                  cron, and reads/rewrites uploaded PDFs and Word docs as context for AI chat.
                  Includes per-user token quotas, AES-256-GCM credential encryption, and a web admin
                  dashboard. Self-hosted, fully open source.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <TechPill>Next.js</TechPill>
                  <TechPill>Gemini</TechPill>
                  <TechPill>MongoDB</TechPill>
                  <TechPill>OAuth</TechPill>
                  <TechPill>IMAP</TechPill>
                  <TechPill>Vercel Cron</TechPill>
                </div>
                <ul className="mt-4 space-y-2 text-xs text-muted">
                  <li className="flex items-start gap-2">
                    <Mail className="mt-0.5 h-3.5 w-3.5 shrink-0 text-foreground/70" />
                    <span>
                      <span className="text-foreground/90">Email AI</span> — categorizes inbox by
                      focus areas across Gmail, Outlook, and IMAP.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Lock className="mt-0.5 h-3.5 w-3.5 shrink-0 text-foreground/70" />
                    <span>
                      <span className="text-foreground/90">Secure by default</span> — AES-256-GCM
                      encrypts OAuth tokens and IMAP passwords at rest.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Cpu className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-400/80" />
                    <span className="italic">
                      <span className="not-italic text-foreground/90">Phone agent</span>
                      <span className="ml-2 inline-flex items-center rounded-full border border-amber-400/30 bg-amber-400/10 px-1.5 py-0.5 text-[10px] not-italic uppercase tracking-wider text-amber-300">
                        Experimental
                      </span>{" "}
                      — natural-language Android control via Gemini Vision over an ADB bridge. In
                      active development.
                    </span>
                  </li>
                </ul>
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
