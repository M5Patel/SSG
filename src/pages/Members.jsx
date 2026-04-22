import React, { useState, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import playersData from '../data/players.json';
import teamsData from '../data/teams.json';
import PlayerCard from '../components/PlayerCard';
import Modal from '../components/Modal';
import SectionHeader from '../components/SectionHeader';

const pageVariants = {
  initial: { opacity: 0, y: 15 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  exit: { opacity: 0, y: -15 },
};

const teamColors = {
  'UMA Super11': '#38bdf8',
  'Radhe Rising XI': '#f87171',
  'Lion Legends': '#fb923c',
  'MG Super Strikers': '#f472b6',
  'CP Warriors': '#fbbf24',
  'Rishiv Kings': '#a78bfa',
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
    debounceRef.current = setTimeout(() => setDebouncedSearch(val), 250);
  }, []);

  const teams = useMemo(() => [...new Set(playersData.map(p => p.team))].sort(), []);

  const filtered = useMemo(() => {
    let list = playersData;
    if (debouncedSearch) list = list.filter(p => p.name.toLowerCase().includes(debouncedSearch.toLowerCase()));
    if (filterTeam) list = list.filter(p => p.team === filterTeam);
    return [...list].sort((a, b) => sortOrder === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name));
  }, [debouncedSearch, filterTeam, sortOrder]);

  const selectedColor = useMemo(() => {
    if (!selectedPlayer) return '#f0b429';
    return teamColors[selectedPlayer.team] || '#f0b429';
  }, [selectedPlayer]);

  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit"
      className="min-h-screen pt-24 md:pt-28 pb-16 px-4 sm:px-6 md:px-8 lg:px-16"
    >
      <SectionHeader title="Players" subtitle="84 warriors ready for battle" />

      {/* Controls */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.5 }}
        className="max-w-5xl mx-auto mb-10 space-y-5"
      >
        {/* Search */}
        <div className="relative group">
          <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#484f58] group-focus-within:text-[#f0b429] transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search by player name..."
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
            id="player-search"
            className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-white/[0.03] backdrop-blur-xl border border-white/[0.06] font-body text-[#f0f6fc] placeholder:text-[#484f58] focus:outline-none focus:border-[#f0b429]/30 focus:shadow-[0_0_30px_rgba(240,180,41,0.08)] transition-all duration-400 text-sm"
          />
        </div>

        {/* Team filters */}
        <div className="flex flex-wrap gap-2.5">
          <button
            onClick={() => setFilterTeam('')}
            className={`px-4 py-2.5 rounded-xl font-heading text-xs font-semibold tracking-wide transition-all duration-300 border backdrop-blur-sm ${
              !filterTeam
                ? 'bg-[#f0b429]/10 border-[#f0b429]/25 text-[#f0b429] shadow-[0_0_20px_rgba(240,180,41,0.08)]'
                : 'border-white/[0.06] text-[#8b949e] hover:text-[#f0f6fc] hover:border-white/[0.1] bg-white/[0.02]'
            }`}
          >
            All Teams
          </button>
          {teams.map(t => {
            const td = teamsData.find(x => x.name === t);
            const active = filterTeam === t;
            const tc = teamColors[t] || '#f0b429';
            return (
              <button
                key={t}
                onClick={() => setFilterTeam(active ? '' : t)}
                className={`px-4 py-2.5 rounded-xl font-heading text-xs font-semibold tracking-wide transition-all duration-300 border flex items-center gap-2 backdrop-blur-sm ${
                  active ? '' : 'border-white/[0.06] text-[#8b949e] hover:text-[#f0f6fc] hover:border-white/[0.1] bg-white/[0.02]'
                }`}
                style={active ? {
                  backgroundColor: `${tc}12`,
                  borderColor: `${tc}30`,
                  color: tc,
                  boxShadow: `0 0 20px ${tc}10`,
                } : {}}
              >
                {td?.logo ? (
                  <img src={td.logo} alt={t} className="w-4 h-4 object-contain" />
                ) : null} {t}
              </button>
            );
          })}
        </div>

        {/* Sort + Count */}
        <div className="flex items-center justify-between">
          <p className="font-body text-sm text-[#8b949e]">
            <span className="text-[#f0b429] font-semibold">{filtered.length}</span>
            <span className="mx-1">of</span>
            <span>{playersData.length} players</span>
          </p>
          <div className="flex gap-2">
            {['asc', 'desc'].map(o => (
              <button key={o} onClick={() => setSortOrder(o)}
                className={`px-3.5 py-2 rounded-xl font-heading text-xs font-semibold tracking-wide transition-all duration-300 border backdrop-blur-sm ${
                  sortOrder === o
                    ? 'text-[#f0b429] border-[#f0b429]/25 bg-[#f0b429]/[0.06]'
                    : 'text-[#8b949e] border-white/[0.06] hover:text-[#f0f6fc] hover:border-white/[0.1] bg-white/[0.02]'
                }`}
              >
                {o === 'asc' ? 'A → Z' : 'Z → A'}
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-5">
        {filtered.map((p, i) => (
          <PlayerCard key={p.id} player={p} index={i} onClick={setSelectedPlayer} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-20">
          <div className="w-18 h-18 rounded-2xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center mx-auto mb-5 backdrop-blur-xl" style={{ width: 72, height: 72 }}>
            <svg className="w-8 h-8 text-[#484f58]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <p className="font-heading font-bold text-[#8b949e] text-lg">No players found</p>
          <p className="font-body text-[#484f58] mt-1.5 text-sm">Try adjusting your search or filters</p>
        </div>
      )}

      {/* Detail Modal */}
      <Modal isOpen={!!selectedPlayer} onClose={() => setSelectedPlayer(null)}>
        {selectedPlayer && (
          <div className="flex flex-col items-center text-center">
            {/* Avatar */}
            <div
              className="w-28 h-28 rounded-2xl overflow-hidden border-2 mb-6 bg-[#0a0e17]/50 shadow-lg"
              style={{ borderColor: `${selectedColor}30`, boxShadow: `0 0 30px ${selectedColor}10` }}
            >
              {selectedPlayer.image ? (
                <img src={selectedPlayer.image} alt={selectedPlayer.name} className="w-full h-full object-cover object-top" />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="font-display text-2xl" style={{ color: `${selectedColor}60` }}>
                    {selectedPlayer.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                  </span>
                </div>
              )}
            </div>

            {/* Name & Team */}
            <h2 className="font-heading font-bold text-xl text-[#f0f6fc] mb-1.5">{selectedPlayer.name}</h2>
            <div className="flex items-center gap-2.5 mb-6">
              <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: selectedColor, boxShadow: `0 0 8px ${selectedColor}60` }} />
              <p className="font-body text-sm font-medium" style={{ color: selectedColor }}>{selectedPlayer.team}</p>
            </div>

            {/* Details */}
            <div className="w-full space-y-1 text-left bg-white/[0.02] rounded-2xl p-1.5 border border-white/[0.04] backdrop-blur-sm">
              {[
                {
                  label: 'Date of Birth',
                  value: selectedPlayer.dob
                    ? new Date(selectedPlayer.dob).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })
                    : '—',
                  icon: '📅',
                },
                { label: 'Occupation', value: selectedPlayer.occupation || '—', icon: '💼' },
                { label: 'Mobile', value: selectedPlayer.mobile || '—', icon: '📱' },
              ].map((item, idx) => (
                <div
                  key={item.label}
                  className={`flex items-center justify-between px-4 py-3.5 ${idx < 2 ? 'border-b border-white/[0.04]' : ''} rounded-xl hover:bg-white/[0.02] transition-colors duration-300`}
                >
                  <span className="font-body text-sm text-[#8b949e] flex items-center gap-2.5">
                    <span className="text-base">{item.icon}</span>
                    {item.label}
                  </span>
                  {item.label === 'Mobile' && item.value !== '—' ? (
                    <a
                      href={`tel:+91${item.value}`}
                      className="font-body text-sm text-[#f0b429] font-semibold hover:underline"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {item.value}
                    </a>
                  ) : (
                    <span className="font-body text-sm text-[#f0f6fc] font-medium">{item.value}</span>
                  )}
                </div>
              ))}
            </div>

            {/* Social Links */}
            <div className="flex gap-3 mt-6">
              {selectedPlayer.instagram && (
                <a
                  href={selectedPlayer.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#E1306C]/8 to-[#C13584]/8 border border-[#E1306C]/15 text-[#E1306C] text-sm font-body font-medium hover:bg-[#E1306C]/15 hover:shadow-[0_0_20px_rgba(225,48,108,0.1)] transition-all duration-300 backdrop-blur-sm"
                  onClick={(e) => e.stopPropagation()}
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                  Instagram
                </a>
              )}
              {selectedPlayer.mobile && (
                <a
                  href={`tel:+91${selectedPlayer.mobile}`}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#f0b429]/8 border border-[#f0b429]/15 text-[#f0b429] text-sm font-body font-medium hover:bg-[#f0b429]/15 hover:shadow-[0_0_20px_rgba(240,180,41,0.1)] transition-all duration-300 backdrop-blur-sm"
                  onClick={(e) => e.stopPropagation()}
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                  Call
                </a>
              )}
            </div>
          </div>
        )}
      </Modal>
    </motion.div>
  );
};

export default Members;
