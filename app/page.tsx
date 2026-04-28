import { ChatWidget } from "@/components/ai/chat-widget";
import { JDMatcher } from "@/components/ai/jd-matcher";
import {
  About,
  Footer,
  Guestbook,
  Hero,
  SelectedWork,
  Stack,
  TopNav,
} from "@/components/sections";
import { Reveal } from "@/components/ui";

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
