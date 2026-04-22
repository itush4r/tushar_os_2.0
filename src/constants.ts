import { Code2, Globe, Database, Terminal, Layout, Cpu, Box, Cloud } from 'lucide-react';

export const PERSONAL_INFO = {
  name: "Tushar",
  role: "Full Stack Engineer",
  headline: "Full Stack Engineer building AI-powered products at scale.",
  subheadline: "Specializing in high-performance web systems and seamless AI integrations.",
  email: "tushar8650@outlook.com",
  linkedin: "https://linkedin.com/in/tushar8650", // Placeholder if not provided, assuming typical pattern
  github: "https://github.com/tushar8650",     // Placeholder
};

export const STATS = [
  { label: "Workflow Time Reduced", value: "95%" },
  { label: "API Integrations", value: "10+" },
  { label: "Internal Teams Served", value: "5+" },
  { label: "Experience", value: "2+ Years" },
];

export const PROFESSIONAL_PROJECTS = [
  {
    title: "AI Flight Quote CMS",
    description: "Built a revolutionary CMS that reduced flight quote creation time from 4 hours to just 10 minutes using AI-assisted automation.",
    tags: ["Next.js", "OpenAI", "Node.js", "MongoDB"],
    link: "#",
    metric: "96% efficiency gain"
  },
  {
    title: "Travel Booking Funnel",
    description: "High-conversion end-to-end booking system for Flights and Hotels, featuring complex multi-step forms and secure payment integration.",
    tags: ["React", "TypeScript", "Stripe", "Express"],
    link: "#",
    metric: "B2C Scale"
  },
  {
    title: "OTT Subscription Platform",
    description: "Premium video streaming service with gated access, live event streaming, and robust subscription management.",
    tags: ["Next.js", "AWS Media Services", "Tailwind"],
    link: "#",
    metric: "Live Ready"
  },
  {
    title: "Admin CMS Dashboards",
    description: "A suite of sophisticated internal tools for Finance, Support, and Operations teams to manage large-scale data sets.",
    tags: ["React", "Zod", "React Query", "PostgreSQL"],
    link: "#",
    metric: "Mission Critical"
  },
];

export const PERSONAL_PROJECTS = [
  {
    title: "Neural Node Runner",
    description: "A distributed system for running local LLMs across multiple low-power devices with automatic load balancing.",
    tags: ["Rust", "Wasm", "WebRTC", "P2P"],
    link: "#",
    metric: "Experimental"
  },
  {
    title: "Semantic Search Engine",
    description: "Vector-based exploration tool for technical documentation using RAG architecture and high-dimensional embeddings.",
    tags: ["Python", "Pinecone", "LangChain", "FastAPI"],
    link: "#",
    metric: "Open Source"
  }
];

export const TECH_STACK = [
  { name: "React", icon: Layout },
  { name: "Next.js", icon: Globe },
  { name: "TypeScript", icon: Code2 },
  { name: "Node.js", icon: Terminal },
  { name: "MongoDB", icon: Database },
  { name: "Tailwind", icon: Box },
  { name: "Zod", icon: Cpu },
  { name: "Vercel AI SDK", icon: Cloud },
];

export const EXPERIENCE = [
  {
    company: "Travelxp India Pvt Ltd",
    role: "SDE II",
    period: "2023 - Present",
    description: "Leading development of core B2C systems, optimizing booking funnels, and integrating AI into historical manual workflows."
  }
];
