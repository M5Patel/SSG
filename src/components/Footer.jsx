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

// Framer Motion Variants for Staggered Animations
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const Footer = () => {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    // Added a subtle backdrop blur to the main container
    <footer className="relative overflow-hidden bg-[#050810]/90 backdrop-blur-xl" id="site-footer" ref={ref}>
      
      {/* Top gradient glass border */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#f0b429]/50 to-transparent shadow-[0_0_15px_rgba(240,180,41,0.5)]" />

      {/* Animated Background effects (moving blobs to highlight glassmorphism) */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#050810] via-transparent to-transparent pointer-events-none z-0" />
      
      <motion.div 
        animate={{ y: [0, -30, 0], scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#f0b429]/10 rounded-full blur-[100px] pointer-events-none z-0" 
      />
      <motion.div 
        animate={{ y: [0, 20, 0], scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-10 right-1/4 w-72 h-72 bg-[#818cf8]/10 rounded-full blur-[90px] pointer-events-none z-0" 
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-8"
        >
          {/* Brand Column */}
          <motion.div variants={itemVariants} className="flex flex-col items-start">
            <NavLink to="/" className="group mb-6 inline-block" id="nav-logo">
              <div className="relative transition-all duration-300 group-hover:drop-shadow-[0_0_20px_rgba(240,180,41,0.6)]">
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

            {/* Glass pill badge */}
            <span className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-white/10 bg-white/[0.03] shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] text-[#f0b429] font-heading text-[10px] font-semibold tracking-[0.15em] uppercase backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#f0b429] opacity-60" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#f0b429]" />
              </span>
              Season 2 · 2026
            </span>
          </motion.div>

          {/* Quick Links Column */}
          <motion.div variants={itemVariants} className="lg:mx-auto">
            <h4 className="font-heading font-semibold text-xs text-[#f0f6fc] mb-6 tracking-[0.15em] uppercase flex items-center gap-2">
              <span className="w-5 h-[1px] bg-[#f0b429]/60 shadow-[0_0_8px_rgba(240,180,41,0.8)]" />
              Quick Links
            </h4>
            <nav className="flex flex-col gap-4">
              {quickLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className="font-body text-[#fofofo] hover:text-[#f0b429] transition-all duration-300 text-sm hover:translate-x-2 inline-flex items-center gap-2 group w-fit"
                >
                  <span className="w-0 group-hover:w-4 h-[1px] bg-[#f0b429] transition-all duration-300 ease-out" />
                  {link.label}
                </NavLink>
              ))}
            </nav>
          </motion.div>

          {/* Info Column (Now enclosed in a glass card) */}
          <motion.div variants={itemVariants}>
            <h4 className="font-heading font-semibold text-xs text-[#f0f6fc] mb-6 tracking-[0.15em] uppercase flex items-center gap-2">
              <span className="w-5 h-[1px] bg-[#f0b429]/60 shadow-[0_0_8px_rgba(240,180,41,0.8)]" />
              Season 2 Details
            </h4>
            
            {/* Glass Container for details */}
            <div className="space-y-3 font-body text-sm bg-white/[0.02] border border-white/5 p-5 rounded-2xl backdrop-blur-lg shadow-xl shadow-black/20">
              {[
                { icon: '📅', label: 'April 26, 2026' },
                { icon: '🏏', label: '6 Teams · 84 Players' },
                { icon: '🏆', label: 'Where Legends Are Born' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 group cursor-default p-2 rounded-xl hover:bg-white/[0.04] transition-colors duration-300">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-white/5 to-white/0 border border-white/10 flex items-center justify-center text-base group-hover:border-[#f0b429]/40 group-hover:shadow-[0_0_15px_rgba(240,180,41,0.2)] transition-all duration-300">
                    {item.icon}
                  </div>
                  <span className="text-[#b1bac4] group-hover:text-[#f0f6fc] transition-colors duration-300 font-medium">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="relative border-t border-white/10 mt-16 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left"
        >
          {/* Subtle inner highlight for the border */}
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent" />
          
          <p className="font-body text-xs text-[#fofofo]">
            © 2026 SSGPL Cricket Tournament. All rights reserved.
          </p>
          <p className="font-body text-xs text-[#a3a3a3] flex items-center justify-center gap-1.5 hover:text-white transition-colors duration-300 cursor-default">
            Built by <span className="text-[#f0b429] font-medium tracking-wide">Mann Patel</span>
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;