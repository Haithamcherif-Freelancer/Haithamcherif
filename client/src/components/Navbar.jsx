import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import MegaMenu from './MegaMenu';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [megaMenuHovered, setMegaMenuHovered] = useState(false);
  const megaMenuTimeout = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMouseEnter = () => {
    if (megaMenuTimeout.current) clearTimeout(megaMenuTimeout.current);
    setMegaMenuHovered(true);
  };

  const handleMouseLeave = () => {
    megaMenuTimeout.current = setTimeout(() => {
      setMegaMenuHovered(false);
    }, 150);
  };

  const navLinks = [
    { name: 'Work', href: '#portfolio' },
    { name: 'About', href: '#about' },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'py-4 glass' : 'py-8'} ${megaMenuHovered && !scrolled ? 'glass' : ''}`}>
      <div className="container relative flex justify-between items-center">
        <motion.a
          href="/"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-2xl font-bold tracking-tighter"
        >
          HC<span className="text-accent-blue">.</span>
        </motion.a>

        {/* Desktop Nav */}
        <div className="hidden md:flex gap-12 items-center h-full">
          {navLinks.map((link, i) => (
            <Link
              key={link.name}
              to={`/portfolio${link.href}`}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="text-sm font-medium hover:text-accent-blue transition-colors uppercase tracking-widest h-full flex items-center py-2"
            >
              {link.name}
            </Link>
          ))}

          {/* Services Dropdown Trigger */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="relative h-full flex items-center"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <button className={`text-sm font-medium uppercase tracking-widest flex items-center gap-1 transition-colors py-2 ${megaMenuHovered ? 'text-accent-blue' : 'hover:text-accent-blue'}`}>
              Services <ChevronDown size={14} className={`transition-transform duration-300 ${megaMenuHovered ? 'rotate-180' : ''}`} />
            </button>
            <MegaMenu isHovered={megaMenuHovered} />
          </motion.div>

          <Link
            to="/portfolio#contact"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="px-6 py-2 bg-accent-blue text-white rounded-full text-sm font-bold hover:opacity-90 transition-all ml-4"
          >
            Hire Me
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass border-t border-white/10"
          >
            <div className="flex flex-col p-8 gap-6 text-center">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={`/portfolio${link.href}`}
                  onClick={() => setIsOpen(false)}
                  className="text-lg font-medium hover:text-accent-blue"
                >
                  {link.name}
                </Link>
              ))}
              <div className="text-lg font-medium text-accent-blue border-y border-white/10 py-4 flex flex-col gap-3">
                <span className="mb-2">Services</span>
                <Link to="/service/creative-design" onClick={() => setIsOpen(false)} className="text-sm text-secondary hover:text-white transition-colors">Creative Design</Link>
                <Link to="/service/web-development" onClick={() => setIsOpen(false)} className="text-sm text-secondary hover:text-white transition-colors">Web Development</Link>
                <Link to="/service/media-production" onClick={() => setIsOpen(false)} className="text-sm text-secondary hover:text-white transition-colors">Media Production</Link>
                <Link to="/service/digital-marketing" onClick={() => setIsOpen(false)} className="text-sm text-secondary hover:text-white transition-colors">Digital Marketing</Link>
              </div>
              <Link
                to="/portfolio#contact"
                onClick={() => setIsOpen(false)}
                className="text-lg font-medium hover:text-accent-blue"
              >
                Contact
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
