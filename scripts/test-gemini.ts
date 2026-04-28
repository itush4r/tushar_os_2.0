import { getModel } from "../lib/gemini";
import { ABOUT_TUSHAR_SYSTEM_PROMPT } from "../lib/prompts/about-tushar";

async function ask(question: string) {
  const model = getModel("flash", {
    systemInstruction: ABOUT_TUSHAR_SYSTEM_PROMPT,
    temperature: 0.4,
  });
  const result = await model.generateContent(question);
  return result.response.text().trim();
}

async function main() {
  const argQuestion = process.argv.slice(2).join(" ").trim();

  if (argQuestion) {
    const answer = await ask(argQuestion);
    // eslint-disable-next-line no-console
    console.log(`Q: ${argQuestion}\nA: ${answer}\n`);
    return;
  }

  // Default: run the three acceptance probes.
  const probes = [
    {
      label: "coherence",
      q: "What is Tushar's strongest project?",
    },
    {
      label: "anti-hallucination",
      q: "Did Tushar work at Google?",
    },
    {
      label: "off-topic redirect",
      q: "What's the weather in Mumbai today?",
    },
  ];

  for (const p of probes) {
    const a = await ask(p.q);
    // eslint-disable-next-line no-console
    console.log(`[${p.label}]\nQ: ${p.q}\nA: ${a}\n`);
  }
}

main().catch((err) => {
  // eslint-disable-next-line no-console
  console.error(err);
  process.exit(1);
});
