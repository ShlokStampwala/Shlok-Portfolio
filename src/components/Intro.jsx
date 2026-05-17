import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Intro = ({ onComplete }) => {
  const [stage, setStage] = useState(0); // 0: Pic, 1: Text, 2: Final

  useEffect(() => {
    // Stage durations
    const timer1 = setTimeout(() => setStage(1), 2500); // Pic duration
    const timer2 = setTimeout(() => setStage(2), 5000); // Text duration
    const timer3 = setTimeout(() => onComplete(), 5500); // Finish intro

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background transition-colors duration-700 overflow-hidden">
      <AnimatePresence mode="wait">
        {stage === 0 && (
          <motion.div
            key="pic"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="relative"
          >
            <div className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-primary/30 glow-text">
              <img 
                src="/shlok1.jpeg" 
                alt="Shlok Stampwala" 
                className="w-full h-full object-cover object-top"
              />
            </div>
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1.5, opacity: 0 }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 rounded-full border-2 border-primary/50"
            />
          </motion.div>
        )}

        {stage === 1 && (
          <motion.div
            key="text"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.h1 
              className="text-4xl md:text-7xl font-bold font-outfit"
            >
              <span className="text-slate-900 dark:text-white transition-colors duration-700">Hello, I am</span><br/>
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent italic">
                Shlok Stampwala
              </span>
            </motion.h1>
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 1.5, delay: 0.5 }}
              className="h-1 bg-gradient-to-r from-primary to-secondary mt-4 rounded-full"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Intro;
