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
  animate: { opacity: 1, transition: { duration: 0.4 } },
  exit: { opacity: 0 },
};

/* ─── STAT CARD ─── */
const StatCard = ({ value, label, icon, delay = 0 }) => {
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.5 }}
    >
      <div className="glass-card p-4 md:p-5 flex flex-col items-center text-center">
        {icon && <span className="text-xl mb-1.5">{icon}</span>}
        <span className="font-orbitron font-bold text-2xl md:text-3xl text-accent-teal tabular-nums">
          {inView ? (
            typeof value === 'number' ? <CountUp end={value} duration={2} /> : value
          ) : '0'}
        </span>
        <span className="font-space text-[10px] text-slate-400 mt-1.5 uppercase tracking-[0.15em]">
          {label}
        </span>
      </div>
    </motion.div>
  );
};

/* ─── TEAMS PREVIEW ─── */
const TeamsPreview = () => (
  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
    {teamsData.map((team, i) => (
      <ScrollReveal key={team.id} delay={i * 0.06}>
        <Link to="/teams" className="block group">
          <div className="glass-card p-4 flex flex-col items-center text-center">
            <span
              className="text-3xl mb-2 group-hover:scale-110 transition-transform duration-400 block"
              style={{ filter: `drop-shadow(0 0 10px ${team.color}50)` }}
            >
              {team.emoji}
            </span>
            <h4 className="font-orbitron font-bold text-[11px]" style={{ color: team.color }}>
              {team.name}
            </h4>
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
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 md:gap-4">
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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden" id="hero-section">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0f172a] via-[#162033] to-[#0f172a]" />

      {/* Subtle blobs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-accent-teal/[0.06] blur-[120px]" />
      <div className="absolute bottom-1/4 -right-32 w-80 h-80 rounded-full bg-accent-indigo/[0.08] blur-[100px]" />

      <div className="relative z-10 text-center px-5 max-w-4xl mx-auto">
        {/* Season badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="inline-block mb-6"
        >
          <span className="font-space text-xs md:text-sm font-semibold tracking-[0.2em] uppercase px-4 py-2 rounded-full border border-accent-teal/30 text-accent-teal bg-accent-teal/[0.06] animate-border-pulse">
            Season 2 · April 26, 2026
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="font-orbitron font-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl gradient-text mb-4 leading-[1.1]"
        >
          SSGPL CRICKET
          <br />
          <span className="gradient-text-alt">TOURNAMENT</span>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="font-poppins text-lg md:text-xl text-slate-300 italic mb-2 font-light"
        >
          "Where Corporate Legends Are Born"
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="font-inter text-sm md:text-base text-slate-500 max-w-lg mx-auto mb-8"
        >
          6 elite teams. 84 warriors. One trophy.
        </motion.p>

        {/* Countdown */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mb-10"
        >
          <CountdownTimer />
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75, duration: 0.6 }}
          className="flex flex-wrap justify-center gap-3"
        >
          <Link to="/members" className="btn-primary" id="cta-view-players">
            🏏 View Players
          </Link>
          <Link to="/teams" className="btn-outline" id="cta-explore-teams">
            ⚔️ Explore Teams
          </Link>
          <Link to="/gallery" className="btn-outline" id="cta-view-gallery">
            📸 Gallery
          </Link>
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5"
      >
        <span className="font-space text-[9px] text-slate-500 tracking-[0.2em] uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-4 h-7 rounded-full border border-white/15 flex items-start justify-center pt-1.5"
        >
          <div className="w-1 h-1.5 bg-accent-teal/50 rounded-full" />
        </motion.div>
      </motion.div>
    </section>

    {/* ═══ STATS ═══ */}
    <section className="relative z-10 -mt-6 px-5 md:px-8 max-w-4xl mx-auto" id="stats-section">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <StatCard value={6} label="Teams" icon="⚔️" delay={0} />
        <StatCard value={84} label="Players" icon="🏏" delay={0.08} />
        <StatCard value="S2" label="Season" icon="🏆" delay={0.16} />
        <StatCard value="26th" label="April 2026" icon="📅" delay={0.24} />
      </div>
    </section>

    {/* ═══ TEAMS ═══ */}
    <section className="page-section" id="teams-preview">
      <div className="max-w-5xl mx-auto">
        <ScrollReveal>
          <div className="section-header">
            <h2 className="gradient-text">🏆 The Teams</h2>
            <p>Six powerhouse squads ready to dominate</p>
          </div>
        </ScrollReveal>
        <TeamsPreview />
        <div className="text-center mt-8">
          <Link to="/teams" className="btn-outline">View All Teams →</Link>
        </div>
      </div>
    </section>

    <div className="section-divider max-w-3xl mx-auto" />

    {/* ═══ COMMITTEE ═══ */}
    <section className="page-section" id="committee-section">
      <div className="max-w-5xl mx-auto">
        <ScrollReveal>
          <div className="section-header">
            <h2 className="gradient-text">🧑‍💼 Cricket Committee</h2>
            <p>The visionaries behind SSGPL</p>
          </div>
        </ScrollReveal>
        <CommitteeSection />
      </div>
    </section>

    <div className="h-16" />
  </motion.div>
);

export default Home;
