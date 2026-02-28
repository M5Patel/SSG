import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaInstagram, FaYoutube, FaFacebook } from 'react-icons/fa';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const socialLinks = [
        { icon: FaInstagram, href: '#', label: 'Instagram' },
        { icon: FaYoutube, href: '#', label: 'YouTube' },
        { icon: FaFacebook, href: '#', label: 'Facebook' },
    ];

    const quickLinks = [
        { label: 'Home', path: '/' },
        { label: 'Members', path: '/members' },
        { label: 'Gallery', path: '/gallery' },
        { label: 'Rules', path: '/rules' },
        { label: 'Auction', path: '/auction' },
        { label: 'About', path: '/about' },
    ];

    return (
        <footer className="w-full relative border-t border-white/10 bg-dark overflow-hidden pt-16 pb-8">
            {/* Background Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-primary/10 blur-[100px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">

                    {/* Brand & Tagline */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="flex flex-col items-center md:items-start"
                    >
                        <Link to="/">
                            <span className="text-4xl font-display font-bold text-white tracking-widest text-glow inline-block mb-4">
                                SSGPL
                            </span>
                        </Link>
                        <p className="text-gray-400 max-w-sm mb-6 leading-relaxed">
                            A professional cricket tournament showcasing unity, discipline, and the spirit that never sleeps. We're not just a tournament, we're a family.
                        </p>
                        <div className="flex items-center gap-4">
                            {socialLinks.map((social, index) => (
                                <motion.a
                                    key={index}
                                    href={social.href}
                                    whileHover={{ scale: 1.2, color: '#00E5FF', y: -2 }}
                                    whileTap={{ scale: 0.9 }}
                                    className="text-gray-500 hover:text-primary transition-colors text-2xl"
                                    aria-label={social.label}
                                >
                                    <social.icon />
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>

                    {/* Quick Links */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="flex flex-col items-center"
                    >
                        <h3 className="text-white font-semibold text-lg uppercase tracking-wider mb-6">Explore</h3>
                        <ul className="grid grid-cols-2 gap-x-8 gap-y-3">
                            {quickLinks.map((link, index) => (
                                <li key={index}>
                                    <Link
                                        to={link.path}
                                        className="text-gray-400 hover:text-white hover:pl-2 transition-all block relative"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Connect / Newsletter Stub */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="flex flex-col items-center md:items-start"
                    >
                        <h3 className="text-white font-semibold text-lg uppercase tracking-wider mb-6">Stay Updated</h3>
                        <p className="text-gray-400 mb-4 max-w-sm text-sm">
                            Follow our latest matches, auction news, and team announcements.
                        </p>
                        <div className="w-full max-w-xs relative group h-12 flex items-center">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="w-full bg-white/5 border border-white/10 rounded-full px-4 py-2 text-white outline-none focus:border-primary focus:bg-white/10 transition-all font-sans"
                            />
                            <button
                                className="absolute right-1 px-4 py-1.5 bg-primary text-dark rounded-full text-sm font-semibold hover:bg-primary-hover shadow-[0_0_10px_rgba(0,229,255,0.4)] transition-all"
                            >
                                Join
                            </button>
                        </div>
                    </motion.div>

                </div>

                {/* Copyright */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500 gap-4"
                >
                    <p>&copy; {currentYear} SSG Premier League. All rights reserved.</p>
                    <p>
                        Designed & Developed by <span className="text-primary font-medium">SSGPL Tech</span>
                    </p>
                </motion.div>
            </div>
        </footer>
    );
};

export default Footer;
