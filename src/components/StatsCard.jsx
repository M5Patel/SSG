import React from 'react';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';

const StatsCard = ({ stat, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-gradient-cricket text-white rounded-xl p-8 shadow-2xl transform hover:scale-105 transition-all duration-300"
    >
      {/* Icon */}
      <div className="text-6xl mb-4">{stat.icon}</div>
      
      {/* Animated Counter */}
      <div className="text-5xl font-bold mb-2">
        <CountUp end={stat.value} duration={2.5} separator="," />
        <span className="text-cricket-gold">{stat.suffix}</span>
      </div>
      
      {/* Label */}
      <p className="text-xl text-cricket-gold-light font-semibold">{stat.label}</p>
    </motion.div>
  );
};

export default StatsCard;
