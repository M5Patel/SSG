import React from 'react';
import { motion } from 'framer-motion';

const SectionHeader = ({ title, subtitle, className = '' }) => (
  <div className={`text-center mb-10 md:mb-14 ${className}`}>
    <motion.h1
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="font-orbitron font-bold text-3xl sm:text-4xl md:text-5xl gradient-text mb-3"
    >
      {title}
    </motion.h1>

    {subtitle && (
      <motion.p
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.5 }}
        className="font-inter text-slate-400 text-base md:text-lg max-w-xl mx-auto"
      >
        {subtitle}
      </motion.p>
    )}

    <motion.div
      initial={{ scaleX: 0 }}
      animate={{ scaleX: 1 }}
      transition={{ delay: 0.3, duration: 0.6 }}
      className="h-[2px] w-20 mx-auto mt-5 origin-center bg-gradient-to-r from-accent-teal to-accent-indigo"
    />
  </div>
);

export default SectionHeader;
