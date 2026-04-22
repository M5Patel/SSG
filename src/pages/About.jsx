import React from 'react';
import { motion } from 'framer-motion';
import SectionHeader from '../components/SectionHeader';
import ScrollReveal from '../components/ScrollReveal';

const pageVariants = {
  initial: { opacity: 0, y: 15 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  exit: { opacity: 0, y: -15 },
};

const timeline = [
  { year: '2024', title: 'The Vision', desc: 'The vision of SSGPL was born — bringing corporate cricketers together under one banner.', color: '#a78bfa', icon: '💡' },
  { year: '2025', title: 'Season 1', desc: '6 Teams, 72 Players. An epic inaugural season that ended with a nail-biting finale.', color: '#38bdf8', icon: '🏏' },
  { year: '2026', title: 'Season 2', desc: '84 players, new teams, grander stage. SSGPL 2026 redefines corporate cricket. April 26.', color: '#f0b429', icon: '🚀' },
];

const values = [
  { emoji: '🤝', title: 'Sportsmanship', desc: 'We play hard but fair. Every match celebrates the spirit of cricket.', color: '#38bdf8' },
  { emoji: '🏘️', title: 'Community', desc: "SSGPL is more than a tournament — it's a family that grows stronger each season.", color: '#a78bfa' },
  { emoji: '🏆', title: 'Excellence', desc: 'From auction to final over, we strive for the extraordinary in everything.', color: '#f0b429' },
];

const About = () => (
  <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit"
    className="min-h-screen pt-24 md:pt-28 pb-16 px-4 sm:px-6 md:px-8 lg:px-16"
  >
    <SectionHeader title="About SSGPL" />

    {/* Story */}
    <ScrollReveal>
      <div className="max-w-3xl mx-auto mb-20">
        <div className="relative overflow-hidden rounded-3xl">
          {/* Glass bg */}
          <div className="absolute inset-0 bg-white/[0.03] backdrop-blur-xl border border-white/[0.06] rounded-3xl" />
          {/* Top accent */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#f0b429]/20 to-transparent" />
          {/* Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-[#f0b429]/[0.03] rounded-full blur-[60px]" />

          <div className="relative z-10 p-8 md:p-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-[#f0b429]/10 border border-[#f0b429]/15 flex items-center justify-center">
                <span className="text-xl">📖</span>
              </div>
              <h2 className="font-heading font-bold text-xl text-[#f0f6fc]">Our Story</h2>
            </div>
            <div className="space-y-5 font-body text-[#b1bac4] text-sm md:text-base leading-relaxed">
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
      </div>
    </ScrollReveal>

    {/* Timeline */}
    <ScrollReveal delay={0.1}>
      <div className="max-w-2xl mx-auto mb-20">
        <div className="flex items-center gap-3 justify-center mb-12">
          <span className="w-8 h-[1px] bg-gradient-to-r from-transparent to-[#f0b429]/30" />
          <div className="flex items-center gap-2">
            <span className="text-xl">🗺️</span>
            <h2 className="font-heading font-bold text-xl text-[#f0f6fc]">Our Journey</h2>
          </div>
          <span className="w-8 h-[1px] bg-gradient-to-l from-transparent to-[#f0b429]/30" />
        </div>

        <div className="relative">
          <div className="absolute left-7 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#a78bfa]/40 via-[#38bdf8]/40 to-[#f0b429]/40" />

          {timeline.map((item, i) => (
            <ScrollReveal key={item.year} delay={i * 0.12}>
              <div className="relative pl-16 pb-12 last:pb-0">
                <div className="absolute left-5 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-300"
                  style={{ borderColor: item.color, backgroundColor: `${item.color}15`, boxShadow: `0 0 15px ${item.color}20` }}
                >
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                </div>
                <div className="relative overflow-hidden rounded-2xl group transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_15px_50px_rgba(0,0,0,0.4)]">
                  {/* Glass bg */}
                  <div className="absolute inset-0 bg-white/[0.03] backdrop-blur-xl border border-white/[0.06] rounded-2xl group-hover:border-white/[0.1] transition-all duration-500" />

                  <div className="relative z-10 p-6">
                    <div className="flex items-center gap-2.5 mb-2">
                      <span className="text-lg">{item.icon}</span>
                      <span className="font-heading font-bold text-sm" style={{ color: item.color }}>{item.year}</span>
                    </div>
                    <h3 className="font-heading font-semibold text-base text-[#f0f6fc] mb-2">{item.title}</h3>
                    <p className="font-body text-[#8b949e] text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </ScrollReveal>

    {/* Vision & Mission */}
    <ScrollReveal delay={0.1}>
      <div className="max-w-3xl mx-auto mb-20 grid grid-cols-1 md:grid-cols-2 gap-5">
        {[
          { icon: '👁️', title: 'Vision', color: '#f0b429', desc: 'To create the most prestigious corporate cricket platform that transforms professionals into athletes and sets the gold standard for corporate sporting events.' },
          { icon: '🎯', title: 'Mission', color: '#38bdf8', desc: 'To unite corporate professionals through the spirit of cricket, providing a world-class tournament experience that celebrates talent, teamwork, and unbreakable bonds.' },
        ].map((card) => (
          <div key={card.title} className="relative overflow-hidden rounded-2xl group transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_15px_50px_rgba(0,0,0,0.4)]">
            {/* Glass bg */}
            <div className="absolute inset-0 bg-white/[0.03] backdrop-blur-xl border border-white/[0.06] rounded-2xl group-hover:border-white/[0.1] transition-all duration-500" />
            {/* Top accent */}
            <div className="absolute top-0 left-0 right-0 h-[1px]" style={{ background: `linear-gradient(90deg, transparent, ${card.color}30, transparent)` }} />

            <div className="relative z-10 p-7">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: `${card.color}10`, border: `1px solid ${card.color}15` }}>
                  <span className="text-lg">{card.icon}</span>
                </div>
                <h3 className="font-heading font-bold text-base" style={{ color: card.color }}>{card.title}</h3>
              </div>
              <p className="font-body text-[#b1bac4] text-sm leading-relaxed">{card.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </ScrollReveal>

    {/* Values */}
    <ScrollReveal delay={0.15}>
      <div className="max-w-3xl mx-auto mb-20">
        <div className="flex items-center gap-3 justify-center mb-12">
          <span className="w-8 h-[1px] bg-gradient-to-r from-transparent to-[#f0b429]/30" />
          <div className="flex items-center gap-2">
            <span className="text-xl">💎</span>
            <h2 className="font-heading font-bold text-xl text-[#f0f6fc]">Our Values</h2>
          </div>
          <span className="w-8 h-[1px] bg-gradient-to-l from-transparent to-[#f0b429]/30" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {values.map((v, i) => (
            <ScrollReveal key={v.title} delay={i * 0.1}>
              <div className="relative overflow-hidden rounded-2xl text-center group transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_15px_50px_rgba(0,0,0,0.4)]">
                {/* Glass bg */}
                <div className="absolute inset-0 bg-white/[0.03] backdrop-blur-xl border border-white/[0.06] rounded-2xl group-hover:border-white/[0.1] transition-all duration-500" />
                {/* Glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: `radial-gradient(circle at 50% 20%, ${v.color}08, transparent 70%)` }} />

                <div className="relative z-10 p-7">
                  <div className="w-14 h-14 rounded-2xl mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-500"
                    style={{ background: `${v.color}08`, border: `1px solid ${v.color}15` }}>
                    <span className="text-3xl">{v.emoji}</span>
                  </div>
                  <h3 className="font-heading font-bold text-sm mb-2.5" style={{ color: v.color }}>{v.title}</h3>
                  <p className="font-body text-[#8b949e] text-sm leading-relaxed">{v.desc}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </ScrollReveal>

    {/* Quick Stats */}
    <ScrollReveal>
      <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { value: '6', label: 'Teams', icon: '⚔️' },
          { value: '84', label: 'Players', icon: '🏏' },
          { value: 'S2', label: 'Season', icon: '🏆' },
          { value: '26th', label: 'April 2026', icon: '📅' },
        ].map((s, i) => (
          <motion.div key={s.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
          >
            <div className="relative overflow-hidden rounded-2xl group transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_15px_50px_rgba(0,0,0,0.4)]">
              <div className="absolute inset-0 bg-white/[0.03] backdrop-blur-xl border border-white/[0.06] rounded-2xl group-hover:border-[#f0b429]/15 transition-all duration-500" />

              <div className="relative z-10 flex flex-col items-center justify-center p-5 md:p-6">
                <span className="text-xl mb-2 group-hover:scale-110 transition-transform duration-300">{s.icon}</span>
                <span className="font-display font-bold text-2xl md:text-3xl text-[#f0b429]">{s.value}</span>
                <span className="font-heading text-[10px] text-[#8b949e] mt-1.5 uppercase tracking-[0.15em]">{s.label}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </ScrollReveal>
  </motion.div>
);

export default About;
