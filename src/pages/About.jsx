import React from 'react';
import { motion } from 'framer-motion';
import { FiCheckCircle, FiShield, FiTrendingUp } from 'react-icons/fi';
import SectionTitle from '../ui/SectionTitle';

const About = () => {
  const visions = [
    {
      icon: FiShield,
      title: 'Integrity',
      desc: 'Upholding the spirit of the game with fairness and discipline at its core.'
    },
    {
      icon: FiTrendingUp,
      title: 'Growth',
      desc: 'Fostering grassroots talent and providing a professional platform for growth.'
    },
    {
      icon: FiCheckCircle,
      title: 'Excellence',
      desc: 'Striving for perfection in tournament organization and player experience.'
    }
  ];

  return (
    <div className="w-full min-h-screen pt-28 pb-24 px-6 lg:px-8 bg-premium-dark relative overflow-hidden">
      {/* Aesthetic blur overlays */}
      <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] bg-secondary/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <SectionTitle
          title="Our Story"
          subtitle="The SSGPL Vision"
          centered={true}
        />

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="order-2 lg:order-1"
          >
            <div className="glass p-8 rounded-3xl border border-white/10 relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-[50px] pointer-events-none" />
              <h3 className="text-3xl font-display font-bold text-white mb-6">A Legacy In The Making</h3>
              <p className="text-gray-300 text-lg leading-relaxed mb-6 font-light shadow-sm">
                The SSG Premier League was established with a singular vision: to create a premium, professionally managed cricketing platform that local talent truly deserves.
                What started as a modest weekend tournament has rapidly evolved into a highly anticipated sporting extravaganza.
              </p>
              <p className="text-gray-300 text-lg leading-relaxed font-light">
                We believe that cricket is more than a sport—it is an emotion that unites communities.
                By providing world-class match experiences, rigorous umpiring standards, and an atmosphere that mirrors international leagues,
                SSGPL offers a stage where heroes emerge.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="order-1 lg:order-2 relative"
          >
            <div className="aspect-[4/5] md:aspect-square w-full rounded-[2rem] overflow-hidden glass border-8 border-white/5 relative group">
              <div className="absolute inset-0 bg-primary/20 mix-blend-overlay z-10 group-hover:bg-transparent transition-colors duration-700" />
              <img
                src="https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?q=80&w=1200&auto=format&fit=crop"
                alt="SSGPL Stadium"
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
              />
            </div>
          </motion.div>
        </div>

        {/* Vision grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {visions.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.2 }}
              className="glass p-8 rounded-2xl border border-white/10 hover:bg-white/5 transition-colors group"
            >
              <div className="bg-primary/20 w-16 h-16 rounded-full flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(0,229,255,0.2)]">
                <item.icon size={28} />
              </div>
              <h4 className="text-xl font-bold text-white mb-3">{item.title}</h4>
              <p className="text-gray-400 leading-relaxed font-light">{item.desc}</p>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default About;
