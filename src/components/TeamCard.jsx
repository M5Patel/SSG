import React from 'react';
import { motion } from 'framer-motion';

const TeamCard = ({ team, onClick, index = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.08, duration: 0.5 }}
    onClick={() => onClick?.(team)}
    className="cursor-pointer group"
    id={`team-card-${team.id}`}
  >
    <div className="glass-card p-6 md:p-7 flex flex-col items-center text-center relative overflow-hidden">
      {/* Top accent */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-400"
        style={{ background: `linear-gradient(to right, transparent, ${team.color}, transparent)` }}
      />

      {/* Emoji */}
      <div className="relative mb-4">
        <span
          className="text-5xl block group-hover:scale-110 transition-transform duration-400"
          style={{ filter: `drop-shadow(0 0 12px ${team.color}60)` }}
        >
          {team.emoji}
        </span>
      </div>

      {/* Name */}
      <h3 className="font-orbitron font-bold text-base mb-2.5" style={{ color: team.color }}>
        {team.name}
      </h3>

      {/* Players badge */}
      <span
        className="text-[11px] font-space font-semibold px-3 py-1 rounded-full mb-2.5 tracking-wider"
        style={{
          backgroundColor: `${team.color}15`,
          color: team.color,
          border: `1px solid ${team.color}25`,
        }}
      >
        14 PLAYERS
      </span>

      {/* Captain */}
      <p className="text-sm text-slate-400 font-inter flex items-center gap-1.5">
        <span className="text-xs">👑</span>
        <span className="text-slate-500">Captain:</span>
        <span className="text-slate-200 font-medium">{team.captain}</span>
      </p>
    </div>
  </motion.div>
);

export default TeamCard;
