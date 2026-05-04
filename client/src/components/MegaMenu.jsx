import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, ArrowRight, PenTool, Code, Camera, TrendingUp } from 'lucide-react';

const MegaMenu = ({ isHovered }) => {
  return (
    <AnimatePresence>
      {isHovered && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 15, scale: 0.95 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="fixed top-[80px] left-1/2 -translate-x-1/2 w-[95vw] max-w-6xl bg-white rounded-[2.5rem] shadow-[0_40px_100px_rgba(0,0,0,0.5)] border border-gray-100 overflow-hidden z-[100] text-gray-900 max-h-[80vh] overflow-y-auto custom-scrollbar"
        >
          <div className="flex flex-col lg:flex-row min-h-fit">

            {/* Left Section: Highlight Card */}
            <div className="w-full lg:w-[35%] bg-gradient-to-br from-gray-50 to-gray-100 p-10 sm:p-12 relative overflow-hidden border-b lg:border-b-0 lg:border-r border-gray-100 shrink-0">
              {/* Abstract decorative shape */}
              <div className="absolute top-0 right-0 w-80 h-80 bg-accent-blue/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/4"></div>

              <div className="relative z-10 h-full flex flex-col justify-between gap-10">
                <div>
                  <span className="text-accent-blue text-[10px] font-black uppercase tracking-[0.4em] mb-4 block">Communication</span>
                  <h3 className="text-3xl sm:text-4xl font-bold font-['Space_Grotesk'] mb-8 tracking-tighter text-gray-900 leading-[1.1]">
                    Ready to start<br className="hidden sm:block" /> your project?
                  </h3>

                  <div className="space-y-6 mb-4">
                    <a href="tel:+21655562746" className="flex items-center gap-5 group">
                      <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center shadow-sm border border-gray-100 group-hover:border-accent-blue group-hover:text-accent-blue transition-all shrink-0">
                        <Phone size={18} />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Call Me</span>
                        <span className="text-sm font-bold text-gray-700 group-hover:text-black transition-colors">+216 55 562 746</span>
                      </div>
                    </a>
                    <a href="mailto:haithamcherif.contact@gmail.com" className="flex items-center gap-5 group">
                      <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center shadow-sm border border-gray-100 group-hover:border-accent-blue group-hover:text-accent-blue transition-all shrink-0">
                        <Mail size={18} />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Email Me</span>
                        <span className="text-sm font-bold text-gray-700 group-hover:text-black transition-colors truncate">haithamcherif.contact@gmail.com</span>
                      </div>
                    </a>
                  </div>
                </div>

                <Link to="/portfolio#contact" className="inline-flex items-center justify-center w-full bg-gradient-to-r from-accent-blue to-accent-cyan text-white py-5 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:shadow-[0_20px_50px_rgba(0,210,255,0.3)] hover:-translate-y-1 active:scale-[0.98] transition-all duration-300 group">
                  Get in Touch
                  <ArrowRight size={16} className="ml-2 group-hover:translate-x-2 transition-transform duration-300" />
                </Link>
              </div>
            </div>

            {/* Right Section: Service Grid */}
            <div className="w-full lg:w-[65%] p-10 sm:p-12 bg-white">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-12">

                {/* Column 1 */}
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-blue-50 text-accent-blue rounded-xl">
                      <PenTool size={20} />
                    </div>
                    <Link to="/service/creative-design" className="font-bold text-gray-900 font-['Space_Grotesk'] hover:text-accent-blue transition-colors text-xl tracking-tight text-gradient-landing">Creative Design</Link>
                  </div>
                  <ul className="space-y-3">
                    {['Brand Identity & Logos', 'UI/UX Web Design', 'Social Media Graphics', 'Print & Packaging'].map(item => (
                      <li key={item}>
                        <Link to="/service/creative-design" className="text-[13px] text-gray-500 hover:text-accent-blue hover:pl-2 transition-all inline-block font-bold uppercase tracking-wider">
                          {item}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Column 2 */}
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-cyan-50 text-accent-cyan rounded-xl">
                      <Code size={20} />
                    </div>
                    <Link to="/service/web-development" className="font-bold text-gray-900 font-['Space_Grotesk'] hover:text-accent-cyan transition-colors text-xl tracking-tight text-gradient-landing">Web Development</Link>
                  </div>
                  <ul className="space-y-3">
                    {['Custom Web Apps (React)', 'E-Commerce Solutions', 'Landing Pages', 'Performance Optimization'].map(item => (
                      <li key={item}>
                        <Link to="/service/web-development" className="text-[13px] text-gray-500 hover:text-accent-cyan hover:pl-2 transition-all inline-block font-bold uppercase tracking-wider">
                          {item}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Column 3 */}
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-cyan-50 text-accent-cyan rounded-xl">
                      <Camera size={20} />
                    </div>
                    <Link to="/service/media-production" className="font-bold text-gray-900 font-['Space_Grotesk'] hover:text-accent-blue transition-colors text-xl tracking-tight text-gradient-landing">Media Production</Link>
                  </div>
                  <ul className="space-y-3">
                    {['Event Cinematography', 'Product Photography', 'Commercial Videos', 'Color Grading & Audio'].map(item => (
                      <li key={item}>
                        <Link to="/service/media-production" className="text-[13px] text-gray-500 hover:text-accent-cyan hover:pl-2 transition-all inline-block font-bold uppercase tracking-wider">
                          {item}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Column 4 */}
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-cyan-50 text-accent-cyan rounded-xl">
                      <TrendingUp size={20} />
                    </div>
                    <Link to="/service/digital-marketing" className="font-bold text-gray-900 font-['Space_Grotesk'] hover:text-accent-blue transition-colors text-xl tracking-tight text-gradient-landing">Digital Marketing</Link>
                  </div>
                  <ul className="space-y-3">
                    {['Content Creation Strategy', 'Social Media Management', 'Campaign Execution', 'Brand Auditing'].map(item => (
                      <li key={item}>
                        <Link to="/service/digital-marketing" className="text-[13px] text-gray-500 hover:text-gray-900 hover:pl-2 transition-all inline-block font-bold uppercase tracking-wider">
                          {item}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>
            </div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MegaMenu;
