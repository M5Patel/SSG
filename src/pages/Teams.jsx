import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import teamsData from '../data/teams.json';
import playersData from '../data/players.json';
import TeamCard from '../components/TeamCard';
import Modal from '../components/Modal';
import SectionHeader from '../components/SectionHeader';

const pageVariants = {
  initial: { opacity: 0, y: 15 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
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
      className="min-h-screen pt-24 md:pt-28 pb-16 px-4 sm:px-6 md:px-8 lg:px-16"
    >
      <SectionHeader title="Teams" subtitle="6 elite squads competing for glory" />

      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
        {teamsData.map((team, i) => (
          <TeamCard key={team.id} team={team} index={i} onClick={setSelectedTeam} />
        ))}
      </div>

      {/* Team Detail Modal */}
      <Modal isOpen={!!selectedTeam} onClose={() => setSelectedTeam(null)}>
        {selectedTeam && (
          <div>
            <div className="flex items-center gap-4 mb-6 pb-5 border-b border-white/[0.06]">
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center"
                style={{
                  background: `linear-gradient(135deg, ${selectedTeam.color}15, ${selectedTeam.color}05)`,
                  border: `1px solid ${selectedTeam.color}25`,
                  boxShadow: `0 0 25px ${selectedTeam.color}15`,
                }}
              >
                <img
                  src={selectedTeam.logo}
                  alt={selectedTeam.name}
                  className="w-10 h-10 object-contain"
                  style={{ filter: `drop-shadow(0 0 10px ${selectedTeam.color})` }}
                />
              </div>
              <div>
                <h2 className="font-heading font-bold text-lg" style={{ color: selectedTeam.color }}>
                  {selectedTeam.name}
                </h2>
                <p className="font-body text-sm text-[#8b949e]">👑 Captain: {selectedTeam.captain}</p>
              </div>
            </div>

            <p className="font-heading text-xs text-[#8b949e] mb-4 tracking-wider uppercase flex items-center gap-2">
              <span className="w-4 h-[1px]" style={{ backgroundColor: selectedTeam.color }} />
              {teamPlayers.length} Players
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto hide-scrollbar">
              <AnimatePresence>
                {teamPlayers.map((p, i) => (
                  <motion.div
                    key={p.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.04, duration: 0.4 }}
                    className="relative overflow-hidden rounded-xl group hover:shadow-lg transition-all duration-300"
                  >
                    {/* Glass bg */}
                    <div className="absolute inset-0 bg-white/[0.02] border border-white/[0.04] rounded-xl group-hover:border-white/[0.08] transition-colors duration-300 backdrop-blur-sm" />

                    <div className="relative z-10 p-3 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl overflow-hidden border flex-shrink-0 bg-[#0a0e17]/50" style={{ borderColor: `${selectedTeam.color}20` }}>
                        {p.image ? (
                          <img src={p.image} alt={p.name} className="w-full h-full object-cover object-top" loading="lazy" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <span className="text-[10px] font-heading text-[#484f58]">
                              {p.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-heading font-semibold text-sm text-[#f0f6fc] truncate group-hover:text-[#f0b429] transition-colors duration-300">
                          {p.name}
                        </p>
                        <p className="font-body text-[11px] text-[#484f58]">{p.occupation || 'Player'}</p>
                      </div>
                      {p.name === selectedTeam.captain && (
                        <span className="text-[9px] px-2 py-0.5 rounded-full font-heading font-bold flex-shrink-0 backdrop-blur-sm"
                          style={{
                            backgroundColor: `${selectedTeam.color}15`,
                            color: selectedTeam.color,
                            border: `1px solid ${selectedTeam.color}25`,
                          }}
                        >C</span>
                      )}
                    </div>
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
