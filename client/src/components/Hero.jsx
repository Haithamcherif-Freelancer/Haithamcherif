import React, { useRef, useMemo, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Points, PointMaterial, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

/* ─── 3D Background Elements ─── */
function Starfield({ mouseX, mouseY }) {
  const ref = useRef();

  const [positions] = useMemo(() => {
    const positions = new Float32Array(800 * 3);
    for (let i = 0; i < 800; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 15;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 15;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 15;
    }
    return [positions];
  }, []);

  useFrame((state, delta) => {
    ref.current.rotation.x -= delta / 30;
    ref.current.rotation.y -= delta / 40;

    // Mouse follow
    ref.current.position.x = THREE.MathUtils.lerp(ref.current.position.x, mouseX.get() * 0.5, 0.1);
    ref.current.position.y = THREE.MathUtils.lerp(ref.current.position.y, mouseY.get() * 0.5, 0.1);
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={positions} stride={3}>
        <PointMaterial
          transparent
          color="#00d2ff"
          size={0.015}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.3}
        />
      </Points>
    </group>
  );
}

function FloatingCore({ mouseX, mouseY }) {
  const meshRef = useRef();

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.2;
      meshRef.current.rotation.y += delta * 0.3;

      meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, mouseX.get() * 2, 0.05);
      meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, mouseY.get() * 2, 0.05);
    }
  });

  return (
    <Float speed={4} rotationIntensity={1} floatIntensity={2}>
      <mesh ref={meshRef} position={[2, 0, -2]}>
        <sphereGeometry args={[1, 64, 64]} />
        <MeshDistortMaterial
          color="#e8593c"
          speed={3}
          distort={0.4}
          radius={1}
          wireframe
          transparent
          opacity={0.2}
        />
      </mesh>
    </Float>
  );
}

const Hero = () => {
  const containerRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    mouseX.set((clientX / innerWidth) - 0.5);
    mouseY.set((clientY / innerHeight) - 0.5);
  };

  const springX = useSpring(mouseX, { stiffness: 100, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 20 });

  const rotateX = useTransform(springY, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-10, 10]);
  const glowX = useTransform(springX, [-0.5, 0.5], [100, -100]);
  const glowY = useTransform(springY, [-0.5, 0.5], [100, -100]);

  const titleLines = [
    "I Create Visuals",
    "To Show Your Vision"
  ];

  return (
    <section
      onMouseMove={handleMouseMove}
      className="hero-section min-h-screen flex items-center relative overflow-hidden bg-black"
    >
      {/* 3D Canvas Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
          <Starfield mouseX={springX} mouseY={springY} />
          <FloatingCore mouseX={springX} mouseY={springY} />
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
        </Canvas>
      </div>

      {/* Decorative Glows */}
      <motion.div
        style={{ x: glowX, y: glowY }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent-blue/10 rounded-full blur-[120px] -z-10"
      />

      <div className="container relative z-10">
        <div className="max-w-5xl" style={{ perspective: "2000px" }}>
          <motion.div
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl mb-10"
              style={{ transform: "translateZ(50px)" }}
            >
              <div className="w-1.5 h-1.5 rounded-full bg-accent-cyan animate-pulse" />
              <span className="text-accent-cyan text-[10px] font-black uppercase tracking-[0.3em]">
                Helping Brands Grow Through Visuals That Leave a Mark
              </span>
            </motion.div>

            <h1 className="title-large flex flex-col mb-12">
              {titleLines.map((line, lineIndex) => (
                <div key={lineIndex} className="flex flex-wrap py-2">
                  {line.split(" ").map((word, wordIndex) => (
                    <span key={wordIndex} className="flex mr-[0.3em] last:mr-0 overflow-visible">
                      {word.split("").map((char, charIndex) => (
                        <motion.span
                          key={charIndex}
                          initial={{ y: "100%", rotateX: -90, opacity: 0 }}
                          animate={{ y: 0, rotateX: 0, opacity: 1 }}
                          transition={{
                            duration: 0.8,
                            delay: 0.2 + (lineIndex * 10 + wordIndex * 5 + charIndex) * 0.03,
                            ease: [0.22, 1, 0.36, 1]
                          }}
                          className="inline-block origin-bottom text-white"
                          style={{ transform: "translateZ(100px)" }}
                        >
                          {char}
                        </motion.span>
                      ))}
                    </span>
                  ))}
                  {lineIndex === 1 && (
                    <motion.span
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 1.5, duration: 0.5 }}
                      className="text-accent-blue"
                    >.</motion.span>
                  )}
                </div>
              ))}
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="text-lg md:text-xl text-secondary max-w-2xl mb-12 leading-relaxed"
              style={{ transform: "translateZ(30px)" }}
            >
              Documenting the craft of premium branding and visual conversion.
              From brand identity to cinematic storytelling — I bridge the gap
              between complex logic and stunning aesthetics.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="flex flex-wrap gap-6"
              style={{ transform: "translateZ(60px)" }}
            >
              <button onClick={() => navigate('/portfolio')} className="btn-primary group cursor-pointer">
                View My Work
                <ArrowRight className="inline ml-2 group-hover:translate-x-1 transition-transform" size={18} />
              </button>
              <button onClick={() => navigate('/portfolio#contact')} className="btn-secondary cursor-pointer">
                Discuss Your Project
              </button>
            </motion.div>
          </motion.div>

          {/* Scroll Label */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ delay: 2, duration: 1 }}
            className="flex items-center gap-4 mt-24"
          >
            <div className="w-12 h-[1px] bg-white/20" />
            <span className="text-[9px] uppercase tracking-[0.4em] text-secondary font-bold">
              Scroll to explore
            </span>
          </motion.div>
        </div>
      </div>

      {/* Vertical Line Animation */}
      <motion.div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 hidden md:block"
        initial={{ height: 0 }}
        animate={{ height: 100 }}
        transition={{ delay: 2.2, duration: 1.5, ease: "circOut" }}
      >
        <div className="w-[1px] h-full bg-gradient-to-b from-accent-blue to-transparent" />
      </motion.div>
    </section>
  );
};

export default Hero;
