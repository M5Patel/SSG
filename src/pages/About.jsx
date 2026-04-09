import React from 'react';
import { motion } from 'framer-motion';
import SectionHeader from '../components/SectionHeader';
import ScrollReveal from '../components/ScrollReveal';

const pageVariants = {
  initial: { opacity: 0, y: 15 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  exit: { opacity: 0, y: -15 },
};

const timeline = [
  { year: '2024', title: 'The Vision', desc: 'The vision of SSGPL was born — bringing corporate cricketers together under one banner.', color: '#818cf8', icon: '💡' },
  { year: '2025', title: 'Season 1', desc: '6 Teams, 72 Players. An epic inaugural season that ended with a nail-biting finale.', color: '#2dd4bf', icon: '🏏' },
  { year: '2026', title: 'Season 2', desc: '84 players, new teams, grander stage. SSGPL 2026 redefines corporate cricket. April 26.', color: '#fb7185', icon: '🚀' },
];

const values = [
  { emoji: '🤝', title: 'Sportsmanship', desc: 'We play hard but fair. Every match celebrates the spirit of cricket.', color: '#2dd4bf' },
  { emoji: '🏘️', title: 'Community', desc: "SSGPL is more than a tournament — it's a family that grows stronger each season.", color: '#818cf8' },
  { emoji: '🏆', title: 'Excellence', desc: 'From auction to final over, we strive for the extraordinary in everything.', color: '#fb7185' },
];

const About = () => (
  <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit"
    className="min-h-screen pt-24 md:pt-28 pb-16 px-5 md:px-8 lg:px-16"
  >
    <SectionHeader title="About SSGPL" />

    {/* Story */}
    <ScrollReveal>
      <div className="max-w-3xl mx-auto mb-16">
        <div className="glass-card p-7 md:p-10">
          <div className="flex items-center gap-3 mb-5">
            <span className="text-xl">📖</span>
            <h2 className="font-orbitron font-bold text-lg text-white">Our Story</h2>
          </div>
          <div className="space-y-4 font-inter text-slate-300 text-sm md:text-base leading-relaxed">
            <p>
              The SSG Premier League was born from a simple yet powerful idea: what happens when
              corporate professionals trade their keyboards for cricket bats? The answer was extraordinary.
            </p>
            <p>
              What started as a small gathering in 2024 quickly evolved into one of the most anticipated
              corporate sporting events. Season 1 in 2025 saw 72 players across 6 teams battling in
              intense matches that had spectators on the edge of their seats.
            </p>
            <p>
              Now Season 2 is here — bigger than ever. With 84 warriors, enhanced formats, and a
              grander stage, SSGPL 2026 promises to redefine corporate cricket.
            </p>
          </div>
        </div>
      </div>
    </ScrollReveal>

    {/* Timeline */}
    <ScrollReveal delay={0.1}>
      <div className="max-w-2xl mx-auto mb-16">
        <div className="flex items-center gap-3 justify-center mb-10">
          <span className="text-xl">🗺️</span>
          <h2 className="font-orbitron font-bold text-xl text-white">Our Journey</h2>
        </div>

        <div className="relative">
          <div className="absolute left-7 top-0 bottom-0 w-[2px] bg-gradient-to-b from-accent-indigo via-accent-teal to-accent-rose" />

          {timeline.map((item, i) => (
            <ScrollReveal key={item.year} delay={i * 0.1}>
              <div className="relative pl-16 pb-10 last:pb-0">
                <div className="absolute left-5 w-4 h-4 rounded-full border-2 flex items-center justify-center"
                  style={{ borderColor: item.color, backgroundColor: `${item.color}20` }}
                >
                  <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: item.color }} />
                </div>
                <div className="glass-card p-5">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-lg">{item.icon}</span>
                    <span className="font-orbitron font-bold text-sm" style={{ color: item.color }}>{item.year}</span>
                  </div>
                  <h3 className="font-orbitron font-semibold text-base text-white mb-1.5">{item.title}</h3>
                  <p className="font-inter text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </ScrollReveal>

    {/* Vision & Mission */}
    <ScrollReveal delay={0.1}>
      <div className="max-w-3xl mx-auto mb-16 grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="glass-card p-6 group">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-xl">👁️</span>
            <h3 className="font-orbitron font-bold text-base text-accent-teal">Vision</h3>
          </div>
          <p className="font-inter text-slate-300 text-sm leading-relaxed">
            To create the most prestigious corporate cricket platform that transforms professionals into athletes
            and sets the gold standard for corporate sporting events.
          </p>
        </div>
        <div className="glass-card p-6 group">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-xl">🎯</span>
            <h3 className="font-orbitron font-bold text-base text-accent-indigo">Mission</h3>
          </div>
          <p className="font-inter text-slate-300 text-sm leading-relaxed">
            To unite corporate professionals through the spirit of cricket, providing a world-class tournament
            experience that celebrates talent, teamwork, and unbreakable bonds.
          </p>
        </div>
      </div>
    </ScrollReveal>

    {/* Values */}
    <ScrollReveal delay={0.15}>
      <div className="max-w-3xl mx-auto mb-16">
        <div className="flex items-center gap-3 justify-center mb-10">
          <span className="text-xl">💎</span>
          <h2 className="font-orbitron font-bold text-xl text-white">Our Values</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {values.map((v, i) => (
            <ScrollReveal key={v.title} delay={i * 0.1}>
              <div className="glass-card p-6 text-center">
                <span className="text-3xl block mb-3">{v.emoji}</span>
                <h3 className="font-orbitron font-bold text-sm mb-2" style={{ color: v.color }}>{v.title}</h3>
                <p className="font-inter text-slate-400 text-sm leading-relaxed">{v.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </ScrollReveal>

    {/* Quick Stats */}
    <ScrollReveal>
      <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { value: '6', label: 'Teams', icon: '⚔️' },
          { value: '84', label: 'Players', icon: '🏏' },
          { value: 'S2', label: 'Season', icon: '🏆' },
          { value: '26th', label: 'April 2026', icon: '📅' },
        ].map((s, i) => (
          <motion.div key={s.label}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.4 }}
            className="glass-card flex flex-col items-center justify-center p-4 md:p-5"
          >
            <span className="text-lg mb-1.5">{s.icon}</span>
            <span className="font-orbitron font-bold text-2xl text-accent-teal">{s.value}</span>
            <span className="font-space text-[10px] text-slate-400 mt-1 uppercase tracking-[0.15em]">{s.label}</span>
          </motion.div>
        ))}
      </div>
    </ScrollReveal>
  </motion.div>
);

export default About;
