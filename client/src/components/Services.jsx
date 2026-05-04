import React, { useRef } from 'react';
import { motion, useMotionValue, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { PenTool, Code, Camera, TrendingUp } from 'lucide-react';

const services = [
  {
    slug: 'creative-design',
    title: 'Brand Identity & Design',
    subtitle: 'Brand Identity, UI/UX, & Visual Systems',
    description: 'Crafting visual identities that tell compelling stories — logos, brand systems, social media assets, and print-ready designs using Figma, Photoshop, and Illustrator.',
    fullDescription: 'We craft visual identities that tell compelling stories. From logos and brand guidelines to immersive UI/UX design and marketing assets, every pixel is designed with purpose to elevate your brand.',
    features: ['Logo & Brand Identity', 'UI/UX Web Design', 'Social Media Graphics', 'Print & Packaging'],
    icon: <PenTool size={36} />,
    color: 'text-accent-blue',
    bgColor: 'group-hover:bg-accent-blue/10',
    delay: 0.1
  },
  {
    slug: 'web-development',
    title: 'Web Development',
    subtitle: 'High-Performance Digital Experiences',
    description: 'Building responsive, high-performance websites and web applications with React, Next.js, Node.js, and modern JavaScript — focused on clean UI/UX and scalable architecture.',
    fullDescription: 'Building modern, scalable, and lightning-fast web applications. We specialize in React, Next.js, and complex interactive experiences that bridge the gap between design and robust architecture.',
    features: ['Custom Web Apps', 'E-Commerce Solutions', 'Landing Pages', 'Performance Optimization'],
    icon: <Code size={36} />,
    color: 'text-accent-cyan',
    bgColor: 'group-hover:bg-accent-cyan/10',
    delay: 0.2
  },
  {
    slug: 'media-production',
    title: 'Photo & Videography',
    subtitle: 'Cinematic Storytelling & Photography',
    description: 'Capturing cinematic visuals end-to-end — concept, filming, editing, color grading, and sound design. Events, commercials, fashion shoots, music videos, and more.',
    fullDescription: 'Capturing moments that leave a mark. End-to-end production including concept development, filming, editing, color grading, and sound design for commercials, events, and brand campaigns.',
    features: ['Event Cinematography', 'Product Photography', 'Commercial Videos', 'Color Grading & Audio'],
    icon: <Camera size={36} />,
    color: 'text-accent-gold',
    bgColor: 'group-hover:bg-accent-gold/10',
    delay: 0.3
  },
  {
    slug: 'digital-marketing',
    title: 'Marketing & Strategy',
    subtitle: 'Strategy that Drives Real Growth',
    description: 'Developing and executing marketing campaigns, managing social media presence, content creation, and brand communication strategies that drive real engagement.',
    fullDescription: 'Developing data-driven marketing campaigns and managing your digital presence. We focus on content creation, social media strategy, and brand communication that actually converts.',
    features: ['Content Strategy', 'Social Media Management', 'Campaign Execution', 'Brand Auditing'],
    icon: <TrendingUp size={36} />,
    color: 'text-white',
    bgColor: 'group-hover:bg-white/10',
    delay: 0.4
  }
];

const FloatingParticle = ({ i, mouseXSpring, mouseYSpring }) => {
  const x = useTransform(mouseXSpring, [-0.5, 0.5], [(i + 1) * -40, (i + 1) * 40]);
  const y = useTransform(mouseYSpring, [-0.5, 0.5], [(i + 1) * -40, (i + 1) * 40]);

  return (
    <motion.div
      className="absolute rounded-full bg-white/5 border border-white/10 backdrop-blur-sm pointer-events-none z-0"
      style={{
        width: Math.random() * 40 + 20,
        height: Math.random() * 40 + 20,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        x,
        y,
      }}
      animate={{
        y: [0, -20, 0],
        rotate: [0, 360],
      }}
      transition={{
        duration: 5 + i,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />
  );
};

const Services = () => {
  const [selectedService, setSelectedService] = React.useState(null);
  const containerRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [15, -15]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-15, 15]);

  const spotlightX = useTransform(mouseXSpring, [-0.5, 0.5], ["0%", "100%"]);
  const spotlightY = useTransform(mouseYSpring, [-0.5, 0.5], ["0%", "100%"]);

  const spotlightBg = useTransform(
    [spotlightX, spotlightY],
    ([sx, sy]) => `radial-gradient(800px circle at ${sx} ${sy}, rgba(0, 210, 255, 0.12), transparent 70%)`
  );

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const titleLines = [
    "Not Because I Couldn't Choose,",
    "But Because Brands Need"
  ];

  return (
    <section id="services" className="section relative overflow-hidden bg-black py-32">
      {/* Cinematic CSS Noise Texture */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none z-50 mix-blend-overlay"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />

      {/* Dynamic Background Blobs */}
      <motion.div
        animate={{
          x: [0, 100, 0],
          y: [0, 50, 0],
          rotate: [0, 180, 360]
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] bg-accent-blue/5 rounded-full blur-[140px] pointer-events-none"
      />
      <motion.div
        animate={{
          x: [0, -80, 0],
          y: [0, 100, 0],
          rotate: [360, 180, 0]
        }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-[-20%] right-[-10%] w-[900px] h-[900px] bg-accent-cyan/5 rounded-full blur-[160px] pointer-events-none"
      />

      {/* Floating Particles (Parallax) */}
      {[...Array(6)].map((_, i) => (
        <FloatingParticle key={i} i={i} mouseXSpring={mouseXSpring} mouseYSpring={mouseYSpring} />
      ))}

      {/* Interactive Spotlight Overlay */}
      <motion.div
        className="absolute inset-0 z-0 pointer-events-none opacity-60"
        style={{
          background: spotlightBg
        }}
      />

      <div className="container relative z-10">
        <div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="text-center mb-40 relative"
          style={{ perspective: "2000px" }}
        >
          <motion.div
            style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
            className="inline-block relative"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="mb-10 inline-flex items-center gap-3 px-6 py-2 bg-white/5 rounded-full border border-white/10 backdrop-blur-xl"
              style={{ transform: 'translateZ(100px)' }}
            >
              <div className="w-2 h-2 rounded-full bg-accent-cyan animate-pulse shadow-[0_0_10px_rgba(0,210,255,0.8)]" />
              <span className="text-accent-cyan font-bold uppercase tracking-[0.5em] text-[10px]">
                Crafting Excellence
              </span>
            </motion.div>

            <h2 className="title-large leading-[1.05] font-black tracking-tighter flex flex-col items-center">
              {titleLines.map((line, lineIndex) => (
                <div key={lineIndex} className="flex flex-wrap justify-center py-2">
                  {line.split(" ").map((word, wordIndex) => (
                    <span key={wordIndex} className="flex mr-[0.3em] last:mr-0">
                      {word.split("").map((char, charIndex) => (
                        <motion.span
                          key={charIndex}
                          initial={{ y: 50, opacity: 0, rotateX: -90 }}
                          whileInView={{ y: 0, opacity: 1, rotateX: 0 }}
                          viewport={{ once: true, amount: 0 }}
                          transition={{
                            duration: 0.8,
                            delay: (lineIndex * 15 + wordIndex * 5 + charIndex) * 0.02,
                            ease: [0.22, 1, 0.36, 1]
                          }}
                          className="inline-block"
                          style={{ transform: 'translateZ(150px)' }}
                        >
                          {char}
                        </motion.span>
                      ))}
                    </span>
                  ))}
                </div>
              ))}

              <div className="relative mt-4 py-4">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, delay: 0.8, ease: "circOut" }}
                  className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-transparent via-accent-cyan to-transparent opacity-50"
                />
                <motion.span
                  initial={{ scale: 0.5, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className="block relative"
                  style={{ transform: 'translateZ(250px)' }}
                >
                  <motion.span
                    animate={{
                      backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                    }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    className="text-transparent bg-clip-text bg-gradient-to-r from-accent-blue via-accent-cyan to-accent-gold bg-[length:200%_auto] drop-shadow-[0_0_40px_rgba(0,210,255,0.5)]"
                  >
                    All of It.
                  </motion.span>
                </motion.span>
              </div>
            </h2>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: service.delay }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              onClick={() => setSelectedService(service)}
              className="group relative p-1 rounded-3xl transition-all duration-500 cursor-pointer"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
              <div className="relative h-full p-8 rounded-[calc(1.5rem-1px)] bg-[#050505] border border-white/5 group-hover:border-accent-blue/30 transition-all duration-500 overflow-hidden">
                {/* Card Glow */}
                <div className={`absolute -top-24 -right-24 w-48 h-48 rounded-full blur-[80px] opacity-0 group-hover:opacity-20 transition-opacity duration-500 ${service.color.replace('text-', 'bg-')}`} />

                <div className={`mb-8 p-4 bg-white/5 rounded-2xl w-fit group-hover:scale-110 transition-all duration-500 ${service.bgColor} ${service.color} relative z-10`}>
                  {service.icon}
                </div>

                <h3 className="text-xl font-bold mb-4 group-hover:text-white transition-colors relative z-10">{service.title}</h3>
                <p className="text-sm text-secondary group-hover:text-white/70 transition-colors duration-500 leading-relaxed relative z-10">
                  {service.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modern Centered Modal */}
      <AnimatePresence>
        {selectedService && (
          <div className="fixed inset-0 z-[100] overflow-y-auto overflow-x-hidden flex items-start sm:items-center justify-center p-4 sm:p-6 lg:p-10">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedService(null)}
              className="fixed inset-0 bg-black/90 backdrop-blur-xl z-0"
            />

            <motion.div
              layoutId={`service-${selectedService.slug}`}
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              className="relative w-full max-w-[90vw] md:max-w-2xl bg-[#0a0a0a] border border-white/10 rounded-[2rem] sm:rounded-[3rem] overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] z-10 glass my-auto"
            >
              <div className="relative p-6 sm:p-10 md:p-12 max-h-[85vh] overflow-y-auto custom-scrollbar">
                <div className="flex justify-between items-start mb-6 sm:mb-10">
                  <div className={`p-3 sm:p-4 bg-white/5 rounded-2xl ${selectedService.color} border border-white/5`}>
                    {selectedService.icon}
                  </div>
                  <button
                    onClick={() => setSelectedService(null)}
                    className="p-2 hover:bg-white/10 rounded-full transition-colors group bg-white/5"
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-secondary group-hover:text-white">
                      <line x1="18" y1="6" x2="6" y1="18"></line>
                      <line x1="6" y1="6" x2="18" y1="18"></line>
                    </svg>
                  </button>
                </div>

                <h2 className="text-2xl sm:text-4xl font-bold mb-2 tracking-tight">{selectedService.title}</h2>
                <p className={`${selectedService.color} font-bold uppercase tracking-widest text-[10px] sm:text-xs mb-6 px-3 py-1 bg-white/5 rounded-full w-fit`}>
                  {selectedService.subtitle}
                </p>

                <p className="text-secondary leading-relaxed mb-8 text-base sm:text-lg">
                  {selectedService.fullDescription}
                </p>

                <div className="grid sm:grid-cols-2 gap-3 sm:gap-4 mb-10">
                  {selectedService.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-3 bg-white/5 p-4 rounded-2xl border border-white/5 hover:border-white/10 transition-colors">
                      <div className={`p-1 rounded-full bg-white/5 ${selectedService.color}`}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </div>
                      <span className="text-sm font-semibold text-white/90">{feature}</span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => setSelectedService(null)}
                  className="w-full py-4 sm:py-5 bg-white text-black font-black uppercase tracking-widest text-xs rounded-2xl hover:bg-opacity-90 transition-all active:scale-[0.98] shadow-xl"
                >
                  Close Details
                </button>
              </div>

              {/* Decorative Glow inside modal */}
              <div className={`absolute -bottom-24 -left-24 w-64 h-64 rounded-full blur-[100px] opacity-10 -z-10 ${selectedService.color.replace('text-', 'bg-')}`} />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Services;
