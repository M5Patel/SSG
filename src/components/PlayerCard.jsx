import React from 'react';
import { motion } from 'framer-motion';

const teamColors = {
  'UMA Super11': '#38bdf8',
  'Radhe Rising XI': '#f87171',
  'Lion Legends': '#fb923c',
  'MG Super Strikers': '#f472b6',
  'CP Warriors': '#fbbf24',
  'Rishiv Kings': '#a78bfa',
};

const PlayerCard = ({ player, onClick, index = 0 }) => {
  const color = teamColors[player.team] || '#f0b429';

  const initials = (name) => {
    if (!name) return 'P';
    const parts = name.trim().split(' ');
    return parts.length > 1
      ? (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
      : parts[0][0].toUpperCase();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: Math.min(index * 0.03, 0.8), duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      onClick={() => onClick?.(player)}
      className="cursor-pointer group"
    >
      <div className="relative overflow-hidden rounded-2xl transition-all duration-500 ease-out group-hover:-translate-y-2 group-hover:shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
        {/* Glass background */}
        <div className="absolute inset-0 bg-white/[0.03] backdrop-blur-xl border border-white/[0.06] rounded-2xl group-hover:border-white/[0.1] transition-all duration-500" />
        {/* Top color accent */}
        <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)` }} />
        {/* Glow on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" style={{ background: `radial-gradient(circle at 50% 0%, ${color}08, transparent 70%)` }} />

        <div className="relative z-10 p-4 sm:p-5">
          {/* Avatar - larger with face-focused styling */}
          <div className="relative mx-auto mb-4 w-20 h-20 sm:w-24 sm:h-24">
            <div
              className="w-full h-full rounded-2xl overflow-hidden border-2 flex items-center justify-center bg-[#0a0e17]/50 transition-all duration-500 group-hover:scale-105 group-hover:shadow-lg"
              style={{ borderColor: `${color}30`, boxShadow: `0 0 0 3px ${color}08` }}
            >
              {player.image ? (
                <img
                  src={player.image}
                  alt={player.name}
                  loading="lazy"
                  className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-110"
                />
              ) : (
                <span
                  className="font-heading font-bold text-2xl"
                  style={{ color: `${color}70` }}
                >
                  {initials(player.name)}
                </span>
              )}
            </div>
            {/* Status dot */}
            <div
              className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full border-[3px] border-[#0a0e17] transition-shadow duration-300 group-hover:shadow-[0_0_8px_var(--glow)]"
              style={{ backgroundColor: color, '--glow': `${color}60` }}
            />
          </div>

          {/* Name */}
          <h3 className="font-heading font-bold text-sm text-[#f0f6fc] text-center mb-1.5 truncate transition-colors duration-300 group-hover:text-[#f0b429]">
            {player.name}
          </h3>

          {/* Occupation Badge */}
          {player.occupation && (
            <div className="flex justify-center mb-2">
              <span
                className="text-[10px] font-body font-medium tracking-wide px-3 py-1 rounded-full border backdrop-blur-sm"
                style={{
                  backgroundColor: `${color}08`,
                  color: `${color}cc`,
                  borderColor: `${color}15`,
                }}
              >
                {player.occupation}
              </span>
            </div>
          )}

          {/* Team Name */}
          <p className="text-[11px] font-body text-[#8b949e] text-center transition-colors duration-300 group-hover:text-[#b1bac4] flex items-center justify-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: `${color}80` }} />
            {player.team}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default PlayerCard;
