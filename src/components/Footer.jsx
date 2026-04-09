import React from 'react';
import { NavLink } from 'react-router-dom';

const quickLinks = [
  { to: '/', label: 'Home' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/members', label: 'Players' },
  { to: '/teams', label: 'Teams' },
  { to: '/sponsors', label: 'Sponsors' },
  { to: '/about', label: 'About' },
];

const Footer = () => (
  <footer className="relative border-t border-white/[0.06]" id="site-footer">
    <div className="absolute inset-0 bg-gradient-to-t from-[#070d1a] to-transparent pointer-events-none" />

    <div className="relative z-10 max-w-6xl mx-auto px-5 md:px-8 py-12 md:py-16">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2.5 mb-4">
            <span className="text-2xl">🏏</span>
            <span className="font-orbitron font-bold text-lg text-white">SSGPL</span>
          </div>
          <p className="font-inter text-slate-400 text-sm leading-relaxed mb-4 max-w-xs">
            The most electrifying corporate cricket tournament. Where warriors become legends.
          </p>
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-accent-teal/20 bg-accent-teal/[0.05] text-accent-teal font-space text-[10px] font-semibold tracking-[0.15em] uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-teal animate-pulse" />
            Season 2 · 2026
          </span>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-orbitron font-semibold text-xs text-white mb-4 tracking-[0.15em] uppercase">Quick Links</h4>
          <nav className="flex flex-col gap-2.5">
            {quickLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className="font-inter text-slate-400 hover:text-accent-teal transition-colors text-sm"
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Info */}
        <div>
          <h4 className="font-orbitron font-semibold text-xs text-white mb-4 tracking-[0.15em] uppercase">Season 2</h4>
          <div className="space-y-3 font-inter text-sm">
            <div className="flex items-center gap-3 text-slate-400">
              <span>📅</span>
              <span className="text-white font-medium">April 26, 2026</span>
            </div>
            <div className="flex items-center gap-3 text-slate-400">
              <span>🏏</span>
              <span className="text-white font-medium">6 Teams · 84 Players</span>
            </div>
            <div className="flex items-center gap-3 text-slate-400">
              <span>🏆</span>
              <span className="text-white font-medium">Where Legends Are Born</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/[0.06] mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="font-inter text-xs text-slate-500">
          © 2026 SSGPL Cricket Tournament. All rights reserved.
        </p>
        <p className="font-inter text-xs text-slate-600">
          Built with ❤️ for the love of cricket
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
