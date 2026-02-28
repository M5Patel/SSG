import React from 'react';
import { motion } from 'framer-motion';
import HeroThreeScene from './HeroThreeScene';
import { AnimatedButton } from '../../ui/AnimatedButton';

export default function Hero() {
    return (
        <section id="home" className="relative w-full h-screen overflow-hidden flex items-center justify-center">
            {/* 3D Background */}
            <HeroThreeScene />

            {/* Hero Content Overlay */}
            <div className="relative z-10 container-custom flex flex-col items-center justify-center text-center mt-20">

                <motion.div
                    initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
                    animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="mb-6 inline-block"
                >
                    <span className="glass px-6 py-2 rounded-full text-cricket-primary font-medium tracking-widest text-sm uppercase">
                        Official Tournament
                    </span>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-5xl md:text-7xl lg:text-8xl font-heading font-black text-white uppercase tracking-tight leading-none mb-4"
                >
                    <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70">
                        SSG Premier
                    </span>
                    <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cricket-primary via-emerald-300 to-white">
                        League
                    </span>
                </motion.h1>

                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-2xl md:text-4xl font-heading font-bold text-cricket-accent mb-6"
                >
                    SEASON 2
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.6 }}
                    className="text-lg md:text-xl text-white/80 font-light mb-10 max-w-2xl mx-auto"
                >
                    Where Champions Are Drawn. Witness the ultimate 2026 cricket spectacle.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    className="flex flex-col sm:flex-row gap-4 items-center justify-center"
                >
                    <AnimatedButton variant="primary" onClick={() => document.getElementById('teams').scrollIntoView({ behavior: 'smooth' })}>
                        View Teams
                    </AnimatedButton>
                    <AnimatedButton variant="accent" onClick={() => document.getElementById('auction').scrollIntoView({ behavior: 'smooth' })}>
                        View Auction
                    </AnimatedButton>
                </motion.div>

            </div>
        </section>
    );
}
