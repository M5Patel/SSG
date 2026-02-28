import React from 'react';
import { motion } from 'framer-motion';

const PlayerCard = ({ player, index = 0 }) => {
    if (!player) return null;

    const { name, role, team, image, stats } = player;

    // Default image fallback
    const defaultImage = "https://images.unsplash.com/photo-1593341646782-e0be4ceda982?q=80&w=800&auto=format&fit=crop";

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -10 }}
            className="glass rounded-2xl overflow-hidden group cursor-pointer relative"
        >
            {/* Decorative Glow */}
            <div className="absolute inset-0 bg-gradient-to-t from-dark via-transparent to-transparent z-10" />

            {/* Top Tag */}
            <div className="absolute top-4 left-4 z-20 flex gap-2">
                <span className="px-3 py-1 text-xs font-bold rounded-full bg-primary text-dark shadow-[0_0_10px_rgba(0,229,255,0.4)]">
                    {team}
                </span>
            </div>

            {/* Image Container */}
            <div className="w-full aspect-[4/5] overflow-hidden relative">
                <img
                    src={image || defaultImage}
                    alt={name}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                />
            </div>

            {/* Content */}
            <div className="absolute bottom-0 left-0 w-full p-6 z-20 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-primary transition-colors">{name}</h3>
                <p className="text-gray-300 font-medium text-sm mb-4 uppercase tracking-wider">{role}</p>

                {/* Animated Stats Reveal */}
                <div className="grid grid-cols-3 gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                    <div className="bg-white/10 rounded-lg p-2 text-center backdrop-blur-md">
                        <p className="text-xs text-gray-400">Match</p>
                        <p className="font-bold text-white">{stats?.matches || '-'}</p>
                    </div>
                    <div className="bg-white/10 rounded-lg p-2 text-center backdrop-blur-md">
                        <p className="text-xs text-gray-400">Runs</p>
                        <p className="font-bold text-white">{stats?.runs || '-'}</p>
                    </div>
                    <div className="bg-white/10 rounded-lg p-2 text-center backdrop-blur-md">
                        <p className="text-xs text-gray-400">Wickets</p>
                        <p className="font-bold text-white">{stats?.wickets || '-'}</p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default PlayerCard;
