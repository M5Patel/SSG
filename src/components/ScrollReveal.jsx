import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const ScrollReveal = ({
  children,
  delay = 0,
  direction = 'up',
  duration = 0.6,
  className = '',
  once = true,
}) => {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: once });

  const directionVariants = {
    up: { hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0 } },
    down: { hidden: { opacity: 0, y: -50 }, visible: { opacity: 1, y: 0 } },
    left: { hidden: { opacity: 0, x: -50 }, visible: { opacity: 1, x: 0 } },
    right: { hidden: { opacity: 0, x: 50 }, visible: { opacity: 1, x: 0 } },
    scale: { hidden: { opacity: 0, scale: 0.9 }, visible: { opacity: 1, scale: 1 } },
    fade: { hidden: { opacity: 0 }, visible: { opacity: 1 } },
  };

  const variants = directionVariants[direction] || directionVariants.up;

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={variants}
      transition={{ delay, duration, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;
