"use client";

import { motion } from "motion/react";
import { EXPERIENCE, PERSONAL_INFO } from "../constants";
import { Mail, Linkedin, Github, Send, ArrowRight, Loader2, Sparkles, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { ContactSchema, type ContactInput } from "../lib/schemas";
import { trackEvent } from "../lib/utils";

export default function ExperienceAndContact() {
  const [formData, setFormData] = useState<Partial<ContactInput>>({ email: "", message: "", name: "" });
  const [errors, setErrors] = useState<Partial<Record<keyof ContactInput, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState<{ intent?: string; action?: string } | null>(null);

  const handleEnhance = async () => {
    if (!formData.message || formData.message.length < 5) return;
    
    setIsEnhancing(true);
    trackEvent('AI_ENHANCE_START', { messageLength: formData.message.length });

    try {
      const res = await fetch('/api/ai-brief', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: formData.message }),
      });
      const data = await res.json();
      
      if (data.enhancedMessage) {
        setFormData(prev => ({ ...prev, message: data.enhancedMessage }));
        setAiAnalysis({ intent: data.intent, action: data.suggestedAction });
        trackEvent('AI_ENHANCE_SUCCESS', { intent: data.intent });
      }
    } catch (err) {
      console.error(err);
      trackEvent('AI_ENHANCE_ERROR');
    } finally {
      setIsEnhancing(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    const result = ContactSchema.safeParse(formData);

    if (!result.success) {
      const formattedErrors: Partial<Record<keyof ContactInput, string>> = {};
      result.error.issues.forEach(issue => {
        const key = issue.path[0] as keyof ContactInput;
        formattedErrors[key] = issue.message;
      });
      setErrors(formattedErrors);
      setIsSubmitting(false);
      trackEvent('CONTACT_FORM_VALIDATION_ERROR', formattedErrors);
      return;
    }

    trackEvent('CONTACT_FORM_SUBMIT_START', { email: formData.email });

    // Simulate API call to save to MongoDB (this would be another API route)
    await new Promise(r => setTimeout(r, 1500));
    
    setSubmitted(true);
    setIsSubmitting(false);
    trackEvent('CONTACT_FORM_SUBMIT_SUCCESS');
  };

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
                  {"//"} LOG_{i+1} [{exp.period}]
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
              <h2 className="text-5xl md:text-8xl font-black uppercase italic leading-[0.8] mb-8">Let&apos;s <br />Integrate.</h2>
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
             {submitted ? (
               <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-10"
               >
                  <CheckCircle2 size={64} className="text-cyan-500 mx-auto mb-6" />
                  <h3 className="text-2xl font-bold text-white mb-2 uppercase">Packet Received</h3>
                  <p className="text-zinc-500 font-mono text-xs">COMMUNICATION_SECURED // STAND_BY_FOR_RESPONSE</p>
                  <button 
                    onClick={() => setSubmitted(false)}
                    className="mt-8 text-cyan-400 underline font-mono text-[10px] uppercase tracking-widest"
                  >
                    Send Another Signal
                  </button>
               </motion.div>
             ) : (
               <>
                <div className="font-mono text-cyan-500 text-[10px] mb-8 tracking-[0.4em] uppercase center underline underline-offset-8 flex justify-between items-center">
                  Packet_Transmission
                  {aiAnalysis && (
                    <span className="text-[8px] text-zinc-500 bg-white/5 px-2 py-1 rounded">INTENT: {aiAnalysis.intent}</span>
                  )}
                </div>
                <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="relative border-b border-white/10 pb-4">
                      <span className="absolute top-0 right-0 font-mono text-[10px] text-zinc-700">01</span>
                      <input 
                        type="text" 
                        placeholder="IDENTITY_EMAIL" 
                        value={formData.email}
                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        className="w-full bg-transparent outline-none text-white font-mono uppercase tracking-widest text-xs placeholder:text-zinc-800" 
                      />
                      {errors.email && <p className="text-[10px] text-red-500 mt-2 font-mono uppercase italic">{errors.email}</p>}
                    </div>
                    
                    <div className="relative border-b border-white/10 pb-4">
                      <span className="absolute top-0 right-0 font-mono text-[10px] text-zinc-700">02</span>
                      <textarea 
                        rows={4} 
                        placeholder="INTENT_DATA_BLOCK" 
                        value={formData.message}
                        onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                        className="w-full bg-transparent outline-none text-white font-mono uppercase tracking-widest text-xs placeholder:text-zinc-800 resize-none" 
                      />
                      {errors.message && <p className="text-[10px] text-red-500 mt-2 font-mono uppercase italic">{errors.message}</p>}
                      
                      <div className="mt-4 flex justify-end">
                        <button 
                          type="button"
                          onClick={handleEnhance}
                          disabled={isEnhancing || !formData.message}
                          className="flex items-center gap-2 text-zinc-500 hover:text-purple-400 transition-colors text-[10px] font-mono uppercase"
                        >
                          {isEnhancing ? <Loader2 size={12} className="animate-spin" /> : <Sparkles size={12} />}
                          AI_Enhance
                        </button>
                      </div>
                    </div>

                    <button 
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full h-20 bg-white text-black font-black uppercase text-xs tracking-[0.5em] hover:bg-cyan-500 transition-all flex items-center justify-center gap-4 disabled:opacity-50"
                    >
                      {isSubmitting ? <Loader2 className="animate-spin" /> : <>Transmit [SIG] <Send size={16} /></>}
                    </button>
                    
                    {aiAnalysis?.action && (
                       <p className="text-[8px] text-purple-400 text-center font-mono animate-pulse uppercase tracking-widest">
                         RECOMMENDED_ACTION: {aiAnalysis.action}
                       </p>
                    )}
                </form>
               </>
             )}
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
