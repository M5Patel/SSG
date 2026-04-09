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
  <div className="min-h-screen flex flex-col items-center justify-center bg-[#0f172a]">
    <div className="w-12 h-12 rounded-full border-2 border-accent-teal/20 border-t-accent-teal animate-spin" />
    <p className="font-space text-xs text-slate-500 mt-5 tracking-[0.2em] uppercase animate-pulse">Loading</p>
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
