import React, { Suspense } from 'react';
import { motion } from 'framer-motion';
import Button from '../ui/Button';
import HeroThreeScene from './HeroThreeScene';

const Hero = () => {
    return (
        <section className="relative w-full h-screen min-h-[600px] flex items-center justify-center overflow-hidden bg-dark">
            {/* 3D Scene Background */}
            <Suspense fallback={<div className="absolute inset-0 bg-dark animate-pulse" />}>
                <HeroThreeScene />
            </Suspense>

            {/* Content Overlay */}
            <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8 flex flex-col items-center text-center pointer-events-none">

                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                    <span className="inline-block py-1 px-3 rounded-full bg-white/10 border border-white/20 text-primary text-sm font-semibold tracking-widest uppercase mb-6 backdrop-blur-md">
                        Season 2 Arriving Soon
                    </span>
                </motion.div>

                <motion.h1
                    className="text-5xl md:text-7xl lg:text-8xl font-display font-bold text-white tracking-tight mb-6"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                >
                    <span className="text-glow">SSGPL</span>
                    <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-white to-secondary">
                        Cricket Tournament
                    </span>
                </motion.h1>

                <motion.p
                    className="max-w-2xl text-lg md:text-xl text-gray-300 mb-10 leading-relaxed font-light"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                >
                    Experience the ultimate fusion of skill, strategy, and passion. The premier cricket league where legends are born.
                </motion.p>

                {/* Pointer events auto enabled specifically for buttons so they are clickable */}
                <motion.div
                    className="flex flex-col sm:flex-row gap-4 sm:gap-6 pointer-events-auto"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                >
                    <Button variant="primary" size="lg" to="/members">
                        View Players
                    </Button>
                    <Button variant="outline" size="lg" to="/gallery">
                        View Gallery
                    </Button>
                </motion.div>

            </div>

            {/* Scroll indicator */}
            <motion.div
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
            >
                <span className="text-xs text-gray-400 uppercase tracking-widest">Scroll to explore</span>
                <motion.div
                    className="w-[1px] h-12 bg-gradient-to-b from-primary to-transparent"
                    animate={{ height: ['0px', '48px'], opacity: [0, 1, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                />
            </motion.div>
        </section>
    );
};

export default Hero;
