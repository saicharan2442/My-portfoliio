import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Cpu } from 'lucide-react';

// Custom X (Twitter) icon SVG
const XIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
  </svg>
);

// Custom Discord icon SVG
const DiscordIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
  </svg>
);

const SOCIALS = [
  {
    icon: Github,
    href: 'https://github.com/saicharan2442',
    label: 'GitHub',
    color: '#7b2fff',
  },
  {
    icon: Linkedin,
    href: 'https://linkedin.com/in/saicharan-sada',
    label: 'LinkedIn',
    color: '#1e8bff',
  },
  {
    icon: Mail,
    href: 'mailto:saicharansada@gmail.com',
    label: 'Email',
    color: '#00f0ff',
  },
  {
    icon: XIcon,
    href: 'https://x.com/SadaSaicharan',
    label: 'X @SadaSaicharan',
    color: '#e7e9ea',
  },
  {
    icon: DiscordIcon,
    href: 'https://discord.com/users/saicharansada',
    label: 'Discord saicharansada',
    color: '#5865f2',
  },
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

        <div className="flex gap-3 -translate-x-[25px]">
          {SOCIALS.map((s, i) => (
            <motion.a
              key={i}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              title={s.label}
              whileHover={{ y: -4, scale: 1.15 }}
              className="w-10 h-10 glass flex items-center justify-center transition-colors"
              style={{ color: '#00f0ff' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = s.color)}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#00f0ff')}
            >
              <s.icon className="w-4 h-4" />
            </motion.a>
          ))}
        </div>

        <div className="font-mono text-[10px] text-cyber-neon/40 tracking-widest text-center md:text-right">
          <div>DESIGNED &amp; DEVELOPED BY</div>
          <div className="text-cyber-neon/70 mt-1">SAICHARAN SADA</div>
          <div className="mt-1">© {new Date().getFullYear()} // AI.CORE v2.077</div>
        </div>
      </div>
    </footer>
  );
}
