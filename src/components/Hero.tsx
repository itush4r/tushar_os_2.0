import { motion } from "motion/react";
import { PERSONAL_INFO } from "../constants";
import { ArrowRight, FileText } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-32 pb-20 px-6 overflow-hidden cyber-grid">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#020202]/80 to-[#020202]" />
      
      {/* HUD Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vh] border border-cyan-500/10 pointer-events-none">
        <div className="edge-fleck top-0 left-0" />
        <div className="edge-fleck top-0 right-0" />
        <div className="edge-fleck bottom-0 left-0" />
        <div className="edge-fleck bottom-0 right-0" />
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative z-10 max-w-5xl text-center"
      >
        <div className="font-mono text-[10px] tracking-[0.4em] text-cyan-500 mb-6 uppercase">
          [ SYSTEM_BOOT_SEQUENCE_88% ]
        </div>

        <h1 className="text-6xl md:text-9xl font-black mb-8 leading-[0.9] tracking-tighter">
          TUSHAR<span className="text-cyan-500 text-glow-cyan animate-pulse">.</span>
        </h1>

        <div className="flex flex-col items-center gap-6">
          <p className="text-xl md:text-3xl font-light text-zinc-300 max-w-3xl leading-tight">
            Architecting <span className="text-white font-bold">Autonomous Products</span> & 
            <br />Scaled Intelligent Systems.
          </p>
          
          <div className="h-[1px] w-40 bg-zinc-800" />

          <p className="font-mono text-xs text-zinc-500 tracking-widest uppercase">
            NEXT.JS / TYPESCRIPT / NODE.JS / NEURAL_INTEGRATIONS
          </p>
        </div>

        <div className="mt-16 flex flex-col sm:flex-row gap-6 justify-center">
          <motion.a 
            whileHover={{ scale: 1.05, backgroundColor: "rgba(6, 182, 212, 1)" }}
            href="#projects"
            className="flex h-14 px-10 bg-cyan-500 text-black text-xs font-bold uppercase tracking-widest items-center justify-center gap-3 transition-all"
          >
            Access projects [OBJ]
          </motion.a>
          
          <motion.a 
            whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.05)" }}
            href="#"
            className="flex h-14 px-10 border border-white/20 text-white text-xs font-bold uppercase tracking-widest items-center justify-center gap-3 transition-all"
          >
            System specs .PDF
          </motion.a>
        </div>
      </motion.div>

      {/* Decorative vertical lines */}
      <div className="absolute left-10 top-0 bottom-0 w-[1px] bg-white/5 hidden lg:block" />
      <div className="absolute right-10 top-0 bottom-0 w-[1px] bg-white/5 hidden lg:block" />
    </section>
  );
}
