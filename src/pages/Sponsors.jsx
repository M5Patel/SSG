import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import SectionHeader from '../components/SectionHeader';

const pageVariants = {
  initial: { opacity: 0, y: 15 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  exit: { opacity: 0, y: -15 },
};

const SponsorCard = ({ src, index }) => {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.04, duration: 0.5 }}
      className="group flex justify-center items-center"
    >
      <img
        src={src}
        alt={`SSGPL Sponsor ${index + 1}`}
        loading="lazy"
        className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-400 rounded-lg"
      />
    </motion.div>
  );
};

const Sponsors = () => {
  const images = useMemo(() => {
    const files = import.meta.glob('/public/sponsers/*.{jpg,jpeg,png,webp}', { eager: true });
    return Object.keys(files).sort().map(p => p.replace('/public', ''));
  }, []);

  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit"
      className="min-h-screen pt-24 md:pt-28 pb-16 px-5 md:px-8 lg:px-16"
    >
      <SectionHeader title="Our Sponsors" />

      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 items-center">
        {images.map((src, i) => (
          <SponsorCard key={src} src={src} index={i} />
        ))}
      </div>
    </motion.div>
  );
};

export default Sponsors;