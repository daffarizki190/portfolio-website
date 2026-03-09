import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion';
import Lenis from 'lenis';
import { HelmetProvider } from 'react-helmet-async';
import { Menu } from 'lucide-react';
import WelcomeScreen from './Pages/WelcomeScreen';
import Home from './Pages/Home';
import About from './Pages/About';
import Portofolio from './Pages/Portofolio';
import Contact from './Pages/Contact';
import Stats from './components/Stats';
import CustomCursor from './components/CustomCursor';
import IntroSection from './components/IntroSection';
import MarqueePhotoSection from './components/MarqueePhotoSection';
import DiagonalRibbonSection from './components/DiagonalRibbonSection';
import MenuOverlay from './components/MenuOverlay';
import EducationSection from './components/EducationSection';

// Curtain Reveal transition component for high-end feel
const SectionReveal = ({ children, overlayColor = "#b8f400" }) => {
  return (
    <div className="relative overflow-hidden w-full h-full">
      <motion.div
        initial={{ height: "100%" }}
        whileInView={{ height: "0%" }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1.2, ease: [0.77, 0, 0.175, 1], delay: 0.1 }}
        style={{ backgroundColor: overlayColor }}
        className="absolute inset-0 z-50 origin-bottom"
      />
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
      >
        {children}
      </motion.div>
    </div>
  );
};

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3800);
    return () => clearTimeout(timer);
  }, []);

  // Initialize Lenis Smooth Scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <HelmetProvider>
      {/* Custom cursor — always visible */}
      <CustomCursor />

      {/* Global Full-Screen Menu Overlay */}
      <MenuOverlay isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

      {/* Floating Global Menu Button */}
      {!isLoading && (
        <button
          onClick={() => setIsMenuOpen(true)}
          className="fixed top-5 right-5 md:top-8 md:right-8 z-[999] p-3 bg-black/10 backdrop-blur-md border border-white/10 rounded-full text-white hover:bg-black/40 hover:text-lime-accent hover:scale-105 active:scale-95 transition-all mix-blend-difference"
        >
          <Menu size={24} />
        </button>
      )}

      <div style={{ cursor: 'none' }}>
        <AnimatePresence>
          {isLoading && <WelcomeScreen />}
        </AnimatePresence>

        {!isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {/* ── Section order matching the TikTok video ── */}

            {/* 1. Hero — iridescent blob full-screen */}
            <Home />

            {/* 2. Dark Intro — "I'm Daffa – a Full Stack Developer..." */}
            <IntroSection />

            {/* 3. Stats section — dark cards */}
            <SectionReveal overlayColor="#111">
              <Stats />
            </SectionReveal>

            {/* 4. Marquee Photo section — scrolling text + user photo + lime curve */}
            <MarqueePhotoSection photoUrl="/Photo2.svg" />

            {/* 5. About — dark, with photo and details */}
            <SectionReveal overlayColor="#b8f400">
              <About />
            </SectionReveal>

            {/* 5.5 Education Timeline — dark with animated lime curve */}
            <SectionReveal overlayColor="#111">
              <EducationSection />
            </SectionReveal>

            {/* 6. Diagonal Ribbon — crossed X marquee ribbons */}
            <DiagonalRibbonSection />

            {/* 7. Portfolio / Selected Works */}
            <SectionReveal overlayColor="#b8f400">
              <Portofolio />
            </SectionReveal>

            {/* 8. Contact — dark, with robot + LET'S TALK */}
            <SectionReveal overlayColor="#1A1F1C">
              <Contact />
            </SectionReveal>
          </motion.div>
        )}
      </div>
    </HelmetProvider>
  );
}

export default App;
