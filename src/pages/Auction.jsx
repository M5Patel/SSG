import React from 'react';
import { motion } from 'framer-motion';
import { FiDollarSign, FiUserCheck, FiTarget } from 'react-icons/fi';
import SectionTitle from '../ui/SectionTitle';

const Auction = () => {
    // Mock ongoing live auction data
    const currentAuctionItem = {
        name: 'Rohit Sharma',
        role: 'Batsman',
        basePrice: '₹ 10,000',
        currentBid: '₹ 25,000',
        highestBidder: 'SSG Royals',
        status: 'Live',
        image: 'https://images.unsplash.com/photo-1593341646782-e0be4ceda982?q=80&w=800&auto=format&fit=crop',
    };

    const recentSold = [
        { name: 'Virat Kohli', team: 'SSG Titans', price: '₹ 45,000', role: 'Batsman' },
        { name: 'Jasprit Bumrah', team: 'SSG Strikers', price: '₹ 40,000', role: 'Bowler' },
        { name: 'Hardik Pandya', team: 'SSG Warriors', price: '₹ 38,000', role: 'All-Rounder' },
    ];

    return (
        <div className="w-full min-h-screen pt-28 pb-24 px-6 lg:px-8 bg-premium-dark relative">
            {/* Background Aesthetic */}
            <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] bg-secondary/10 rounded-full blur-[150px] pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="text-center mb-12">
                    <SectionTitle
                        title="Live Auction Deck"
                        subtitle="Season 2 Bidding"
                        centered={true}
                        className="mb-4"
                    />
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/20 text-secondary border border-secondary/50 animate-pulse text-sm font-bold tracking-wider uppercase shadow-[0_0_15px_rgba(255,0,85,0.4)]">
                        <span className="w-2 h-2 rounded-full bg-secondary"></span>
                        Auction is Live
                    </span>
                </div>

                <div className="grid lg:grid-cols-3 gap-8 mb-16">

                    {/* Main Stage - Current Player */}
                    <motion.div
                        className="lg:col-span-2 glass rounded-3xl overflow-hidden border border-white/10 relative p-8 flex flex-col md:flex-row items-center gap-10"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        {/* Holographic Sweep effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-[shimmer_3s_infinite]" />

                        <div className="w-full md:w-1/2 rounded-2xl overflow-hidden relative border-4 border-white/5 shadow-[0_0_30px_rgba(0,229,255,0.2)]">
                            <img
                                src={currentAuctionItem.image}
                                alt={currentAuctionItem.name}
                                className="w-full aspect-[4/5] object-cover"
                            />
                            <div className="absolute bottom-0 w-full bg-dark/80 backdrop-blur-md p-4 text-center border-t border-white/10">
                                <p className="text-gray-300 font-semibold uppercase tracking-widest text-sm">{currentAuctionItem.role}</p>
                            </div>
                        </div>

                        <div className="w-full md:w-1/2 space-y-8 z-10">
                            <div>
                                <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-2">{currentAuctionItem.name}</h2>
                                <span className="text-primary tracking-widest uppercase font-semibold text-sm">On The Hammer</span>
                            </div>

                            <div className="glass p-6 rounded-2xl border border-primary/20 bg-primary/5">
                                <p className="text-sm text-gray-400 uppercase tracking-wider mb-1">Current Bid</p>
                                <div className="flex items-end gap-3">
                                    <span className="text-5xl font-bold text-white text-glow">{currentAuctionItem.currentBid}</span>
                                </div>
                                <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <FiTarget className="text-secondary" />
                                        <span className="text-sm text-gray-300">Highest Bidder:</span>
                                    </div>
                                    <span className="text-white font-bold">{currentAuctionItem.highestBidder}</span>
                                </div>
                            </div>

                            <div>
                                <p className="text-sm text-gray-400 uppercase tracking-wider mb-1">Base Price</p>
                                <p className="text-2xl font-bold text-gray-200">{currentAuctionItem.basePrice}</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Sidebar - Recent Sold List */}
                    <motion.div
                        className="lg:col-span-1 glass rounded-3xl border border-white/10 p-6 flex flex-col"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10">
                            <h3 className="text-xl font-display font-bold text-white tracking-wide">Recently Sold</h3>
                            <FiUserCheck className="text-primary" size={24} />
                        </div>

                        <div className="space-y-4 flex-1 overflow-y-auto pr-2 custom-scrollbar">
                            {recentSold.map((player, idx) => (
                                <div key={idx} className="bg-white/5 hover:bg-white/10 transition-colors p-4 rounded-xl border border-white/5 flex flex-col gap-2">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h4 className="font-bold text-white">{player.name}</h4>
                                            <p className="text-xs text-gray-400 uppercase tracking-wider">{player.team}</p>
                                        </div>
                                        <span className="text-primary font-bold px-2 py-1 bg-primary/10 rounded max-w-max flex items-center gap-1 shadow-[0_0_10px_rgba(0,229,255,0.2)]">
                                            {player.price}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-6 pt-4 border-t border-white/10 text-center">
                            <p className="text-xs text-gray-400 uppercase tracking-widest">Connect to live feed for updates</p>
                        </div>
                    </motion.div>

                </div>
            </div>
        </div>
    );
};

export default Auction;
