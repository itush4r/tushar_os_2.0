import { motion } from "motion/react";
import { EXPERIENCE, PERSONAL_INFO } from "../constants";
import { Mail, Linkedin, Github, Send, ArrowRight } from "lucide-react";

export default function ExperienceAndContact() {
  return (
    <div className="py-32 px-6 max-w-7xl mx-auto space-y-40 cyber-grid">
      {/* Experience Timeline */}
      <section id="experience">
        <div className="flex items-center gap-6 mb-16">
           <h2 className="text-4xl md:text-8xl font-black italic uppercase">Archive</h2>
           <div className="h-[1px] flex-1 bg-white/5" />
        </div>
        
        <div className="max-w-5xl mx-auto grid gap-1">
          {EXPERIENCE.map((exp, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="hud-card p-12 border border-white/5 flex flex-col md:flex-row gap-8 items-start group"
            >
              <div className="font-mono text-cyan-500/50 text-[10px] w-40 shrink-0 uppercase tracking-widest pt-2">
                // LOG_{i+1} [{exp.period}]
              </div>
              
              <div className="flex-1 space-y-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <h3 className="text-3xl font-black tracking-tighter text-white group-hover:text-cyan-400 transition-colors uppercase italic">{exp.role}</h3>
                  <div className="text-zinc-600 font-mono text-[10px] uppercase">ORG: {exp.company.replace(/ /g, '_')}</div>
                </div>
                
                <p className="text-zinc-500 text-lg font-light leading-relaxed max-w-2xl">
                  {exp.description}
                </p>
              </div>
              <div className="scan-bar opacity-5" />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Global Link Section */}
      <section id="contact" className="py-20 border-y border-white/5 bg-white/[0.01] relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-cyan-500/5 blur-[120px] rounded-full" />
        
        <div className="relative z-10 grid md:grid-cols-2 gap-20 items-center">
          <div className="space-y-12">
            <div>
              <div className="font-mono text-cyan-500 text-[10px] mb-4 tracking-[0.4em] uppercase">[[ ESTABLISH_COMMUNICATION ]]</div>
              <h2 className="text-5xl md:text-8xl font-black uppercase italic leading-[0.8] mb-8">Let's <br />Integrate.</h2>
              <p className="text-zinc-500 text-xl font-light">Available for remote architectural collaborations & intelligence integrations.</p>
            </div>

            <div className="grid grid-cols-1 gap-4">
               {[
                 { label: "MAIL_ENCRYPTED", value: PERSONAL_INFO.email, icon: Mail, href: `mailto:${PERSONAL_INFO.email}` },
                 { label: "LINKEDIN_STATION", value: "Tushar Profile", icon: Linkedin, href: PERSONAL_INFO.linkedin },
                 { label: "GITHUB_REPOSITORY", value: "Source Archive", icon: Github, href: PERSONAL_INFO.github }
               ].map((link, i) => (
                 <a key={i} href={link.href} target="_blank" rel="noreferrer" className="hud-card p-6 flex justify-between items-center group hud-border">
                    <div className="flex items-center gap-6">
                      <link.icon size={20} className="text-zinc-700 group-hover:text-cyan-400 transition-colors" />
                      <div>
                        <div className="font-mono text-[10px] text-zinc-600 uppercase mb-1">{link.label}</div>
                        <div className="text-white font-medium">{link.value}</div>
                      </div>
                    </div>
                    <ArrowRight size={16} className="text-zinc-800 group-hover:text-cyan-400 transition-all -rotate-45" />
                 </a>
               ))}
            </div>
          </div>

          <div className="hud-card p-12 border-white/10 group">
             <div className="font-mono text-cyan-500 text-[10px] mb-8 tracking-[0.4em] uppercase center underline underline-offset-8">Packet_Transmission</div>
             <div className="space-y-8">
                <div className="relative border-b border-white/10 pb-4">
                  <span className="absolute top-0 right-0 font-mono text-[10px] text-zinc-700">01</span>
                  <input type="text" placeholder="IDENTITY_DESC" className="w-full bg-transparent outline-none text-white font-mono uppercase tracking-widest text-xs placeholder:text-zinc-800" />
                </div>
                <div className="relative border-b border-white/10 pb-4">
                  <span className="absolute top-0 right-0 font-mono text-[10px] text-zinc-700">02</span>
                  <textarea rows={4} placeholder="INTENT_DATA_BLOCK" className="w-full bg-transparent outline-none text-white font-mono uppercase tracking-widest text-xs placeholder:text-zinc-800 resize-none" />
                </div>
                <button className="w-full h-20 bg-white text-black font-black uppercase text-xs tracking-[0.5em] hover:bg-cyan-500 transition-all flex items-center justify-center gap-4">
                  Transmit [SIG] <Send size={16} />
                </button>
             </div>
             <div className="scan-bar opacity-10" />
          </div>
        </div>
      </section>

      {/* Footer System Info */}
      <footer className="py-20 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 font-mono text-[10px] text-zinc-700 uppercase tracking-widest">
         <div className="flex items-center gap-10">
            <span className="flex items-center gap-2"><div className="w-1 h-1 bg-green-500 rounded-full" /> SERVER_UP_44:12:08</span>
            <span>ENCRYPT_TYPE: AES-256</span>
         </div>
         <p>© TUSHAR_SYSTEM_V2 // EXECUTED_IN_AIS</p>
         <div className="flex gap-10">
            <a href="#" className="hover:text-cyan-500 transition-colors">TERMINAL_REF</a>
            <a href="#" className="hover:text-cyan-500 transition-colors">OS_GUIDE</a>
         </div>
      </footer>
    </div>
  );
}
