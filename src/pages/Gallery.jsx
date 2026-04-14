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
      transition={{ delay: index * 0.15, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="group relative block w-full max-w-[1100px] mx-auto z-10"
    >
      {/* High-Tech Corner Brackets - Moved slightly outward so they don't clip */}
      <div className="absolute -inset-[3px] border border-transparent group-hover:border-t-current group-hover:border-l-current w-16 h-16 transition-all duration-300 opacity-0 group-hover:opacity-100 z-20 pointer-events-none" style={{ color: item.color }} />
      <div className="absolute -bottom-[3px] -right-[3px] border border-transparent group-hover:border-b-current group-hover:border-r-current w-16 h-16 transition-all duration-300 opacity-0 group-hover:opacity-100 z-20 pointer-events-none" style={{ color: item.color }} />

      {/* Main Card Container - Enforced stronger default borders */}
      <div className="relative bg-[#050505] flex flex-col md:flex-row w-full z-10 border border-white/10 group-hover:border-white/30 transition-colors duration-500 rounded-none">
        
        {/* Animated Cyber Scanner Line */}
        <div 
          className="absolute top-0 left-0 w-full h-[2px] opacity-0 group-hover:opacity-100 group-hover:animate-scan z-30 pointer-events-none" 
          style={{ backgroundColor: item.color, boxShadow: `0 0 15px ${item.color}` }} 
        />

        {/* --- IMAGE SECTION --- */}
        {/* Changed width ratio to give text more room, added explicit border between image and text */}
        <div className="relative w-full h-64 sm:h-72 md:w-5/12 md:h-auto overflow-hidden bg-[#020202] border-b md:border-b-0 md:border-r border-white/10">
          <motion.img
            src={item.image}
            alt={item.title}
            className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-[1.5s] ease-out opacity-90 group-hover:opacity-100"
            whileHover={{ scale: 1.08 }}
          />
        </div>

        {/* --- CONTENT SECTION --- */}
        <div className="relative w-full md:w-7/12 p-6 sm:p-8 md:p-10 lg:p-12 flex flex-col justify-center bg-[#050505]">
          
          {/* FIX: Moved Badge ABOVE the title to completely eliminate clipping/squishing issues */}
          <div className="mb-6 flex flex-col items-start">
            <span 
              className="inline-block px-3 py-1.5 text-[10px] sm:text-xs font-space font-bold text-white uppercase tracking-[0.2em] border border-white/10 bg-white/5 backdrop-blur-md mb-4 transition-colors duration-300"
              style={{ borderLeftColor: item.color, borderLeftWidth: '3px' }}
            >
              {item.badge}
            </span>
            
            <h3 
              className="font-orbitron font-extrabold text-2xl sm:text-3xl lg:text-4xl text-white uppercase tracking-[0.08em] transition-colors duration-300 leading-tight"
              onMouseEnter={(e) => e.target.style.color = item.color}
              onMouseLeave={(e) => e.target.style.color = 'white'}
            >
              {item.title}
            </h3>
          </div>

          <p className="font-inter text-slate-300 text-sm md:text-base leading-relaxed mb-10 max-w-lg">
            {item.description}
          </p>

          {/* Action Button Area */}
          <div className="mt-auto flex items-center gap-3 font-space font-bold text-xs sm:text-sm uppercase tracking-[0.2em]" style={{ color: item.color }}>
            <div className="h-[2px] w-0 group-hover:w-12 transition-all duration-500 bg-current" />
            <span className="relative overflow-hidden inline-block">
               <span className="block group-hover:-translate-y-full transition-transform duration-500">View Gallery</span>
               <span className="absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-500">Access Data</span>
            </span>
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5 ml-1 sm:ml-2 transform group-hover:translate-x-2 transition-transform duration-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
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
      <SectionHeader title="Gallery" subtitle="Cinematic moments of glory and passion" />

      <div className="flex flex-col gap-12 md:gap-16 mt-16 md:mt-24">
        {galleryItems.map((item, i) => (
          <GalleryCard key={item.id} item={item} index={i} />
        ))}
      </div>
    </motion.div>
  </div>
);

export default Gallery;