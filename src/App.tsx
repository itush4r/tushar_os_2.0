/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import StatsAndAbout from "./components/StatsAndAbout";
import ProjectsAndStack from "./components/ProjectsAndStack";
import ExperienceAndContact from "./components/ExperienceAndContact";
import { motion, useScroll, useSpring } from "motion/react";

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="relative selection:bg-blue-500/30">
      {/* Scroll Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 accent-gradient origin-left z-[60]"
        style={{ scaleX }}
      />

      <Navbar />
      
      <main className="relative overflow-x-hidden">
        <Hero />
        <StatsAndAbout />
        <ProjectsAndStack />
        <ExperienceAndContact />
      </main>

      {/* Global Background Noise / Texture (Subtle) */}
      <div className="fixed inset-0 pointer-events-none z-[-1] opacity-[0.03] animate-pulse">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <filter id="noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noise)" />
        </svg>
      </div>

      {/* Perspective background blobs */}
      <div className="fixed top-0 left-0 w-full h-full -z-[2] overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ 
            x: [0, 50, 0],
            y: [0, -30, 0]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-[10%] left-[5%] w-[40vw] h-[40vw] bg-blue-600/5 rounded-full blur-[140px]"
        />
        <motion.div 
          animate={{ 
            x: [0, -40, 0],
            y: [0, 60, 0]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[10%] right-[5%] w-[45vw] h-[45vw] bg-purple-600/5 rounded-full blur-[140px]"
        />
      </div>
    </div>
  );
}
