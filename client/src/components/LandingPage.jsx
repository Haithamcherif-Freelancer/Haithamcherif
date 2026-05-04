import React, { useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Stars, MeshDistortMaterial } from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';

/* ─── 3D Abstract Blob ─── */
function AbstractBlob() {
  const meshRef = useRef();
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.1;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.15;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef} position={[0, 0, -2]}>
        <sphereGeometry args={[2.5, 64, 64]} />
        <MeshDistortMaterial
          color="#1A1A1A"
          attach="material"
          distort={0.4}
          speed={1.5}
          roughness={0.2}
          metalness={0.8}
          transparent
          opacity={0.8}
        />
      </mesh>
    </Float>
  );
}

/* ─── Floating Particles ─── */
function FloatingParticles() {
  const pointsRef = useRef();
  const count = 150;
  
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.03;
      pointsRef.current.rotation.x = state.clock.elapsedTime * 0.02;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.02} color="#FFFFFF" transparent opacity={0.3} sizeAttenuation />
    </points>
  );
}

/* ─── 3D Scene ─── */
function Scene() {
  return (
    <>
      <color attach="background" args={['#050505']} />
      <fog attach="fog" args={['#050505', 5, 20]} />
      <ambientLight intensity={0.2} />
      <directionalLight position={[10, 10, 5]} intensity={1} color="#e8593c" />
      <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#ffffff" />
      <Stars radius={80} depth={50} count={2000} factor={2} saturation={0} fade speed={0.5} />
      <AbstractBlob />
      <FloatingParticles />
    </>
  );
}

/* ─── Text Animation Variants ─── */
const letterVariants = {
  hidden: { opacity: 0, y: 30, filter: 'blur(10px)' },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      delay: 0.5 + i * 0.08,
      duration: 1.2,
      ease: [0.215, 0.61, 0.355, 1],
    },
  }),
};

const LandingPage = () => {
  const name = "Haitham Cherif";
  const navigate = useNavigate();

  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-[#050505] overflow-hidden cursor-pointer"
      onClick={() => navigate('/portfolio')}
      exit={{ 
        opacity: 0, 
        scale: 1.05,
        filter: 'blur(20px)',
        transition: { duration: 1.2, ease: [0.76, 0, 0.24, 1] } 
      }}
    >
      {/* 3D Background */}
      <div className="absolute inset-0 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
          <Scene />
        </Canvas>
      </div>

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505] opacity-80 pointer-events-none"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/50 via-transparent to-[#050505]/50 pointer-events-none"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 text-center">
        {/* Top Label */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="mb-6"
        >
          <span className="text-[10px] md:text-xs font-medium uppercase tracking-[0.4em] text-white/50 border-b border-white/10 pb-2">
            Creative Portfolio
          </span>
        </motion.div>

        {/* Name */}
        <div className="flex overflow-hidden mb-4 justify-center flex-wrap max-w-4xl">
          {name.split('').map((letter, i) => (
            <motion.span
              key={`name-${i}`}
              custom={i}
              variants={letterVariants}
              initial="hidden"
              animate="visible"
              className="text-6xl md:text-8xl lg:text-9xl tracking-tight text-white/90"
              style={{ 
                fontFamily: 'Space Grotesk, sans-serif', 
                display: 'inline-block',
                marginRight: letter === ' ' ? '0.2em' : '0'
              }}
            >
              {letter}
            </motion.span>
          ))}
        </div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, filter: 'blur(5px)' }}
          animate={{ opacity: 1, filter: 'blur(0px)' }}
          transition={{ delay: 2, duration: 1.5 }}
          className="text-white/40 text-sm md:text-base tracking-[0.3em] uppercase mb-16 font-light"
        >
          Design • Development • Visual Storytelling
        </motion.p>

        {/* Click anywhere indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ delay: 3, duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-16 flex flex-col items-center gap-4"
        >
          <span className="text-[10px] uppercase tracking-[0.3em] text-white/40 font-medium">
            Click anywhere to enter
          </span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-white/20 to-transparent"></div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default LandingPage;
