import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlay, FiX } from 'react-icons/fi';
import GlassCard from './GlassCard';

const VideoSection = ({ videoId = 'dQw4w9WgXcQ', title = 'Tournament Highlights', thumbnail }) => {
    const [isOpen, setIsOpen] = useState(false);

    // Use a default cricket thumbnail if none provided
    const coverImage = thumbnail || 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?q=80&w=2000&auto=format&fit=crop';

    return (
        <div className="w-full relative py-12">
            {/* Video Thumbnail Card */}
            <GlassCard className="p-0 overflow-hidden cursor-pointer group" hover={false}>
                <div className="relative w-full aspect-video md:aspect-[21/9]">
                    <img
                        src={coverImage}
                        alt={title}
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-dark/60 group-hover:bg-dark/40 transition-colors duration-500" />

                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setIsOpen(true)}
                            className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-primary/20 backdrop-blur-md border border-primary text-white flex items-center justify-center shadow-[0_0_30px_rgba(0,229,255,0.4)] relative z-10"
                        >
                            <div className="absolute inset-0 rounded-full animate-ping bg-primary/40 opacity-50" />
                            <FiPlay size={32} className="ml-2" />
                        </motion.button>
                        <h3 className="text-2xl md:text-3xl font-display font-bold text-white mt-6 tracking-wider text-glow text-center px-4">
                            {title}
                        </h3>
                    </div>
                </div>
            </GlassCard>

            {/* Video Modal */}
            <AnimatePresence>
                {isOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="absolute inset-0 bg-dark/95 backdrop-blur-xl"
                        />

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="relative w-full max-w-5xl aspect-video z-10 rounded-2xl overflow-hidden shadow-2xl border border-white/10 glass"
                        >
                            <button
                                onClick={() => setIsOpen(false)}
                                className="absolute -top-12 right-0 text-gray-400 hover:text-white transition-colors"
                                title="Close"
                            >
                                <FiX size={32} />
                            </button>

                            <iframe
                                className="w-full h-full"
                                src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                                title="YouTube video player"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default VideoSection;
