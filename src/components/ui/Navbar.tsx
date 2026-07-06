import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Menu, X, Cpu } from 'lucide-react';
import { scrollToId } from '../../hooks/useSmoothScroll';

const LINKS = [
  { id: 'about', label: 'About', index: '01' },
  { id: 'skills', label: 'Skills', index: '02' },
  { id: 'experience', label: 'Experience', index: '03' },
  { id: 'projects', label: 'Projects', index: '04' },
  { id: 'certifications', label: 'Certs', index: '05' },
  { id: 'contact', label: 'Contact', index: '06' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('about');

  useEffect(() => {
    const handle = () => {
      setScrolled(window.scrollY > 60);
      const sections = LINKS.map((l) => document.getElementById(l.id));
      const y = window.scrollY + window.innerHeight / 3;
      for (let i = sections.length - 1; i >= 0; i--) {
        const s = sections[i];
        if (s && s.offsetTop <= y) {
          setActive(LINKS[i].id);
          break;
        }
      }
    };
    handle();
    window.addEventListener('scroll', handle, { passive: true });
    return () => window.removeEventListener('scroll', handle);
  }, []);

  const go = (id: string) => {
    setOpen(false);
    scrollToId(id);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'py-2' : 'py-4'
        }`}
      >
        <div
          className={`mx-auto max-w-7xl px-4 transition-all duration-500 ${
            scrolled ? 'mx-3' : 'mx-6'
          }`}
        >
          <div
            className={`flex items-center justify-between px-4 py-3 transition-all duration-500 ${
              scrolled
                ? 'glass-strong hud-corner'
                : 'border border-transparent'
            }`}
            style={
              scrolled
                ? { boxShadow: '0 0 24px rgba(0,240,255,0.15)' }
                : undefined
            }
          >
            {/* logo */}
            <button
              onClick={() => go('about')}
              className="group flex items-center gap-2.5"
            >
              <motion.div
                whileHover={{ rotate: 180 }}
                transition={{ duration: 0.6 }}
                className="w-9 h-9 rounded-lg flex items-center justify-center border border-cyber-neon/50"
                style={{ boxShadow: '0 0 14px rgba(0,240,255,0.3)' }}
              >
                <Cpu className="w-5 h-5 text-cyber-neon" />
              </motion.div>
              <div className="font-display font-black tracking-wider text-sm leading-none">
                <span className="text-gradient-cyber">SAICHARAN</span>
                <span className="block font-mono text-[9px] text-cyber-neon/50 tracking-[0.3em] mt-1">
                  AI.CORE
                </span>
              </div>
            </button>

            {/* desktop links */}
            <div className="hidden md:flex items-center gap-1">
              {LINKS.map((l) => (
                <button
                  key={l.id}
                  onClick={() => go(l.id)}
                  className="relative px-4 py-2 font-mono text-xs uppercase tracking-widest transition-colors group"
                >
                  <span
                    className={`relative z-10 ${
                      active === l.id
                        ? 'text-cyber-neon'
                        : 'text-cyber-neon/50 hover:text-cyber-neon'
                    }`}
                  >
                    <span className="text-cyber-pink/60 mr-1">{l.index}</span>
                    {l.label}
                  </span>
                  {active === l.id && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 border border-cyber-neon/40"
                      style={{
                        clipPath:
                          'polygon(8% 0, 100% 0, 100% 70%, 92% 100%, 0 100%, 0 30%)',
                        boxShadow: '0 0 12px rgba(0,240,255,0.3)',
                      }}
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                </button>
              ))}
            </div>

            {/* CTA */}
            <button
              onClick={() => window.open('https://linkedin.com/in/saicharan-sada', '_blank', 'noopener,noreferrer')}
              className="hidden md:inline-flex items-center gap-2 px-4 py-2 font-mono text-[10px] uppercase tracking-widest text-cyber-pink border border-cyber-pink/50 transition-all hover:scale-105"
              style={{
                clipPath: 'polygon(8% 0, 100% 0, 100% 70%, 92% 100%, 0 100%, 0 30%)',
                boxShadow: '0 0 12px rgba(255,43,214,0.25)',
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-cyber-pink animate-pulse" />
              Connect
            </button>

            {/* mobile toggle */}
            <button
              onClick={() => setOpen((o) => !o)}
              className="md:hidden w-10 h-10 flex items-center justify-center text-cyber-neon border border-cyber-neon/30"
            >
              {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed top-20 left-3 right-3 z-50 md:hidden glass-strong hud-corner p-4"
            style={{ boxShadow: '0 0 30px rgba(0,240,255,0.2)' }}
          >
            <div className="flex flex-col gap-1">
              {LINKS.map((l, i) => (
                <motion.button
                  key={l.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => go(l.id)}
                  className={`flex items-center gap-3 px-4 py-3 font-mono text-sm uppercase tracking-widest text-left transition-colors ${
                    active === l.id
                      ? 'text-cyber-neon border-l-2 border-cyber-neon'
                      : 'text-cyber-neon/60 border-l-2 border-transparent'
                  }`}
                >
                  <span className="text-cyber-pink/60 text-xs">{l.index}</span>
                  {l.label}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
