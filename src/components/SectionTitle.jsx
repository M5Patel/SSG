import React from 'react';

// Reusable section title component with animations
const SectionTitle = ({ title, subtitle, center = true }) => {
  return (
    <div className={`mb-12 ${center ? 'text-center' : ''}`}>
      <h2 className="text-4xl md:text-5xl font-bold text-cricket-green mb-4">
        {title}
      </h2>
      {subtitle && (
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
      <div className="w-24 h-1 bg-gradient-gold mt-4 mx-auto rounded-full"></div>
    </div>
  );
};

export default SectionTitle;
