import React from 'react';
import { motion } from 'framer-motion';

const teamColors = {
  'UMA Super11': '#38bdf8',
  'Radhe Rising XI': '#f87171',
  'Lion Legends': '#fb923c',
  'MG Super Strikers': '#f472b6',
  'CP Warriors': '#fbbf24',
  'Rishiv Kings': '#facc15',
};

const PlayerCard = ({ player, onClick, index = 0 }) => {
  const color = teamColors[player.team] || '#2dd4bf';

  const initials = (name) => {
    if (!name) return 'P';
    const parts = name.trim().split(' ');
    return parts.length > 1
      ? (parts[0][0] + parts[1][0]).toUpperCase()
      : parts[0][0].toUpperCase();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: Math.min(index * 0.03, 1), duration: 0.4 }}
      onClick={() => onClick?.(player)}
      className="cursor-pointer group"
    >
      <div className="glass-card p-5 flex flex-col items-center text-center relative overflow-hidden">
        {/* Top accent */}
        <div
          className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-400"
          style={{ background: `linear-gradient(to right, transparent, ${color}, transparent)` }}
        />

        {/* Avatar */}
        <div className="relative mb-4">
          <div
            className="w-20 h-20 rounded-full overflow-hidden border-2 flex items-center justify-center bg-[#1e293b]"
            style={{ borderColor: `${color}40` }}
          >
            {player.image ? (
              <img
                src={player.image}
                alt={player.name}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            ) : (
              <span className="font-orbitron font-bold text-2xl" style={{ color: `${color}80` }}>
                {initials(player.name)}
              </span>
            )}
          </div>
          <div
            className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full border-[2px] border-[#0f172a]"
            style={{ backgroundColor: color }}
          />
        </div>

        {/* Info */}
        <h3 className="font-orbitron font-bold text-sm text-white group-hover:text-accent-teal transition-colors mb-2 truncate w-full">
          {player.name}
        </h3>

        {player.occupation && (
          <span
            className="text-[10px] font-space font-semibold tracking-wider px-2.5 py-0.5 rounded-full border mb-1.5"
            style={{
              backgroundColor: `${color}12`,
              color: color,
              borderColor: `${color}25`,
            }}
          >
            {player.occupation}
          </span>
        )}

        <span className="text-xs font-inter opacity-50 group-hover:opacity-80 transition-opacity" style={{ color }}>
          {player.team}
        </span>
      </div>
    </motion.div>
  );
};

export default PlayerCard;
