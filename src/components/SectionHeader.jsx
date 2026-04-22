import React from 'react';
import { motion } from 'framer-motion';

const SectionHeader = ({ title, subtitle, className = '' }) => (
  <div className={`text-center mb-12 md:mb-16 ${className}`}>
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="inline-flex items-center gap-3 mb-4"
    >
      <span className="w-8 md:w-12 h-[1px] bg-gradient-to-r from-transparent to-[#f0b429]/50" />
      <span className="font-heading text-[10px] tracking-[0.3em] text-[#f0b429]/70 uppercase">SSGPL</span>
      <span className="w-8 md:w-12 h-[1px] bg-gradient-to-l from-transparent to-[#f0b429]/50" />
    </motion.div>

    <motion.h1
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="font-heading font-bold text-3xl sm:text-4xl md:text-5xl gradient-text mb-4"
    >
      {title}
    </motion.h1>

    {subtitle && (
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="font-body text-[#8b949e] text-base md:text-lg max-w-xl mx-auto"
      >
        {subtitle}
      </motion.p>
    )}

    <motion.div
      initial={{ scaleX: 0 }}
      animate={{ scaleX: 1 }}
      transition={{ delay: 0.4, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="h-[2px] w-20 mx-auto mt-6 origin-center bg-gradient-to-r from-transparent via-[#f0b429] to-transparent"
    />
  </div>
);

export default SectionHeader;
