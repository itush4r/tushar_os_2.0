import { motion } from "motion/react";
import { PROFESSIONAL_PROJECTS, PERSONAL_PROJECTS, TECH_STACK } from "../constants";
import { ExternalLink, ArrowRight } from "lucide-react";

export default function ProjectsAndStack() {
  const ProjectGrid = ({ projects }: { projects: typeof PROFESSIONAL_PROJECTS }) => (
    <div className="grid md:grid-cols-2 gap-px bg-white/5 border border-white/5 overflow-hidden">
      {projects.map((project, i) => (
        <motion.div 
          key={i}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="group relative bg-[#020202] p-12 md:p-16 hover:bg-zinc-900/40 transition-all duration-500 overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-[1px] h-full bg-cyan-500/0 group-hover:bg-cyan-500/50 transition-all" />
          <div className="flex justify-between items-start mb-12">
            <div className="font-mono text-[10px] text-cyan-500/50 group-hover:text-cyan-400 transition-colors">
              IDENT: {project.metric.replace(/ /g, '_').toUpperCase()}
            </div>
            <div className="w-8 h-8 flex items-center justify-center border border-white/10 group-hover:border-cyan-500/50 group-hover:text-cyan-400 transition-all">
              <ArrowRight size={14} className="-rotate-45" />
            </div>
          </div>

          <h3 className="text-3xl md:text-4xl font-bold text-white mb-6 tracking-tighter">
            {project.title.toUpperCase()}
          </h3>
          
          <p className="text-zinc-500 text-lg mb-12 font-light leading-relaxed">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-x-6 gap-y-2 opacity-40 group-hover:opacity-100 transition-opacity">
            {project.tags.map((tag) => (
              <span key={tag} className="font-mono text-[10px] uppercase tracking-widest">
                {tag}
              </span>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );

  return (
    <div id="projects" className="py-32 px-6 max-w-7xl mx-auto space-y-40 cyber-grid">
      {/* Professional Work */}
      <section>
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="font-mono text-[10px] text-cyan-500 mb-2">// DIRECTORY: /PROJECTS/STATION_A</div>
            <h2 className="text-4xl md:text-8xl font-black mb-4 tracking-tighter uppercase italic">Professional</h2>
          </div>
          <div className="text-zinc-600 font-mono text-xs uppercase tracking-widest hidden md:block">
            [ INDUSTRIAL_GRADE_ONLY ]
          </div>
        </div>
        <ProjectGrid projects={PROFESSIONAL_PROJECTS} />
      </section>

      {/* Personal Work */}
      <section>
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="font-mono text-[10px] text-purple-500 mb-2">// DIRECTORY: /PROJECTS/STATION_B</div>
            <h2 className="text-4xl md:text-8xl font-black mb-4 tracking-tighter uppercase italic text-glow-purple">Personal</h2>
          </div>
          <div className="text-zinc-600 font-mono text-xs uppercase tracking-widest hidden md:block">
            [ R&D_CORE_LOGS ]
          </div>
        </div>
        <ProjectGrid projects={PERSONAL_PROJECTS} />
      </section>

      {/* Tech Stack */}
      <section id="stack" className="relative p-20 border border-white/5 bg-white/[0.02]">
        <div className="absolute top-0 right-10 font-mono text-[10px] text-zinc-700 tracking-[0.5em] uppercase px-4 bg-[#020202]">System_Modules</div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-1">
          {TECH_STACK.map((tech, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              whileHover={{ backgroundColor: "rgba(255,255,255,0.05)" }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="flex flex-col items-center justify-center gap-4 py-12 border border-white/5 transition-all group"
            >
              <tech.icon size={20} className="text-zinc-600 group-hover:text-cyan-400 transition-colors" />
              <span className="font-mono text-[10px] text-zinc-600 uppercase tracking-widest group-hover:text-white transition-colors">{tech.name}</span>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
