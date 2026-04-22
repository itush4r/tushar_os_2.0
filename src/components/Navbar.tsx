import { motion } from "motion/react";
import { PERSONAL_INFO } from "../constants";
import { Github, Linkedin, Mail, Menu, X, Terminal } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const navLinks = [
    { name: "SYSTEM", href: "#about" },
    { name: "CORE_PROJECTS", href: "#projects" },
    { name: "MODULES", href: "#stack" },
    { name: "ARCHIVE", href: "#experience" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between p-6 items-start font-mono text-[10px] tracking-[0.2em] uppercase">
      <motion.div 
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="flex flex-col gap-1"
      >
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 bg-cyan-500 animate-pulse" />
          <span className="text-white font-bold tracking-widest">{PERSONAL_INFO.name}_OS 2.0</span>
        </div>
        <span className="text-zinc-600">STATUS: AUTHORIZED_ACCESS</span>
      </motion.div>

      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="hidden md:flex gap-12 bg-black/50 backdrop-blur-lg border border-white/5 px-8 py-3 rounded-full"
      >
        {navLinks.map((link) => (
          <a key={link.name} href={link.href} className="text-zinc-500 hover:text-cyan-400 transition-colors">
            [{link.name}]
          </a>
        ))}
      </motion.div>

      <motion.div 
        initial={{ x: 20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="flex flex-col items-end gap-1"
      >
        <div className="text-white font-bold tracking-widest flex items-center gap-3">
          SECURE_NODE <Terminal size={12} className="text-cyan-500" />
        </div>
        <span className="text-zinc-600">LATENCY: 0.04MS</span>
      </motion.div>
    </nav>
  );
}
