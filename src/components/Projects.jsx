import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';

const Projects = () => {
  const projects = [
    {
      title: "GraminSetu",
      desc: "GraminSetu is an AI-powered rural healthcare assistance platform designed to improve medical accessibility in underserved areas. It predicts possible diseases based on user symptoms using machine learning, provides healthcare guidance, and supports appointment booking for better medical accessibility.",
      tech: ["Python", "Flask", "Deep Learning", "MongoDB", "React.js", "CSS"],
      github: "https://github.com/ShlokStampwala/GraminSetu.git",
      liveUrl: null,
      id: "project1"
    },

    {
      title: "GyanSarthi",
      desc: "GyanSarthi is a gamified digital learning platform developed for Smart India Hackathon (SIH) 2025 to improve learning engagement, especially in rural environments. It includes quizzes, streaks, rewards, teacher-student roles, and curriculum-based content with offline accessibility support.",
      tech: ["Python", "Flask", "MongoDB", "React.js", "CSS"],
      github: "https://github.com/ShlokStampwala/GyanSarthi_MiniProject.git",
      liveUrl: null,
      id: "project2"
    },

    {
      title: "MedSafe",
      desc: "MedSafe is a medicine interaction and safety platform that detects potential drug-drug interactions. Users and pharmacists can check medicine combinations manually or through scanning and receive structured safety verdicts with multilingual support.",
      tech: ["Python", "Flask", "OCR", "OpenCV", "React.js", "TailwindCSS"],
      github: "https://github.com/ShlokStampwala/MedSafe.git",
      liveUrl: null,
      id: "project3"
    },

    {
      title: "SeekNKart",
      desc: "SeekNKart is a real-time price comparison web application developed during CVMU 3.0 Hackathon. It fetches product information from platforms like Amazon, Flipkart, and Croma using web scraping without relying on paid APIs.",
      tech: ["Python", "Flask", "BeautifulSoup", "Web Scraping", "React.js", "Tailwind CSS"],
      github: "https://github.com/ShlokStampwala/seeknkart_website.git",
      liveUrl: null,
      id: "project4"
    },

    {
      title: "Gitaverse",
      desc: "Gitaverse is an interactive AI-powered learning platform designed to make Bhagavad Gita learning engaging and accessible through guided learning, AI-based Q&A, translations, audio support, and structured study modes.",
      tech: ["Python", "Flask", "JavaScript", "HTML", "CSS", "AI APIs", "Text-to-Speech"],
      github: "https://github.com/ShlokStampwala/Gitaverse.git",
      liveUrl: null,
      id: "project5"
    },

    {
      title: "FlowState",
      desc: "FlowState is a smart productivity and focus enhancement system that detects user focus using keystroke patterns and mouse activity. It automatically manages focus-rest cycles and visualizes productivity insights through dashboards.",
      tech: ["Python", "JavaScript", "React.js", "CSS", "Dashboard Visualization", "Data Tracking"],
      github: "https://github.com/ShlokStampwala/Flowstate.git",
      liveUrl: null,
      id: "project6"
    },

    {
      title: "Hotel Billing System",
      desc: "A Java GUI-based hotel billing application developed using Object-Oriented Programming principles. It supports customer management, order handling, and automated GST-based bill generation.",
      tech: ["Java", "Java Swing", "OOP", "Event Handling"],
      github: "https://github.com/ShlokStampwala/HotelBillingSystem.git",
      liveUrl: null,
      id: "project7"
    }
  ];

  return (
    <section id="projects" className="py-24" style={{ background: 'linear-gradient(180deg, var(--bg-section) 0%, var(--bg) 100%)' }}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold font-outfit mb-4 italic t-primary">Featured Works</h2>
          <p className="t-secondary max-w-2xl mx-auto">Explore some of my latest creations developed with precision and creativity.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="glass p-8 rounded-3xl relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 p-6 flex gap-4 z-10">
                {project.github && (
                  <motion.a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    className="t-muted hover:text-primary transition-colors cursor-pointer"
                  >
                    <Github size={20} />
                  </motion.a>
                )}
                {project.liveUrl && (
                  <motion.a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    className="t-muted hover:text-primary transition-colors cursor-pointer"
                  >
                    <ExternalLink size={20} />
                  </motion.a>
                )}
              </div>

              <div className="mb-6 w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary font-bold font-outfit">
                0{i + 1}
              </div>

              <h3 className="text-2xl font-bold font-outfit mb-3 t-primary pr-16">{project.title}</h3>

              <p className="t-secondary mb-6 leading-relaxed text-sm">
                {project.desc}
              </p>

              <div className="flex flex-wrap gap-2">
                {project.tech.map(t => (
                  <span
                    key={t}
                    className="text-[10px] uppercase tracking-widest px-3 py-1 rounded-full t-muted"
                    style={{ background: 'var(--glass-bg)', border: '1px solid var(--border)' }}
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
