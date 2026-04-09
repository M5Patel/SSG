import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const CommitteeCard = ({ member, index }) => {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.08, duration: 0.5 }}
      className="group"
      id={`committee-card-${index}`}
    >
      <div className="glass-card overflow-hidden">
        <div className="relative aspect-[3/4] overflow-hidden">
          <img
            src={member.image}
            alt={member.name}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/30 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <h3 className="font-orbitron font-bold text-sm text-white mb-1">{member.name}</h3>
            {member.role && (
              <span className="text-[10px] font-space font-semibold tracking-wider px-2.5 py-0.5 rounded-full bg-accent-indigo/20 text-accent-indigo border border-accent-indigo/30">
                {member.role}
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CommitteeCard;
