import type { Metadata, Viewport } from "next";
import { Inter, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const plusJakarta = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-plus-jakarta" });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://tushar.tech";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Tushar | Full Stack Architect & AI Systems",
  description: "Senior Full Stack Engineer building production-grade AI products at scale. Specialized in Next.js, Neural Integrations, and high-performance system architecture.",
  keywords: ["Full Stack Engineer", "AI Integrations", "Next.js Portfolio", "Vercel AI SDK", "Scalable Systems"],
  openGraph: {
    title: "Tushar | Full Stack Architect",
    description: "Architecting the substrate for the future of digital intelligence.",
    type: "website",
    url: siteUrl,
  },
};

export const viewport: Viewport = {
  themeColor: "#020202",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`scroll-smooth ${inter.variable} ${plusJakarta.variable} ${jetbrainsMono.variable}`}>
      <body className="antialiased selection:bg-cyan-500/30 selection:text-white bg-[#020202]">
        {children}
      </body>
    </html>
  );
}
