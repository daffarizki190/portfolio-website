import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const greetings = [
  "Hello",
  "Bonjour",
  "Ciao",
  "Hallo",
  "مرحبا",
  "Привет",
  "こんにちは",
  "Hola",
];

const WelcomeScreen = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index >= greetings.length) return;
    const timer = setTimeout(() => {
      setIndex(prev => prev + 1);
    }, index === 0 ? 700 : 400);
    return () => clearTimeout(timer);
  }, [index]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black"
      initial={{ opacity: 1 }}
      exit={{
        y: "-100%",
        transition: { duration: 0.85, ease: [0.76, 0, 0.24, 1] }
      }}
    >
      {/* Greeting text — NO overflow hidden so text is always visible */}
      <AnimatePresence mode="wait">
        {index < greetings.length && (
          <motion.p
            key={index}
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.76, 0, 0.24, 1] }}
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: "clamp(2.5rem, 8vw, 5rem)",
              fontWeight: 900,
              color: "#ffffff",
              letterSpacing: "-0.03em",
              userSelect: "none",
              whiteSpace: "nowrap",
              lineHeight: 1,
            }}
          >
            ·{greetings[index]}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default WelcomeScreen;
