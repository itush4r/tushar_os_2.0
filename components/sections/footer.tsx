import { Github, Linkedin, Mail, MapPin } from "lucide-react";
import { Container } from "@/components/ui";

export function Footer() {
  return (
    <footer id="contact" className="border-t border-border py-12">
      <Container>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-medium text-foreground">
              Let&apos;s build something.
            </p>
            <p className="mt-1 inline-flex items-center gap-1.5 text-xs text-muted">
              <MapPin className="h-3 w-3" />
              India
            </p>
          </div>
          <ul className="flex flex-wrap items-center gap-2">
            <li>
              <a
                href="mailto:tushar865@outlook.com"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1.5 text-xs text-muted transition-colors hover:border-muted/50 hover:text-foreground"
              >
                <Mail className="h-3.5 w-3.5" />
                Email
              </a>
            </li>
            <li>
              <a
                href="https://github.com/itush4r"
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1.5 text-xs text-muted transition-colors hover:border-muted/50 hover:text-foreground"
              >
                <Github className="h-3.5 w-3.5" />
                GitHub
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/"
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1.5 text-xs text-muted transition-colors hover:border-muted/50 hover:text-foreground"
              >
                <Linkedin className="h-3.5 w-3.5" />
                LinkedIn
              </a>
            </li>
          </ul>
        </div>
        <p className="mt-8 text-xs text-subtle">
          © {new Date().getFullYear()} Tushar. Built with Next.js + Tailwind ·{" "}
          <a
            href="https://github.com/itush4r/tushar_os_2.0"
            target="_blank"
            rel="noreferrer noopener"
            className="underline-offset-2 hover:text-muted hover:underline"
          >
            view source
          </a>
        </p>
      </Container>
    </footer>
  );
}
