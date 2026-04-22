import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const CommitteeCard = ({ member, index }) => {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="group"
      id={`committee-card-${index}`}
    >
      <div className="relative overflow-hidden rounded-2xl transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
        {/* Glass border */}
        <div className="absolute inset-0 bg-white/[0.03] backdrop-blur-sm border border-white/[0.06] rounded-2xl group-hover:border-[#f0b429]/20 transition-colors duration-500" />

        <div className="relative aspect-[3/4] overflow-hidden rounded-2xl">
          <img
            src={member.image}
            alt={member.name}
            loading="lazy"
            className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-700 ease-out"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e17] via-[#0a0e17]/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />
          {/* Top shine */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/[0.05] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          <div className="absolute bottom-0 left-0 right-0 p-4">
            <h3 className="font-heading font-bold text-sm text-[#f0f6fc] mb-1.5 group-hover:text-[#f0b429] transition-colors duration-300">
              {member.name}
            </h3>
            {member.role && (
              <span className="text-[10px] font-heading font-semibold tracking-wider px-3 py-1 rounded-full bg-[#f0b429]/10 text-[#f0b429] border border-[#f0b429]/20 backdrop-blur-sm">
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
