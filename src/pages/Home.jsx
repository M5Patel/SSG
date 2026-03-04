import React from 'react';
import Hero from '../hero/Hero';
import UpdateSlider from '../ui/UpdateSlider';
import VideoSection from '../ui/VideoSection';
import { TournamentIntro, FeaturedPlayers, TournamentStats } from '../sections/HomeSections';

const Home = () => {
  return (
    <div className="w-full flex flex-col pt-0">
      {/* 1. Hero Section using Three.js */}
      <Hero />

      <main className="flex-1 w-full bg-premium-dark relative">

        {/* Decorative Grid Lines overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none z-0" />

        {/* 2. Tournament Intro */}
        <TournamentIntro />

        {/* 3. Latest Updates Slider placed elegantly */}
        <section className="py-12 relative z-10">
          <UpdateSlider />
        </section>

        {/* 4. Video Highlights Section */}
        <section className="py-12 px-6 lg:px-8 max-w-7xl mx-auto w-full relative z-10">
          <VideoSection
            title="Season 1 Highlights"
            videoId="-5dO0_TfVqA" // Example cricket highlights video ID
          />
        </section>

        {/* 5. Featured Players */}
        <FeaturedPlayers />

        <TournamentStats />

      </main>
    </div>
  );
};

export default Home;
