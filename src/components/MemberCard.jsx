import React from 'react';
import { motion } from 'framer-motion';

const MemberCard = ({ member, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -10, scale: 1.05 }}
      className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer group"
    >
      {/* Image */}
      <div className="relative overflow-hidden h-80">
        <img
          src={member.image}
          alt={member.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {/* Jersey Number Overlay */}
        <div className="absolute top-4 right-4 w-16 h-16 bg-cricket-gold rounded-full flex items-center justify-center shadow-lg">
          <span className="text-2xl font-bold text-cricket-green">{member.jersey}</span>
        </div>
        {/* Gradient Overlay */}
        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/70 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-2xl font-bold text-cricket-green mb-2">{member.name}</h3>
        <p className="text-cricket-gold font-semibold">{member.role}</p>
      </div>

      {/* Hover Effect Border */}
      <div className="absolute inset-0 border-4 border-cricket-gold opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl pointer-events-none"></div>
    </motion.div>
  );
};

export default MemberCard;
