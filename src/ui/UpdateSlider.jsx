import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronLeft, FiChevronRight, FiBell } from 'react-icons/fi';
import { supabase } from '../services/supabaseClient';

// Fallback mock data in case Supabase is not configured or empty
const mockUpdates = [
    { id: 1, title: 'Season 2 Registrations Open!', description: 'Join the ultimate cricket showdown. Register your team now.', date: '2027-03-01' },
    { id: 2, title: 'Auction Date Announced', description: 'Player auction will be held live on 15th March.', date: '2027-02-28' },
    { id: 3, title: 'New Sponsors Onboard', description: 'Welcoming our new platinum sponsors for the upcoming season.', date: '2027-02-20' },
];

const UpdateSlider = () => {
    const [updates, setUpdates] = useState(mockUpdates);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUpdates = async () => {
            if (!supabase) {
                setLoading(false);
                return;
            }

            try {
                const { data, error } = await supabase
                    .from('updates')
                    .select('*')
                    .order('date', { ascending: false })
                    .limit(5);

                if (error) throw error;
                if (data && data.length > 0) setUpdates(data);
            } catch (error) {
                console.error('Error fetching updates:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUpdates();
    }, []);

    useEffect(() => {
        // Autoplay
        const timer = setInterval(() => {
            handleNext();
        }, 5000);
        return () => clearInterval(timer);
    }, [updates.length]);

    const handleNext = () => {
        setCurrentIndex((prev) => (prev + 1) % updates.length);
    };

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev - 1 + updates.length) % updates.length);
    };

    if (loading) {
        return (
            <div className="w-full max-w-4xl mx-auto h-32 glass rounded-2xl flex items-center justify-center animate-pulse">
                <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (updates.length === 0) return null;

    const currentUpdate = updates[currentIndex];

    return (
        <div className="w-full max-w-4xl mx-auto relative group">
            {/* Decorative Glow */}
            <div className="absolute -inset-1 bg-gradient-to-r from-primary/30 to-secondary/30 rounded-2xl blur-xl opacity-50 group-hover:opacity-100 transition-opacity duration-500"></div>

            <div className="glass rounded-2xl p-6 md:p-8 relative overflow-hidden flex items-center min-h-[140px]">
                {/* Navigation Arrows */}
                <button
                    onClick={handlePrev}
                    className="absolute left-4 z-20 p-2 rounded-full bg-white/5 hover:bg-white/20 text-white transition-colors"
                    aria-label="Previous Update"
                >
                    <FiChevronLeft size={24} />
                </button>

                <button
                    onClick={handleNext}
                    className="absolute right-4 z-20 p-2 rounded-full bg-white/5 hover:bg-white/20 text-white transition-colors"
                    aria-label="Next Update"
                >
                    <FiChevronRight size={24} />
                </button>

                {/* Slider Content */}
                <div className="w-full px-12 overflow-hidden relative">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentIndex}
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                            transition={{ duration: 0.3 }}
                            className="flex flex-col md:flex-row items-start md:items-center gap-4"
                        >
                            <div className="shrink-0 p-3 rounded-full bg-primary/20 text-primary">
                                <FiBell size={28} />
                            </div>
                            <div>
                                <div className="flex items-center gap-3 mb-1">
                                    <h3 className="text-xl font-bold text-white tracking-wide">{currentUpdate.title}</h3>
                                    <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-white/10 text-gray-300">
                                        {new Date(currentUpdate.date).toLocaleDateString()}
                                    </span>
                                </div>
                                <p className="text-gray-400 text-sm md:text-base">{currentUpdate.description}</p>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Dots Indicators */}
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                    {updates.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => setCurrentIndex(idx)}
                            className={`w-2 h-2 rounded-full transition-all ${idx === currentIndex ? 'bg-primary w-6' : 'bg-white/20 hover:bg-white/40'
                                }`}
                            aria-label={`Go to slide ${idx + 1}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default UpdateSlider;
