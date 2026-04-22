import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import SectionHeader from '../components/SectionHeader';

// Optimized Cyber Snow: Clean, sharp, zero-lag background particles
const CyberSnow = () => {
  const particles = useMemo(() => Array.from({ length: 60 }), []);
  
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 fixed">
      {particles.map((_, i) => (
        <motion.div
          key={i}
          className="absolute bg-white"
          style={{
            width: Math.random() * 2 + 1,
            height: Math.random() * 2 + 1,
            left: `${Math.random() * 100}%`,
            top: '-10px',
            boxShadow: '0 0 8px rgba(255,255,255,0.8)',
            borderRadius: '0px'
          }}
          animate={{ y: ['0vh', '110vh'], opacity: [0, 1, 0] }}
          transition={{
            duration: Math.random() * 8 + 5,
            repeat: Infinity,
            delay: Math.random() * -10,
            ease: 'linear'
          }}
        />
      ))}
    </div>
  );
};

const galleryItems = [
  {
    id: 1,
    title: 'Auction Photos',
    description: 'Relive the thrilling player auction moments from SSGPL Season 2.',
    link: 'https://site.fotoowl.ai/divyeshsojitra/gallery/247783?pass_key=8123',
    badge: 'Season 2 · 2026',
    color: '#00e5ff', 
    image: '/public/gallery/image.png', 
  },
  {
    id: 2,
    title: 'Previous Tournament',
    description: 'Highlights and memories from our inaugural SSGPL Season 1.',
    link: 'https://site.fotoowl.ai/divyeshsojitra/gallery/205362?pass_key=9418',
    badge: 'Season 1 · 2025',
    color: '#11ffdfff', 
    image: '/public/gallery/image copy.png', 
  },
];

const GalleryCard = ({ item, index }) => {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });

  return (
    <motion.a
      ref={ref}
      href={item.link}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="group relative flex flex-col md:flex-row w-full max-w-[1100px] mx-auto z-10 bg-[#050505] overflow-hidden"
      style={{ '--theme-color': item.color }} 
    >
      {/* 1. OUTER GLOW FRAME */}
      <div className="absolute inset-0 border border-white/10 group-hover:border-[var(--theme-color)] transition-colors duration-700 pointer-events-none z-30" />
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none shadow-[inset_0_0_40px_rgba(0,0,0,0.8)] z-30" style={{ boxShadow: `inset 0 0 30px -10px ${item.color}` }} />

      {/* 2. CORNER TARGETING UI (Fixed & Aligned) */}
      <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 opacity-30 group-hover:opacity-100 transition-all duration-500 z-40 pointer-events-none" style={{ borderColor: item.color }} />
      <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 opacity-30 group-hover:opacity-100 transition-all duration-500 z-40 pointer-events-none" style={{ borderColor: item.color }} />
      <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 opacity-30 group-hover:opacity-100 transition-all duration-500 z-40 pointer-events-none" style={{ borderColor: item.color }} />
      <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 opacity-30 group-hover:opacity-100 transition-all duration-500 z-40 pointer-events-none" style={{ borderColor: item.color }} />

      {/* --- IMAGE SECTION --- */}
      <div className="relative w-full h-64 sm:h-72 md:w-5/12 md:h-auto overflow-hidden bg-black z-10 border-b md:border-b-0 md:border-r border-white/10 group-hover:border-[var(--theme-color)] transition-colors duration-700">
        
        {/* Removed Color Tint and Darkening Gradient to show only the pure image */}

        <motion.img
          src={item.image}
          alt={item.title}
          className="absolute inset-0 w-full h-full object-cover object-center scale-[1.02] group-hover:scale-110 transition-transform duration-[1.5s] ease-out"
        />
      </div>

      {/* --- CONTENT SECTION --- */}
      <div className="relative w-full md:w-7/12 p-8 md:p-12 flex flex-col justify-center z-10">
        
        {/* Interactive Background Glow */}
        <div 
          className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-700 pointer-events-none"
          style={{ background: `radial-gradient(circle at center, ${item.color} 0%, transparent 70%)` }}
        />

        {/* Badge */}
        <div className="mb-5">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 text-[11px] sm:text-xs font-space font-bold text-white uppercase tracking-[0.2em] group-hover:bg-[var(--theme-color)] group-hover:text-black group-hover:border-transparent transition-all duration-500">
            <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
            {item.badge}
          </span>
        </div>
        
        {/* Title (Enhanced size, weight, and tracking) */}
        <h3 
          className="font-orbitron font-black text-3xl sm:text-4xl lg:text-5xl text-white uppercase tracking-[0.05em] leading-tight mb-5 relative"
        >
          {/* Glitch-text layer that appears briefly on hover */}
          <span className="relative z-10 group-hover:text-[var(--theme-color)] transition-colors duration-500 drop-shadow-md group-hover:drop-shadow-[0_0_20px_var(--theme-color)]">
            {item.title}
          </span>
        </h3>

        {/* Description (Enhanced size, color contrast, and font weight) */}
        <p className="font-inter text-gray-300 group-hover:text-white text-base md:text-lg leading-relaxed mb-10 max-w-xl transition-colors duration-500 relative z-10 font-medium tracking-wide">
          {item.description}
        </p>

        {/* --- STABLE CYBER BUTTON --- */}
        <div className="mt-auto relative z-10 self-start">
          <div className="flex items-center gap-4 px-6 py-3 border border-white/20 group-hover:border-[var(--theme-color)] transition-colors duration-500 overflow-hidden relative cursor-pointer">
            
            {/* Background Fill Animation */}
            <div className="absolute inset-0 w-full h-full bg-[var(--theme-color)] -translate-x-[101%] group-hover:translate-x-0 transition-transform duration-500 ease-[cubic-bezier(0.86,0,0.07,1)] z-0" />
            
            {/* Button Text */}
            <span className="font-space font-bold text-xs sm:text-sm uppercase tracking-[0.2em] text-white group-hover:text-black transition-colors duration-500 relative z-10 delay-100">
              Access Gallery
            </span>
            
            {/* Arrow Icon */}
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5 text-white group-hover:text-black transform group-hover:translate-x-1 transition-all duration-500 relative z-10"
              fill="none" viewBox="0 0 24 24" stroke="currentColor"
            >
              <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </div>
        </div>

      </div>
    </motion.a>
  );
};

const Gallery = () => (
  <div className="relative min-h-screen bg-[#020202]">
    <CyberSnow />

    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      transition={{ duration: 1 }}
      className="relative pt-24 md:pt-32 pb-24 px-4 sm:px-6 md:px-12 z-10"
    >
      <SectionHeader 
  title="Game of Glory" 
  subtitle="Every shot, every wicket, every roar — relive the spirit of the game" 
/>

      <div className="flex flex-col gap-12 md:gap-16 mt-16 md:mt-24">
        {galleryItems.map((item, i) => (
          <GalleryCard key={item.id} item={item} index={i} />
        ))}
      </div>
    </motion.div>
  </div>
);

export default Gallery;