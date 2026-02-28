import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiZoomIn, FiX } from 'react-icons/fi';

const GalleryCard = ({ item, index }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative group cursor-pointer overflow-hidden rounded-2xl glass mb-6"
                onClick={() => setIsOpen(true)}
            >
                <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />

                <img
                    src={item.src}
                    alt={item.title || "Gallery image"}
                    className="w-full h-auto object-cover transform group-hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                />

                <div className="absolute inset-0 z-20 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="bg-dark/80 backdrop-blur-md p-3 rounded-full text-white transform -translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                        <FiZoomIn size={24} />
                    </div>
                    {item.title && (
                        <p className="text-white mt-4 font-bold tracking-wide text-glow transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-100">
                            {item.title}
                        </p>
                    )}
                </div>
            </motion.div>

            {/* Lightbox Modal */}
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
                            className="relative w-full max-w-5xl z-10 flex flex-col items-center"
                        >
                            <button
                                onClick={(e) => { e.stopPropagation(); setIsOpen(false); }}
                                className="absolute -top-12 right-0 md:-right-12 text-white/50 hover:text-white transition-colors bg-white/10 rounded-full p-2"
                                title="Close"
                            >
                                <FiX size={32} />
                            </button>

                            <img
                                src={item.src}
                                alt={item.title || "Gallery image"}
                                className="w-full max-h-[85vh] object-contain rounded-xl shadow-2xl glass border border-white/10"
                            />
                            {item.title && (
                                <p className="text-white mt-6 text-xl tracking-wider font-display">{item.title}</p>
                            )}
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
};

export default GalleryCard;
