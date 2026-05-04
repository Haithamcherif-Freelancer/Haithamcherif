import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Send, Mail, Phone, MapPin, ArrowUpRight } from 'lucide-react';

const Contact = () => {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');

    const formData = {
      ...formState,
      access_key: "cd608367-145f-4a25-8727-860e84153cec",
      subject: `New Portfolio Contact: ${formState.name}`
    };

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(formData)
      });

      const result = await response.json();
      if (result.success) {
        setStatus('success');
        setFormState({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="section bg-black relative overflow-hidden">
      {/* Background Decorative Glows */}
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-accent-blue/5 rounded-full blur-[150px] -z-10" />
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-accent-cyan/5 rounded-full blur-[120px] -z-10" />

      <div className="container">
        <div className="grid lg:grid-cols-2 gap-20 sm:gap-32">
          {/* Left Side: Copy & Info */}
          <div style={{ perspective: "1000px" }}>
            <motion.span 
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="text-accent-cyan font-black uppercase tracking-[0.4em] text-[10px] mb-6 block px-4 py-1.5 bg-white/5 rounded-full w-fit border border-white/10"
            >
              Get In Touch
            </motion.span>
            
            <h2 className="title-medium mb-8 flex flex-wrap">
              {"Have a Vision? ".split("").map((char, i) => (
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
                {"Let's Make It Real.".split("").map((char, i) => (
                  <motion.span
                    key={i}
                    initial={{ y: "100%", rotateX: -90, opacity: 0 }}
                    whileInView={{ y: 0, rotateX: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.4 + i * 0.02, ease: [0.22, 1, 0.36, 1] }}
                    viewport={{ once: true }}
                    className="inline-block origin-bottom"
                  >
                    {char === " " ? "\u00A0" : char}
                  </motion.span>
                ))}
              </span>
            </h2>

            <p className="text-lg text-secondary mb-12 max-w-lg leading-relaxed">
              I work with anyone who has a vision and a serious project — brands, small businesses, and entrepreneurs who want their visual presence to actually reflect the quality of what they do.
            </p>

            <div className="space-y-8">
              {[
                { icon: <Mail size={20} />, label: "Email", value: "haithamcherif.contact@gmail.com", href: "mailto:haithamcherif.contact@gmail.com" },
                { icon: <Phone size={20} />, label: "Phone", value: "+216 55 562 746", href: "tel:+21655562746" },
                { icon: <MapPin size={20} />, label: "Location", value: "Sfax, Tunisia", href: null },
              ].map((item, idx) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + idx * 0.1 }}
                  className={`flex items-center gap-6 group ${!item.href && 'pointer-events-none'}`}
                >
                  <div className="w-14 h-14 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center group-hover:bg-accent-blue group-hover:text-white group-hover:scale-110 transition-all duration-500">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-[10px] text-secondary uppercase tracking-[0.3em] font-bold mb-1">{item.label}</p>
                    <p className="text-sm sm:text-base font-bold group-hover:text-accent-cyan transition-colors">{item.value}</p>
                  </div>
                </motion.a>
              ))}

              <div className="flex gap-4 pt-8">
                {[
                  { 
                    icon: (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
                      </svg>
                    ), 
                    href: "https://www.linkedin.com/in/haithamcherif" 
                  },
                  { 
                    icon: (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                      </svg>
                    ), 
                    href: "https://www.instagram.com/haitham.cherif/" 
                  },
                ].map((social, i) => (
                  <motion.a
                    key={i}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1 + i * 0.1, type: "spring" }}
                    className="w-14 h-14 rounded-2xl glass border border-white/10 flex items-center justify-center hover:bg-white hover:text-black hover:scale-110 transition-all duration-500"
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side: Form */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass p-10 sm:p-14 relative"
          >
            {/* Background Glow inside form */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent-blue/10 rounded-full blur-3xl -z-10" />

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid sm:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-secondary ml-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    className="w-full bg-white/[0.03] border border-white/5 rounded-2xl px-6 py-4 text-sm focus:border-accent-cyan focus:bg-white/[0.05] focus:outline-none transition-all placeholder:text-white/10"
                    placeholder="Your name"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-secondary ml-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    className="w-full bg-white/[0.03] border border-white/5 rounded-2xl px-6 py-4 text-sm focus:border-accent-cyan focus:bg-white/[0.05] focus:outline-none transition-all placeholder:text-white/10"
                    placeholder="your@email.com"
                  />
                </div>
              </div>
              
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-secondary ml-1">Project Details</label>
                <textarea
                  required
                  rows="5"
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  className="w-full bg-white/[0.03] border border-white/5 rounded-2xl px-6 py-4 text-sm focus:border-accent-cyan focus:bg-white/[0.05] focus:outline-none transition-all resize-none placeholder:text-white/10"
                  placeholder="Tell me about your vision..."
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={status === 'sending'}
                className="w-full btn-primary py-6 flex items-center justify-center gap-4 disabled:opacity-50 group"
              >
                {status === 'sending' ? 'Sending...' : 'Send Message'} 
                <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>

              <AnimatePresence>
                {status === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="p-4 rounded-2xl bg-green-500/10 border border-green-500/20 text-green-400 text-center text-xs font-bold uppercase tracking-widest"
                  >
                    Message Received. I'll get back to you soon!
                  </motion.div>
                )}
                {status === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 text-center text-xs font-bold uppercase tracking-widest"
                  >
                    Something went wrong. Please try again.
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
