"use client";

import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { PERSONAL_INFO } from "../constants";
import { ArrowRight, FileText, ChevronRight, Activity, Cpu, Hexagon } from "lucide-react";
import { useEffect, useState } from "react";

const SYSTEM_LOGS = [
  "INITIALIZING_NEURAL_SUBSYSTEMS",
  "MAPPING_DISTRIBUTED_NETWORKS",
  "OPTIMIZING_COMPUTE_RESOURCES",
  "ESTABLISHING_DATA_PIPELINES",
];

export default function Hero() {
  const [logIndex, setLogIndex] = useState(0);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth mouse movement for background glow
  const smoothX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);

    const interval = setInterval(() => {
      setLogIndex((prev) => (prev + 1) % SYSTEM_LOGS.length);
    }, 3000);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearInterval(interval);
    };
  }, [mouseX, mouseY]);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-32 pb-20 px-6 overflow-hidden bg-[#020202]">
      {/* Dynamic Background Glow */}
      <motion.div 
        className="absolute inset-0 pointer-events-none z-0 overflow-hidden"
        style={{
          background: `radial-gradient(600px circle at ${smoothX}px ${smoothY}px, rgba(6, 182, 212, 0.07), transparent 80%)`
        }}
      />

      {/* Cyber Grid Substrate */}
      <div className="absolute inset-0 cyber-grid opacity-20 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#020202] via-transparent to-[#020202]" />

      {/* Floating HUD Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[20%] left-[10%] opacity-10"
        >
          <Hexagon size={120} className="text-cyan-500" strokeWidth={0.5} />
        </motion.div>
        <motion.div 
          animate={{ y: [0, 20, 0], rotate: [0, -10, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[20%] right-[10%] opacity-10"
        >
          <Hexagon size={180} className="text-purple-500" strokeWidth={0.5} />
        </motion.div>
      </div>

      <div className="relative z-10 max-w-6xl w-full">
        <div className="flex flex-col items-center">
          {/* Status Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-3 px-4 py-2 bg-white/5 border border-white/10 rounded-full mb-12 backdrop-blur-sm"
          >
            <div className="relative">
              <div className="w-2 h-2 bg-cyan-500 rounded-full animate-ping absolute inset-0" />
              <div className="w-2 h-2 bg-cyan-500 rounded-full relative" />
            </div>
            <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-zinc-400">
              <span className="text-cyan-500">SYS_LOG:</span> {SYSTEM_LOGS[logIndex]}
            </span>
          </motion.div>

          {/* Main Headline */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-10"
          >
            <h1 className="text-6xl md:text-[10vw] font-black leading-[0.85] tracking-tighter uppercase italic select-none">
              <motion.span 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="inline-block"
              >
                Building
              </motion.span>
              <br />
              <motion.span 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
                className="text-gradient inline-block"
              >
                Autonomous
              </motion.span>
              <br />
              <motion.span 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="inline-block relative text-glow-cyan"
              >
                Products<span className="text-cyan-500">.</span>
              </motion.span>
            </h1>
          </motion.div>

          {/* Subtext */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="max-w-2xl text-center space-y-6"
          >
            <p className="text-zinc-500 text-lg md:text-2xl font-light leading-relaxed">
              Full Stack Engineer specializing in <span className="text-white">Next.js Ecosystems</span>, 
              Neural Integrations, and high-performance product architecture.
            </p>
            
            <div className="flex items-center justify-center gap-10 font-mono text-[10px] text-zinc-600 uppercase tracking-widest pt-4">
              <span className="flex items-center gap-2"><Cpu size={14} className="text-cyan-500/50" /> [NEXT_V15]</span>
              <span className="flex items-center gap-2"><Activity size={14} className="text-cyan-500/50" /> [NEURAL_CORE]</span>
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="mt-16 flex flex-col sm:flex-row gap-6 items-center"
          >
            <motion.a 
              href="#projects"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group relative h-16 px-12 bg-white text-black font-black uppercase text-xs tracking-widest flex items-center gap-3 overflow-hidden"
            >
              <span className="relative z-10">Access Projects</span>
              <ChevronRight size={16} className="relative z-10 group-hover:translate-x-2 transition-transform" />
              <div className="absolute inset-0 bg-cyan-400 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </motion.a>

            <motion.a 
              href="#contact"
              whileHover={{ backgroundColor: "rgba(255,255,255,0.05)" }}
              className="h-16 px-12 border border-white/10 text-white font-mono text-[10px] uppercase tracking-[0.3em] flex items-center gap-3 transition-colors rounded-sm"
            >
              Establish Communication
            </motion.a>
          </motion.div>
        </div>
      </div>

      {/* Decorative vertical indicators */}
      <div className="absolute left-6 bottom-10 hidden lg:flex flex-col gap-4 font-mono text-[8px] text-zinc-700 uppercase tracking-[0.5em] rotate-180 [writing-mode:vertical-lr]">
        <div className="h-40 w-px bg-white/10 mb-4" />
        01_ARCHITECTURAL_STATION
      </div>
      
      <div className="absolute right-6 bottom-10 hidden lg:flex flex-col gap-4 font-mono text-[8px] text-zinc-700 uppercase tracking-[0.5em] [writing-mode:vertical-lr]">
        01_NEURAL_INTEGRATION_CORE
        <div className="h-40 w-px bg-white/10 mt-4" />
      </div>

      {/* Scroll indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="font-mono text-[8px] text-zinc-600 uppercase tracking-widest">Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-cyan-500 to-transparent" />
      </motion.div>
    </section>
  );
}
