import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/members', label: 'Players' },
  { to: '/teams', label: 'Teams' },
  { to: '/sponsors', label: 'Sponsors' },
  { to: '/about', label: 'About' },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setMobileOpen(false), [location]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      // Upgraded to a spring animation for a more natural, premium feel
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled
          // Deep glass effect on scroll: higher blur, subtle dark tint, bottom border
          ? 'bg-[#050810]/40 backdrop-blur-2xl border-b border-white/[0.05] shadow-[0_8px_32px_0_rgba(0,0,0,0.5)]'
          : 'bg-transparent pt-2' // Added slight top padding when at the top for floating look
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 flex items-center justify-between h-20 md:h-[96px]">
        
        {/* LOGO */}
        <NavLink to="/" className="flex items-center justify-center group h-full py-3 z-50" id="nav-logo">
          <div className="relative flex items-center justify-center h-full transition-all duration-500 group-hover:drop-shadow-[0_0_25px_rgba(240,180,41,0.6)]">
            <img 
              src="/teamlogo/image.png" 
              alt="SSGPL Logo" 
              className="h-full w-auto max-w-[120px] md:max-w-[160px] object-contain rounded-xl group-hover:scale-105 transition-transform duration-500 ease-out" 
            />
          </div>
        </NavLink>

        {/* Desktop Nav - The "Floating Glass Pill" */}
        <div className="hidden md:flex items-center gap-1 bg-[#121826]/40 backdrop-blur-3xl rounded-full px-2 py-2 border border-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),0_8px_32px_rgba(0,0,0,0.4)]">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              id={`nav-${link.label.toLowerCase()}`}
              className={({ isActive }) =>
                `relative px-6 py-2.5 font-heading font-bold text-[12px] tracking-[0.15em] uppercase rounded-full transition-all duration-300 overflow-hidden ${
                  isActive
                    ? 'text-[#0a0e17] bg-gradient-to-r from-[#f0b429] via-[#fcd34d] to-[#f0b429] shadow-[0_0_20px_rgba(240,180,41,0.5)] scale-105'
                    : 'text-[#94a3b8] hover:text-white hover:bg-white/10 hover:shadow-[0_0_15px_rgba(255,255,255,0.05)]'
                }`
              }
            >
              <span className="relative z-10">{link.label}</span>
            </NavLink>
          ))}
        </div>

        {/* Mobile Toggle Button - Frosted Glass */}
        <button
          className="md:hidden relative z-50 w-12 h-12 flex flex-col justify-center items-center gap-1.5 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] hover:bg-white/10 transition-all duration-300"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <motion.span
            animate={mobileOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
            className="block w-5 h-[2px] bg-[#f0b429] rounded-full origin-center transition-all duration-300"
          />
          <motion.span
            animate={mobileOpen ? { opacity: 0, width: 0 } : { opacity: 1, width: '20px' }}
            className="block h-[2px] bg-white rounded-full transition-all duration-300"
          />
          <motion.span
            animate={mobileOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
            className="block w-5 h-[2px] bg-white rounded-full origin-center transition-all duration-300"
          />
        </button>
      </div>

      {/* Mobile Menu - Full Screen Glass Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(20px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-40 md:hidden bg-[#050810]/80"
          >
            {/* Ambient Background Glows */}
            <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-[#f0b429]/10 rounded-full blur-[100px]" />
            <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-[100px]" />

            <nav className="relative z-10 flex flex-col items-center justify-center h-full gap-8">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.to}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ delay: i * 0.05, duration: 0.4, ease: "easeOut" }}
                >
                  <NavLink
                    to={link.to}
                    onClick={() => setMobileOpen(false)}
                    className={({ isActive }) =>
                      `font-heading text-4xl font-bold tracking-widest uppercase transition-all duration-300 ${
                        isActive 
                          ? 'text-transparent bg-clip-text bg-gradient-to-r from-[#f0b429] to-[#fcd34d] drop-shadow-[0_0_15px_rgba(240,180,41,0.4)]' 
                          : 'text-white/60 hover:text-white'
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4, duration: 0.4 }}
                className="mt-12"
              >
                <div className="px-6 py-2 rounded-full border border-[#f0b429]/30 bg-[#f0b429]/10 backdrop-blur-md shadow-[inset_0_1px_1px_rgba(240,180,41,0.2)]">
                  <span className="text-[#f0b429] font-heading text-[12px] font-bold tracking-[0.2em] uppercase">
                    Season 3 · Coming Soon
                  </span>
                </div>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;