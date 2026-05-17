import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Calendar, MapPin, Award } from 'lucide-react';

const Education = () => {
  // ==========================================
  // EDIT YOUR DETAILS HERE
  // ==========================================
  const education = [
    {
      id: "edu1",
      degree: "Bachelor Of Technology Computer Engineering",
      institution: "Madhuben And Bhanubhai Patel Institute Of Technology",
      location: "Vallabh Vidhyanagar",
      period: "2023 - 2027",
      score: "9.78 CGPA (Current)", // <--- Edit your CGPA here
      desc: "Specializing in software engineering and modern development stacks."
    },
    {
      id: "edu2",
      degree: "Higher Secondary Education (11 & 12th)",
      institution: "Bits Education High School",
      location: "Khambhat",
      period: "2021 - 2023",
      score: "94.49 Percentile", // <--- Edit your 12th marks here
      desc: "Focused on Science and Mathematical logic."
    },
    {
      id: "edu3",
      degree: "Secondary Education (6 to 10th)",
      institution: "Shree Madhavlal Shah High School",
      location: "Khambhat",
      period: "2016 - 2021",
      score: "99.32 Percentile", // <--- Edit your 10th marks here
      desc: "Foundational schooling with focus on core subjects."
    }
  ];

  return (
    <section id="education" className="py-24" style={{ backgroundColor: 'var(--bg-section)' }}>
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold font-outfit mb-4 italic t-primary uppercase tracking-tight">Education</h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full mb-4" />
          <p className="t-secondary max-w-2xl mx-auto italic font-sans">Academic trajectory and benchmarks.</p>
        </motion.div>

        <div className="max-w-4xl mx-auto relative">
          {/* Timeline Vertical Line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-primary via-secondary to-transparent hidden md:block" />

          <div className="space-y-12">
            {education.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: i * 0.2 }}
                viewport={{ once: true }}
                className={`relative flex flex-col md:flex-row items-center justify-between w-full ${
                  i % 2 === 0 ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Timeline Dot */}
                <div className="absolute left-1/2 -translate-x-1/2 top-1/2 w-4 h-4 bg-primary rounded-full shadow-[0_0_15px_rgba(0,242,255,0.5)] z-10 hidden md:block" />

                <div className="w-full md:w-[45%]">
                  <div className="glass p-8 rounded-3xl group relative overflow-hidden hover:shadow-[0_0_30px_rgba(0,242,255,0.1)] transition-all">
                    {/* Decorative corner glow */}
                    <div className="absolute -top-10 -right-10 w-24 h-24 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-all" />
                    
                    {/* Degree & Score Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                      <div className="flex items-center gap-3 text-primary">
                        <GraduationCap size={22} />
                        <span className="text-sm font-bold tracking-widest uppercase font-outfit">{item.degree}</span>
                      </div>
                      {item.score && (
                        <div className="flex items-center gap-2 px-3 py-1 rounded-full" style={{ border: '1px solid var(--border)', background: 'var(--glass-bg)' }}>
                          <Award size={14} className="text-secondary" />
                          <span className="text-[10px] font-extrabold t-primary">{item.score}</span>
                        </div>
                      )}
                    </div>

                    <h3 className="text-xl md:text-2xl font-bold mb-4 font-outfit t-primary group-hover:text-primary transition-colors">
                      {item.institution}
                    </h3>
                    
                    {/* Info Bar (Location & Period) */}
                    <div className="flex flex-wrap gap-4 mb-6">
                      <div className="flex items-center gap-2 t-secondary text-sm">
                        <MapPin size={14} className="text-primary" />
                        <span>{item.location}</span>
                      </div>
                      <div className="flex items-center gap-2 t-secondary text-sm">
                        <Calendar size={14} className="text-primary" />
                        <span>{item.period}</span>
                      </div>
                    </div>

                    <p className="t-secondary leading-relaxed font-sans text-sm pt-4" style={{ borderTop: '1px solid var(--border)' }}>
                      {item.desc}
                    </p>
                  </div>
                </div>
                {/* Spacer for secondary side */}
                <div className="hidden md:block w-[45%]" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
