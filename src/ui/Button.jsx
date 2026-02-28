import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Button = ({
    children,
    variant = 'primary',
    size = 'md',
    className = '',
    to,
    onClick,
    icon: Icon,
    type = 'button',
    disabled = false
}) => {
    const baseStyles = "relative overflow-hidden inline-flex items-center justify-center font-medium rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-dark";

    const variants = {
        primary: "bg-primary text-dark hover:bg-primary-hover shadow-[0_0_15px_rgba(0,229,255,0.4)] hover:shadow-[0_0_25px_rgba(0,229,255,0.6)] focus:ring-primary",
        secondary: "bg-secondary text-white hover:bg-secondary-hover shadow-[0_0_15px_rgba(255,0,85,0.4)] hover:shadow-[0_0_25px_rgba(255,0,85,0.6)] focus:ring-secondary",
        outline: "border-2 border-white/20 text-white hover:bg-white/10 hover:border-white/40 focus:ring-white/50",
        glass: "glass glass-hover text-white focus:ring-white/50"
    };

    const sizes = {
        sm: "px-4 py-2 text-sm",
        md: "px-6 py-3 text-base",
        lg: "px-8 py-4 text-lg"
    };

    const combinedStyles = `${baseStyles} ${variants[variant]} ${sizes[size]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`;

    const InnerContent = (
        <>
            <span className="relative z-10 flex items-center gap-2">
                {Icon && <Icon className="w-5 h-5" />}
                {children}
            </span>
            {/* Shine effect overlay */}
            <div className="absolute inset-0 -translate-x-full hover:animate-[shimmer_1s_forwards] bg-gradient-to-r from-transparent via-white/20 to-transparent z-0" />
        </>
    );

    if (to) {
        return (
            <Link to={to} className={combinedStyles}>
                {InnerContent}
            </Link>
        );
    }

    return (
        <motion.button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={combinedStyles}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
        >
            {InnerContent}
        </motion.button>
    );
};

export default Button;
