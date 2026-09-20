import { Sparkles, Globe, Terminal, Users, Palette } from 'lucide-react';
import { motion } from 'framer-motion';

const AGENCY_SERVICES = [
  {
    icon: Globe,
    title: 'Custom Website Development',
    desc: 'High-converting landing pages, 3D WebGL experiences, and e-commerce built to convert.',
    image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=600&auto=format&fit=crop',
  },
  {
    icon: Terminal,
    title: 'Custom Software Making',
    desc: 'Bespoke web applications, AI automation tools, customer portals, and enterprise backends.',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=600&auto=format&fit=crop',
  },
  {
    icon: Users,
    title: 'Social Media & Followers',
    desc: 'Targeted audience acquisition, viral short-form content distribution, and engagement growth.',
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=600&auto=format&fit=crop',
  },
  {
    icon: Palette,
    title: 'UI/UX & Brand Identity',
    desc: 'World-class design systems, typography, and interactive interfaces that elevate your market presence.',
    image: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?q=80&w=600&auto=format&fit=crop',
  },
];

export default function FeatureGridSection() {
  return (
    <section id="features" className="py-24 bg-[#08090C] relative">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-display font-bold text-3xl sm:text-5xl md:text-6xl tracking-tight text-white leading-[1.1]"
          >
            Full-stack services <br />
            designed for <span className="text-gradient-cyan">fast-growing brands</span> <br />
            and <span className="text-gradient-cyan">modern founders</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-6 text-neutral-400 text-base sm:text-lg leading-relaxed font-normal max-w-2xl"
          >
            From pixel-perfect web development and bespoke software systems to viral social media expansion,
            BUILDVIX is your dedicated full-stack execution team.
          </motion.p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {AGENCY_SERVICES.map((feat, index) => {
            const Icon = feat.icon;
            return (
              <motion.div
                key={feat.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group flex flex-col"
              >
                {/* Image Container */}
                <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-neutral-900 border border-white/[0.08] mb-4">
                  <img
                    src={feat.image}
                    alt={feat.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80 group-hover:opacity-40 transition-opacity" />

                  {/* Corner Sparkle / Icon badge */}
                  <div className="absolute top-3 left-3 w-8 h-8 rounded-lg bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-center text-[#00FFD1]">
                    <Icon className="w-4 h-4" />
                  </div>
                </div>

                {/* Text Details */}
                <h3 className="font-display font-semibold text-lg text-white group-hover:text-[#00FFD1] transition-colors">
                  {feat.title}
                </h3>
                <p className="text-neutral-400 text-sm mt-1.5 leading-snug font-normal">
                  {feat.desc}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Status Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 flex items-center gap-3 text-sm text-neutral-300 font-mono"
        >
          <div className="w-6 h-6 rounded-md bg-[#00FFD1]/10 flex items-center justify-center">
            <Sparkles className="w-3.5 h-3.5 text-[#00FFD1]" />
          </div>
          <p>
            Agile delivery cycles: We ship complete websites and functional software in weeks, not months.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
