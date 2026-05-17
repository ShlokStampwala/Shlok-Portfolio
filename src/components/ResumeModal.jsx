import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download } from 'lucide-react';

const ResumeModal = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 md:p-10"
        >
          <motion.div
            initial={{ scale: 0.95, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="w-full max-w-4xl h-full max-h-[90vh] glass rounded-3xl overflow-hidden flex flex-col relative border border-white/20 shadow-2xl"
          >
            {/* Header */}
            <div className="flex justify-between items-center p-4 border-b border-white/10 bg-black/20">
              <h3 className="text-xl font-bold font-outfit text-white">My Resume</h3>
              <div className="flex items-center gap-4">
                <a
                  href="/resume.pdf"
                  download
                  className="flex items-center gap-2 text-sm font-semibold text-primary hover:text-white transition-colors"
                >
                  <Download size={18} />
                  <span>Download PDF</span>
                </a>
                <button
                  onClick={onClose}
                  className="p-2 bg-white/5 hover:bg-white/10 rounded-full text-white/70 hover:text-white transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Resume Viewer */}
            <div className="flex-1 w-full bg-white relative">
              <iframe
                src="/resume.pdf"
                className="w-full h-full border-none"
                title="Shlok Stampwala Resume"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ResumeModal;
