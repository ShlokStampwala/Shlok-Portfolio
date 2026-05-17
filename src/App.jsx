import React, { useState, useEffect } from 'react';
import Intro from './components/Intro';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Education from './components/Education';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ResumeModal from './components/ResumeModal';

function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [theme, setTheme] = useState('dark');
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  useEffect(() => {
    // Check local storage for theme preference, default to dark
    const storedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(storedTheme);
  }, []);

  useEffect(() => {
    // Apply dark class to HTML
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return (
    <div className="relative min-h-screen transition-colors duration-700" style={{ backgroundColor: 'var(--bg)' }}>
      {showIntro ? (
        <Intro onComplete={() => setShowIntro(false)} />
      ) : (
        <main className="animate-fade-in">
          <Navbar theme={theme} toggleTheme={toggleTheme} onOpenResume={() => setIsResumeOpen(true)} />
          <Hero theme={theme} />
          <About />
          <Education />
          <Projects />
          <Skills />
          <Contact />
          <Footer />
          <ResumeModal isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />
        </main>
      )}
    </div>
  );
}

export default App;
