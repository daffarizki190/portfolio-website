import React from "react";
import { motion } from "framer-motion";
import { Code2, Github, User } from "lucide-react";

import PropTypes from "prop-types";





const BackgroundEffect = () => (
  <motion.div
    className="absolute inset-0 overflow-hidden bg-gray-900"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 1.5 }}
  >
    <motion.div
      className="absolute -inset-20 bg-gradient-to-r from-blue-900 to-purple-900 opacity-50 blur-3xl"
      animate={{
        rotate: [0, 360],
        scale: [1, 1.5, 1],
      }}
      transition={{
        duration: 40,
        repeat: Infinity,
        ease: "easeInOut",
        repeatType: "mirror",
      }}
    />
    <motion.div
      className="absolute -inset-20 bg-gradient-to-tr from-cyan-800 via-transparent to-pink-800 opacity-40 blur-3xl"
      animate={{
        rotate: [0, -360],
        scale: [1, 0.8, 1],
      }}
      transition={{
        duration: 60,
        repeat: Infinity,
        ease: "easeInOut",
        repeatType: "mirror",
        delay: 2,
      }}
    />
    <div className="absolute inset-0 bg-black/20" />
  </motion.div>
);

const IconButton = ({ Icon }) => (
  <motion.div 
    className="relative group"
    whileHover={{ scale: 1.15, rotate: 5 }}
    whileTap={{ scale: 0.95 }}
    transition={{ type: "spring", stiffness: 400, damping: 15 }}
  >
    <div className="absolute -inset-2.5 bg-gradient-to-r from-blue-600 to-purple-700 rounded-full blur-md opacity-50 group-hover:opacity-80 transition duration-300" />
    <div className="relative p-3 sm:p-4 bg-gray-800/60 backdrop-blur-md rounded-full border border-white/20 shadow-2xl">
      <Icon className="w-6 h-6 sm:w-7 sm:h-7 md:w-9 md:h-9 text-white/80 group-hover:text-white transition-colors" />
    </div>
  </motion.div>
);

IconButton.propTypes = {
  Icon: PropTypes.elementType.isRequired,
};

const WelcomeScreen = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
    exit: {
      opacity: 0,
      y: -50,
      transition: {
        duration: 0.8,
        ease: "easeInOut",
      },
    },
  };

  const childVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      className="fixed inset-0 bg-black z-50 flex items-center justify-center"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <BackgroundEffect />

      <motion.div
        className="relative text-center px-4 py-8 w-full max-w-4xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          className="flex justify-center gap-4 sm:gap-6 md:gap-10 mb-8 sm:mb-10 md:mb-14"
          variants={childVariants}
        >
          {[Code2, User, Github].map((Icon, index) => (
            <motion.div key={index} variants={childVariants}>
              <IconButton Icon={Icon} />
            </motion.div>
          ))}
        </motion.div>

        <motion.h1
          className="text-4xl sm:text-5xl md:text-7xl font-extrabold leading-tight tracking-tighter"
          variants={childVariants}
        >
          <span className="block mb-2 sm:mb-3 bg-gradient-to-r from-gray-200 via-gray-50 to-gray-300 bg-clip-text text-transparent drop-shadow-lg">
            Welcome To My
          </span>
          <span className="block bg-gradient-to-r from-blue-400 via-purple-500 to-indigo-500 bg-clip-text text-transparent drop-shadow-lg">
            Portfolio Website
          </span>
        </motion.h1>
      </motion.div>
    </motion.div>
  );
};

WelcomeScreen.propTypes = {};

export default WelcomeScreen;
