import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <section id="about" className="py-24" style={{ backgroundColor: 'var(--bg-section)' }}>
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center gap-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="w-full md:w-1/2 flex justify-center"
          >
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative w-full max-w-md aspect-[3/4] rounded-2xl overflow-hidden glass">
                <img
                  src="/shlok1.jpeg"
                  alt="Shlok Stampwala"
                  className="w-full h-full object-cover object-top grayscale hover:grayscale-0 transition-all duration-500"
                />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="w-full md:w-1/2"
          >
            <h2 className="text-4xl md:text-5xl font-bold font-outfit mb-6 t-primary">
              Transforming Ideas into <br />
              <span className="text-primary italic">Digital Reality</span>
            </h2>
            <p className="t-secondary text-lg leading-relaxed mb-8">
              I am <b>Shlok Stampwala</b>, a Computer Engineering student passionate about building innovative technology solutions that create real-world impact. My interests lie in <b>Artificial Intelligence, full-stack development,Leetcode and problem-solving,</b> where I enjoy transforming ideas into meaningful digital products. I have worked on projects across healthcare, education, productivity, and learning platforms, including AI-powered healthcare assistance systems, medicine safety platforms, gamified learning solutions, and real-time web applications. Through hackathons, academic achievements, and continuous learning, I aim to combine technology and innovation to build solutions that are not only technically strong but also socially meaningful. Beyond coding, I enjoy exploring new technologies, participating in hackathons, and continuously challenging myself to learn and grow.
            </p>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h4 className="text-primary font-bold text-xl mb-1">2+</h4>
                <p className="t-muted text-sm uppercase tracking-wider">Years Experience</p>
              </div>
              <div>
                <h4 className="text-secondary font-bold text-xl mb-1">10+</h4>
                <p className="t-muted text-sm uppercase tracking-wider">Projects Completed</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
