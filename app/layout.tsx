import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://tushar-os-2-0.vercel.app";

const TITLE = "Tushar — Full Stack Engineer";
const DESCRIPTION =
  "Full-stack engineer building production AI interfaces. Travelxp, AI Flight Quote CMS, structured outputs, streaming UIs.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "full stack engineer",
    "AI integrations",
    "Next.js",
    "TypeScript",
    "React",
    "Gemini",
    "MongoDB",
    "Tushar",
  ],
  authors: [{ name: "Tushar" }],
  creator: "Tushar",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: TITLE,
    description: DESCRIPTION,
    siteName: TITLE,
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  width: "device-width",
  initialScale: 1,
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Tushar",
  jobTitle: "Full Stack Engineer",
  description: DESCRIPTION,
  url: SITE_URL,
  email: "tushar865@outlook.com",
  sameAs: [
    "https://github.com/itush4r",
    "https://www.linkedin.com/",
  ],
  knowsAbout: [
    "TypeScript",
    "React",
    "Next.js",
    "MongoDB",
    "Google Gemini",
    "AI integrations",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} dark`}>
      <body className="bg-background font-sans text-foreground antialiased">
        {children}
        <Script
          id="ld-json-person"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </body>
    </html>
  );
}
