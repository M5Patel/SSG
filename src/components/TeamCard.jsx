import React from 'react';
import { motion } from 'framer-motion';

const TeamCard = ({ team, onClick, index = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    onClick={() => onClick?.(team)}
    className="cursor-pointer group"
    id={`team-card-${team.id}`}
  >
    <div className="relative overflow-hidden rounded-2xl transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
      {/* Glass background */}
      <div className="absolute inset-0 bg-white/[0.03] backdrop-blur-xl border border-white/[0.06] rounded-2xl group-hover:border-white/[0.1] transition-all duration-500" />

      {/* Top accent gradient */}
      <div
        className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl"
        style={{ background: `linear-gradient(90deg, ${team.color}40, ${team.color}, ${team.color}40)` }}
      />

      {/* Glow effect on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-600 rounded-2xl" style={{ background: `radial-gradient(circle at 50% 30%, ${team.color}10, transparent 70%)` }} />

      {/* Team logo placeholder area */}
      <div className="relative z-10 p-6 md:p-8 flex flex-col items-center text-center">
        {/* Logo circle */}
        <div className="relative mb-5">
          <div
            className="w-20 h-20 rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-3"
            style={{
              background: `linear-gradient(135deg, ${team.color}15, ${team.color}05)`,
              border: `1px solid ${team.color}25`,
              boxShadow: `0 0 30px ${team.color}10`,
            }}
          >
            <img
              src={team.logo}
              alt={team.name}
              className="w-16 h-16 object-contain"
              style={{ filter: `drop-shadow(0 0 15px ${team.color}40)` }}
            />
          </div>
          {/* Orbiting dot */}
          <div
            className="absolute -top-1 -right-1 w-3 h-3 rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-300"
            style={{ backgroundColor: team.color, boxShadow: `0 0 10px ${team.color}` }}
          />
        </div>

        {/* Name */}
        <h3 className="font-heading font-bold text-lg mb-3 transition-all duration-300 group-hover:tracking-wider" style={{ color: team.color }}>
          {team.name}
        </h3>

        {/* Players badge */}
        <span
          className="text-[11px] font-heading font-semibold px-4 py-1.5 rounded-full mb-3 tracking-wider backdrop-blur-sm"
          style={{
            backgroundColor: `${team.color}08`,
            color: team.color,
            border: `1px solid ${team.color}20`,
          }}
        >
          14 PLAYERS
        </span>

        {/* Captain */}
        <p className="text-sm text-[#8b949e] font-body flex items-center gap-2">
          <span className="text-xs">👑</span>
          <span className="text-[#484f58]">Captain:</span>
          <span className="text-[#f0f6fc] font-medium">{team.captain}</span>
        </p>
      </div>
    </div>
  </motion.div>
);

export default TeamCard;
