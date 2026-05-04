import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { PenTool, Code, Camera, TrendingUp } from 'lucide-react';

const skillCategories = [
  {
    name: "Design & Creative",
    icon: <PenTool size={20} />,
    color: "accent-blue",
    skills: [
      { name: "Brand Identity & Logos", level: 95 },
      { name: "UI/UX Web Design", level: 90 },
      { name: "Social Media Graphics", level: 95 },
      { name: "Print & Packaging", level: 85 },
      { name: "Figma & Adobe CC", level: 90 }
    ]
  },
  {
    name: "Web Development",
    icon: <Code size={20} />,
    color: "accent-cyan",
    skills: [
      { name: "Custom Web Apps (React)", level: 90 },
      { name: "E-Commerce Solutions", level: 85 },
      { name: "Landing Pages & UI", level: 95 },
      { name: "Performance Optimization", level: 88 },
      { name: "HTML/CSS/Tailwind", level: 95 }
    ]
  },
  {
    name: "Media Production",
    icon: <Camera size={20} />,
    color: "accent-gold",
    skills: [
      { name: "Event Cinematography", level: 90 },
      { name: "Product Photography", level: 88 },
      { name: "Commercial Videos", level: 85 },
      { name: "Color Grading & Audio", level: 80 },
      { name: "Premiere Pro / After Effects", level: 85 }
    ]
  },
  {
    name: "Digital Marketing",
    icon: <TrendingUp size={20} />,
    color: "white",
    skills: [
      { name: "Content Creation Strategy", level: 95 },
      { name: "Social Media Management", level: 90 },
      { name: "Campaign Execution", level: 88 },
      { name: "Brand Auditing", level: 85 },
      { name: "LinkedIn Optimization", level: 85 }
    ]
  }
];

const SkillCard = ({ cat, index }) => {
  const cardRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-10, 10]);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      style={{ perspective: "1000px" }}
    >
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="glass p-8 sm:p-10 h-full relative group"
      >
        <div className="flex items-center gap-4 mb-8" style={{ transform: "translateZ(30px)" }}>
          <div className={`p-3 bg-white/5 rounded-xl text-${cat.color} border border-white/5`}>
            {cat.icon}
          </div>
          <h3 className="text-xl sm:text-2xl font-bold tracking-tight">{cat.name}</h3>
        </div>

        <div className="space-y-6" style={{ transform: "translateZ(20px)" }}>
          {cat.skills.map((skill, i) => (
            <div key={skill.name}>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-semibold text-white/80">{skill.name}</span>
                <span className={`text-${cat.color} font-bold text-xs`}>{skill.level}%</span>
              </div>
              <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  transition={{ duration: 1.5, delay: 0.2 + (i * 0.1), ease: [0.22, 1, 0.36, 1] }}
                  viewport={{ once: true }}
                  className={`h-full bg-gradient-to-r from-accent-blue via-${cat.color} to-accent-cyan rounded-full`}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Decorative elements */}
        <div className={`absolute -bottom-10 -right-10 w-32 h-32 bg-${cat.color}/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
      </motion.div>
    </motion.div>
  );
};

const Skills = () => {
  return (
    <section id="skills" className="section bg-black relative">
      {/* Background Particles */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />

      <div className="container">
        <div className="text-center mb-24">
          <motion.span 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="text-accent-cyan font-black uppercase tracking-[0.4em] text-[10px] mb-4 block px-4 py-1.5 bg-white/5 rounded-full w-fit mx-auto border border-white/10"
          >
            Expertise
          </motion.span>
          <h2 className="title-medium">Toolbox & <span className="text-gradient">Skills</span></h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12">
          {skillCategories.map((cat, i) => (
            <SkillCard key={cat.name} cat={cat} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
