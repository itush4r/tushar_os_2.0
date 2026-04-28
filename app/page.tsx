import dynamic from "next/dynamic";

import { ChatWidget } from "@/components/ai/chat-widget";
import { About, Footer, Hero, SelectedWork, Stack, TopNav } from "@/components/sections";
import { Reveal } from "@/components/ui";

// Below-the-fold client features — lazy-load to keep initial bundle small.
const JDMatcher = dynamic(
  () => import("@/components/ai/jd-matcher").then((m) => m.JDMatcher),
  { loading: () => <div className="h-[420px]" /> },
);
const Guestbook = dynamic(
  () => import("@/components/sections/guestbook").then((m) => m.Guestbook),
  { loading: () => <div className="h-[280px]" /> },
);

export default function HomePage() {
  return (
    <>
      <TopNav />
      <main>
        <Hero />
        <Reveal>
          <SelectedWork />
        </Reveal>
        <Reveal>
          <JDMatcher />
        </Reveal>
        <Reveal>
          <Stack />
        </Reveal>
        <Reveal>
          <About />
        </Reveal>
        <Reveal>
          <Guestbook />
        </Reveal>
      </main>
      <Footer />
      <ChatWidget />
    </>
  );
}
