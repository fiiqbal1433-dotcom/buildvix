import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ExternalLink } from 'lucide-react';

interface ArtCard {
  id: number;
  title: string;
  category: string;
  image: string;
  tag?: string | null;
  tagColor?: string;
  actionText?: string;
}

const WEBSITE_CARDS: ArtCard[] = [
  {
    id: 0,
    title: 'Next.js Web Platforms',
    category: 'NEXT.JS WEB ARCHITECTURE',
    image: '/assets/work/project1.webp',
    tag: '@buildvix',
    tagColor: '#173ded',
    actionText: 'View Project',
  },
  {
    id: 1,
    title: 'Interactive 3D Experiences',
    category: 'INTERACTIVE WEBGL & 3D UI',
    image: '/assets/work/project5.webp',
    tag: null,
    actionText: 'View Project',
  },
  {
    id: 2,
    title: 'SaaS & Conversion Portals',
    category: 'BESPOKE SOFTWARE // SAAS',
    image: '/assets/work/project2.webp',
    tag: null,
    actionText: 'View Project',
  },
  {
    id: 3,
    title: 'E-Commerce & Digital Stores',
    category: 'FULL-STACK E-COMMERCE',
    image: '/assets/work/project3.webp',
    tag: '@web_scale',
    tagColor: '#5f86ff',
    actionText: 'View Project',
  },
  {
    id: 4,
    title: 'Cross-Platform Mobile Apps',
    category: 'CROSS-PLATFORM MOBILE APPS',
    image: '/assets/work/project4.webp',
    tag: null,
    actionText: 'View Project',
  },
];

const SOFTWARE_CARDS: ArtCard[] = [
  {
    id: 0,
    title: 'Bespoke SaaS Platforms',
    category: 'BESPOKE SOFTWARE // SAAS',
    image: '/assets/work/project2.webp',
    tag: '@saas_dev',
    tagColor: '#173ded',
    actionText: 'View Project',
  },
  {
    id: 1,
    title: 'Enterprise Backend & APIs',
    category: 'ENTERPRISE BACKEND ARCHITECTURE',
    image: '/assets/work/project6.webp',
    tag: null,
    actionText: 'View Project',
  },
  {
    id: 2,
    title: 'Next.js Web Platforms',
    category: 'NEXT.JS WEB ARCHITECTURE',
    image: '/assets/work/project1.webp',
    tag: null,
    actionText: 'View Project',
  },
  {
    id: 3,
    title: 'Cross-Platform Mobile Apps',
    category: 'CROSS-PLATFORM MOBILE APPS',
    image: '/assets/work/project4.webp',
    tag: '@fullstack',
    tagColor: '#10162f',
    actionText: 'View Project',
  },
  {
    id: 4,
    title: 'Algorithmic Growth Engine',
    category: 'AUTOMATION & GROWTH TELEMETRY',
    image: '/assets/work/project7.webp',
    tag: null,
    actionText: 'View Project',
  },
];

export default function HeroSection() {
  const [viewMode, setViewMode] = useState<'websites' | 'software'>('websites');
  const [activeCard, setActiveCard] = useState<number>(2);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [autoCycle] = useState<boolean>(false);

  // Auto-transition timer if user enables it
  useEffect(() => {
    if (!autoCycle) return;
    const interval = setInterval(() => {
      setViewMode((prev) => (prev === 'websites' ? 'software' : 'websites'));
    }, 7000);
    return () => clearInterval(interval);
  }, [autoCycle]);

  const currentCards = viewMode === 'websites' ? WEBSITE_CARDS : SOFTWARE_CARDS;

  const scrollToSection = (e: React.MouseEvent, sectionId: string = 'work') => {
    e.preventDefault();
    const target = document.getElementById(sectionId) || document.getElementById('work') || document.getElementById('services');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.hash = `#${sectionId}`;
    }
  };

  // Fan transformation offsets for Centered Mode (Websites)
  const centeredFanStyles = [
    { x: -240, y: 24, rotate: -14, scale: 0.92, zIndex: 10 },
    { x: -120, y: 8, rotate: -7, scale: 0.96, zIndex: 15 },
    { x: 0, y: 0, rotate: 0, scale: 1.04, zIndex: 20 },
    { x: 120, y: 8, rotate: 7, scale: 0.96, zIndex: 15 },
    { x: 240, y: 24, rotate: 14, scale: 0.92, zIndex: 10 },
  ];

  // Fan transformation offsets for Split Mode (Software)
  const splitFanStyles = [
    { x: -130, y: 30, rotate: -12, scale: 0.9, zIndex: 10 },
    { x: -65, y: 15, rotate: -6, scale: 0.94, zIndex: 15 },
    { x: 0, y: 0, rotate: 0, scale: 1.02, zIndex: 20 },
    { x: 65, y: 15, rotate: 6, scale: 0.94, zIndex: 15 },
    { x: 130, y: 30, rotate: 12, scale: 0.9, zIndex: 10 },
  ];

  return (
    <section id="home" className="relative min-h-[92vh] flex flex-col items-center justify-center pt-32 pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden bg-[#040718]">
      {/* Ambient Royal Cobalt Radial Glow matching 'OUR WORK, BUILT TO SCALE' */}
      <div className="absolute top-1/6 left-1/2 -translate-x-1/2 w-[850px] h-[520px] bg-gradient-to-b from-[#173ded]/20 via-[#5f86ff]/10 to-transparent blur-[140px] pointer-events-none -z-10" />

      {/* Mode Switcher Pill Bar (Websites & Custom Software with direct Projects redirection) */}
      <div className="relative z-20 inline-flex items-center gap-1.5 p-1.5 rounded-full bg-[#0a1024]/90 border border-[#5f86ff]/25 backdrop-blur-xl shadow-[0_12px_36px_rgba(4,7,24,0.8),0_0_24px_rgba(23,61,237,0.2)] mb-8">
        <button
          type="button"
          onClick={() => setViewMode('websites')}
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono font-semibold uppercase tracking-wider transition-all duration-300 ${
            viewMode === 'websites'
              ? 'bg-gradient-to-r from-[#173ded] to-[#2554ff] text-white shadow-[0_0_22px_rgba(23,61,237,0.7)] font-bold'
              : 'text-neutral-400 hover:text-white hover:bg-white/5'
          }`}
          title="Switch to Websites Showcase"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-current" />
          01 Websites Showcase
        </button>
        <button
          type="button"
          onClick={() => setViewMode('software')}
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono font-semibold uppercase tracking-wider transition-all duration-300 ${
            viewMode === 'software'
              ? 'bg-gradient-to-r from-[#173ded] to-[#2554ff] text-white shadow-[0_0_22px_rgba(23,61,237,0.7)] font-bold'
              : 'text-neutral-400 hover:text-white hover:bg-white/5'
          }`}
          title="Switch to Custom Software Showcase"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-current" />
          02 Custom Software
        </button>
        <button
          type="button"
          onClick={(e) => scrollToSection(e, 'work')}
          className="flex items-center gap-1 px-3 py-1.5 border-l border-white/10 text-xs font-mono text-[#5f86ff] font-bold hover:text-white transition-colors"
          title="Jump directly to Projects Showcase"
        >
          View Projects ↓
        </button>
      </div>

      <div className="w-full max-w-7xl mx-auto relative z-10">
        <AnimatePresence mode="wait">
          {viewMode === 'websites' ? (
            /* ========================================================
               STATE 1: CENTERED WEBSITES FAN-OUT SHOWCASE
               ======================================================== */
            <motion.div
              key="websites-mode"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center text-center"
            >
              {/* Floating Top Category Badge */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut' }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#173ded]/15 border border-[#5f86ff]/35 text-[#5f86ff] text-xs font-mono font-semibold uppercase tracking-widest shadow-[0_0_20px_rgba(23,61,237,0.25)] mb-5"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8] animate-pulse" />
                BUILDVIX DIGITAL // HIGH-CONVERTING WEBSITES
              </motion.div>

              {/* Monumental Floating Headline tailored to Websites */}
              <motion.h1
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
                className="font-display font-extrabold text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-white max-w-5xl mx-auto leading-[1.06]"
              >
                You imagine it.{' '}
                <span className="bg-gradient-to-r from-white via-[#b8d4ff] to-[#5f86ff] bg-clip-text text-transparent">
                  We build it.
                </span>
              </motion.h1>

              {/* The Fan-Out Deck of Graphic Cards */}
              <div className="relative w-full max-w-4xl h-[360px] sm:h-[400px] my-10 flex items-center justify-center perspective-[1600px]">
                {/* Floating Tag 1: @buildvix (Royal Cobalt Blue) */}
                <motion.div
                  animate={{
                    y: [0, -12, 0],
                    rotate: [-1, 2, -1],
                  }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  onClick={(e) => scrollToSection(e, 'work')}
                  className="absolute top-[10%] left-[14%] sm:left-[18%] z-35 px-4 py-1.5 rounded-full bg-[#173ded] text-white text-xs sm:text-sm font-bold shadow-[0_10px_30px_rgba(23,61,237,0.6)] cursor-pointer select-none hover:scale-110 transition-transform"
                  title="Click to view website projects"
                >
                  @buildvix
                  <span className="absolute -bottom-1.5 left-5 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-[#173ded]" />
                </motion.div>

                {/* Floating Tag 2: @web_scale (Electric Blue) */}
                <motion.div
                  animate={{
                    y: [-4, 8, -4],
                    rotate: [1, -2, 1],
                  }}
                  transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
                  onClick={(e) => scrollToSection(e, 'work')}
                  className="absolute top-[14%] right-[14%] sm:right-[18%] z-35 px-4 py-1.5 rounded-full bg-[#5f86ff] text-white text-xs sm:text-sm font-bold shadow-[0_10px_30px_rgba(95,134,255,0.55)] cursor-pointer select-none hover:scale-110 transition-transform"
                  title="Click to view website projects"
                >
                  @web_scale
                  <span className="absolute -bottom-1.5 right-5 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-[#5f86ff]" />
                </motion.div>

                {/* 5 Cards Stack */}
                {currentCards.map((card, idx) => {
                  const geometry = centeredFanStyles[idx];
                  const isHovered = hoveredCard === idx;
                  const isActive = activeCard === idx;

                  return (
                    <motion.div
                      key={card.id}
                      animate={{
                        x: isHovered ? geometry.x : geometry.x,
                        y: isHovered ? geometry.y - 28 : geometry.y,
                        rotate: isHovered ? 0 : geometry.rotate,
                        scale: isHovered ? 1.12 : geometry.scale,
                        zIndex: isHovered ? 45 : geometry.zIndex,
                      }}
                      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                      onMouseEnter={() => setHoveredCard(idx)}
                      onMouseLeave={() => setHoveredCard(null)}
                      onClick={(e) => {
                        setActiveCard(idx);
                        scrollToSection(e, 'work');
                      }}
                      className={`group absolute w-[160px] sm:w-[210px] md:w-[224px] h-[220px] sm:h-[280px] md:h-[305px] rounded-2xl overflow-hidden bg-[#091026] border transition-all duration-300 cursor-pointer select-none ${
                        isHovered || isActive
                          ? 'border-[#5f86ff] shadow-[0_35px_70px_rgba(0,0,0,0.95),0_0_35px_rgba(37,84,255,0.6)]'
                          : 'border-[#5f86ff]/20 shadow-[0_20px_50px_rgba(0,0,0,0.85)]'
                      }`}
                    >
                      <div className="relative w-full h-full flex flex-col">
                        <div className="absolute top-2.5 right-2.5 z-20 px-2 py-0.5 rounded-full bg-[#060b1e]/85 border border-[#5f86ff]/45 text-[#5f86ff] font-mono text-[9px] uppercase tracking-wider backdrop-blur-md flex items-center gap-1 group-hover:bg-[#173ded] group-hover:text-white transition-colors">
                          <span>Project</span>
                          <ExternalLink className="w-2.5 h-2.5" />
                        </div>
                        <img
                          src={card.image}
                          alt={card.title}
                          className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                          draggable={false}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#040718] via-black/40 to-transparent pointer-events-none" />
                        <div className="absolute bottom-0 inset-x-0 p-3.5 sm:p-4 z-10 flex flex-col gap-0.5 text-left">
                          <span className="text-[10px] sm:text-xs font-mono text-[#5f86ff] uppercase tracking-wider font-semibold">
                            {card.category}
                          </span>
                          <h3 className="font-display font-bold text-xs sm:text-sm text-white">
                            {card.title}
                          </h3>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Floating Narrative Subtitle */}
              <motion.p
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
                className="font-sans text-base sm:text-lg text-neutral-300 max-w-xl mx-auto leading-relaxed mb-8"
              >
                From ultra-fast Next.js web applications to immersive interactive experiences. Buildvix designs and codes high-impact websites engineered to scale your traffic and turn visitors into loyal clients.
              </motion.p>

              {/* Action Buttons */}
              <div className="flex items-center justify-center gap-5 flex-wrap">
                <a
                  href="#contact"
                  className="px-8 py-3.5 rounded-full text-sm sm:text-base font-bold text-white bg-[#0c1638] border border-[#5f86ff]/45 shadow-[0_0_24px_rgba(23,61,237,0.35)] hover:bg-[#173ded] hover:border-[#5f86ff] hover:shadow-[0_0_35px_rgba(37,84,255,0.75)] transition-all transform hover:-translate-y-0.5"
                >
                  Start Project
                </a>
                <a
                  href="#work"
                  onClick={(e) => scrollToSection(e, 'work')}
                  className="inline-flex items-center gap-2 text-sm sm:text-base font-medium text-neutral-300 hover:text-white group px-3 py-2 transition-colors cursor-pointer"
                >
                  <span>Explore All Projects</span>
                  <ArrowRight className="w-4 h-4 text-neutral-400 group-hover:text-white group-hover:translate-x-1 transition-all" />
                </a>
              </div>
            </motion.div>
          ) : (
            /* ========================================================
               STATE 2: SPLIT SHOWCASE (Custom Software)
               ======================================================== */
            <motion.div
              key="software-mode"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center text-left"
            >
              {/* Left Column: Category, Big Floating Headline & CTAs */}
              <div className="flex flex-col gap-5 max-w-xl">
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut' }}
                  className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#173ded]/15 border border-[#5f86ff]/35 text-[#5f86ff] text-xs font-mono font-semibold uppercase tracking-widest w-fit shadow-[0_0_20px_rgba(23,61,237,0.25)]"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8] animate-pulse" />
                  BUILDVIX // BESPOKE SOFTWARE ENGINEERING
                </motion.div>

                <motion.h1
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
                  className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl text-white leading-[1.08] tracking-tight"
                >
                  Bespoke software, <span className="text-neutral-500 font-light">SaaS</span>
                  <br />
                  &amp; automated cloud
                  <br />
                  scale architectures.
                </motion.h1>

                <motion.p
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
                  className="font-sans text-base sm:text-lg text-neutral-300 leading-relaxed"
                >
                  We architect custom cloud platforms, high-throughput APIs, and automated distribution systems. Scalable code built to optimize operations and automate customer growth.
                </motion.p>

                <div className="flex items-center gap-5 pt-3">
                  <a
                    href="#contact"
                    className="px-8 py-3.5 rounded-full text-sm sm:text-base font-bold text-white bg-[#0c1638] border border-[#5f86ff]/45 shadow-[0_0_24px_rgba(23,61,237,0.35)] hover:bg-[#173ded] hover:border-[#5f86ff] hover:shadow-[0_0_35px_rgba(37,84,255,0.75)] transition-all transform hover:-translate-y-0.5"
                  >
                    Start Project
                  </a>
                  <a
                    href="#work"
                    onClick={(e) => scrollToSection(e, 'work')}
                    className="inline-flex items-center gap-2 text-sm sm:text-base font-medium text-neutral-300 hover:text-white group px-3 py-2 transition-colors cursor-pointer"
                  >
                    <span>Explore Software Projects</span>
                    <ArrowRight className="w-4 h-4 text-neutral-400 group-hover:text-white group-hover:translate-x-1 transition-all" />
                  </a>
                </div>
              </div>

              {/* Right Column: Angled Cards Fan Stack */}
              <div className="relative h-[360px] sm:h-[420px] flex items-center justify-center perspective-[1600px]">
                {/* Floating Tag: @saas_dev (Cobalt Blue) */}
                <motion.div
                  animate={{
                    y: [0, -10, 0],
                    rotate: [-1, 2, -1],
                  }}
                  transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut' }}
                  onClick={(e) => scrollToSection(e, 'work')}
                  className="absolute top-[8%] left-[8%] z-35 px-4 py-1.5 rounded-full bg-[#173ded] text-white text-xs sm:text-sm font-bold shadow-[0_10px_30px_rgba(23,61,237,0.6)] cursor-pointer select-none hover:scale-110 transition-transform"
                  title="Click to view software work"
                >
                  @saas_dev
                  <span className="absolute -bottom-1.5 left-5 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-[#173ded]" />
                </motion.div>

                {/* Floating Tag: @fullstack (Midnight Blue Glass) */}
                <motion.div
                  animate={{
                    y: [-4, 8, -4],
                    rotate: [1, -2, 1],
                  }}
                  transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}
                  onClick={(e) => scrollToSection(e, 'work')}
                  className="absolute top-[12%] right-[8%] z-35 px-4 py-1.5 rounded-full bg-[#0a1024] text-white border border-[#5f86ff]/35 text-xs sm:text-sm font-bold shadow-[0_10px_30px_rgba(0,0,0,0.8)] cursor-pointer select-none hover:scale-110 transition-transform"
                  title="Click to view software work"
                >
                  @fullstack
                  <span className="absolute -bottom-1.5 right-5 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-[#0a1024]" />
                </motion.div>

                {currentCards.map((card, idx) => {
                  const geometry = splitFanStyles[idx];
                  const isHovered = hoveredCard === idx;
                  const isActive = activeCard === idx;

                  return (
                    <motion.div
                      key={card.id}
                      animate={{
                        x: isHovered ? geometry.x : geometry.x,
                        y: isHovered ? geometry.y - 25 : geometry.y,
                        rotate: isHovered ? 0 : geometry.rotate,
                        scale: isHovered ? 1.1 : geometry.scale,
                        zIndex: isHovered ? 45 : geometry.zIndex,
                      }}
                      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                      onMouseEnter={() => setHoveredCard(idx)}
                      onMouseLeave={() => setHoveredCard(null)}
                      onClick={(e) => {
                        setActiveCard(idx);
                        scrollToSection(e, 'work');
                      }}
                      className={`group absolute w-[150px] sm:w-[190px] md:w-[210px] h-[210px] sm:h-[260px] md:h-[290px] rounded-2xl overflow-hidden bg-[#091026] border transition-all duration-300 cursor-pointer select-none ${
                        isHovered || isActive
                          ? 'border-[#5f86ff] shadow-[0_35px_70px_rgba(0,0,0,0.95),0_0_35px_rgba(37,84,255,0.6)]'
                          : 'border-[#5f86ff]/20 shadow-[0_20px_50px_rgba(0,0,0,0.85)]'
                      }`}
                    >
                      <div className="relative w-full h-full flex flex-col">
                        <div className="absolute top-2.5 right-2.5 z-20 px-2 py-0.5 rounded-full bg-[#060b1e]/85 border border-[#5f86ff]/45 text-[#5f86ff] font-mono text-[9px] uppercase tracking-wider backdrop-blur-md flex items-center gap-1 group-hover:bg-[#173ded] group-hover:text-white transition-colors">
                          <span>Project</span>
                          <ExternalLink className="w-2.5 h-2.5" />
                        </div>
                        <img
                          src={card.image}
                          alt={card.title}
                          className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                          draggable={false}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#040718] via-black/40 to-transparent pointer-events-none" />
                        <div className="absolute bottom-0 inset-x-0 p-3 sm:p-4 z-10 flex flex-col gap-0.5 text-left">
                          <span className="text-[10px] sm:text-xs font-mono text-[#5f86ff] uppercase tracking-wider font-semibold">
                            {card.category}
                          </span>
                          <h3 className="font-display font-bold text-xs sm:text-sm text-white">
                            {card.title}
                          </h3>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
