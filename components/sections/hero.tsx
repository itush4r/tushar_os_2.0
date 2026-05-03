"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Download } from "lucide-react";

import { Container, SectionLabel } from "@/components/ui";

export function Hero() {
  const reduce = useReducedMotion();

  const stagger = {
    hidden: { opacity: 0, y: 12 },
    show: { opacity: 1, y: 0 },
  };
  const transition = reduce
    ? { duration: 0 }
    : { duration: 0.5, ease: [0.22, 1, 0.36, 1] };

  return (
    <section className="pt-16 sm:pt-24">
      <Container>
        <motion.div
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: reduce ? 0 : 0.08 } },
          }}
        >
          <motion.div variants={stagger} transition={transition}>
            <SectionLabel>Full Stack Engineer · AI Integrations</SectionLabel>
          </motion.div>
          <motion.h1
            variants={stagger}
            transition={transition}
            className="mt-6 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl"
          >
            Production AI in real product surfaces.
          </motion.h1>
          <motion.p
            variants={stagger}
            transition={transition}
            className="mt-5 max-w-[60ch] text-base leading-relaxed text-muted"
          >
            Full-stack engineer at Travelxp, shipping the booking funnels,
            OTT subscription flows, and internal CMS tooling that the business
            runs on — with practical AI woven into the surfaces that benefit
            from it.
          </motion.p>
          <motion.div
            variants={stagger}
            transition={transition}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <a
              href="#work"
              className="inline-flex h-11 items-center gap-2 rounded-full bg-foreground px-5 text-sm font-medium text-background transition-opacity hover:opacity-90"
            >
              View work
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="/resume.pdf"
              download
              className="inline-flex h-11 items-center gap-2 rounded-full border border-border bg-surface px-5 text-sm font-medium text-foreground transition-colors hover:border-muted/50"
            >
              <Download className="h-4 w-4" />
              Resume
            </a>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
