import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

const categories = ['All', 'Web', 'Branding', 'Video', 'Marketing'];

const projects = [
  {
    id: 'tembri',
    title: 'TEMBRI — Clothing Brand',
    category: 'Branding',
    image: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=2070&auto=format&fit=crop',
    description: 'Premium clothing brand. Product concept, full branding, identity design, and marketing.'
  },
  {
    id: 'eprod-videos',
    title: 'EPROD — Video Productions',
    category: 'Video',
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=2000&auto=format&fit=crop',
    description: '15+ videos — events, commercials, music videos, fashion shoots, DJ parties, and cultural content.'
  },
  {
    id: 'microsoft-tech-club',
    title: 'Microsoft Tech Club Website',
    category: 'Web',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2070&auto=format&fit=crop',
    description: 'Built and maintained the club website. Handled full web design and development for ENET\'Com.'
  },
  {
    id: 'blueprint-vision',
    title: 'Blueprint Vision',
    category: 'Marketing',
    image: 'https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=2064&auto=format&fit=crop',
    description: 'Personal creative project — visual storytelling, brand design, and photography for clients.'
  },
  {
    id: 'bari9-detergents',
    title: 'Bari9 — Detergent Brand',
    category: 'Marketing',
    image: 'https://images.unsplash.com/photo-1563453392212-326f5e854473?q=80&w=1974&auto=format&fit=crop',
    description: 'Content creation and marketing campaigns for a brand specializing in detergents and cleaning products.'
  },
  {
    id: 'interacti',
    title: 'Interacti Marketing Agency',
    category: 'Web',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop',
    description: 'Responsive websites tailored to client needs — UX-first design and clean code.'
  },

];

const ProjectCard = ({ project }) => {
  const cardRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [12, -12]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-12, 12]);

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
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5 }}
      style={{ perspective: "1500px" }}
    >
      <Link to={`/project/${project.id}`} className="block group h-full">
        <motion.div
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          className="relative aspect-[4/5] rounded-[2rem] overflow-hidden bg-white/[0.02] border border-white/5 transition-colors group-hover:border-accent-cyan/30"
        >
          <img
            src={project.image}
            alt={project.title}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-60 group-hover:opacity-90 transition-all duration-500" />

          <div className="absolute inset-0 p-8 flex flex-col justify-end" style={{ transform: "translateZ(60px)" }}>
            <motion.span
              className="text-accent-cyan text-[10px] font-black uppercase tracking-[0.3em] mb-3 block w-fit px-3 py-1 bg-black/50 backdrop-blur-md rounded-full border border-white/10"
            >
              {project.category}
            </motion.span>

            <h3 className="text-2xl font-bold mb-3 tracking-tight group-hover:text-accent-cyan transition-colors">
              {project.title}
            </h3>

            <p className="text-sm text-secondary line-clamp-2 mb-6 group-hover:text-white transition-colors">
              {project.description}
            </p>

            <div className="flex items-center gap-2 text-white font-bold text-[10px] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
              Explore Project <ArrowUpRight size={14} className="text-accent-cyan" />
            </div>
          </div>

          {/* Card Border Glow */}
          <div className="absolute inset-0 rounded-[2rem] border border-white/10 group-hover:border-accent-cyan/50 transition-colors pointer-events-none" />
        </motion.div>
      </Link>
    </motion.div>
  );
};

const Portfolio = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const sectionRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const springX = useSpring(mouseX, { stiffness: 100, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 30 });

  const filteredProjects = activeCategory === 'All'
    ? projects
    : projects.filter(p => p.category === activeCategory);

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      id="portfolio"
      className="section bg-[#050505] relative overflow-hidden"
    >
      {/* Dynamic Background Glow */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full bg-accent-blue/5 blur-[120px] pointer-events-none z-0"
        style={{ x: springX, y: springY, left: -300, top: -300 }}
      />
      <div className="container">
        {/* Header Section */}
        <div className="mb-20" style={{ perspective: "1000px" }}>
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="text-accent-blue font-black uppercase tracking-[0.4em] text-[10px] mb-4 block px-4 py-1.5 bg-white/5 rounded-full w-fit border border-white/10"
          >
            Selected Work
          </motion.span>
          <h2 className="title-medium mb-0 flex flex-wrap">
            {"Crafting ".split("").map((char, i) => (
              <motion.span
                key={i}
                initial={{ y: "100%", rotateX: -90, opacity: 0 }}
                whileInView={{ y: 0, rotateX: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: i * 0.02, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: true }}
                className="inline-block origin-bottom"
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
            <span className="text-gradient flex">
              {"Experiences".split("").map((char, i) => (
                <motion.span
                  key={i}
                  initial={{ y: "100%", rotateX: -90, opacity: 0 }}
                  whileInView={{ y: 0, rotateX: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.2 + i * 0.02, ease: [0.22, 1, 0.36, 1] }}
                  viewport={{ once: true }}
                  className="inline-block origin-bottom"
                >
                  {char}
                </motion.span>
              ))}
            </span>
          </h2>
        </div>

        <div className="flex flex-col lg:flex-row gap-16">
          {/* Vertical Filter Sidebar (Desktop) / Horizontal (Mobile) */}
          <div className="lg:w-48 lg:shrink-0">
            <div className="sticky top-32 flex flex-row lg:flex-col flex-wrap gap-4 lg:gap-8">
              {categories.map((cat, idx) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className="relative group py-2 text-left transition-all"
                >
                  <div className="flex items-center gap-4">
                    {/* Vertical line indicator for active item */}
                    <div className="relative h-10 w-[2px] hidden lg:block overflow-hidden bg-white/5 rounded-full">
                      <AnimatePresence>
                        {activeCategory === cat && (
                          <motion.div
                            layoutId="verticalLine"
                            className="absolute inset-0 bg-accent-cyan"
                            initial={{ y: "-100%" }}
                            animate={{ y: 0 }}
                            exit={{ y: "100%" }}
                          />
                        )}
                      </AnimatePresence>
                    </div>

                    <div className="flex flex-col">
                      <span className={`text-[10px] font-black uppercase tracking-[0.3em] transition-all duration-500 ${activeCategory === cat ? 'text-white' : 'text-white/30 group-hover:text-white/60'}`}>
                        {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                      </span>
                      <span className={`text-sm font-bold tracking-widest uppercase transition-all duration-500 ${activeCategory === cat ? 'text-accent-cyan' : 'text-white/40 group-hover:text-white/80'}`}>
                        {cat}
                      </span>
                    </div>
                  </div>

                  {/* Underline for mobile */}
                  {activeCategory === cat && (
                    <motion.div
                      layoutId="activeFilterUnderline"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-accent-cyan lg:hidden"
                    />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Projects Grid */}
          <div className="flex-1">
            <motion.div
              layout
              className="grid md:grid-cols-2 gap-8"
            >
              {filteredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </motion.div>
          </div>
        </div>

        {/* More Projects CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-32 p-12 sm:p-16 rounded-[4rem] border border-white/5 bg-gradient-to-br from-white/[0.03] to-transparent backdrop-blur-sm text-center relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent-blue/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/4 group-hover:bg-accent-cyan/20 transition-colors duration-700" />

          <div className="relative z-10 max-w-2xl mx-auto">
            <span className="text-accent-gold text-[10px] font-black uppercase tracking-[0.4em] mb-4 block">The Archive</span>
            <h3 className="text-3xl sm:text-4xl font-bold mb-6 tracking-tight">There's more where that came from.</h3>
            <p className="text-secondary text-lg leading-relaxed mb-10">
              The projects above are a curated selection. I have successfully delivered dozens of other high-impact projects, many of which are under NDA or part of private archives.
            </p>
            <a href="#contact" className="btn-primary group">
              Request Full Portfolio <ArrowUpRight className="inline ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" size={18} />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Portfolio;
