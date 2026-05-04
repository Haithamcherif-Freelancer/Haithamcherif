import React, { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

const timeline = [
  {
    year: 'May 2024 — Present',
    title: 'Developer → UI/UX Designer → Designer',
    company: 'Interacti Marketing Agency',
    location: 'Sfax, Tunisia',
    description: 'Started as a developer and UI/UX designer, evolving into a full graphic designer role. Building responsive websites, designing brand identities, social media visuals, and marketing content for multiple clients.',
    tags: ['UI/UX', 'Brand Design', 'Web Dev'],
    color: 'accent-blue'
  },
  {
    year: 'Aug 2025 — Present',
    title: 'Co-founder & Creative Director',
    company: 'Blueprint Vision',
    location: 'Sfax, Tunisia',
    description: 'A personal creative project built with a close collaborator — documenting real work, visual storytelling, and delivering brand design and photography for clients.',
    tags: ['Branding', 'Photography', 'Direction'],
    color: 'accent-cyan'
  },
  {
    year: 'Feb — Aug 2025',
    title: 'Freelance Videographer',
    company: 'EPROD Officiel',
    location: 'Sfax, Tunisia',
    description: 'Produced and edited 15+ videos — events, restaurant promos, DJ parties, music videos, fashion shoots, product commercials, and more. Full production: concept to delivery.',
    tags: ['Videography', 'Editing', 'Color Grading'],
    color: 'accent-gold'
  },
  {
    year: 'Sep 2024 — Jun 2025',
    title: 'Marketing Manager',
    company: 'Microsoft Tech Club ENET\'Com',
    location: 'Tunisia',
    description: 'Owned the club\'s full creative and marketing presence: visual content, social media, website, and marketing strategies. Simultaneously handled four roles.',
    tags: ['Marketing', 'Web Design', 'Social Media'],
    color: 'accent-blue'
  },
  {
    year: 'Jul 2024 — Jan 2025',
    title: 'Founder',
    company: 'TEMBRI',
    location: 'Sfax, Tunisia',
    description: 'Founded and ran a clothing brand from scratch — product concept, branding, and marketing. A formative experience that shaped my approach to brand identity.',
    tags: ['Entrepreneurship', 'Branding', 'Marketing'],
    color: 'accent-orange'
  },
  {
    year: 'Jan 2024 — Aug 2025',
    title: 'Marketing Intern',
    company: 'Bari9',
    location: 'Sfax, Tunisia',
    description: 'Supported marketing efforts for a Tunisian consumer goods brand. Content creation, visual communication, and campaign execution over 1+ years.',
    tags: ['Content', 'Campaigns', 'Visual Design'],
    color: 'accent-gold'
  },
  {
    year: 'Sep 2023 — Present',
    title: 'IT Licentiate Degree',
    company: 'ENET\'Com — Sfax',
    location: 'Sfax, Tunisia',
    description: 'Studying Information Technology at the National School of Electronics and Telecommunications. Building a strong foundation in computer engineering and digital technologies.',
    tags: ['Education', 'Computer Science'],
    color: 'white'
  }
];

const ExperienceItem = ({ item, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true, margin: "-100px" }}
      className="relative pl-10 sm:pl-16 pb-20 last:pb-10 group"
    >
      {/* Connector Line Dot */}
      <div className={`absolute left-[-9px] top-0 w-5 h-5 rounded-full border-4 border-black bg-white group-hover:bg-${item.color} group-hover:scale-125 transition-all duration-500 shadow-[0_0_20px_rgba(255,255,255,0.1)] z-10`} />
      
      {/* Decorative Year Badge */}
      <div className={`absolute left-[-150px] top-0 hidden lg:block text-right w-32`}>
        <span className={`text-[10px] font-black uppercase tracking-[0.3em] text-secondary group-hover:text-${item.color} transition-colors duration-500`}>
          {item.year.split(' — ')[0]}
        </span>
      </div>

      <div className="glass p-8 sm:p-10 relative overflow-hidden group-hover:border-white/20 transition-all duration-500">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight mb-1 group-hover:text-accent-cyan transition-colors">{item.title}</h3>
            <div className="flex items-center gap-2">
              <span className={`text-${item.color} font-black uppercase tracking-widest text-[10px]`}>{item.company}</span>
              <span className="w-1 h-1 rounded-full bg-white/20" />
              <span className="text-secondary text-[10px] font-medium uppercase tracking-widest">{item.location}</span>
            </div>
          </div>
          <span className="text-white/40 font-black text-[10px] uppercase tracking-[0.2em] px-4 py-2 bg-white/5 rounded-full border border-white/5 sm:hidden">
            {item.year}
          </span>
        </div>

        <p className="text-secondary text-base leading-relaxed mb-8 max-w-3xl group-hover:text-white/80 transition-colors">
          {item.description}
        </p>

        <div className="flex flex-wrap gap-2">
          {item.tags.map(tag => (
            <span key={tag} className="text-[9px] px-4 py-1.5 rounded-full bg-white/5 text-white/60 font-black uppercase tracking-widest border border-white/5 group-hover:border-white/10 group-hover:text-white transition-all">
              {tag}
            </span>
          ))}
        </div>

        {/* Hover Background Glow */}
        <div className={`absolute -top-24 -right-24 w-64 h-64 rounded-full blur-[100px] opacity-0 group-hover:opacity-10 transition-opacity duration-700 bg-${item.color}`} />
      </div>
    </motion.div>
  );
};

const Experience = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <section id="experience" className="section bg-black relative">
      <div className="container" ref={containerRef}>
        <div className="text-center mb-32">
          <motion.span 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="text-accent-gold font-black uppercase tracking-[0.4em] text-[10px] mb-4 block px-4 py-1.5 bg-white/5 rounded-full w-fit mx-auto border border-white/10"
          >
            Journey
          </motion.span>
          <h2 className="title-medium">Experience & <span className="text-gradient">Timeline</span></h2>
        </div>

        <div className="max-w-4xl mx-auto relative">
          {/* Main Timeline Line */}
          <div className="absolute left-[0.5px] top-0 bottom-0 w-[1px] bg-white/10" />
          <motion.div 
            className="absolute left-[0.5px] top-0 bottom-0 w-[1px] bg-gradient-to-b from-accent-blue via-accent-cyan to-accent-gold origin-top"
            style={{ scaleY }}
          />

          <div className="space-y-4">
            {timeline.map((item, index) => (
              <ExperienceItem key={index} item={item} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
