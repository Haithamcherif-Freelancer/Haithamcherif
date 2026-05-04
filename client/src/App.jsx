import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Lenis from 'lenis';

// Pages & Components
import LandingPage from './components/LandingPage';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ScrollToHash from './components/ScrollToHash';

// Page Wrappers for Detail Pages
import ServiceDetail from './pages/ServiceDetail';
import ProjectDetail from './pages/ProjectDetail';

const PortfolioLayout = () => {
  return (
    <motion.div
      className="app"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <Portfolio />
        <Skills />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </motion.div>
  );
};

function App() {
  const location = useLocation();

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, [location.pathname]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <>
      <ScrollToHash />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/portfolio" element={<PortfolioLayout />} />
          <Route path="/service/:id" element={<ServiceDetail />} />
          <Route path="/project/:id" element={<ProjectDetail />} />
        </Routes>
      </AnimatePresence>
    </>
  );
}

export default App;
