import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const GalleryCard = ({ item, index }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        onClick={() => setIsOpen(true)}
        className="relative group cursor-pointer overflow-hidden rounded-xl shadow-lg"
      >
        {/* Image */}
        <div className="aspect-w-16 aspect-h-12 overflow-hidden">
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
            <p className="text-sm text-gray-200">{item.description}</p>
          </div>
        </div>

        {/* Zoom Icon */}
        <div className="absolute top-4 right-4 w-10 h-10 bg-cricket-gold rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="text-cricket-green text-xl">🔍</span>
        </div>
      </motion.div>

      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="max-w-4xl w-full"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-auto rounded-lg shadow-2xl"
              />
              <div className="text-white mt-4 text-center">
                <h3 className="text-3xl font-bold mb-2">{item.title}</h3>
                <p className="text-lg text-gray-300">{item.description}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default GalleryCard;
