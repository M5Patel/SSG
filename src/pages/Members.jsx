import React, { useState, useEffect } from 'react';
import SectionTitle from '../ui/SectionTitle';
import PlayerCard from '../cards/PlayerCard';
import { supabase } from '../services/supabaseClient';

const Members = () => {
  const [players, setPlayers] = useState([
    // Mock Default Players to ensure stunning UI even without Supabase data
    { id: 1, name: 'Virat Kohli', role: 'Batsman', team: 'SSG Royals', matches: 15, runs: 650, wickets: 2, image: 'https://images.unsplash.com/photo-1593341646782-e0be4ceda982?q=80&w=500&auto=format&fit=crop' },
    { id: 2, name: 'MS Dhoni', role: 'Wicketkeeper', team: 'SSG Titans', matches: 20, runs: 500, wickets: 0, image: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?q=80&w=500&auto=format&fit=crop' },
    { id: 3, name: 'Jasprit Bumrah', role: 'Bowler', team: 'SSG Strikers', matches: 18, runs: 45, wickets: 32, image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=500&auto=format&fit=crop' },
    { id: 4, name: 'Hardik Pandya', role: 'All-Rounder', team: 'SSG Warriors', matches: 16, runs: 320, wickets: 18, image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?q=80&w=500&auto=format&fit=crop' },
    { id: 5, name: 'Rohit Sharma', role: 'Batsman', team: 'SSG Royals', matches: 22, runs: 850, wickets: 0, image: 'https://images.unsplash.com/photo-1593341646782-e0be4ceda982?q=80&w=500&auto=format&fit=crop' },
    { id: 6, name: 'Ravindra Jadeja', role: 'All-Rounder', team: 'SSG Titans', matches: 25, runs: 410, wickets: 25, image: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?q=80&w=500&auto=format&fit=crop' },
  ]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlayers = async () => {
      if (!supabase) {
        setLoading(false);
        return;
      }
      try {
        const { data, error } = await supabase
          .from('players')
          .select('*');

        if (error) throw error;
        if (data && data.length > 0) setPlayers(data);
      } catch (err) {
        console.error('Error fetching players', err);
      } finally {
        setLoading(false);
      }
    };
    fetchPlayers();
  }, []);

  return (
    <div className="w-full min-h-screen pt-28 pb-24 px-6 lg:px-8 bg-premium-dark relative">
      {/* Background Aesthetic */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-primary/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <SectionTitle
          title="Tournament Roster"
          subtitle="Our Stars"
          centered={true}
        />

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {players.map((player, idx) => (
              <PlayerCard key={player.id} player={player} index={idx} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Members;
