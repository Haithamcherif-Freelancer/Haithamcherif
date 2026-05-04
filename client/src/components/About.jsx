import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const stats = [
  { number: '2+', label: 'Years in Industry' },
  { number: '15+', label: 'Videos Produced' },
  { number: '10+', label: 'Brands Served' },
  { number: '4', label: 'Disciplines' },
];

const tags = ["Photography", "Videography", "Brand Identity", "Web Dev", "Design"];

const About = () => {
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
    <section id="about" className="section bg-[#050505] relative overflow-hidden">
      {/* Background Decorative Element */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-accent-blue/5 rounded-full blur-[120px] -z-10" />

      <div className="container">
        <div className="grid lg:grid-cols-2 items-center gap-20 sm:gap-32">
          {/* Left Side: 3D Portrait */}
          <motion.div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
            style={{ perspective: "1500px" }}
          >
            <motion.div
              style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
              className="aspect-[4/5] bg-white/[0.02] rounded-[3rem] overflow-hidden relative group border border-white/5"
            >
              <div className="absolute inset-0 bg-accent-blue/10 group-hover:bg-transparent transition-all duration-1000 z-10" />
              <img
                src="Haitham cherif.jpg"
                alt="Haitham Cherif Portrait"
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000 scale-105 group-hover:scale-100"
              />

              {/* Floating ID Card */}
              <div
                className="absolute bottom-10 left-10 right-10 p-8 glass rounded-3xl z-20 border border-white/10"
                style={{ transform: "translateZ(50px)" }}
              >
                <div className="flex items-center gap-4 mb-2">
                  <div className="w-2 h-2 rounded-full bg-accent-cyan animate-pulse" />
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white">Identity Card</span>
                </div>
                <h4 className="text-xl font-bold mb-1">Haitham Cherif</h4>
                <p className="text-[10px] uppercase tracking-widest text-secondary font-bold">Creative Director — Sfax, Tunisia</p>
              </div>
            </motion.div>

            {/* Decorative Floating Tags */}
            {tags.map((tag, i) => (
              <motion.span
                key={tag}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.8 + i * 0.1 }}
                viewport={{ once: true }}
                className="absolute hidden sm:block text-[10px] font-black uppercase tracking-[0.2em] px-4 py-2 glass border border-white/10 rounded-full z-30"
                style={{
                  top: `${10 + i * 15}%`,
                  right: i % 2 === 0 ? "-20px" : "-60px",
                  transform: "translateZ(80px)"
                }}
              >
                {tag}
              </motion.span>
            ))}
          </motion.div>

          {/* Right Side: Content */}
          <div style={{ perspective: "1000px" }}>
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="text-accent-blue font-black uppercase tracking-[0.4em] text-[10px] mb-6 block px-4 py-1.5 bg-white/5 rounded-full w-fit border border-white/10"
            >
              The Story
            </motion.span>

            <h2 className="text-3xl md:text-5xl font-bold leading-tight tracking-tight mb-10 font-heading flex flex-wrap">
              {"Every Brand Has a Story. ".split("").map((char, i) => (
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
                {"Most Just Don't Know How to Show It.".split("").map((char, i) => (
                  <motion.span
                    key={i}
                    initial={{ y: "100%", rotateX: -90, opacity: 0 }}
                    whileInView={{ y: 0, rotateX: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.5 + i * 0.02, ease: [0.22, 1, 0.36, 1] }}
                    viewport={{ once: true }}
                    className="inline-block origin-bottom"
                  >
                    {char === " " ? "\u00A0" : char}
                  </motion.span>
                ))}
              </span>
            </h2>

            <div className="space-y-6 text-secondary text-lg leading-relaxed mb-12">
              <p>
                I picked up a pencil before I picked up a camera. Drawing was my first language — I even took it as a serious option in my baccalaureate. Then one day a friend handed me his camera. I pressed the shutter once. <span className="text-white font-bold italic">That was it.</span>
              </p>
              <p>
                What started as two separate obsessions slowly became one belief: <span className="text-accent-cyan font-bold italic underline decoration-accent-cyan/30 underline-offset-8">strong visuals aren't decoration — they're strategy.</span> The right image, film, or brand identity can change how people perceive a business overnight.
              </p>
              <p>
                Today I work across Photography, Videography, Brand Identity, Graphic Design, and Web Development — not because I couldn't choose, but because every great brand needs all of it working together.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 + i * 0.1 }}
                  viewport={{ once: true }}
                >
                  <h4 className="text-3xl font-black text-white mb-2 font-heading tracking-tighter italic">
                    {stat.number}
                  </h4>
                  <p className="text-[9px] uppercase tracking-[0.2em] text-accent-blue font-bold">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
