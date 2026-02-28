import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX } from 'react-icons/fi';

const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/members', label: 'Members' },
    { path: '/gallery', label: 'Gallery' },
    { path: '/rules', label: 'Rules' },
    { path: '/auction', label: 'Auction' },
    { path: '/about', label: 'About' },
];

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu on route change
    useEffect(() => {
        setIsOpen(false);
    }, [location.pathname]);

    return (
        <motion.header
            className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'py-3' : 'py-5'
                }`}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className={`mx-auto max-w-7xl px-6 lg:px-8 transition-all duration-300 ${isScrolled ? 'mx-4 rounded-full glass border border-white/10' : ''
                }`}>
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <NavLink to="/" className="flex-shrink-0 flex items-center gap-2 z-50">
                        <span className="text-2xl font-display font-bold text-white tracking-widest text-glow hover:scale-105 transition-transform">
                            SSGPL
                        </span>
                    </NavLink>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex space-x-1">
                        {navLinks.map((link) => (
                            <NavLink
                                key={link.path}
                                to={link.path}
                                className={({ isActive }) => `
                  relative px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300
                  ${isActive ? 'text-primary' : 'text-gray-300 hover:text-white hover:bg-white/5'}
                `}
                            >
                                {({ isActive }) => (
                                    <>
                                        <span className="relative z-10">{link.label}</span>
                                        {isActive && (
                                            <motion.div
                                                layoutId="nav-pill"
                                                className="absolute inset-0 bg-primary/10 rounded-full border border-primary/20"
                                                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                                            />
                                        )}
                                    </>
                                )}
                            </NavLink>
                        ))}
                    </nav>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center z-50">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-gray-300 hover:text-white focus:outline-none p-2 rounded-full hover:bg-white/10 transition-colors"
                        >
                            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="absolute top-full left-0 w-full bg-dark/95 backdrop-blur-xl border-b border-white/10 shadow-2xl md:hidden"
                    >
                        <div className="px-6 py-6 space-y-2 flex flex-col items-center">
                            {navLinks.map((link, i) => (
                                <motion.div
                                    key={link.path}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="w-full"
                                >
                                    <NavLink
                                        to={link.path}
                                        className={({ isActive }) => `
                      block px-4 py-3 rounded-xl text-center text-lg font-medium transition-all
                      ${isActive
                                                ? 'bg-primary/20 text-primary border border-primary/30 shadow-[0_0_15px_rgba(0,229,255,0.2)]'
                                                : 'text-gray-300 hover:text-white hover:bg-white/5'
                                            }
                    `}
                                    >
                                        {link.label}
                                    </NavLink>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.header>
    );
};

export default Navbar;
