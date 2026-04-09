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
    window.addEventListener('scroll', onScroll);
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
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-400 ${
        scrolled
          ? 'backdrop-blur-xl bg-[#0f172a]/85 shadow-lg shadow-black/20'
          : 'bg-transparent'
      }`}
    >
      {scrolled && (
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent-teal/30 to-transparent" />
      )}

      <div className="max-w-7xl mx-auto px-5 md:px-8 flex items-center justify-between h-16 md:h-18">
        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-2.5 group" id="nav-logo">
          <span className="text-2xl">🏏</span>
          <div>
            <span className="font-orbitron font-bold text-lg text-white group-hover:text-accent-teal transition-colors">
              SSGPL
            </span>
            <span className="font-space text-[9px] tracking-[0.2em] text-slate-500 uppercase block">
              Cricket League
            </span>
          </div>
        </NavLink>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              id={`nav-${link.label.toLowerCase()}`}
              className={({ isActive }) =>
                `relative px-3.5 py-2 font-space font-medium text-[13px] tracking-wider uppercase rounded-lg transition-all duration-300 hover:bg-white/[0.04] ${
                  isActive ? 'text-accent-teal' : 'text-slate-400 hover:text-white'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="nav-underline"
                      className="absolute bottom-0 left-3 right-3 h-[2px] rounded-full bg-gradient-to-r from-accent-teal to-accent-indigo"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden w-10 h-10 flex flex-col justify-center items-center gap-1.5 rounded-lg bg-white/[0.04] border border-white/[0.06]"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
          id="nav-hamburger"
        >
          <motion.span
            animate={mobileOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
            className="block w-5 h-[2px] bg-accent-teal rounded-full origin-center"
          />
          <motion.span
            animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
            className="block w-5 h-[2px] bg-white/60 rounded-full"
          />
          <motion.span
            animate={mobileOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
            className="block w-5 h-[2px] bg-accent-indigo rounded-full origin-center"
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
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            <div className="absolute inset-0 bg-[#0f172a]/98 backdrop-blur-2xl" />
            <nav className="relative z-10 flex flex-col items-center justify-center h-full gap-7">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.to}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 15 }}
                  transition={{ delay: i * 0.06, duration: 0.35 }}
                >
                  <NavLink
                    to={link.to}
                    onClick={() => setMobileOpen(false)}
                    className={({ isActive }) =>
                      `font-orbitron text-2xl font-bold tracking-widest transition-colors ${
                        isActive ? 'text-accent-teal text-glow' : 'text-white/60 hover:text-white'
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
