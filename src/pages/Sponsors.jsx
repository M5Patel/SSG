import React, { useMemo, useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionHeader from '../components/SectionHeader';

const pageVariants = {
  initial: { opacity: 0, y: 15 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  exit: { opacity: 0, y: -15 },
};

const Sponsors = () => {
  const images = useMemo(() => {
    const files = import.meta.glob('/public/sponsers/*.{jpg,jpeg,png,webp}', { eager: true });
    return Object.keys(files).sort().map(p => p.replace('/public', ''));
  }, []);

  // Shuffled order state
  const [order, setOrder] = useState([]);
  const [isShuffling, setIsShuffling] = useState(false);

  // Initialize order
  useEffect(() => {
    setOrder(images.map((_, i) => i));
  }, [images]);

  // Auto-shuffle every 5 seconds with cascading animation
  const shuffle = useCallback(() => {
    if (images.length <= 1) return;
    setIsShuffling(true);

    // Fisher-Yates shuffle
    setOrder(prev => {
      const newOrder = [...prev];
      for (let i = newOrder.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newOrder[i], newOrder[j]] = [newOrder[j], newOrder[i]];
      }
      return newOrder;
    });

    setTimeout(() => setIsShuffling(false), 800);
  }, [images.length]);

  useEffect(() => {
    if (images.length <= 1) return;
    const timer = setInterval(shuffle, 5000);
    return () => clearInterval(timer);
  }, [shuffle, images.length]);

  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit"
      className="min-h-screen pt-24 md:pt-28 pb-16 px-4 sm:px-6 md:px-8 lg:px-16"
    >
      <SectionHeader title="Our Sponsors" subtitle="The partners who make SSGPL possible" />

      {/* Shuffle indicator */}
      {images.length > 1 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="max-w-6xl mx-auto mb-8 flex items-center justify-center"
        >
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/[0.03] backdrop-blur-xl border border-white/[0.06]">
            <div className="flex gap-1">
              {[0, 1, 2].map(i => (
                <motion.div
                  key={i}
                  className="w-1.5 h-1.5 rounded-full bg-[#f0b429]"
                  animate={{
                    y: isShuffling ? [-3, 3, -3] : 0,
                    opacity: isShuffling ? [0.3, 1, 0.3] : 0.5,
                  }}
                  transition={{ duration: 0.6, delay: i * 0.1, ease: 'easeInOut' }}
                />
              ))}
            </div>
            <button
              onClick={shuffle}
              className="text-[10px] font-heading text-[#f0b429] tracking-wider uppercase hover:text-[#f7c948] transition-colors cursor-pointer"
            >
              Shuffle Now
            </button>
          </div>
        </motion.div>
      )}

      {/* Sponsor Grid with layout animation */}
      <div className="max-w-6xl mx-auto">
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 md:gap-8 items-start">
          <AnimatePresence mode="popLayout">
            {order.map((originalIndex, displayIndex) => {
              const src = images[originalIndex];
              if (!src) return null;

              return (
                <motion.div
                  key={src}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    transition: {
                      delay: displayIndex * 0.05,
                      duration: 0.6,
                      ease: [0.22, 1, 0.36, 1],
                      layout: {
                        type: 'spring',
                        stiffness: 200,
                        damping: 25,
                        mass: 0.8,
                      },
                    },
                  }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="group"
                >
                  <div className="relative overflow-hidden rounded-2xl transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
                    {/* Glass bg */}
                    <div className="absolute inset-0 bg-white/[0.03] backdrop-blur-xl border border-white/[0.06] rounded-2xl group-hover:border-[#f0b429]/15 transition-all duration-500" />
                    {/* Top accent */}
                    <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#f0b429]/10 to-transparent group-hover:via-[#f0b429]/25 transition-all duration-500" />
                    {/* Glow */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: 'radial-gradient(circle at 50% 50%, rgba(240,180,41,0.04), transparent 70%)' }} />

                    {/* Rank badge
                    <div className="absolute top-3 left-3 z-20">
                      <motion.div
                        key={`rank-${displayIndex}`}
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: displayIndex * 0.05 + 0.2, duration: 0.4 }}
                        className="w-7 h-7 rounded-lg bg-white/[0.06] backdrop-blur-xl border border-white/[0.08] flex items-center justify-center"
                      >
                        <span className="font-display text-[10px] font-bold text-[#f0b429]">
                          {displayIndex + 1}
                        </span>
                      </motion.div>
                    </div> */}

                    <div className="relative z-10 p-4 sm:p-5">
                      <img
                        src={src}
                        alt={`SSGPL Sponsor ${originalIndex + 1}`}
                        loading="lazy"
                        className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-500 rounded-xl"
                      />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>

      {images.length === 0 && (
        <div className="text-center py-20">
          <div className="rounded-2xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center mx-auto mb-5 backdrop-blur-xl" style={{ width: 72, height: 72 }}>
            <span className="text-3xl">🤝</span>
          </div>
          <p className="font-heading font-bold text-[#8b949e] text-lg">Sponsors coming soon</p>
          <p className="font-body text-[#484f58] mt-1.5 text-sm">Stay tuned for our amazing partners</p>
        </div>
      )}
    </motion.div>
  );
};

export default Sponsors;