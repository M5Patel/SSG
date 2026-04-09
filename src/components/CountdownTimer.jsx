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
    { label: 'Days', value: timeLeft.days, color: '#2dd4bf' },
    { label: 'Hours', value: timeLeft.hours, color: '#818cf8' },
    { label: 'Min', value: timeLeft.minutes, color: '#fbbf24' },
    { label: 'Sec', value: timeLeft.seconds, color: '#fb7185' },
  ];

  return (
    <div className="flex justify-center gap-3 md:gap-4" id="countdown-timer">
      {blocks.map((b, i) => (
        <motion.div
          key={b.label}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.1, duration: 0.5 }}
          className="flex flex-col items-center justify-center w-[68px] h-[82px] md:w-[88px] md:h-[100px] rounded-xl glass-card"
          style={{ borderColor: `${b.color}20` }}
        >
          <AnimatePresence mode="popLayout">
            <motion.span
              key={b.value}
              initial={{ y: -12, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 12, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="font-orbitron font-bold text-2xl md:text-4xl tabular-nums"
              style={{ color: b.color }}
            >
              {String(b.value).padStart(2, '0')}
            </motion.span>
          </AnimatePresence>
          <span className="font-space text-[10px] text-slate-400 uppercase tracking-[0.15em] mt-1">
            {b.label}
          </span>
        </motion.div>
      ))}
    </div>
  );
};

export default CountdownTimer;
