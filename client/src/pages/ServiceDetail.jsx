import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const servicesData = {
  'creative-design': {
    title: 'Creative Design',
    subtitle: 'Brand Identity, UI/UX, & Visual Systems',
    description: 'We craft visual identities that tell compelling stories. From logos and brand guidelines to immersive UI/UX design and marketing assets, every pixel is designed with purpose to elevate your brand.',
    image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=2071&auto=format&fit=crop',
    features: ['Logo & Brand Identity', 'UI/UX Web Design', 'Social Media Graphics', 'Print & Packaging'],
    color: 'text-accent-blue',
    bg: 'bg-accent-blue'
  },
  'web-development': {
    title: 'Web Development',
    subtitle: 'High-Performance Digital Experiences',
    description: 'Building modern, scalable, and lightning-fast web applications. We specialize in React, Next.js, and complex interactive experiences that bridge the gap between design and robust architecture.',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop',
    features: ['Custom Web Apps', 'E-Commerce Solutions', 'Landing Pages', 'Performance Optimization'],
    color: 'text-accent-cyan',
    bg: 'bg-accent-cyan'
  },
  'media-production': {
    title: 'Media Production',
    subtitle: 'Cinematic Storytelling & Photography',
    description: 'Capturing moments that leave a mark. End-to-end production including concept development, filming, editing, color grading, and sound design for commercials, events, and brand campaigns.',
    image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?q=80&w=2070&auto=format&fit=crop',
    features: ['Event Cinematography', 'Product Photography', 'Commercial Videos', 'Color Grading & Audio'],
    color: 'text-accent-gold',
    bg: 'bg-accent-gold'
  },
  'digital-marketing': {
    title: 'Digital Marketing',
    subtitle: 'Strategy that Drives Real Growth',
    description: 'Developing data-driven marketing campaigns and managing your digital presence. We focus on content creation, social media strategy, and brand communication that actually converts.',
    image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=1974&auto=format&fit=crop',
    features: ['Content Strategy', 'Social Media Management', 'Campaign Execution', 'Brand Auditing'],
    color: 'text-white',
    bg: 'bg-white'
  }
};

const ServiceDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const service = servicesData[id];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        <h2>Service not found. <button onClick={() => navigate('/portfolio')} className="text-accent-blue underline">Go back</button></h2>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-surface min-h-screen pt-32 pb-20"
    >
      <Navbar />

      <div className="container max-w-6xl">
        <button onClick={() => navigate(-1)} className="inline-flex items-center text-sm font-bold uppercase tracking-widest text-secondary hover:text-white mb-12 transition-colors cursor-pointer">
          <ArrowLeft size={16} className="mr-2" /> Back
        </button>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className={`${service.color} font-bold uppercase tracking-[0.2em] text-xs mb-4 block`}>Service</span>
            <h1 className="text-5xl md:text-6xl font-bold font-['Space_Grotesk'] mb-6 leading-tight">
              {service.title}
            </h1>
            <h3 className="text-xl text-white/80 mb-8 font-medium">
              {service.subtitle}
            </h3>
            <p className="text-secondary text-lg leading-relaxed mb-10">
              {service.description}
            </p>

            <div className="space-y-4 mb-12">
              <h4 className="font-bold uppercase tracking-widest text-sm mb-6">What's Included</h4>
              {service.features.map((feature, idx) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + (idx * 0.1) }}
                  className="flex items-center gap-4 glass p-4 rounded-xl"
                >
                  <CheckCircle2 className={service.color} size={20} />
                  <span className="font-medium text-white/90">{feature}</span>
                </motion.div>
              ))}
            </div>

            <Link to="/portfolio#contact" className="btn-primary">
              Discuss Your Project
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            <div className={`absolute -inset-4 ${service.bg}/20 blur-3xl rounded-full -z-10`}></div>
            <div className="aspect-[4/5] rounded-3xl overflow-hidden glass border border-white/10 p-2">
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-full object-cover rounded-2xl"
              />
            </div>
          </motion.div>
        </div>
      </div>

      <div className="mt-32">
        <Footer />
      </div>
    </motion.div>
  );
};

export default ServiceDetail;
