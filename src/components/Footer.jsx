import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail } from 'lucide-react';

// Custom LeetCode SVG component as Lucide does not have it natively.
const LeetCode = ({ size = 20 }) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill="currentColor"
    style={{ display: 'inline-block', verticalAlign: 'middle' }}
  >
    <path d="M13.483 0a1.374 1.374 0 0 0-.961.414L.772 12.164a1.378 1.378 0 0 0 0 1.95l8.778 8.779a1.377 1.377 0 0 0 1.95 0L23.228 11.14a1.378 1.378 0 0 0 0-1.95L14.433.414a1.376 1.376 0 0 0-.95-.414zm.075 4.85l6.42 6.42-8.825 8.825-6.42-6.42 8.825-8.825z" />
  </svg>
);

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: <Github size={20} />, href: "https://github.com/ShlokStampwala", label: "GitHub" },
    { icon: <LeetCode size={20} />, href: "https://leetcode.com/u/o4baa2gEXS/", label: "LeetCode" },
    { icon: <Linkedin size={20} />, href: "https://www.linkedin.com/in/shlok-stampwala-538785307/", label: "LinkedIn" },
    { icon: <Mail size={20} />, href: "mailto:shlokstampwala@gmail.com", label: "Email" },
  ];

  return (
    <footer className="py-12" style={{ borderTop: '1px solid var(--border)', backgroundColor: 'var(--bg)' }}>
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-xl font-bold font-outfit glow-text t-primary">
            SHLOK<span className="text-primary italic">.S</span>
          </div>

          <div className="flex gap-6">
            {socialLinks.map((link) => (
              <motion.a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                aria-label={link.label}
                whileHover={{ scale: 1.25, color: 'var(--text-primary)' }}
                className="t-muted transition-colors cursor-pointer hover:text-primary"
              >
                {link.icon}
              </motion.a>
            ))}
          </div>

          <div className="t-muted text-sm font-medium">
            © {currentYear} Shlok Stampwala. Built with Next-Gen Tech.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
