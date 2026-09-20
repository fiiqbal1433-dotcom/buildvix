import { useState } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';

export default function Navbar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#08090C]/80 backdrop-blur-xl border-b border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2.5 text-white group">
          <img src="/assets/logo.svg" alt="BUILDVIX" className="h-8 w-auto transition-transform duration-200 group-hover:scale-105" />
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm text-neutral-300 font-medium">
          <a href="#services" className="hover:text-white transition-colors">Websites</a>
          <a href="#software" className="hover:text-white transition-colors">Software</a>
          <a href="#social" className="hover:text-white transition-colors">Social Growth</a>
          <a href="#features" className="hover:text-white transition-colors">Capabilities</a>
          <a href="#quote" className="hover:text-white transition-colors">Pricing</a>
        </nav>

        {/* CTA Button */}
        <div className="hidden md:flex items-center gap-4">
          <a 
            href="#portal"
            className="text-sm text-neutral-300 hover:text-white font-medium transition-colors px-3 py-2"
          >
            Client Login
          </a>
          <a
            href="#quote"
            className="relative group px-5 py-2.5 rounded-full text-sm font-semibold text-white overflow-hidden shadow-[0_0_20px_rgba(0,213,146,0.25)] transition-all duration-300 hover:shadow-[0_0_28px_rgba(0,213,146,0.45)]"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#00D592] via-[#00B4D8] to-[#0076F7] transition-all group-hover:scale-105" />
            <span className="relative z-10 flex items-center gap-1.5">
              Start Project <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </a>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="md:hidden p-2 text-neutral-400 hover:text-white focus:outline-none"
          aria-label="Toggle Menu"
        >
          {isMobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {isMobileOpen && (
        <div className="md:hidden bg-[#0C0F15] border-b border-white/[0.08] px-6 py-6 space-y-4">
          <a 
            href="#services" 
            onClick={() => setIsMobileOpen(false)}
            className="block text-neutral-300 hover:text-white font-medium py-1"
          >
            Websites
          </a>
          <a 
            href="#software" 
            onClick={() => setIsMobileOpen(false)}
            className="block text-neutral-300 hover:text-white font-medium py-1"
          >
            Software Making
          </a>
          <a 
            href="#social" 
            onClick={() => setIsMobileOpen(false)}
            className="block text-neutral-300 hover:text-white font-medium py-1"
          >
            Social Growth & Followers
          </a>
          <a 
            href="#features" 
            onClick={() => setIsMobileOpen(false)}
            className="block text-neutral-300 hover:text-white font-medium py-1"
          >
            Capabilities
          </a>
          <div className="pt-4 border-t border-white/[0.08] flex flex-col gap-3">
            <a
              href="#quote"
              onClick={() => setIsMobileOpen(false)}
              className="w-full text-center py-3 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-[#00D592] to-[#0076F7]"
            >
              Start Project
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
