import React, { useState, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import playersData from '../data/players.json';
import teamsData from '../data/teams.json';
import PlayerCard from '../components/PlayerCard';
import Modal from '../components/Modal';
import SectionHeader from '../components/SectionHeader';

const pageVariants = {
  initial: { opacity: 0, y: 15 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  exit: { opacity: 0, y: -15 },
};

const Members = () => {
  const [search, setSearch] = useState('');
  const [filterTeam, setFilterTeam] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const debounceRef = React.useRef(null);

  const handleSearch = useCallback((val) => {
    setSearch(val);
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => setDebouncedSearch(val), 300);
  }, []);

  const teams = useMemo(() => [...new Set(playersData.map(p => p.team))].sort(), []);

  const filtered = useMemo(() => {
    let list = playersData;
    if (debouncedSearch) list = list.filter(p => p.name.toLowerCase().includes(debouncedSearch.toLowerCase()));
    if (filterTeam) list = list.filter(p => p.team === filterTeam);
    return [...list].sort((a, b) => sortOrder === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name));
  }, [debouncedSearch, filterTeam, sortOrder]);

  const teamColor = useMemo(() => {
    if (!filterTeam) return '#2dd4bf';
    return teamsData.find(t => t.name === filterTeam)?.color || '#2dd4bf';
  }, [filterTeam]);

  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit"
      className="min-h-screen pt-24 md:pt-28 pb-16 px-5 md:px-8 lg:px-16"
    >
      <SectionHeader title="Players" subtitle="84 warriors ready for battle" />

      {/* Controls */}
      <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
        className="max-w-5xl mx-auto mb-8 space-y-3"
      >
        {/* Search */}
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">🔍</span>
          <input
            type="text"
            placeholder="Search players..."
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
            id="player-search"
            className="w-full pl-11 pr-4 py-3 rounded-xl border border-white/[0.06] bg-white/[0.03] backdrop-blur-lg font-inter text-white placeholder:text-slate-500 focus:outline-none focus:border-accent-teal/40 transition-all text-sm"
          />
        </div>

        {/* Team filters */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setFilterTeam('')}
            className={`px-3 py-1.5 rounded-lg font-space text-xs tracking-wider transition-all border ${
              !filterTeam
                ? 'bg-accent-teal/10 border-accent-teal/30 text-accent-teal'
                : 'border-white/[0.06] text-slate-400 hover:text-white'
            }`}
          >
            All
          </button>
          {teams.map(t => {
            const td = teamsData.find(x => x.name === t);
            const active = filterTeam === t;
            return (
              <button
                key={t}
                onClick={() => setFilterTeam(active ? '' : t)}
                className={`px-3 py-1.5 rounded-lg font-space text-xs tracking-wider transition-all border flex items-center gap-1 ${
                  active ? '' : 'border-white/[0.06] text-slate-400 hover:text-white'
                }`}
                style={active ? {
                  backgroundColor: `${td?.color}15`,
                  borderColor: `${td?.color}40`,
                  color: td?.color,
                } : {}}
              >
                {td?.emoji} {t}
              </button>
            );
          })}
        </div>

        {/* Sort + Count */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: teamColor }} />
            <p className="font-inter text-sm text-slate-500">
              <span className="text-white font-medium">{filtered.length}</span> of {playersData.length} players
            </p>
          </div>
          <div className="flex gap-1.5">
            {['asc', 'desc'].map(o => (
              <button key={o} onClick={() => setSortOrder(o)}
                className={`px-3 py-1.5 rounded-lg font-space text-xs tracking-wider transition-all border ${
                  sortOrder === o
                    ? 'text-accent-teal border-accent-teal/30 bg-accent-teal/[0.08]'
                    : 'text-slate-400 border-white/[0.06] hover:text-white'
                }`}
              >
                {o === 'asc' ? 'A→Z' : 'Z→A'}
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {filtered.map((p, i) => (
          <PlayerCard key={p.id} player={p} index={i} onClick={setSelectedPlayer} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16">
          <span className="text-4xl block mb-3">🔍</span>
          <p className="font-orbitron text-slate-400">No players found</p>
          <p className="font-inter text-slate-600 mt-1 text-sm">Try adjusting your search</p>
        </div>
      )}

      {/* Detail Modal */}
      <Modal isOpen={!!selectedPlayer} onClose={() => setSelectedPlayer(null)}>
        {selectedPlayer && (
          <div className="flex flex-col items-center text-center">
            <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-accent-teal/30 mb-5 bg-[#1e293b]">
              {selectedPlayer.image ? (
                <img src={selectedPlayer.image} alt={selectedPlayer.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="font-orbitron text-2xl text-slate-600">
                    {selectedPlayer.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                  </span>
                </div>
              )}
            </div>
            <h2 className="font-orbitron font-bold text-xl text-accent-teal mb-1">{selectedPlayer.name}</h2>
            <p className="font-inter text-slate-400 text-sm mb-4">{selectedPlayer.team}</p>
            <div className="w-full space-y-2 text-left">
              {[
                { label: 'Date of Birth', value: selectedPlayer.dob ? new Date(selectedPlayer.dob).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' }) : '—' },
                { label: 'Occupation', value: selectedPlayer.occupation || '—' },
              ].map(item => (
                <div key={item.label} className="flex justify-between items-center py-2 border-b border-white/[0.04]">
                  <span className="font-inter text-sm text-slate-500">{item.label}</span>
                  <span className="font-inter text-sm text-white font-medium">{item.value}</span>
                </div>
              ))}
            </div>
            {selectedPlayer.instagram && (
              <a href={selectedPlayer.instagram} target="_blank" rel="noopener noreferrer"
                className="mt-4 text-rose-400 hover:text-rose-300 transition-colors text-sm font-inter flex items-center gap-1"
              >
                📸 Instagram
              </a>
            )}
          </div>
        )}
      </Modal>
    </motion.div>
  );
};

export default Members;
