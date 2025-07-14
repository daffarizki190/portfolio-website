import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { HelmetProvider } from 'react-helmet-async';
import WelcomeScreen from './Pages/WelcomeScreen';
import Home from './Pages/Home';
import About from './Pages/About';
import Portofolio from './Pages/Portofolio';
import Contact from './Pages/Contact';
import Navbar from './components/Navbar';
import AnimatedBackground from './components/Background';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 4000); // Show welcome screen for 4 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <HelmetProvider>
      <div className="bg-slate-900">
        <AnimatePresence>
          {isLoading && <WelcomeScreen />}
        </AnimatePresence>

        {!isLoading && (
          <>
            <AnimatedBackground />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="relative z-10"
            >
              <Navbar />
              <main>
                <Home />
                <About />
                <Portofolio />
                <Contact />
              </main>
            </motion.div>
          </>
        )}
      </div>
    </HelmetProvider>
  );
}

export default App;
