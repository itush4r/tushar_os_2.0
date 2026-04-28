import { ArrowRight, Download } from "lucide-react";
import { Container, SectionLabel } from "@/components/ui";

export function Hero() {
  return (
    <section className="pt-16 sm:pt-24">
      <Container>
        <SectionLabel>Full Stack Engineer · AI Integrations</SectionLabel>
        <h1 className="mt-6 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
          Building production AI interfaces that ship.
        </h1>
        <p className="mt-5 max-w-[60ch] text-base leading-relaxed text-muted">
          I design and build real-world products that pair clean front-end craft
          with practical AI integrations — from CMS tooling and recruiter
          assistants to chat interfaces that actually answer the question.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <a
            href="#work"
            className="inline-flex items-center gap-2 rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background transition-opacity hover:opacity-90"
          >
            View work
            <ArrowRight className="h-4 w-4" />
          </a>
          <a
            href="/resume.pdf"
            download
            className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-muted/50"
          >
            <Download className="h-4 w-4" />
            Resume
          </a>
        </div>
      </Container>
    </section>
  );
}
