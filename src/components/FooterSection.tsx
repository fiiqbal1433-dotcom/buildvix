import { useState, type FormEvent } from 'react';
import { Send, Youtube, Instagram, CheckCircle, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function FooterSection() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      fetch('https://formsubmit.co/ajax/buildvixion@gmail.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          inquiry: 'Free Quote Request',
          email: email,
          _subject: `BUILDVIX Quote Request from ${email}`
        })
      }).catch(() => {});
      setTimeout(() => setSubmitted(false), 4000);
      setEmail('');
    }
  };

  return (
    <footer id="quote" className="bg-[#06080B] border-t border-white/[0.08] pt-24 pb-12 relative overflow-hidden">
      {/* Background Radial Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-[#00FFD1]/5 blur-[160px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Top CTA Banner */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 pb-20 border-b border-white/[0.08]">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-display font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white max-w-2xl leading-[1.1]"
          >
            Ready to build your <br />
            <span className="text-gradient-cyan">next website, software</span> <br />
            or social growth engine?
          </motion.h2>

          {/* Subscribe / Quote Request Action Container */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="flex flex-col items-start lg:items-end gap-2"
          >
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email for free quote"
                required
                className="px-5 py-3.5 rounded-full bg-white/5 border border-white/10 text-white placeholder:text-neutral-500 text-sm focus:outline-none focus:border-[#00FFD1]/50 sm:w-72"
              />
              <button
                type="submit"
                className="px-6 py-3.5 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-[#00D592] to-[#0076F7] shadow-[0_0_20px_rgba(0,213,146,0.3)] hover:shadow-[0_0_30px_rgba(0,213,146,0.5)] transition-all flex items-center justify-center gap-2"
              >
                {submitted ? (
                  <>
                    <CheckCircle className="w-4 h-4 text-white" />
                    <span>Inquiry Sent!</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Get Free Quote</span>
                  </>
                )}
              </button>
            </form>
            <p className="text-xs text-neutral-400 mt-1">
              Includes free architecture consultation & social growth audit.
            </p>
          </motion.div>
        </div>

        {/* Multi-Column Links Section */}
        <div className="py-16 grid grid-cols-2 md:grid-cols-6 gap-8">
          {/* Logo & Brand Col */}
          <div className="col-span-2 md:col-span-1">
            <a href="#" className="flex items-center gap-2 text-white">
              <img src="/assets/logo.svg" alt="BUILDVIX" className="h-7 w-auto" />
            </a>
            <p className="text-xs text-neutral-400 mt-3 leading-relaxed">
              Custom websites, scalable software, and rapid social media follower scaling.
            </p>
          </div>

          {/* Links Column: Websites */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Websites</h4>
            <ul className="space-y-2.5 text-xs text-neutral-400 font-normal">
              <li><a href="#services" className="hover:text-white transition-colors">Landing Pages</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">E-Commerce Stores</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">3D Web Experiences</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Speed Optimization</a></li>
            </ul>
          </div>

          {/* Links Column: Software */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Software</h4>
            <ul className="space-y-2.5 text-xs text-neutral-400 font-normal">
              <li><a href="#software" className="hover:text-white transition-colors">Custom SaaS Platforms</a></li>
              <li><a href="#software" className="hover:text-white transition-colors">Mobile Applications</a></li>
              <li><a href="#software" className="hover:text-white transition-colors">AI & Automations</a></li>
              <li><a href="#software" className="hover:text-white transition-colors">Cloud Architecture</a></li>
            </ul>
          </div>

          {/* Links Column: Social Growth */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Social Growth</h4>
            <ul className="space-y-2.5 text-xs text-neutral-400 font-normal">
              <li><a href="#social" className="hover:text-white transition-colors">Follower Scaling</a></li>
              <li><a href="#social" className="hover:text-white transition-colors">Viral Reels & TikTok</a></li>
              <li><a href="#social" className="hover:text-white transition-colors">Engagement Retention</a></li>
              <li><a href="#social" className="hover:text-white transition-colors">Content Distribution</a></li>
            </ul>
          </div>

          {/* Links Column: Company */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Company</h4>
            <ul className="space-y-2.5 text-xs text-neutral-400 font-normal">
              <li><a href="#features" className="hover:text-white transition-colors">Case Studies</a></li>
              <li><a href="#features" className="hover:text-white transition-colors">Our Process</a></li>
              <li><a href="#features" className="hover:text-white transition-colors">Client Reviews</a></li>
              <li><a href="#features" className="hover:text-white transition-colors">Pricing Guide</a></li>
            </ul>
          </div>

          {/* Links Column: Resources */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Resources</h4>
            <ul className="space-y-2.5 text-xs text-neutral-400 font-normal">
              <li><a href="#quote" className="hover:text-white transition-colors">Client Portal</a></li>
              <li><a href="#quote" className="hover:text-white transition-colors">Free Growth Audit</a></li>
              <li><a href="#quote" className="hover:text-white transition-colors">Tech Stack</a></li>
              <li><a href="#quote" className="hover:text-white transition-colors">Schedule Call</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Social Bar */}
        <div className="pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-400">
          <p>© {new Date().getFullYear()} BUILDVIX. Custom Websites, Software Making & Social Growth.</p>

          {/* Social Icons */}
          <div className="flex items-center gap-5 text-neutral-400">
            <a href="https://wa.me/919596813787" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" title="WhatsApp"><MessageCircle className="w-4 h-4" /></a>
            <a href="https://www.instagram.com/buildvix?stkn=MTcxZzFkNTF0aXk2dg==" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" title="Instagram"><Instagram className="w-4 h-4" /></a>
            <a href="#" className="hover:text-white transition-colors" title="YouTube"><Youtube className="w-4 h-4" /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}
