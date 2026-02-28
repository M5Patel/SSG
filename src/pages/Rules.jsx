import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronDown } from 'react-icons/fi';
import SectionTitle from '../ui/SectionTitle';
import GlassCard from '../ui/GlassCard';
import { rulesData } from '../data/rulesData';

const Rules = () => {
  const [openSection, setOpenSection] = useState('general');

  const toggleSection = (id) => {
    setOpenSection(openSection === id ? null : id);
  };

  return (
    <div className="w-full min-h-screen pt-28 pb-24 px-6 lg:px-8 bg-premium-dark relative">
      {/* Background Aesthetic */}
      <div className="absolute top-40 left-10 w-72 h-72 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-40 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        <SectionTitle
          title="Tournament Rules"
          subtitle="Code of Conduct"
          centered={true}
        />

        <div className="space-y-4">
          {rulesData.map((category, index) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              key={category.id}
            >
              <GlassCard className="!p-0 overflow-hidden" hover={false}>
                <button
                  onClick={() => toggleSection(category.id)}
                  className="w-full px-8 py-6 flex items-center justify-between text-left focus:outline-none hover:bg-white/5 transition-colors"
                >
                  <h3 className="text-xl font-display font-bold text-white tracking-wide">
                    {category.category}
                  </h3>
                  <motion.div
                    animate={{ rotate: openSection === category.id ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-primary bg-primary/20 rounded-full p-2"
                  >
                    <FiChevronDown size={24} />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {openSection === category.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="px-8 pb-8 pt-2">
                        <ul className="space-y-4 border-t border-white/10 pt-6">
                          {category.rules.map((rule, idx) => (
                            <li key={idx} className="flex items-start gap-4 text-gray-300">
                              <span className="shrink-0 w-6 h-6 rounded-full bg-white/10 text-primary flex items-center justify-center text-sm font-bold border border-white/20 mt-0.5">
                                {idx + 1}
                              </span>
                              <span className="leading-relaxed">{rule}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Rules;
