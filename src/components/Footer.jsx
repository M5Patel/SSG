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
    <footer className="relative overflow-hidden bg-[#050810]" id="site-footer" ref={ref}>
      {/* Top gradient border */}
      <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-[#f0b429]/30 to-transparent" />

      {/* Background effects (pointer-events-none prevents blocking clicks) */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#050810] via-[#0a0e17] to-[#0a0e17] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#f0b429]/[0.03] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-[#818cf8]/[0.02] rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-8"
        >
          {/* Brand Column */}
          <div className="flex flex-col items-start">
            <NavLink to="/" className="group mb-6 inline-block" id="nav-logo">
              <div className="relative transition-all duration-300 group-hover:drop-shadow-[0_0_20px_rgba(240,180,41,0.4)]">
                <img
                  src="/teamlogo/image.png"
                  alt="SSGPL Logo"
                  className="h-16 w-auto max-w-[160px] object-contain rounded-xl group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </NavLink>

            <p className="font-body text-[#8b949e] text-sm leading-relaxed mb-6 max-w-sm">
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

          {/* Quick Links Column */}
          <div className="lg:mx-auto">
            <h4 className="font-heading font-semibold text-xs text-[#f0f6fc] mb-6 tracking-[0.15em] uppercase flex items-center gap-2">
              <span className="w-5 h-[1px] bg-[#f0b429]/40" />
              Quick Links
            </h4>
            <nav className="flex flex-col gap-4">
              {quickLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className="font-body text-[#8b949e] hover:text-[#f0b429] transition-all duration-300 text-sm hover:translate-x-1 inline-flex items-center gap-2 group w-fit"
                >
                  <span className="w-0 group-hover:w-3 h-[1px] bg-[#f0b429] transition-all duration-300" />
                  {link.label}
                </NavLink>
              ))}
            </nav>
          </div>

          {/* Info Column */}
          <div>
            <h4 className="font-heading font-semibold text-xs text-[#f0f6fc] mb-6 tracking-[0.15em] uppercase flex items-center gap-2">
              <span className="w-5 h-[1px] bg-[#f0b429]/40" />
              Season 2 Details
            </h4>
            <div className="space-y-4 font-body text-sm">
              {[
                { icon: '📅', label: 'April 26, 2026' },
                { icon: '🏏', label: '6 Teams · 84 Players' },
                { icon: '🏆', label: 'Where Legends Are Born' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 group cursor-default">
                  <div className="w-10 h-10 rounded-xl bg-white/[0.02] border border-white/[0.05] flex items-center justify-center text-base group-hover:border-[#f0b429]/30 group-hover:bg-[#f0b429]/5 transition-all duration-300">
                    {item.icon}
                  </div>
                  <span className="text-[#b1bac4] group-hover:text-[#f0f6fc] transition-colors duration-300 font-medium">
                    {item.label}
                  </span>
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
          className="border-t border-white/[0.04] mt-16 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left"
        >
          <p className="font-body text-xs text-[#fofofo]">
            © 2026 SSGPL Cricket Tournament. All rights reserved.
          </p>
          <p className="font-body text-xs text-[#fofofo] flex items-center justify-center gap-1.5">
            Built by Mann Patel
          </p>

      </motion.div>
    </div>
    </footer >
  );
};

export default Footer;