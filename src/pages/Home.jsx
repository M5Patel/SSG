import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import CountUp from 'react-countup';
import CountdownTimer from '../components/CountdownTimer';
import ScrollReveal from '../components/ScrollReveal';
import CommitteeCard from '../components/CommitteeCard';
import teamsData from '../data/teams.json';

const pageVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.5 } },
  exit: { opacity: 0 },
};

/* ─── FLOATING PARTICLES ─── */
const Particles = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {[...Array(6)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-1 h-1 rounded-full bg-[#f0b429]/20"
        style={{ left: `${15 + i * 15}%`, top: `${20 + (i % 3) * 25}%` }}
        animate={{ y: [-20, 20, -20], opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 4 + i, repeat: Infinity, ease: 'easeInOut', delay: i * 0.5 }}
      />
    ))}
  </div>
);

/* ─── STAT CARD ─── */
const StatCard = ({ value, label, icon, delay = 0 }) => {
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ delay, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="relative overflow-hidden rounded-2xl group transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_15px_50px_rgba(0,0,0,0.5)]">
        <div className="absolute inset-0 bg-white/[0.03] backdrop-blur-xl border border-white/[0.06] rounded-2xl group-hover:border-[#f0b429]/15 transition-colors duration-500" />
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: 'radial-gradient(circle at 50% 50%, rgba(240,180,41,0.04), transparent 70%)' }} />

        <div className="relative z-10 p-4 sm:p-5 md:p-6 flex flex-col items-center text-center">
          {icon && <span className="text-xl sm:text-2xl mb-1.5 sm:mb-2 group-hover:scale-110 transition-transform duration-300">{icon}</span>}
          <span className="font-display font-bold text-2xl sm:text-3xl md:text-4xl text-[#f0b429] tabular-nums">
            {inView ? (
              typeof value === 'number' ? <CountUp end={value} duration={2.5} /> : value
            ) : '0'}
          </span>
          <span className="font-heading text-[9px] sm:text-[10px] text-[#8b949e] mt-1.5 sm:mt-2 uppercase tracking-[0.15em] sm:tracking-[0.2em]">
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
          <div className="relative overflow-hidden rounded-2xl transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-[0_15px_50px_rgba(0,0,0,0.5)]">
            <div className="absolute inset-0 bg-white/[0.03] backdrop-blur-xl border border-white/[0.06] rounded-2xl group-hover:border-white/[0.1] transition-all duration-500" />
            <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: `linear-gradient(90deg, transparent, ${team.color}, transparent)` }} />
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" style={{ background: `radial-gradient(circle at 50% 30%, ${team.color}10, transparent 70%)` }} />

            <div className="relative z-10 p-4 sm:p-5 flex flex-col items-center text-center">
              <div
                className="w-11 h-11 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center mb-2 sm:mb-3 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6"
                style={{
                  background: `linear-gradient(135deg, ${team.color}12, ${team.color}05)`,
                  border: `1px solid ${team.color}20`,
                }}
              >
                <img
                  src={team.logo}
                  alt={team.name}
                  className="w-8 h-8 sm:w-10 sm:h-10 object-contain block"
                  style={{ filter: `drop-shadow(0 0 12px ${team.color}50)` }}
                />
              </div>
              <h4 className="font-heading font-bold text-[10px] sm:text-[11px] tracking-wide" style={{ color: team.color }}>
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
  { id: 1, team1: 'UMA Super11', team2: 'Radhe Rising XI', time: '9:00 AM', type: 'Group Stage' },
  { id: 2, team1: 'Lion Legends', team2: 'MG Super Strikers', time: '10:30 AM', type: 'Group Stage' },
  { id: 3, team1: 'CP Warriors', team2: 'Rishiv Kings', time: '12:00 PM', type: 'Group Stage' },
  { id: 4, team1: 'TBD', team2: 'TBD', time: '2:00 PM', type: 'Semi Final 1' },
  { id: 5, team1: 'TBD', team2: 'TBD', time: '3:30 PM', type: 'Semi Final 2' },
  { id: 6, team1: 'TBD', team2: 'TBD', time: '5:00 PM', type: 'Grand Final' },
];

const teamColorMap = {
  'UMA Super11': '#38bdf8',
  'Radhe Rising XI': '#f87171',
  'Lion Legends': '#fb923c',
  'MG Super Strikers': '#f472b6',
  'CP Warriors': '#fbbf24',
  'Rishiv Kings': '#a78bfa',
  'TBD': '#484f58',
};

const teamLogoMap = {};
teamsData.forEach(t => { teamLogoMap[t.name] = t.logo; });

const MatchCard = ({ match, index }) => {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });
  const color1 = teamColorMap[match.team1] || '#484f58';
  const color2 = teamColorMap[match.team2] || '#484f58';
  const isFinal = match.type === 'Grand Final';

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className={`relative overflow-hidden rounded-2xl transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_15px_50px_rgba(0,0,0,0.5)] group ${isFinal ? 'animate-pulse-glow' : ''}`}>
        <div className={`absolute inset-0 backdrop-blur-xl border rounded-2xl transition-all duration-500 group-hover:border-white/[0.1] ${isFinal ? 'bg-[#f0b429]/[0.04] border-[#f0b429]/15' : 'bg-white/[0.03] border-white/[0.06]'}`} />

        <div className="relative z-10 p-3.5 sm:p-5">
          {/* Match type badge */}
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <span className={`text-[8px] sm:text-[10px] font-heading font-semibold tracking-[0.1em] sm:tracking-[0.15em] uppercase px-2 sm:px-3 py-0.5 sm:py-1 rounded-full backdrop-blur-sm ${
              isFinal
                ? 'bg-[#f0b429]/15 text-[#f0b429] border border-[#f0b429]/25'
                : match.type.includes('Semi')
                  ? 'bg-[#a78bfa]/10 text-[#a78bfa] border border-[#a78bfa]/20'
                  : 'bg-white/[0.04] text-[#8b949e] border border-white/[0.06]'
            }`}>
              {match.type}
            </span>
            <span className="text-[10px] sm:text-[11px] font-body text-[#8b949e]">{match.time}</span>
          </div>

          {/* Teams */}
          <div className="flex items-center justify-between gap-2 sm:gap-3">
            <div className="flex-1 text-center min-w-0">
              <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-xl mx-auto mb-1.5 sm:mb-2 flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                style={{ background: `${color1}10`, border: `1px solid ${color1}20` }}>
                <span className="flex items-center justify-center">
                  {teamLogoMap[match.team1] ? (
                    <img src={teamLogoMap[match.team1]} alt={match.team1} className="w-6 h-6 sm:w-8 sm:h-8 object-contain" />
                  ) : (
                    '❓'
                  )}
                </span>
              </div>
              <p className="font-heading font-bold text-[9px] sm:text-xs truncate" style={{ color: color1 }}>{match.team1}</p>
            </div>

            <div className="flex flex-col items-center gap-0.5 sm:gap-1 px-1 sm:px-2 flex-shrink-0">
              <span className="font-display font-bold text-[10px] sm:text-sm text-[#484f58]">VS</span>
              <div className="w-5 sm:w-8 h-[1px] bg-gradient-to-r from-transparent via-[#484f58] to-transparent" />
            </div>

            <div className="flex-1 text-center min-w-0">
              <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-xl mx-auto mb-1.5 sm:mb-2 flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                style={{ background: `${color2}10`, border: `1px solid ${color2}20` }}>
                <span className="flex items-center justify-center">
                  {teamLogoMap[match.team2] ? (
                    <img src={teamLogoMap[match.team2]} alt={match.team2} className="w-6 h-6 sm:w-8 sm:h-8 object-contain" />
                  ) : (
                    '❓'
                  )}
                </span>
              </div>
              <p className="font-heading font-bold text-[9px] sm:text-xs truncate" style={{ color: color2 }}>{match.team2}</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

/* ─── TEAM LOGOS SECTION ─── */
const TeamLogos = () => (
  <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 sm:gap-4 md:gap-6 max-w-md sm:max-w-none mx-auto">
    {teamsData.map((team, i) => (
      <ScrollReveal key={team.id} delay={i * 0.1} direction="scale">
        <Link to="/teams" className="group block">
          <div className="relative w-full aspect-square rounded-2xl overflow-hidden transition-all duration-500 group-hover:scale-105 group-hover:-translate-y-1">
            <div className="absolute inset-0 bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] rounded-2xl group-hover:border-white/[0.15] transition-all duration-500" />
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: `radial-gradient(circle, ${team.color}15, transparent 70%)` }} />

            <div className="relative z-10 w-full h-full flex flex-col items-center justify-center gap-1">
              <span className="flex items-center justify-center mb-1" style={{ filter: `drop-shadow(0 0 10px ${team.color}40)` }}>
                <img src={team.logo} alt={team.name} className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 object-contain" />
              </span>
              <span className="font-heading text-[7px] sm:text-[8px] md:text-[9px] font-semibold tracking-wider" style={{ color: team.color }}>
                {team.name.split(' ')[0]}
              </span>
            </div>
          </div>
        </Link>
      </ScrollReveal>
    ))}
  </div>
);

/* ─── COMMITTEE ─── */
const CommitteeSection = () => {
  const members = useMemo(() => {
    const files = import.meta.glob('/public/sports commite/*.{jpg,jpeg,png,webp}', { eager: true });
    return Object.keys(files).map((path, i) => {
      const filename = path.split('/').pop();
      const name = filename.replace(/\.[^/.]+$/, '').replace(/WhatsApp Image .+/, `Committee Member ${i + 1}`);
      return { image: path.replace('/public', ''), name, role: 'Sports Committee' };
    });
  }, []);

  if (members.length === 0) return null;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4 md:gap-5">
      {members.map((m, i) => (
        <CommitteeCard key={i} member={m} index={i} />
      ))}
    </div>
  );
};

/* ─── HOME PAGE ─── */
const Home = () => (
  <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">

    {/* ═══ HERO ═══ */}
    <section className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden" id="hero-section">
      {/* Background layers */}
      <div className="absolute inset-0 bg-[#0a0e17]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(240,180,41,0.08)_0%,_transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_rgba(129,140,248,0.05)_0%,_transparent_50%)]" />

      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: 'linear-gradient(rgba(240,180,41,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(240,180,41,0.3) 1px, transparent 1px)',
        backgroundSize: '60px 60px'
      }} />

      {/* Floating particles */}
      <Particles />

      {/* Decorative blur orbs - hidden on small screens for perf */}
      <motion.div
        animate={{ y: [-15, 15, -15], x: [-10, 10, -10] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/4 right-1/4 w-40 sm:w-64 h-40 sm:h-64 bg-[#f0b429]/[0.03] rounded-full blur-[80px] sm:blur-[100px]"
      />

      <div className="relative z-10 text-center px-4 sm:px-5 max-w-4xl mx-auto w-full">
        {/* Season badge */}
        <motion.div
          initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ delay: 0.1, duration: 0.7 }}
          className="inline-block mb-5 sm:mb-7"
        >
          <span className="font-heading text-[10px] sm:text-xs md:text-sm font-semibold tracking-[0.15em] sm:tracking-[0.25em] uppercase px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full border border-[#f0b429]/20 text-[#f0b429] bg-[#f0b429]/[0.05] backdrop-blur-sm shadow-[0_0_30px_rgba(240,180,41,0.08)]">
            Season 2 · April 26, 2026
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="font-display font-black text-[2.5rem] sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl gradient-text mb-3 sm:mb-5 leading-[1.1]"
        >
          SSGPL CRICKET
          <br />
          <span className="gradient-text-alt">TOURNAMENT</span>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="font-body text-base sm:text-lg md:text-xl text-[#8b949e] italic mb-1.5 sm:mb-2 font-light"
        >
          "Where Corporate Legends Are Born"
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="font-body text-xs sm:text-sm md:text-base text-[#484f58] max-w-lg mx-auto mb-7 sm:mb-10"
        >
          6 elite teams. 84 warriors. One trophy.
        </motion.p>

        {/* Countdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="mb-8 sm:mb-12"
        >
          <CountdownTimer />
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85, duration: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
        >
          <Link to="/members" className="btn-primary w-full sm:w-auto" id="cta-view-players">
            🏏 View Players
          </Link>
          <div className="flex gap-3 w-full sm:w-auto">
            <Link to="/teams" className="btn-outline flex-1 sm:flex-initial" id="cta-explore-teams">
              ⚔️ Teams
            </Link>
            <Link to="/gallery" className="btn-outline flex-1 sm:flex-initial" id="cta-view-gallery">
              📸 Gallery
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Scroll hint - hidden on very small screens */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2 hidden sm:flex"
      >
        <span className="font-heading text-[9px] text-[#484f58] tracking-[0.25em] uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-5 h-8 rounded-full border border-[#f0b429]/20 flex items-start justify-center pt-2"
        >
          <motion.div
            animate={{ opacity: [0.3, 1, 0.3], height: [4, 8, 4] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="w-1 bg-[#f0b429]/50 rounded-full"
          />
        </motion.div>
      </motion.div>
    </section>

    {/* ═══ STATS ═══ */}
    <section className="relative z-10 -mt-6 sm:-mt-8 px-3 sm:px-5 md:px-8 max-w-4xl mx-auto" id="stats-section">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        <StatCard value={6} label="Teams" icon="⚔️" delay={0} />
        <StatCard value={84} label="Players" icon="🏏" delay={0.1} />
        <StatCard value="S2" label="Season" icon="🏆" delay={0.2} />
        <StatCard value="26th" label="April 2026" icon="📅" delay={0.3} />
      </div>
    </section>



    <div className="section-divider max-w-3xl mx-auto" />

    {/* ═══ TEAMS PREVIEW ═══ */}
    <section className="page-section" id="teams-preview">
      <div className="max-w-5xl mx-auto px-2 sm:px-0">
        <ScrollReveal>
          <div className="section-header">
            <h2 className="gradient-text">🏆 The Teams</h2>
            <p>Six powerhouse squads ready to dominate</p>
          </div>
        </ScrollReveal>
        <TeamsPreview />
        <div className="text-center mt-8 sm:mt-10">
          <Link to="/logo" className="btn-outline">View All Teams →</Link>
        </div>
      </div>
    </section>

    <div className="section-divider max-w-3xl mx-auto" />

    {/* ═══ MATCH SCHEDULE ═══ */}
    <section className="page-section" id="match-schedule">
      <div className="max-w-4xl mx-auto px-2 sm:px-0">
        <ScrollReveal>
          <div className="section-header">
            <h2 className="gradient-text">📋 Match Schedule</h2>
            <p>Team-wise match schedule for April 26, 2026</p>
          </div>
        </ScrollReveal>

        {/* Date Header */}
        <ScrollReveal delay={0.1}>
          <div className="text-center mb-6 sm:mb-8">
            <div className="inline-flex flex-wrap items-center justify-center gap-2 sm:gap-3 px-4 sm:px-5 py-2 sm:py-2.5 rounded-2xl bg-white/[0.03] backdrop-blur-xl border border-white/[0.06]">
              <span className="text-base sm:text-lg">📅</span>
              <span className="font-heading font-bold text-xs sm:text-sm text-[#f0f6fc]">April 26, 2026</span>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-[9px] sm:text-[10px] font-heading text-green-400 uppercase tracking-wider">Match Day</span>
              </div>
            </div>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          {matchSchedule.map((match, i) => (
            <MatchCard key={match.id} match={match} index={i} />
          ))}
        </div>

        <ScrollReveal delay={0.3}>
          <p className="text-center text-[#484f58] text-[10px] sm:text-xs font-body mt-5 sm:mt-6 italic px-2">
            * Schedule is subject to change. Semi-final and final teams will be determined by group stage results.
          </p>
        </ScrollReveal>
      </div>
    </section>

    <div className="section-divider max-w-3xl mx-auto" />

    {/* ═══ COMMITTEE ═══ */}
    <section className="page-section" id="committee-section">
      <div className="max-w-5xl mx-auto px-2 sm:px-0">
        <ScrollReveal>
          <div className="section-header">
            <h2 className="gradient-text">🧑‍💼 Cricket Committee</h2>
            <p>The visionaries behind SSGPL</p>
          </div>
        </ScrollReveal>
        <CommitteeSection />
      </div>
    </section>

    <div className="h-12 sm:h-16" />
  </motion.div>
);

export default Home;
