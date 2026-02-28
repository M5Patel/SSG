import React, { useState } from 'react';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import { useInView } from 'framer-motion';

const StatsCard = ({ title, value, prefix = '', suffix = '', icon: Icon, delay = 0 }) => {
    const ref = React.useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay }}
            className="glass rounded-3xl p-8 relative overflow-hidden group hover:bg-white/5 transition-colors border border-white/10"
        >
            <div className="absolute -right-10 -bottom-10 opacity-5 group-hover:opacity-20 transition-opacity duration-500 transform group-hover:scale-110">
                {Icon && <Icon size={120} className="text-primary" />}
            </div>

            <div className="relative z-10 flex flex-col items-center text-center">
                <div className="mb-4 p-4 rounded-full bg-primary/10 text-primary group-hover:scale-110 transition-transform duration-300">
                    {Icon && <Icon size={32} />}
                </div>

                <h3 className="text-4xl md:text-5xl font-display font-bold text-white mb-2 text-glow">
                    {prefix}
                    {isInView ? (
                        <CountUp end={value} duration={2.5} separator="," useEasing={true} />
                    ) : (
                        '0'
                    )}
                    {suffix}
                </h3>

                <p className="text-gray-400 font-medium uppercase tracking-widest text-sm">
                    {title}
                </p>
            </div>
        </motion.div>
    );
};

export default StatsCard;
