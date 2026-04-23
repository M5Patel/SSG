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
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? 'backdrop-blur-2xl bg-[#0a0e17]/80 border-b border-[#f0b429]/10 shadow-[0_4px_30px_rgba(0,0,0,0.4)]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 flex items-center justify-between h-20 md:h-[88px]">
        
        {/* BIG LOGO - Uncropped & Centered */}
        <NavLink to="/" className="flex items-center justify-center group h-full py-3" id="nav-logo">
          <div className="relative flex items-center justify-center h-full transition-all duration-400 group-hover:drop-shadow-[0_0_20px_rgba(240,180,41,0.4)]">
            <img 
              src="/teamlogo/image.png" 
              alt="SSGPL Logo" 
              /* object-contain and w-auto ensures it never gets cut off! */
              className="h-full w-auto max-w-[120px] md:max-w-[160px] object-contain rounded-xl group-hover:scale-105 transition-transform duration-500" 
            />
          </div>
        </NavLink>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1 bg-white/[0.03] backdrop-blur-xl rounded-full px-2 py-1.5 border border-white/[0.04] shadow-[0_4px_20px_rgba(0,0,0,0.2)]">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              id={`nav-${link.label.toLowerCase()}`}
              className={({ isActive }) =>
                `relative px-5 py-2.5 font-heading font-semibold text-[12px] tracking-widest uppercase rounded-full transition-all duration-300 ${
                  isActive
                    ? 'text-[#0a0e17] bg-gradient-to-r from-[#f0b429] to-[#f7c948] shadow-[0_2px_15px_rgba(240,180,41,0.3)]'
                    : 'text-[#8b949e] hover:text-[#f0f6fc] hover:bg-white/[0.05]'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden w-11 h-11 flex flex-col justify-center items-center gap-1.5 rounded-xl bg-white/[0.04] backdrop-blur-xl border border-white/[0.06] hover:border-[#f0b429]/30 transition-all duration-300"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
          id="nav-hamburger"
        >
          <motion.span
            animate={mobileOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.3 }}
            className="block w-5 h-[2px] bg-[#f0b429] rounded-full origin-center"
          />
          <motion.span
            animate={mobileOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.2 }}
            className="block w-5 h-[2px] bg-[#8b949e] rounded-full"
          />
          <motion.span
            animate={mobileOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.3 }}
            className="block w-5 h-[2px] bg-[#8b949e] rounded-full origin-center"
          />
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            <div className="absolute inset-0 bg-[#0a0e17]/98 backdrop-blur-3xl" />
            <div className="absolute top-20 right-10 w-40 h-40 bg-[#f0b429]/5 rounded-full blur-[80px]" />
            <div className="absolute bottom-20 left-10 w-60 h-60 bg-[#818cf8]/5 rounded-full blur-[100px]" />

            <nav className="relative z-10 flex flex-col items-center justify-center h-full gap-6">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.to}
                  initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: 20, filter: 'blur(5px)' }}
                  transition={{ delay: i * 0.07, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  <NavLink
                    to={link.to}
                    onClick={() => setMobileOpen(false)}
                    className={({ isActive }) =>
                      `font-heading text-3xl font-bold tracking-[0.1em] transition-all duration-300 ${
                        isActive ? 'text-[#f0b429] drop-shadow-[0_0_15px_rgba(240,180,41,0.5)]' : 'text-[#484f58] hover:text-[#f0f6fc]'
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
                transition={{ delay: 0.5, duration: 0.4 }}
                className="mt-8"
              >
                <span className="px-5 py-2 rounded-full border border-[#f0b429]/20 bg-[#f0b429]/[0.06] text-[#f0b429] font-heading text-[11px] font-semibold tracking-[0.2em] uppercase">
                  Season 2 · 2026
                </span>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;