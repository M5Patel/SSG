import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const quickLinks = [
  { to: '/', label: 'Home' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/members', label: 'Players' },
  { to: '/teams', label: 'Teams' },
  { to: '/sponsors', label: 'Sponsors' },
  { to: '/about', label: 'About' },
];

const Footer = () => {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <footer className="relative overflow-hidden" id="site-footer" ref={ref}>
      {/* Top gradient border */}
      <div className="h-[1px] bg-gradient-to-r from-transparent via-[#f0b429]/30 to-transparent" />

      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#050810] via-[#0a0e17] to-[#0a0e17]" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#f0b429]/[0.02] rounded-full blur-[120px]" />
      <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-[#818cf8]/[0.02] rounded-full blur-[100px]" />

      <div className="relative z-10 max-w-6xl mx-auto px-5 md:px-8 py-14 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-12"
        >
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#f0b429] to-[#d4942a] flex items-center justify-center shadow-[0_0_20px_rgba(240,180,41,0.25)]">
                <span className="font-bold text-[#0a0e17] text-lg">S</span>
              </div>
              <span className="font-display font-bold text-xl text-[#f0f6fc]">SSGPL</span>
            </div>
            <p className="font-body text-[#8b949e] text-sm leading-relaxed mb-5 max-w-xs">
              The most electrifying corporate cricket tournament. Where warriors become legends.
            </p>
            <span className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-[#f0b429]/15 bg-[#f0b429]/[0.04] text-[#f0b429] font-heading text-[10px] font-semibold tracking-[0.15em] uppercase backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#f0b429] opacity-40" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#f0b429]" />
              </span>
              Season 2 · 2026
            </span>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-semibold text-xs text-[#f0f6fc] mb-5 tracking-[0.15em] uppercase flex items-center gap-2">
              <span className="w-5 h-[1px] bg-[#f0b429]/40" />
              Quick Links
            </h4>
            <nav className="flex flex-col gap-3">
              {quickLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className="font-body text-[#8b949e] hover:text-[#f0b429] transition-all duration-300 text-sm hover:translate-x-1 inline-flex items-center gap-2 group"
                >
                  <span className="w-0 group-hover:w-3 h-[1px] bg-[#f0b429] transition-all duration-300" />
                  {link.label}
                </NavLink>
              ))}
            </nav>
          </div>

          {/* Info */}
          <div>
            <h4 className="font-heading font-semibold text-xs text-[#f0f6fc] mb-5 tracking-[0.15em] uppercase flex items-center gap-2">
              <span className="w-5 h-[1px] bg-[#f0b429]/40" />
              Season 2
            </h4>
            <div className="space-y-3.5 font-body text-sm">
              {[
                { icon: '📅', label: 'April 26, 2026' },
                { icon: '🏏', label: '6 Teams · 84 Players' },
                { icon: '🏆', label: 'Where Legends Are Born' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 group">
                  <div className="w-8 h-8 rounded-lg bg-white/[0.03] border border-white/[0.05] flex items-center justify-center text-sm group-hover:border-[#f0b429]/20 transition-colors duration-300">
                    {item.icon}
                  </div>
                  <span className="text-[#b1bac4] font-medium">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Bottom bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="border-t border-white/[0.04] mt-12 pt-7 flex flex-col sm:flex-row items-center justify-between gap-3"
        >
          <p className="font-body text-xs text-[#484f58]">
            © 2026 SSGPL Cricket Tournament. All rights reserved.
          </p>
          <p className="font-body text-xs text-[#484f58]">
            Built with ❤️ for the love of cricket
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
