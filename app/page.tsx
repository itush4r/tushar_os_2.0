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
    </>
  );
}
