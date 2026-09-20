import { useState } from 'react';
import { Sparkles, Globe, Cpu, Users, Layers, X } from 'lucide-react';
import { motion } from 'framer-motion';

const CORE_SERVICES = [
  {
    id: 'web',
    title: 'High-Converting Websites',
    desc: 'Ultra-fast Next.js, React, 3D WebGL & custom interactive UI',
    image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=600&auto=format&fit=crop',
    tag: 'SPEED 100/100',
    icon: Globe,
  },
  {
    id: 'software',
    title: 'Custom Software Making',
    desc: 'SaaS platforms, AI workflow automation & mobile applications',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=600&auto=format&fit=crop',
    tag: 'ENTERPRISE ARCH',
    icon: Cpu,
  },
  {
    id: 'social',
    title: 'Social Media & Follower Scale',
    desc: 'Algorithmic distribution, viral content systems & brand growth',
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=600&auto=format&fit=crop',
    tag: '+500% REACH',
    icon: Users,
  },
];

export default function SceneAnalysisSection() {
  const [activeService, setActiveService] = useState('web');

  const current = CORE_SERVICES.find((s) => s.id === activeService) || CORE_SERVICES[0];

  return (
    <section id="services" className="py-24 bg-[#08090C] relative">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 right-10 w-[450px] h-[450px] bg-[#00FFD1]/5 blur-[120px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Top Header Row */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-display font-bold text-3xl sm:text-5xl md:text-6xl tracking-tight text-white max-w-2xl leading-[1.1]"
          >
            Transforms your vision <br />
            into a stunning <span className="text-gradient-cyan">digital product</span>
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-neutral-400 text-base sm:text-lg max-w-md leading-relaxed font-normal"
          >
            Bring your business to life with custom websites, enterprise-grade software, and algorithmic
            social media scaling — making your brand effortlessly dominant in any market.
          </motion.p>
        </div>

        {/* Big Interactive Feature Bento Card */}
        <div className="glass-card rounded-[32px] p-6 sm:p-10 border border-white/[0.08] relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left 8 Cols: Interactive Service Showcase Canvas */}
            <div className="lg:col-span-8 relative">
              <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full rounded-[24px] overflow-hidden bg-black border border-neutral-800 shadow-2xl">
                {/* Dynamic Service Background Image */}
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-all duration-700 hover:scale-105"
                  style={{
                    backgroundImage: `url('${current.image}')`,
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/70" />
                </div>

                {/* Technical Grid Overlay */}
                <div className="absolute inset-0 hud-grid-lines pointer-events-none opacity-30" />

                {/* Top Telemetry */}
                <div className="absolute top-0 inset-x-0 p-4 flex items-center justify-between font-mono text-[10px] sm:text-xs text-neutral-300 bg-gradient-to-b from-black/85 to-transparent">
                  <div className="flex gap-4">
                    <span>STATUS <strong className="text-white">DEPLOYED</strong></span>
                    <span>FRAMEWORK <strong className="text-white">FULL-STACK</strong></span>
                    <span>LOAD <strong>0.32s</strong></span>
                  </div>
                  <div className="flex gap-4">
                    <span>SECURITY <strong className="text-white">A+</strong></span>
                    <span>SEO <strong className="text-white">100/100</strong></span>
                    <span className="text-[#00FFD1] font-bold">{current.tag}</span>
                  </div>
                </div>

                {/* Bounding Box Highlights */}
                <div className="absolute top-[28%] left-[18%] w-[58%] h-[46%] border border-[#00FFD1]/50 rounded-xl pointer-events-none bg-[#00FFD1]/5 backdrop-blur-[2px] flex flex-col justify-between p-2">
                  <div className="flex justify-between items-center">
                    <span className="px-2 py-0.5 bg-[#00FFD1]/20 rounded text-[9px] font-mono text-[#00FFD1] font-bold">
                      BUILDVIX • {current.title.toUpperCase()}
                    </span>
                    <span className="text-[9px] font-mono text-emerald-400">ACTIVE PRODUCTION</span>
                  </div>
                  <div className="text-right text-[10px] font-mono text-neutral-300">
                    CONVERTING VISITORS → CLIENTS
                  </div>
                </div>

                {/* Bottom Left AI Floating Toast */}
                <div className="absolute bottom-4 left-4 right-4 sm:right-auto sm:w-[350px] bg-black/85 backdrop-blur-xl border border-white/15 rounded-xl p-3 shadow-xl">
                  <div className="flex items-center justify-between text-xs font-semibold text-white">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-3.5 h-3.5 text-[#00FFD1]" />
                      <span>{current.title}</span>
                    </div>
                    <X className="w-3 h-3 text-neutral-500 cursor-pointer" />
                  </div>
                  <p className="text-[10px] sm:text-[11px] text-neutral-400 mt-1">
                    {current.desc}
                  </p>
                  <div className="mt-2 h-1 w-full bg-neutral-800 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-[#00D592] to-[#0076F7] rounded-full w-4/5 animate-pulse" />
                  </div>
                </div>
              </div>
            </div>

            {/* Right 4 Cols: Service Switcher & Value Proposition */}
            <div className="lg:col-span-4 flex flex-col justify-between h-full space-y-6">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-neutral-400 mb-3 uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5 text-[#00FFD1]" />
                  <span>Choose Service Track</span>
                </div>

                {/* Vertical Service Cards */}
                <div className="space-y-2.5">
                  {CORE_SERVICES.map((serv) => {
                    const isActive = activeService === serv.id;
                    const Icon = serv.icon;
                    return (
                      <button
                        key={serv.id}
                        onClick={() => setActiveService(serv.id)}
                        className={`w-full text-left p-3 rounded-xl border transition-all flex items-center gap-3.5 ${
                          isActive
                            ? 'bg-[#141B26] border-[#00FFD1]/40 shadow-[0_0_15px_rgba(0,255,209,0.12)]'
                            : 'bg-black/40 border-white/[0.06] hover:border-white/20'
                        }`}
                      >
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center border ${
                          isActive ? 'bg-[#00FFD1]/20 border-[#00FFD1]/40 text-[#00FFD1]' : 'bg-white/5 border-white/10 text-neutral-400'
                        }`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <div className="min-w-0">
                          <h4 className={`text-xs sm:text-sm font-semibold ${isActive ? 'text-white' : 'text-neutral-300'}`}>
                            {serv.title}
                          </h4>
                          <p className="text-[11px] text-neutral-400 truncate mt-0.5">
                            {serv.desc}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Analyze Scene / Rapid Architecture Feature Block */}
              <div className="pt-4 border-t border-white/[0.08]">
                <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-[#00FFA3] to-[#0076F7] p-[1px] mb-3">
                  <div className="w-full h-full bg-[#0E131C] rounded-[7px] flex items-center justify-center">
                    <Layers className="w-4 h-4 text-[#00FFD1]" />
                  </div>
                </div>
                <h3 className="font-display font-bold text-xl text-white mb-2">
                  Full-Stack Architecture
                </h3>
                <p className="text-sm text-neutral-400 leading-relaxed font-normal">
                  We don't just build code; we engineer automated acquisition funnels, viral social hooks,
                  and scalable cloud backends built to grow with your revenue.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
