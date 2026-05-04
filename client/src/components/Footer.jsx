import React from 'react';
import { motion } from 'framer-motion';

const LinkedinIcon = ({ size = 16 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const InstagramIcon = ({ size = 16 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const Footer = () => {
  return (
    <footer className="py-10 border-t border-white/5">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <motion.a
            href="/"
            className="text-2xl font-bold tracking-tighter"
            whileHover={{ scale: 1.05 }}
          >
            HC<span className="text-accent-blue">.</span>
          </motion.a>

          <div className="flex items-center gap-4">
            <a href="https://www.linkedin.com/in/haithamcherif" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center hover:bg-accent-blue hover:scale-110 transition-all duration-300">
              <LinkedinIcon size={14} />
            </a>
            <a href="https://www.instagram.com/haitham.cherif/" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center hover:bg-accent-blue hover:scale-110 transition-all duration-300">
              <InstagramIcon size={14} />
            </a>
          </div>

          <p className="text-secondary text-xs tracking-wider">
            &copy; {new Date().getFullYear()} Haitham Cherif. Crafted with passion from <span className="text-accent-gold">Sfax, Tunisia</span>.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
