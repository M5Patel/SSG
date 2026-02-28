import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Layout Components
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ScrollToTop from './ui/ScrollToTop';
import FeedbackModal from './ui/FeedbackModal';

// Lazy load pages for performance
const Home = lazy(() => import('./pages/Home'));
const Members = lazy(() => import('./pages/Members'));
const Gallery = lazy(() => import('./pages/Gallery'));
const Rules = lazy(() => import('./pages/Rules'));
const Auction = lazy(() => import('./pages/Auction'));
const About = lazy(() => import('./pages/About'));

// Animated Page Wrapper to handle transitions between routes
const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/members" element={<Members />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/rules" element={<Rules />} />
        <Route path="/auction" element={<Auction />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </AnimatePresence>
  );
};

// Global Loading Page Fallback
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-dark text-white">
    <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
  </div>
);

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Navbar />
      <main className="flex-1 w-full bg-dark">
        <Suspense fallback={<PageLoader />}>
          <AnimatedRoutes />
        </Suspense>
      </main>
      <FeedbackModal />
      <Footer />
    </Router>
  );
}

export default App;
