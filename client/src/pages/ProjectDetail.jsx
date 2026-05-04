import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const projectsData = {
  'tembri': {
    title: 'TEMBRI — Clothing Brand',
    category: 'Branding & E-Commerce',
    client: 'Self-Founded',
    year: '2024',
    role: 'Founder & Designer',
    image: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=2070&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1550614000-4b95d4ed798a?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=1974&auto=format&fit=crop'
    ],
    description: 'TEMBRI is a premium clothing brand founded and built from scratch. This project encompasses the entire brand lifecycle — from product conceptualization and logo design to digital marketing campaigns and e-commerce setup. It serves as a testament to building a cohesive brand identity that resonates with a modern audience.',
    challenge: 'Creating a standout brand identity in a highly saturated fashion market, requiring a unique visual language and a robust marketing strategy to gain initial traction.',
    solution: 'Developed a minimalist, high-contrast visual identity system. Executed a launch campaign focused on lifestyle photography and social media engagement, resulting in a successful initial product drop.'
  },
  'interacti-agency': {
    title: 'Interacti Agency',
    category: 'Branding',
    client: 'Multiple Clients',
    year: '2024 - Present',
    role: 'Designer / Developer',
    image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop'
    ],
    description: 'Working with Interacti Marketing Agency to deliver high-end brand identities and marketing visuals across various industries. This ongoing role involves direct client interaction, translating business goals into compelling creative output.',
    challenge: 'Adapting to drastically different brand voices and industry requirements while maintaining a consistently high standard of design and rapid turnaround times.',
    solution: 'Implemented scalable design systems and streamlined the feedback loop between the agency and clients, ensuring all deliverables (social media, print, web) were perfectly aligned with the client\'s strategic goals.'
  },
  'eprod-videos': {
    title: 'EPROD — Video Productions',
    category: 'Video',
    client: 'EPROD Officiel',
    year: '2025',
    role: 'Freelance Videographer',
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=2000&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1601506521937-0121a7fc2a6b?q=80&w=2071&auto=format&fit=crop'
    ],
    description: 'Produced and edited over 15 dynamic videos encompassing events, restaurant promos, music videos, and fashion shoots. Managed the entire production pipeline independently.',
    challenge: 'Delivering cinematic quality videos in high-pressure, fast-paced environments like live events and DJ parties.',
    solution: 'Utilized agile filming techniques and established a highly efficient post-production workflow for color grading and sound design to deliver premium videos rapidly.'
  },
  'microsoft-tech-club': {
    title: 'Microsoft Tech Club',
    category: 'Web',
    client: 'ENET\'Com',
    year: '2024',
    role: 'Web Designer & Developer',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2070&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop'
    ],
    description: 'Designed and developed the official website for the Microsoft Tech Club at ENET\'Com. The platform serves as the central hub for events, member registration, and club news.',
    challenge: 'Creating a platform that is both visually engaging for students and easy to maintain for future club members without deep technical knowledge.',
    solution: 'Built a responsive, accessible React-based website with a clean UI and a customized content management structure for easy updates.'
  },
  'blueprint-vision': {
    title: 'Blueprint Vision',
    category: 'Marketing',
    client: 'Personal Project',
    year: '2025',
    role: 'Co-founder & Creative Director',
    image: 'https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=2064&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=1974&auto=format&fit=crop'
    ],
    description: 'A collaborative creative studio project focused on documenting real work, exploring visual storytelling, and delivering high-end brand design and photography for select clients.',
    challenge: 'Establishing a premium studio presence from scratch and attracting high-quality clients.',
    solution: 'Developed a striking visual identity for the studio and executed two full-scale creative direction projects for initial clients, leveraging the work as a portfolio piece on Instagram.'
  },
  'bari9-detergents': {
    title: 'Bari9 — Product Brand',
    category: 'Marketing',
    client: 'Bari9',
    year: '2024 - 2025',
    role: 'Marketing Intern',
    image: 'https://images.unsplash.com/photo-1563453392212-326f5e854473?q=80&w=1974&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=1974&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=1974&auto=format&fit=crop'
    ],
    description: 'Spearheaded marketing and content creation for Bari9, a Tunisian consumer goods brand specializing in detergents, liquid soaps, and multi-use cleaning products.',
    challenge: 'Differentiating a utility product (detergents) in a highly competitive local market using engaging digital content.',
    solution: 'Created visually clean, vibrant product photography and educational social media campaigns that highlighted product efficacy, significantly boosting local brand awareness.'
  },
  'interacti': {
    title: 'Interacti Marketing Agency',
    category: 'Web & Branding',
    client: 'Interacti Agency',
    year: '2024',
    role: 'Developer',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2070&auto=format&fit=crop'
    ],
    description: 'Developed responsive, high-performance websites tailored to various client needs under the Interacti Agency umbrella, focusing strictly on UX-first design and clean code architecture.',
    challenge: 'Translating complex client requirements into intuitive web interfaces within tight agency deadlines.',
    solution: 'Leveraged modern frontend frameworks (React/Next.js) to build modular, reusable components, drastically reducing development time while maintaining premium quality.'
  },
  'aeromodelisme': {
    title: 'AEROMODELISME Events',
    category: 'Video',
    client: 'ENET\'Com Club',
    year: '2025',
    role: 'Event Manager & Head of Marketing',
    image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=2012&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070&auto=format&fit=crop'
    ],
    description: 'Managed full event production, logistics, and visual marketing campaigns for the AEROMODELISME club at ENET\'Com.',
    challenge: 'Driving student engagement and attendance for highly technical university events.',
    solution: 'Produced high-energy promo videos and cohesive branding for the events, resulting in record attendance and heightened awareness within the university.'
  }
};

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = projectsData[id];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        <h2>Project not found. <button onClick={() => navigate('/portfolio')} className="text-accent-blue underline">Go back</button></h2>
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
      
      <div className="container max-w-5xl">
        <button onClick={() => navigate(-1)} className="inline-flex items-center text-sm font-bold uppercase tracking-widest text-secondary hover:text-white mb-12 transition-colors cursor-pointer">
          <ArrowLeft size={16} className="mr-2" /> Back
        </button>

        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="text-accent-blue font-bold uppercase tracking-[0.2em] text-xs mb-4 block">
            {project.category}
          </span>
          <h1 className="text-4xl md:text-6xl font-bold font-['Space_Grotesk'] mb-8">
            {project.title}
          </h1>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-8 border-y border-white/10 mb-12">
            <div>
              <p className="text-[10px] text-secondary uppercase tracking-widest mb-1">Client</p>
              <p className="font-bold text-sm">{project.client}</p>
            </div>
            <div>
              <p className="text-[10px] text-secondary uppercase tracking-widest mb-1">Role</p>
              <p className="font-bold text-sm">{project.role}</p>
            </div>
            <div>
              <p className="text-[10px] text-secondary uppercase tracking-widest mb-1">Year</p>
              <p className="font-bold text-sm">{project.year}</p>
            </div>
            <div>
              <p className="text-[10px] text-secondary uppercase tracking-widest mb-1">Category</p>
              <p className="font-bold text-sm">{project.category}</p>
            </div>
          </div>
        </motion.div>

        {/* Main Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="aspect-video w-full rounded-3xl overflow-hidden mb-16"
        >
          <img src={project.image} alt={project.title} loading="lazy" className="w-full h-full object-cover" />
        </motion.div>

        {/* Content */}
        <div className="grid md:grid-cols-12 gap-12 mb-20">
          <div className="md:col-span-8">
            <h3 className="text-2xl font-bold mb-6 font-['Space_Grotesk']">Project Overview</h3>
            <p className="text-secondary text-lg leading-relaxed mb-10">
              {project.description}
            </p>
            
            <h3 className="text-2xl font-bold mb-6 font-['Space_Grotesk']">The Challenge</h3>
            <p className="text-secondary text-lg leading-relaxed mb-10">
              {project.challenge}
            </p>

            <h3 className="text-2xl font-bold mb-6 font-['Space_Grotesk']">The Solution</h3>
            <p className="text-secondary text-lg leading-relaxed mb-10">
              {project.solution}
            </p>
          </div>
        </div>

        {/* Gallery */}
        <div className="grid md:grid-cols-2 gap-6">
          {project.images.map((img, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`rounded-3xl overflow-hidden aspect-[4/3] ${idx === project.images.length - 1 && project.images.length % 2 !== 0 ? 'md:col-span-2 aspect-[21/9]' : ''}`}
            >
              <img src={img} alt={`${project.title} gallery ${idx}`} loading="lazy" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
            </motion.div>
          ))}
        </div>
        
        <div className="mt-20 text-center">
          <Link to="/portfolio#contact" className="btn-primary">
            Start a Similar Project
          </Link>
        </div>
      </div>
      
      <div className="mt-32">
        <Footer />
      </div>
    </motion.div>
  );
};

export default ProjectDetail;
