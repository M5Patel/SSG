import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CountdownTimer = () => {
  const targetDate = new Date('2026-04-26T00:00:00').getTime();

  const calcTime = () => {
    const diff = targetDate - Date.now();
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    return {
      days: Math.floor(diff / 86400000),
      hours: Math.floor((diff % 86400000) / 3600000),
      minutes: Math.floor((diff % 3600000) / 60000),
      seconds: Math.floor((diff % 60000) / 1000),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calcTime);

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(calcTime()), 1000);
    return () => clearInterval(timer);
  }, []);

  const blocks = [
    { label: 'Days', value: timeLeft.days, color: '#f0b429' },
    { label: 'Hours', value: timeLeft.hours, color: '#38bdf8' },
    { label: 'Min', value: timeLeft.minutes, color: '#a78bfa' },
    { label: 'Sec', value: timeLeft.seconds, color: '#f87171' },
  ];

  return (
    <div className="flex justify-center gap-2 sm:gap-3 md:gap-4" id="countdown-timer">
      {blocks.map((b, i) => (
        <motion.div
          key={b.label}
          initial={{ opacity: 0, scale: 0.7, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: i * 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative flex flex-col items-center justify-center w-[60px] h-[74px] sm:w-[76px] sm:h-[92px] md:w-[90px] md:h-[108px] rounded-xl sm:rounded-2xl overflow-hidden group"
        >
          {/* Glass background */}
          <div className="absolute inset-0 bg-white/[0.03] backdrop-blur-xl border border-white/[0.06] rounded-xl sm:rounded-2xl" />
          {/* Gradient accent at top */}
          <div className="absolute top-0 left-0 right-0 h-[2px] rounded-full" style={{ background: `linear-gradient(90deg, transparent, ${b.color}, transparent)` }} />
          {/* Subtle glow */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl sm:rounded-2xl" style={{ boxShadow: `inset 0 0 30px ${b.color}10` }} />

          <div className="relative z-10 flex flex-col items-center">
            <AnimatePresence mode="popLayout">
              <motion.span
                key={b.value}
                initial={{ y: -15, opacity: 0, scale: 0.8 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                exit={{ y: 15, opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="font-display font-bold text-xl sm:text-2xl md:text-4xl tabular-nums"
                style={{ color: b.color, textShadow: `0 0 20px ${b.color}30` }}
              >
                {String(b.value).padStart(2, '0')}
              </motion.span>
            </AnimatePresence>
            <span className="font-heading text-[8px] sm:text-[9px] md:text-[10px] text-[#8b949e] uppercase tracking-[0.15em] sm:tracking-[0.2em] mt-1 sm:mt-1.5">
              {b.label}
            </span>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default CountdownTimer;
