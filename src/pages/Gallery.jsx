import React from 'react';
import SectionTitle from '../ui/SectionTitle';
import GalleryCard from '../cards/GalleryCard';

const Gallery = () => {
  // Mock gallery photos with varied aspect ratios to build masonry layout
  const photos = [
    { id: 1, title: 'Opening Ceremony', src: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?q=80&w=1200' },
    { id: 2, title: 'Final Match Action', src: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?q=80&w=1200' },
    { id: 3, title: 'Cup Celebration', src: 'https://images.unsplash.com/photo-1593341646782-e0be4ceda982?q=80&w=1200' },
    { id: 4, title: 'Toss Time', src: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=1200' },
    { id: 5, src: 'https://images.unsplash.com/photo-1517436073194-9646452be7b5?q=80&w=1200' }, // Missing titles get no label
    { id: 6, title: 'Stadium View', src: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?q=80&w=1200' },
    { id: 7, src: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1200' },
    { id: 8, title: 'Player Warmup', src: 'https://images.unsplash.com/photo-1560272564-c83b66b1ad12?q=80&w=1200' },
    { id: 9, src: 'https://images.unsplash.com/photo-1587329310686-91414b8e3cb7?q=80&w=1200' },
  ];

  return (
    <div className="w-full min-h-screen pt-28 pb-24 px-6 lg:px-8 bg-premium-dark relative">
      {/* Background Aesthetic */}
      <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <SectionTitle
          title="Tournament Gallery"
          subtitle="Capturing Moments"
          centered={true}
        />

        {/* CSS Masonry Grid implementation using columns */}
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
          {photos.map((photo, idx) => (
            <div key={photo.id} className="break-inside-avoid">
              <GalleryCard item={photo} index={idx} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gallery;
