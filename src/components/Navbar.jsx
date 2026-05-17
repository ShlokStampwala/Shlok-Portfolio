import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Menu, X, FileText } from 'lucide-react';

const Navbar = ({ theme, toggleTheme, onOpenResume }) => {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#' },
    { name: 'About', href: '#about' },
    { name: 'Education', href: '#education' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'Contact', href: '#contact' },
  ];

  const scrolledStyle = scrolled
    ? { background: 'var(--glass-bg)', backdropFilter: 'blur(20px)', borderBottom: '1px solid var(--border)' }
    : { background: 'transparent' };

  return (
    <>
      <nav 
        className="fixed top-0 left-0 w-full z-40 transition-all duration-300"
        style={{ ...scrolledStyle, padding: scrolled ? '1rem 0' : '1.5rem 0' }}
      >
        <div className="container mx-auto px-6 flex justify-between items-center">
          {/* Logo */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-2xl font-bold font-outfit glow-text cursor-pointer relative z-50"
            style={{ color: 'var(--text-primary)' }}
            onClick={() => window.scrollTo(0, 0)}
          >
            SHLOK<span className="text-primary italic">.S</span>
          </motion.div>

          {/* Desktop Nav Links */}
          <ul className="hidden md:flex space-x-8 items-center">
            {navLinks.map((link, i) => (
              <motion.li 
                key={link.name}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <a 
                  href={link.href} 
                  className="text-sm font-medium hover:text-primary transition-colors duration-200"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {link.name}
                </a>
              </motion.li>
            ))}

            {/* Theme Toggle */}
            <motion.button
              whileHover={{ scale: 1.1, rotate: 15 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleTheme}
              className="p-2.5 rounded-full transition-all"
              style={{ 
                background: 'var(--glass-bg)', 
                border: '1px solid var(--border)',
                color: 'var(--text-primary)'
              }}
              title="Toggle Theme"
            >
              <motion.div
                key={theme}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {theme === 'dark' ? <Sun size={18} className="text-yellow-400" /> : <Moon size={18} className="text-indigo-500" />}
              </motion.div>
            </motion.button>

            {/* Resume Button */}
            <motion.button
              onClick={onOpenResume}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-2 rounded-full text-sm font-semibold text-primary cursor-pointer flex items-center gap-2 transition-all"
              style={{ background: 'rgba(0,242,255,0.08)', border: '1px solid rgba(0,242,255,0.3)' }}
            >
              <FileText size={16} /> Resume
            </motion.button>
          </ul>

          {/* Mobile Controls */}
          <div className="flex md:hidden items-center gap-4 relative z-50">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={toggleTheme}
              className="p-2 rounded-full transition-all"
              style={{ color: 'var(--text-primary)' }}
            >
              {theme === 'dark' ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} className="text-indigo-500" />}
            </motion.button>

            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 transition-colors"
              style={{ color: 'var(--text-primary)' }}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Side Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 w-[70vw] max-w-sm h-full backdrop-blur-xl shadow-2xl z-40 md:hidden flex flex-col pt-24 px-8 pb-8"
              style={{ 
                background: 'var(--bg-section)',
                borderLeft: '1px solid var(--border)'
              }}
            >
              <ul className="flex flex-col space-y-8 flex-1">
                {navLinks.map((link, i) => (
                  <motion.li 
                    key={link.name}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + (i * 0.05) }}
                  >
                    <a 
                      href={link.href} 
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="text-lg font-bold hover:text-primary transition-colors block"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      {link.name}
                    </a>
                  </motion.li>
                ))}
              </ul>

              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                onClick={() => { setIsMobileMenuOpen(false); onOpenResume(); }}
                className="w-full text-primary py-4 rounded-xl font-bold flex items-center justify-center gap-2 mt-auto transition-all"
                style={{ background: 'rgba(0,242,255,0.08)', border: '1px solid rgba(0,242,255,0.3)' }}
              >
                <FileText size={18} /> View Resume
              </motion.button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
