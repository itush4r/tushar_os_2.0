import { ChatWidget } from "@/components/ai/chat-widget";
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
        <Stack />
        <About />
      </main>
      <Footer />
      <ChatWidget />
    </>
  );
}
