import { useState } from 'react';
import { Sparkles, TrendingUp, Code, Terminal, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function BentoFeaturesSection() {
  const [techStack, setTechStack] = useState('FULL-STACK');

  return (
    <section id="software" className="py-20 bg-[#08090C] relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Card 1: Custom Software & SaaS Development (FIRST) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-card rounded-[32px] p-6 sm:p-8 flex flex-col justify-between overflow-hidden relative group"
          >
            {/* Header info */}
            <div className="mb-6">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-[#00FFA3] to-[#0076F7] p-[1px] mb-4 shadow-[0_0_12px_rgba(0,255,209,0.2)]">
                <div className="w-full h-full bg-[#0E131C] rounded-[7px] flex items-center justify-center">
                  <Code className="w-4 h-4 text-[#00FFD1]" />
                </div>
              </div>
              <h3 className="font-display font-bold text-2xl text-white mb-2">
                Custom Software Development
              </h3>
              <p className="text-neutral-400 text-sm leading-relaxed max-w-md font-normal">
                We engineer scalable custom software, internal tools, customer portals, and AI workflows that power high-velocity businesses.
              </p>
            </div>

            {/* Software Architecture Viewport */}
            <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full rounded-[22px] overflow-hidden bg-[#0A0D13] border border-neutral-800 shadow-2xl p-4 flex flex-col justify-between">
              {/* Architecture Toast */}
              <div className="bg-black/90 backdrop-blur-xl border border-white/15 rounded-xl p-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-semibold text-white">
                    <Sparkles className="w-3.5 h-3.5 text-[#00FFD1]" />
                    <span>Production Architecture</span>
                  </div>
                  <span className="text-[9px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                    99.99% SLA
                  </span>
                </div>
                <p className="text-[11px] text-neutral-400 mt-1 pl-5 leading-tight">
                  High-throughput APIs, automated CI/CD pipelines, and secure cloud microservices.
                </p>
              </div>

              {/* Mode Selector Pill Buttons */}
              <div className="flex items-center justify-center gap-2 py-3">
                {['ENTERPRISE', 'SAAS MVP', 'FULL-STACK', 'AI-TOOLS'].map((stack) => {
                  const isActive = techStack === stack;
                  return (
                    <button
                      key={stack}
                      onClick={() => setTechStack(stack)}
                      className={`px-3 py-1 rounded-full text-[10px] sm:text-xs font-mono font-semibold transition-all ${
                        isActive
                          ? 'bg-[#00FFD1] text-black shadow-[0_0_15px_rgba(0,255,209,0.5)]'
                          : 'bg-white/5 text-neutral-400 hover:text-white border border-white/10'
                      }`}
                    >
                      {stack}
                    </button>
                  );
                })}
              </div>

              {/* Code & Terminal Pipeline HUD */}
              <div className="bg-black/60 rounded-xl p-2.5 border border-white/10 font-mono text-[10px] space-y-1 text-neutral-300">
                <div className="flex items-center justify-between text-neutral-500 pb-1 border-b border-white/5">
                  <div className="flex items-center gap-1.5">
                    <Terminal className="w-3 h-3 text-[#00FFD1]" />
                    <span>buildvix.deploy.ts</span>
                  </div>
                  <span className="text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> COMPILED (0 errors)
                  </span>
                </div>
                <div className="text-neutral-400">
                  <span className="text-purple-400">const</span> service = <span className="text-cyan-300">new BuildvixEngine</span>({'{'} scale: <span className="text-emerald-400">'infinite'</span> {'}'});
                </div>
              </div>

              {/* Bottom Nav Bar */}
              <div className="flex items-center justify-around pt-2 text-[10px] font-mono text-neutral-500 border-t border-white/[0.04]">
                <span>ARCHITECTURE</span>
                <span>REST / GRAPHQL</span>
                <span>POSTGRES</span>
                <span className="text-[#00FFD1] font-bold">READY TO SCALE</span>
              </div>
            </div>
          </motion.div>

          {/* Card 2: Social Media Growth & Follower Scaling (AFTER SOFTWARE) */}
          <motion.div
            id="social"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="glass-card rounded-[32px] p-6 sm:p-8 flex flex-col justify-between overflow-hidden relative group"
          >
            {/* Header info */}
            <div className="mb-6">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-[#00FFA3] to-[#0076F7] p-[1px] mb-4 shadow-[0_0_12px_rgba(0,255,209,0.2)]">
                <div className="w-full h-full bg-[#0E131C] rounded-[7px] flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 text-[#00FFD1]" />
                </div>
              </div>
              <h3 className="font-display font-bold text-2xl text-white mb-2">
                Social Media Growth & Followers
              </h3>
              <p className="text-neutral-400 text-sm leading-relaxed max-w-md font-normal">
                Algorithmic audience scaling, engagement retention, automated posting cadence, and multi-channel follower acquisition.
              </p>
            </div>

            {/* Phone Screen Preview: Social Growth & Viral Telemetry */}
            <div className="relative aspect-[16/10] w-full rounded-[22px] overflow-hidden bg-black border border-neutral-800 shadow-2xl">
              <div 
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?q=80&w=1200&auto=format&fit=crop')`,
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/70" />
              </div>

              {/* HUD Grid */}
              <div className="absolute inset-0 hud-grid-lines pointer-events-none opacity-30" />

              {/* Top Telemetry */}
              <div className="absolute top-0 inset-x-0 p-3 bg-gradient-to-b from-black/85 to-transparent flex items-center justify-between font-mono text-[9px] sm:text-[10px] text-neutral-300">
                <div className="flex gap-3">
                  <span>NETWORK <strong className="text-white">IG / TIKTOK / X</strong></span>
                  <span>CAMPAIGN #84</span>
                </div>
                <div className="flex gap-3">
                  <span>GROWTH <strong className="text-[#00FFD1]">+380%</strong></span>
                  <span>REACH <strong className="text-white">4.8M</strong></span>
                  <span className="text-emerald-400 font-bold">VIRAL</span>
                </div>
              </div>

              {/* Green Tracking Bounding Box */}
              <div className="absolute top-[22%] left-[25%] w-[50%] h-[50%] border-2 border-emerald-400 rounded-lg pointer-events-none shadow-[0_0_15px_rgba(52,211,153,0.3)] flex flex-col justify-between p-2 bg-black/40 backdrop-blur-sm">
                <div className="flex justify-between items-center">
                  <span className="px-1.5 py-0.5 bg-emerald-500/20 text-emerald-400 rounded text-[9px] font-mono font-bold">
                    + AUDIENCE SURGE
                  </span>
                  <span className="text-[8px] font-mono text-emerald-300">
                    RETENTION 98.6%
                  </span>
                </div>
                <div className="text-center py-1">
                  <div className="text-xl font-display font-bold text-white">
                    +250,000 FOLLOWERS
                  </div>
                  <div className="text-[8px] font-mono text-neutral-400">ORGANIC ACCELERATION</div>
                </div>
                <div className="flex justify-between text-[8px] font-mono text-neutral-300">
                  <span>SHARES 14.8K</span>
                  <span className="text-emerald-400">STATUS: OPTIMIZED</span>
                </div>
              </div>

              {/* Prompt Toast */}
              <div className="absolute bottom-3 inset-x-3 bg-black/85 backdrop-blur-xl border border-white/15 rounded-xl p-2.5">
                <div className="flex items-center gap-2 text-xs font-semibold text-white">
                  <Sparkles className="w-3.5 h-3.5 text-[#00FFD1]" />
                  <span>Algorithmic distribution active</span>
                </div>
                <p className="text-[10px] text-neutral-400 mt-0.5 pl-5">
                  Automated short-form funnels capturing high-intent followers every 24 hours.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
