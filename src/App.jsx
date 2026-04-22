import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const Home = lazy(() => import('./pages/Home'));
const Gallery = lazy(() => import('./pages/Gallery'));
const Members = lazy(() => import('./pages/Members'));
const Teams = lazy(() => import('./pages/Teams'));
const Sponsors = lazy(() => import('./pages/Sponsors'));
const About = lazy(() => import('./pages/About'));

const ScrollToTop = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);
  return null;
};

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/members" element={<Members />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/sponsors" element={<Sponsors />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </AnimatePresence>
  );
};

const PageLoader = () => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-[#0a0e17] relative overflow-hidden">
    {/* Background glow */}
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#f0b429]/[0.04] rounded-full blur-[100px]" />

    <div className="relative">
      {/* Outer ring */}
      <div className="w-14 h-14 rounded-full border-2 border-[#f0b429]/10 flex items-center justify-center">
        {/* Spinning arc */}
        <div className="absolute w-14 h-14 rounded-full border-2 border-transparent border-t-[#f0b429] animate-spin" />
        {/* Inner dot */}
        <div className="w-3 h-3 rounded-full bg-[#f0b429]/30 animate-pulse" />
      </div>
    </div>
    <p className="font-heading text-[10px] text-[#484f58] mt-6 tracking-[0.3em] uppercase animate-pulse">Loading</p>
  </div>
);

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Navbar />
      <main className="flex-1 w-full">
        <Suspense fallback={<PageLoader />}>
          <AnimatedRoutes />
        </Suspense>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
