import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import CountUp from 'react-countup';
import { Canvas } from '@react-three/fiber';
import { Sparkles, Stars, Float } from '@react-three/drei';

import CountdownTimer from '../components/CountdownTimer';
import ScrollReveal from '../components/ScrollReveal';
import CommitteeCard from '../components/CommitteeCard';
import teamsData from '../data/teams.json';

const pageVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.8, ease: "easeOut" } },
  exit: { opacity: 0 },
};

/* ─── SLOW, PREMIUM YELLOW 3D BACKGROUND ─── */
const ThreeBackground = () => (
  <div className="fixed inset-0 w-full h-full pointer-events-none z-[-2]">
    <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
      <Stars radius={100} depth={50} count={2000} factor={4} saturation={1} fade speed={0.1} />
      <Float speed={0.5} rotationIntensity={0.2} floatIntensity={0.5}>
        <Sparkles count={80} scale={15} size={3} speed={0.1} opacity={0.4} color="#facc15" noise={0.2} />
      </Float>
      <Float speed={0.8} rotationIntensity={0.3} floatIntensity={0.8}>
        <Sparkles count={60} scale={12} size={2} speed={0.15} opacity={0.3} color="#fef08a" />
      </Float>
      <Float speed={0.3} rotationIntensity={0.1} floatIntensity={0.3}>
        <Sparkles count={30} scale={20} size={5} speed={0.05} opacity={0.2} color="#f59e0b" />
      </Float>
    </Canvas>
  </div>
);

/* ─── STAT CARD ─── */
const StatCard = ({ value, label, icon, delay = 0 }) => {
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ delay, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="relative overflow-hidden rounded-2xl group transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(234,179,8,0.15)] bg-[#0a0a0a]/60 backdrop-blur-md border border-white/[0.04] hover:border-yellow-500/30">
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: 'radial-gradient(circle at 50% 50%, rgba(234,179,8,0.06), transparent 80%)' }} />
        <div className="relative z-10 p-4 sm:p-5 flex flex-col items-center text-center">
          {icon && <span className="text-xl sm:text-2xl mb-1.5 opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300">{icon}</span>}
          <span className="font-display font-bold text-2xl sm:text-3xl text-yellow-400 tabular-nums drop-shadow-[0_0_15px_rgba(234,179,8,0.4)]">
            {inView ? (typeof value === 'number' ? <CountUp end={value} duration={2.5} useEasing={true} /> : value) : '0'}
          </span>
          <span className="font-heading text-[9px] sm:text-[10px] text-[#8b949e] mt-1.5 uppercase tracking-[0.2em] group-hover:text-yellow-200 transition-colors duration-300">
            {label}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

/* ─── TEAMS PREVIEW ─── */
const TeamsPreview = () => (
  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
    {teamsData.map((team, i) => (
      <ScrollReveal key={team.id} delay={i * 0.08}>
        <Link to="/teams" className="block group">
          <div className="relative overflow-hidden rounded-2xl transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(0,0,0,0.6)] bg-[#0a0a0a]/60 backdrop-blur-md border border-white/[0.04] hover:border-white/[0.1]">
            <div className="absolute top-0 left-0 right-0 h-[1px] opacity-50" style={{ background: `linear-gradient(90deg, transparent, ${team.color}, transparent)` }} />
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: `radial-gradient(circle at 50% 0%, ${team.color}15, transparent 70%)` }} />
            <div className="relative z-10 p-4 flex flex-col items-center text-center">
              <div
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center mb-2.5 transition-all duration-500 group-hover:scale-105"
                style={{ background: `linear-gradient(135deg, ${team.color}10, transparent)`, border: `1px solid ${team.color}15` }}
              >
                <img src={team.logo} alt={team.name} className="w-7 h-7 sm:w-8 sm:h-8 object-contain block opacity-90 group-hover:opacity-100 transition-opacity" style={{ filter: `drop-shadow(0 0 8px ${team.color}40)` }} />
              </div>
              <h4 className="font-heading font-semibold text-[10px] sm:text-[11px] tracking-wide text-gray-300 group-hover:text-white transition-colors duration-300">
                {team.name}
              </h4>
            </div>
          </div>
        </Link>
      </ScrollReveal>
    ))}
  </div>
);

/* ─── MATCH SCHEDULE ─── */
const matchSchedule = [
  { id: 1, team1: 'CP Warriors', team2: 'Rishiv Kings', time: '7:00 AM', type: 'Group Stage' },
  { id: 2, team1: 'Radhe Rising XI', team2: 'MG Super Strikers', time: '08:30 AM', type: 'Group Stage' },
  { id: 3, team1: 'UMA Super11', team2: 'Lion Legends', time: '10:00 AM', type: 'Group Stage' },
  { id: 4, team1: 'CP Warriors', team2: 'MG Super Strikers', time: '11:30 AM', type: 'Group Stage' },
  { id: 5, team1: 'Rishiv Kings', team2: 'UMA Super11', time: '01:00 PM', type: 'Group Stage' },
  { id: 6, team1: 'Radhe Rising XI', team2: 'Lion Legends', time: '2:30 PM', type: 'Group Stage' },
  { id: 7, team1: 'TBD', team2: 'TBD', time: '4:30 PM', type: 'Semi Final 1' },
  { id: 8, team1: 'TBD', team2: 'TBD', time: '7:00 PM', type: 'Semi Final 2' },
  { id: 9, team1: 'TBD', team2: 'TBD', time: '9:00 PM', type: 'Grand Final' },
];

const teamColorMap = {
  'UMA Super11': '#38bdf8', 'Radhe Rising XI': '#f87171', 'Lion Legends': '#fb923c',
  'MG Super Strikers': '#f472b6', 'CP Warriors': '#facc15', 'Rishiv Kings': '#a78bfa', 'TBD': '#484f58',
};

const teamLogoMap = {};
teamsData.forEach(t => { teamLogoMap[t.name] = t.logo; });

const MatchCard = ({ match, index }) => {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });
  const color1 = teamColorMap[match.team1] || '#484f58';
  const color2 = teamColorMap[match.team2] || '#484f58';
  const isFinal = match.type === 'Grand Final';

  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: index * 0.08, duration: 0.5 }}>
      <div className={`relative overflow-hidden rounded-2xl transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(0,0,0,0.5)] group bg-[#0a0a0a]/80 backdrop-blur-md border ${isFinal ? 'border-yellow-500/30 hover:border-yellow-400/60' : 'border-white/[0.04] hover:border-white/[0.08]'}`}>
        {isFinal && <div className="absolute inset-0 bg-yellow-500/5 animate-pulse" />}
        <div className="relative z-10 p-3.5 sm:p-5">
          <div className="flex items-center justify-between mb-3">
            <span className={`text-[8px] sm:text-[10px] font-heading font-semibold tracking-[0.15em] uppercase px-2 py-1 rounded-full ${isFinal ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/40 shadow-[0_0_10px_rgba(234,179,8,0.2)]' : match.type.includes('Semi') ? 'bg-amber-500/10 text-amber-300 border border-amber-500/20' : 'bg-white/[0.03] text-[#8b949e] border border-white/[0.05]'}`}>
              {match.type}
            </span>
            <span className="text-[9px] sm:text-[10px] font-body text-[#8b949e] tracking-wider">{match.time}</span>
          </div>
          <div className="flex items-center justify-between gap-2">
            <div className="flex-1 text-center min-w-0">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl mx-auto mb-1.5 flex items-center justify-center transition-transform duration-500 group-hover:scale-105" style={{ background: `linear-gradient(180deg, ${color1}10, transparent)`, border: `1px solid ${color1}15` }}>
                <img src={teamLogoMap[match.team1]} alt="" className="w-6 h-6 sm:w-7 sm:h-7 object-contain opacity-90" />
              </div>
              <p className="font-heading font-medium text-[9px] sm:text-xs truncate text-gray-300">{match.team1}</p>
            </div>
            <div className="flex flex-col items-center gap-1 px-1 flex-shrink-0">
              <span className="font-display font-bold text-[9px] sm:text-xs text-[#484f58] tracking-widest">VS</span>
              <div className="w-4 sm:w-6 h-[1px] bg-gradient-to-r from-transparent via-[#484f58] to-transparent opacity-50" />
            </div>
            <div className="flex-1 text-center min-w-0">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl mx-auto mb-1.5 flex items-center justify-center transition-transform duration-500 group-hover:scale-105" style={{ background: `linear-gradient(180deg, ${color2}10, transparent)`, border: `1px solid ${color2}15` }}>
                <img src={teamLogoMap[match.team2]} alt="" className="w-6 h-6 sm:w-7 sm:h-7 object-contain opacity-90" />
              </div>
              <p className="font-heading font-medium text-[9px] sm:text-xs truncate text-gray-300">{match.team2}</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

/* ─── COMMITTEE ─── */
const CommitteeSection = () => {
  const members = useMemo(() => {
    const files = import.meta.glob('/public/sports commite/*.{jpg,jpeg,png,webp}', { eager: true });
    return Object.keys(files).map((path) => ({ image: path.replace('/public', '') }));
  }, []);
  if (members.length === 0) return null;
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4">
      {members.map((m, i) => <CommitteeCard key={i} member={m} index={i} />)}
    </div>
  );
};

/* ─── HOME PAGE ─── */
const Home = () => (
  <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" className="relative">

    {/* Global Backgrounds */}
    <div className="fixed inset-0 bg-[#050505] z-[-3]" />
    <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(234,179,8,0.12)_0%,_transparent_50%)] z-[-3]" />
    <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_rgba(245,158,11,0.08)_0%,_transparent_40%)] z-[-3]" />
    <div className="fixed inset-0 opacity-[0.02] z-[-3]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)', backgroundSize: '80px 80px' }} />
    <ThreeBackground />

    {/* ═══ HERO ═══ */}
    {/* Removed min-h-[100dvh] so it doesn't force unnecessary vertical space */}
    <section className="relative pt-24 pb-12 sm:pt-32 sm:pb-16 flex flex-col items-center justify-center z-10" id="hero-section">
      <div className="relative z-10 text-center px-4 sm:px-5 max-w-4xl mx-auto w-full">
        
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.8 }} className="inline-block mb-4 sm:mb-6">
          <span className="font-heading text-[10px] sm:text-xs font-medium tracking-[0.25em] uppercase px-4 py-2 rounded-full border border-yellow-500/30 text-yellow-300 bg-yellow-900/10 backdrop-blur-md shadow-[0_0_20px_rgba(234,179,8,0.15)]">
            Season 2 · April 26, 2026
          </span>
        </motion.div>

        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.8 }} className="font-display font-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-3 sm:mb-4 leading-[1.1] tracking-tight drop-shadow-[0_0_30px_rgba(234,179,8,0.3)]">
          <span className="bg-gradient-to-r from-yellow-100 via-yellow-400 to-amber-500 bg-clip-text text-transparent">SSGPL CRICKET</span>
          <br />
          <span className="bg-gradient-to-r from-yellow-300 via-amber-500 to-orange-500 bg-clip-text text-transparent">TOURNAMENT</span>
        </motion.h1>

        <motion.p initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.6 }} className="font-body text-sm sm:text-base md:text-lg text-[#a1a1aa] italic mb-1 font-light">
          "Where Corporate Legends Are Born"
        </motion.p>

        <motion.p initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.6 }} className="font-body text-[10px] sm:text-xs text-[#71717a] max-w-lg mx-auto mb-6 sm:mb-8 tracking-widest uppercase">
          6 Elite Teams · 84 Warriors · One Trophy
        </motion.p>

        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5, duration: 0.6 }} className="mb-8 relative z-20">
          <CountdownTimer />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.6 }} className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 relative z-20 mb-8 sm:mb-12">
          <Link to="/members" className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-400 hover:to-amber-500 text-[#050505] font-heading font-bold text-xs tracking-widest uppercase transition-all duration-300 hover:shadow-[0_0_20px_rgba(234,179,8,0.4)] w-full sm:w-auto">
            🏏 View Players
          </Link>
          <div className="flex gap-3 w-full sm:w-auto">
            <Link to="/teams" className="px-5 py-2.5 rounded-xl bg-white/[0.02] border border-white/[0.08] hover:border-yellow-500/40 hover:bg-yellow-500/10 text-gray-300 font-heading font-semibold text-xs tracking-widest uppercase transition-all duration-300 flex-1 sm:flex-initial text-center hover:text-yellow-300">
              ⚔️ Teams
            </Link>
            <Link to="/gallery" className="px-5 py-2.5 rounded-xl bg-white/[0.02] border border-white/[0.08] hover:border-yellow-500/40 hover:bg-yellow-500/10 text-gray-300 font-heading font-semibold text-xs tracking-widest uppercase transition-all duration-300 flex-1 sm:flex-initial text-center hover:text-yellow-300">
              📸 Gallery
            </Link>
          </div>
        </motion.div>

        {/* Scroll Hint - Removed Absolute Positioning to prevent overlap */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1, duration: 1 }} className="flex flex-col items-center gap-2 hidden sm:flex z-10 opacity-50 hover:opacity-100 transition-opacity duration-300">
          <span className="font-heading text-[8px] text-yellow-500/70 tracking-[0.3em] uppercase">Scroll to explore</span>
          <div className="w-[1px] h-8 bg-gradient-to-b from-yellow-500/50 to-transparent" />
        </motion.div>

      </div>
    </section>

    {/* ═══ STATS ═══ */}
    {/* Removed negative top margin so it sits comfortably below the hero content */}
    <section className="relative z-20 px-4 sm:px-6 md:px-8 max-w-5xl mx-auto" id="stats-section">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        <StatCard value={6} label="Teams" icon="⚔️" delay={0} />
        <StatCard value={84} label="Players" icon="🏏" delay={0.1} />
        <StatCard value="S2" label="Season" icon="🏆" delay={0.2} />
        <StatCard value="26th" label="April 2026" icon="📅" delay={0.3} />
      </div>
    </section>

    {/* Tightened dividers from my-20/my-32 down to my-10/my-16 */}
    <div className="w-full h-[1px] max-w-3xl mx-auto my-10 sm:my-16 bg-gradient-to-r from-transparent via-yellow-900/30 to-transparent" />

    {/* ═══ TEAMS PREVIEW ═══ */}
    <section className="page-section relative z-20" id="teams-preview">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <ScrollReveal>
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl mb-2 bg-gradient-to-r from-yellow-200 via-yellow-400 to-amber-500 bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(234,179,8,0.2)]">🏆 The Teams</h2>
            <p className="text-[#71717a] font-body text-xs sm:text-sm tracking-wide uppercase">Six Powerhouse Squads</p>
          </div>
        </ScrollReveal>
        <TeamsPreview />
        <div className="text-center mt-8 sm:mt-10">
          <Link to="/teams" className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-yellow-500/20 text-yellow-400 hover:bg-yellow-500/10 hover:border-yellow-500/40 transition-all duration-300 font-heading text-[10px] sm:text-xs tracking-widest uppercase">
            View All Teams <span>&rarr;</span>
          </Link>
        </div>
      </div>
    </section>

    <div className="w-full h-[1px] max-w-3xl mx-auto my-10 sm:my-16 bg-gradient-to-r from-transparent via-yellow-900/30 to-transparent" />

    {/* ═══ MATCH SCHEDULE ═══ */}
    <section className="page-section relative z-20" id="match-schedule">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <ScrollReveal>
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl mb-6 bg-gradient-to-r from-yellow-200 via-yellow-400 to-amber-500 bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(234,179,8,0.2)]">Match Schedule</h2>
            <div className="inline-flex flex-wrap items-center justify-center gap-2 px-5 py-2.5 rounded-2xl bg-[#0a0a0a]/60 backdrop-blur-md border border-yellow-500/20 shadow-[0_5px_15px_rgba(234,179,8,0.05)]">
              <span className="text-base opacity-80">📅</span>
              <span className="font-heading font-semibold text-xs sm:text-sm text-yellow-100 tracking-wide">April 26, 2026</span>
              <div className="flex items-center gap-1.5 ml-2 bg-yellow-500/10 px-2 py-1 rounded-full border border-yellow-500/30">
                <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse shadow-[0_0_5px_rgba(234,179,8,0.8)]" />
                <span className="text-[9px] font-heading text-yellow-300 uppercase tracking-widest font-semibold">Match Day</span>
              </div>
            </div>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          {matchSchedule.map((match, i) => (
            <MatchCard key={match.id} match={match} index={i} />
          ))}
        </div>
      </div>
    </section>

    <div className="w-full h-[1px] max-w-3xl mx-auto my-10 sm:my-16 bg-gradient-to-r from-transparent via-yellow-900/30 to-transparent" />

    {/* ═══ COMMITTEE ═══ */}
    <section className="page-section relative z-20 pb-16" id="committee-section">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <ScrollReveal>
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl mb-2 bg-gradient-to-r from-yellow-200 via-yellow-400 to-amber-500 bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(234,179,8,0.2)]">Cricket Committee</h2>
            <p className="text-[#71717a] font-body text-[10px] sm:text-xs tracking-widest uppercase">The visionaries behind SSGPL</p>
          </div>
        </ScrollReveal>
        <CommitteeSection />
      </div>
    </section>

  </motion.div>
);

export default Home;