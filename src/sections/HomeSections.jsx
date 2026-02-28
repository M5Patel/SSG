import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiUsers, FiAward, FiActivity, FiMapPin } from 'react-icons/fi';
import SectionTitle from '../ui/SectionTitle';
import StatsCard from '../cards/StatsCard';
import PlayerCard from '../cards/PlayerCard';
import { supabase } from '../services/supabaseClient';

export const TournamentIntro = () => {
    return (
        <section className="py-24 relative overflow-hidden">
            <div className="absolute top-1/2 -left-64 w-96 h-96 bg-primary/20 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8 }}
                    >
                        <SectionTitle
                            title="About The League"
                            subtitle="The Spirit That Never Sleeps"
                            centered={false}
                            className="mb-6"
                        />
                        <p className="text-gray-300 text-lg leading-relaxed mb-6 font-light">
                            SSG Premier League (SSGPL) is more than just a cricket tournament; it's a celebration of sportsmanship, unity, and raw passion.
                            Founded on the principles of fair play and competitive excellence, SSGPL brings together the finest local talent in an electrifying format.
                        </p>
                        <p className="text-gray-300 text-lg leading-relaxed mb-8 font-light">
                            From intense auctions to nail-biting finishes, every season writes a new chapter in our history.
                            Join us as we embark on another thrilling journey of cricket excellence.
                        </p>

                        <div className="grid grid-cols-2 gap-6">
                            {[
                                { label: 'Founded', value: '2025' },
                                { label: 'Format', value: 'T20 & T10' },
                                { label: 'Matches', value: 'Weekends' },
                                { label: 'Vibe', value: 'Electric' },
                            ].map((item, idx) => (
                                <div key={idx} className="border-l-2 border-primary pl-4">
                                    <p className="text-xl font-bold text-white">{item.value}</p>
                                    <p className="text-sm text-gray-400 uppercase tracking-wider">{item.label}</p>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8 }}
                        className="relative"
                    >
                        {/* Abstract aesthetic image placeholder */}
                        <div className="w-full aspect-square rounded-full glass overflow-hidden border-4 border-white/5 relative p-4 group">
                            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-secondary/20 group-hover:opacity-50 transition-opacity duration-700 pointer-events-none rounded-full" />
                            <img
                                src="https://images.unsplash.com/photo-1531415074968-036ba1b575da?q=80&w=2000&auto=format&fit=crop"
                                alt="Cricket Passion"
                                className="w-full h-full object-cover rounded-full transform group-hover:scale-105 transition-transform duration-700 grayscale hover:grayscale-0"
                            />
                        </div>
                        {/* Floating Badge */}
                        <motion.div
                            className="absolute -bottom-6 -right-6 glass rounded-2xl p-6 shadow-2xl border border-white/10"
                            animate={{ y: [0, -10, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                        >
                            <div className="text-primary mb-2"><FiAward size={32} /></div>
                            <p className="text-white font-bold text-lg leading-tight text-glow">Premium<br />League</p>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export const FeaturedPlayers = () => {
    const [players, setPlayers] = useState([
        // Mock Default Players to ensure stunning UI even without Supabase data
        { id: 1, name: 'Virat Kohli', role: 'Batsman', team: 'SSG Royals', matches: 15, runs: 650, wickets: 2, image: 'https://images.unsplash.com/photo-1593341646782-e0be4ceda982?q=80&w=500&auto=format&fit=crop' },
        { id: 2, name: 'MS Dhoni', role: 'Wicketkeeper', team: 'SSG Titans', matches: 20, runs: 500, wickets: 0, image: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?q=80&w=500&auto=format&fit=crop' },
        { id: 3, name: 'Jasprit Bumrah', role: 'Bowler', team: 'SSG Strikers', matches: 18, runs: 45, wickets: 32, image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=500&auto=format&fit=crop' },
        { id: 4, name: 'Hardik Pandya', role: 'All-Rounder', team: 'SSG Warriors', matches: 16, runs: 320, wickets: 18, image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?q=80&w=500&auto=format&fit=crop' },
    ]);

    useEffect(() => {
        const fetchFeaturedPlayers = async () => {
            if (!supabase) return;
            try {
                const { data, error } = await supabase
                    .from('players')
                    .select('*')
                    .limit(4);

                if (error) throw error;
                if (data && data.length > 0) setPlayers(data);
            } catch (err) {
                console.error('Error fetching featured players', err);
            }
        };
        fetchFeaturedPlayers();
    }, []);

    return (
        <section className="py-24 relative overflow-hidden bg-white/5">
            <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
                <SectionTitle
                    title="Featured Stars"
                    subtitle="Top Performers"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                    {players.map((player, idx) => (
                        <PlayerCard key={player.id} player={player} index={idx} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export const TournamentStats = () => {
    const stats = [
        { title: 'Total Players', value: 120, icon: FiUsers, suffix: '+' },
        { title: 'Total Teams', value: 8, icon: FiAward },
        { title: 'Matches Played', value: 64, icon: FiActivity },
        { title: 'Prize Pool', value: 50000, prefix: '₹', icon: FiMapPin }, // MapPin used loosely as generic icon 4
    ];

    return (
        <section className="py-24 relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[150px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
                <SectionTitle
                    title="By The Numbers"
                    subtitle="Tournament Scale"
                />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {stats.map((stat, idx) => (
                        <StatsCard
                            key={idx}
                            title={stat.title}
                            value={stat.value}
                            prefix={stat.prefix}
                            suffix={stat.suffix}
                            icon={stat.icon}
                            delay={idx * 0.1}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};
