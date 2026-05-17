import React from 'react';
import { motion } from 'framer-motion';

const Skills = () => {
  const skillCategories = [
    {
      title: "Programming Languages",
      skills: [
        { name: "Python", level: 80 },
        { name: "JavaScript", level: 75 },
        { name: "Java", level: 70 },
        { name: "HTML / CSS", level: 85 }
      ]
    },
    {
      title: "Libraries & Technologies",
      skills: [
        { name: "React.js", level: 75 },
        { name: "Node.js", level: 65 },
        { name: "Express.js", level: 50 },
        { name: "Flask", level: 80 },
        { name: "Three.js / Canvas", level: 65 },
        { name: "Tailwind CSS", level: 85 },
        { name: "Framer Motion", level: 70 }
      ]
    },
    {
      title: "Databases & Tools",
      skills: [
        { name: "MongoDB", level: 75 },
        { name: "Git / GitHub", level: 80 },
        { name: "VS Code", level: 85 },
        { name: "Web Scraping", level: 75 },
        { name: "MySQL", level: 80 }
      ]
    }
  ];

  return (
    <section id="skills" className="py-24" style={{ backgroundColor: 'var(--bg)' }}>
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16">
          {/* Left Sticky/Heading Block */}
          <div className="lg:w-1/3 lg:sticky lg:top-24 h-fit">
            <h2 className="text-4xl md:text-5xl font-bold font-outfit mb-6 italic t-primary">Skills & expertise</h2>
            <p className="t-secondary mb-8 text-lg leading-relaxed">
              My technical expertise categorized by languages, libraries, and developer tools.
              I love learning new things and solving complex problems.
            </p>
            <div className="glass p-8 rounded-3xl" style={{ borderColor: 'rgba(0,242,255,0.2)' }}>
              <p className="text-primary text-sm font-bold uppercase tracking-widest mb-2">Available for</p>
              <p className="text-xl font-bold t-primary">Hackathons, Freelance & Full-time roles</p>
            </div>
          </div>

          {/* Right Categorized Skills Grid */}
          <div className="lg:w-2/3 space-y-12">
            {skillCategories.map((cat, catIdx) => (
              <motion.div
                key={cat.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: catIdx * 0.1 }}
                viewport={{ once: true }}
                className="glass p-8 rounded-3xl space-y-8"
              >
                {/* Category Header */}
                <div className="flex items-center gap-4">
                  <div className="w-1.5 h-6 bg-gradient-to-b from-primary to-secondary rounded-full" />
                  <h3 className="text-2xl font-bold font-outfit t-primary">{cat.title}</h3>
                </div>

                {/* Progress bars inside this category */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {cat.skills.map((skill, i) => (
                    <div key={skill.name} className="space-y-2">
                      <div className="flex justify-between items-end">
                        <span className="text-base font-bold font-outfit t-primary">{skill.name}</span>
                        <span className="text-primary font-mono text-xs">{skill.level}%</span>
                      </div>
                      <div
                        className="h-2 rounded-full overflow-hidden"
                        style={{ background: 'var(--border)' }}
                      >
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          transition={{ duration: 1.2, ease: "easeOut" }}
                          viewport={{ once: true }}
                          className="h-full bg-gradient-to-r from-primary to-secondary"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
