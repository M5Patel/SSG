import React from 'react';
import { motion } from 'framer-motion';

const SectionTitle = ({ title, subtitle, className = '', centered = true }) => {
    return (
        <div className={`mb-16 ${centered ? 'text-center' : 'text-left'} ${className}`}>
            {subtitle && (
                <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="inline-block text-primary uppercase tracking-widest text-sm font-semibold mb-3 relative"
                >
                    {subtitle}
                    <span className="absolute -bottom-1 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-50"></span>
                </motion.span>
            )}
            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white text-glow"
            >
                {title}
            </motion.h2>
        </div>
    );
};

export default SectionTitle;
