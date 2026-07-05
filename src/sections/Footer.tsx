import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Cpu } from 'lucide-react';

const SOCIALS = [
  { icon: Github, href: 'https://github.com/saicharan' },
  { icon: Linkedin, href: 'https://linkedin.com/in/saicharan' },
  { icon: Mail, href: 'mailto:saicharan.sada@example.com' },
];

export default function Footer() {
  return (
    <footer className="relative py-12 px-6 border-t border-cyber-neon/15">
      {/* holographic divider */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-3">
        <span className="h-px w-20 bg-gradient-to-r from-transparent to-cyber-neon" />
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
          className="w-8 h-8 rounded-full border border-cyber-neon/50 flex items-center justify-center"
          style={{ boxShadow: '0 0 16px rgba(0,240,255,0.4)' }}
        >
          <Cpu className="w-4 h-4 text-cyber-neon" />
        </motion.div>
        <span className="h-px w-20 bg-gradient-to-l from-transparent to-cyber-neon" />
      </div>

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-display text-xl font-black tracking-wider text-gradient-cyber"
        >
          SAICHARAN.SADA
        </motion.div>

        <div className="flex gap-4">
          {SOCIALS.map((s, i) => (
            <motion.a
              key={i}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              whileHover={{ y: -4, scale: 1.15 }}
              className="w-10 h-10 glass flex items-center justify-center text-cyber-neon hover:text-cyber-pink transition-colors"
            >
              <s.icon className="w-4 h-4" />
            </motion.a>
          ))}
        </div>

        <div className="font-mono text-[10px] text-cyber-neon/40 tracking-widest text-center md:text-right">
          <div>DESIGNED & DEVELOPED BY</div>
          <div className="text-cyber-neon/70 mt-1">SAICHARAN SADA</div>
          <div className="mt-1">© {new Date().getFullYear()} // AI.CORE v2.077</div>
        </div>
      </div>
    </footer>
  );
}
