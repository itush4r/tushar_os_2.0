import { ChatWidget } from "@/components/ai/chat-widget";
import { JDMatcher } from "@/components/ai/jd-matcher";
import {
  About,
  Footer,
  Hero,
  SelectedWork,
  Stack,
  TopNav,
} from "@/components/sections";

export default function HomePage() {
  return (
    <>
      <TopNav />
      <main>
        <Hero />
        <SelectedWork />
        <JDMatcher />
        <Stack />
        <About />
      </main>
      <Footer />
      <ChatWidget />
    </>
  );
}
