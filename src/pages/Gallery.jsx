import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import SectionHeader from '../components/SectionHeader';

const pageVariants = {
  initial: { opacity: 0, y: 15 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  exit: { opacity: 0, y: -15 },
};

const galleryItems = [
  {
    id: 1,
    title: '🏏 Auction Photos',
    description: 'Relive the thrilling player auction moments from SSGPL Season 2',
    link: 'https://site.fotoowl.ai/divyeshsojitra/gallery/247783?pass_key=8123',
    badge: 'Season 2 · 2026',
    color: '#2dd4bf',
    emojis: ['🏏', '💰', '🎯', '⚡'],
  },
  {
    id: 2,
    title: '🏆 Previous Tournament',
    description: 'Highlights and memories from our inaugural SSGPL Season 1',
    link: 'https://site.fotoowl.ai/divyeshsojitra/gallery/205362?pass_key=9418',
    badge: 'Season 1 · 2025',
    color: '#818cf8',
    emojis: ['🏆', '🎉', '⭐', '🔥'],
  },
];

const GalleryCard = ({ item, index }) => {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <motion.a
      ref={ref}
      href={item.link}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.15, duration: 0.5 }}
      className="group block max-w-[700px] mx-auto w-full"
      id={`gallery-card-${item.id}`}
    >
      <div className="glass-card overflow-hidden">
        {/* Banner */}
        <div className="h-44 md:h-56 bg-gradient-to-br from-white/[0.04] to-white/[0.01] relative flex items-center justify-center">
          <div className="flex gap-6 text-4xl md:text-5xl opacity-20 group-hover:opacity-40 transition-opacity duration-500">
            {item.emojis.map((e, i) => <span key={i}>{e}</span>)}
          </div>
          <div className="absolute top-4 right-4">
            <span className="px-3 py-1 rounded-full text-xs font-space font-semibold text-white/80 border border-white/10 bg-white/[0.04] backdrop-blur-sm">
              {item.badge}
            </span>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#0f172a]/70 to-transparent" />
        </div>

        {/* Content */}
        <div className="p-6 md:p-7">
          <h3 className="font-orbitron font-bold text-lg md:text-xl text-white mb-2 group-hover:text-accent-teal transition-colors">
            {item.title}
          </h3>
          <p className="font-inter text-slate-400 text-sm mb-4 leading-relaxed">{item.description}</p>
          <span className="font-space font-semibold text-sm uppercase tracking-wider flex items-center gap-2 group-hover:gap-3 transition-all" style={{ color: item.color }}>
            View Gallery →
          </span>
        </div>
      </div>
    </motion.a>
  );
};

const Gallery = () => (
  <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit"
    className="min-h-screen pt-24 md:pt-28 pb-16 px-5 md:px-8"
  >
    <SectionHeader title="Gallery" subtitle="Captured moments of glory and passion" />

    <div className="space-y-8 md:space-y-10 max-w-[700px] mx-auto">
      {galleryItems.map((item, i) => (
        <GalleryCard key={item.id} item={item} index={i} />
      ))}
    </div>
  </motion.div>
);

export default Gallery;
