import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import teamsData from '../data/teams.json';
import playersData from '../data/players.json';
import TeamCard from '../components/TeamCard';
import Modal from '../components/Modal';
import SectionHeader from '../components/SectionHeader';

const pageVariants = {
  initial: { opacity: 0, y: 15 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  exit: { opacity: 0, y: -15 },
};

const Teams = () => {
  const [selectedTeam, setSelectedTeam] = useState(null);
  const teamPlayers = useMemo(() => {
    if (!selectedTeam) return [];
    return playersData.filter(p => selectedTeam.players.includes(p.id));
  }, [selectedTeam]);

  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit"
      className="min-h-screen pt-24 md:pt-28 pb-16 px-5 md:px-8 lg:px-16"
    >
      <SectionHeader title="Teams" subtitle="6 elite squads competing for glory" />

      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {teamsData.map((team, i) => (
          <TeamCard key={team.id} team={team} index={i} onClick={setSelectedTeam} />
        ))}
      </div>

      {/* Team Detail Modal */}
      <Modal isOpen={!!selectedTeam} onClose={() => setSelectedTeam(null)}>
        {selectedTeam && (
          <div>
            <div className="flex items-center gap-3 mb-5 pb-4 border-b border-white/[0.06]">
              <span className="text-4xl" style={{ filter: `drop-shadow(0 0 10px ${selectedTeam.color})` }}>
                {selectedTeam.emoji}
              </span>
              <div>
                <h2 className="font-orbitron font-bold text-lg" style={{ color: selectedTeam.color }}>
                  {selectedTeam.name}
                </h2>
                <p className="font-inter text-sm text-slate-400">👑 Captain: {selectedTeam.captain}</p>
              </div>
            </div>

            <p className="font-space text-xs text-slate-400 mb-3 tracking-wider uppercase">
              {teamPlayers.length} Players
            </p>

            <div className="grid grid-cols-2 gap-2.5 max-h-[50vh] overflow-y-auto hide-scrollbar">
              <AnimatePresence>
                {teamPlayers.map((p, i) => (
                  <motion.div
                    key={p.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.03 }}
                    className="glass-card p-2.5 flex items-center gap-2.5 group"
                  >
                    <div className="w-9 h-9 rounded-full overflow-hidden border border-white/10 flex-shrink-0 bg-[#1e293b]">
                      {p.image ? (
                        <img src={p.image} alt={p.name} className="w-full h-full object-cover" loading="lazy" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <span className="text-[10px] font-orbitron text-slate-600">
                            {p.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-space font-semibold text-sm text-white truncate group-hover:text-accent-teal transition-colors">
                        {p.name}
                      </p>
                      <p className="font-inter text-[11px] text-slate-500">{p.occupation || 'Player'}</p>
                    </div>
                    {p.name === selectedTeam.captain && (
                      <span className="text-[9px] px-1.5 py-0.5 rounded-full font-space font-bold flex-shrink-0"
                        style={{
                          backgroundColor: `${selectedTeam.color}20`,
                          color: selectedTeam.color,
                          border: `1px solid ${selectedTeam.color}30`,
                        }}
                      >C</span>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        )}
      </Modal>
    </motion.div>
  );
};

export default Teams;
