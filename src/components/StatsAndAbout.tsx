"use client";

import { motion } from "motion/react";
import { STATS } from "../constants";

export default function StatsAndAbout() {
  return (
    <div id="about" className="py-20 px-6 max-w-7xl mx-auto space-y-32 cyber-grid">
      {/* Stats Grid */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-1">
        {STATS.map((stat, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: i * 0.1, duration: 0.8, ease: "easeOut" }}
            className="hud-card p-10 border border-white/5 flex flex-col gap-4"
          >
            <div className="font-mono text-[10px] text-cyan-500 uppercase tracking-widest">
              {"//"} DATA_FIELD_{i+1}
            </div>
            <div className="text-5xl font-black text-white text-glow-cyan">
              {stat.value}
            </div>
            <div className="text-xs text-zinc-500 font-mono tracking-tighter">
              {stat.label}
            </div>
          </motion.div>
        ))}
      </section>

      {/* About Summary */}
      <section className="grid md:grid-cols-2 gap-20 items-center">
        <motion.div
           initial={{ opacity: 0, x: -30 }}
           whileInView={{ opacity: 1, x: 0 }}
           viewport={{ once: true, margin: "-100px" }}
           transition={{ duration: 0.8, ease: "easeOut" }}
           className="relative"
        >
          <div className="font-mono text-cyan-500 text-xs mb-4">[[ NODE_PROFILE ]]</div>
          <h2 className="text-4xl md:text-7xl font-black mb-8 leading-[0.9]">
            ENGINEERING THE <br /><span className="text-zinc-600">NEXT DIMENSION.</span>
          </h2>
          <div className="h-[2px] w-full bg-zinc-900 overflow-hidden">
             <motion.div 
               initial={{ x: "-100%" }}
               whileInView={{ x: "100%" }}
               transition={{ duration: 2, repeat: Infinity }}
               className="h-full w-20 bg-cyan-500 blur-sm" 
             />
          </div>
        </motion.div>

        <motion.div
           initial={{ opacity: 0, x: 30 }}
           whileInView={{ opacity: 1, x: 0 }}
           viewport={{ once: true, margin: "-100px" }}
           transition={{ duration: 0.8, ease: "easeOut" }}
           className="space-y-8 font-light text-zinc-400 text-xl leading-relaxed border-l border-white/5 pl-10"
        >
          <p>
            I architect <span className="text-white font-bold tracking-tight">Autonomous Ecosystems</span>. 
            My work collapses the distance between complex data and intuitive human interaction.
          </p>
          <p className="text-base text-zinc-500 font-mono italic">
            &quot;We aren&apos;t just building software; we are building the substrate for the future of digital intelligence.&quot;
          </p>
        </motion.div>
      </section>
    </div>
  );
}
