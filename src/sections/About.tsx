import { motion } from 'framer-motion';
import { Download, Github, Linkedin, Mail, Cpu, Zap, Brain } from 'lucide-react';
import SectionTitle from '../components/ui/SectionTitle';
import NeonButton from '../components/ui/NeonButton';

// Custom X (Twitter) icon
const XIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
  </svg>
);

// Custom Discord icon
const DiscordIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
  </svg>
);

const STATS = [
  { icon: Brain, label: 'AI MODELS', value: '15+' },
  { icon: Cpu, label: 'PROJECTS', value: '12+' },
  { icon: Zap, label: 'UPTIME', value: '99.9%' },
];

const SOCIALS = [
  { icon: Github, href: 'https://github.com/saicharan2442', label: 'GitHub' },
  { icon: Linkedin, href: 'https://linkedin.com/in/saicharan-sada', label: 'LinkedIn' },
  { icon: Mail, href: 'mailto:saicharansada@gmail.com', label: 'Email' },
  { icon: XIcon, href: 'https://x.com/SadaSaicharan', label: 'X @SadaSaicharan' },
  { icon: DiscordIcon, href: 'https://discord.com/users/saicharansada', label: 'Discord saicharansada' },
];

export default function About() {
  return (
    <section id="about" className="relative min-h-screen py-32 px-6">
      <SectionTitle index="01" title="About" subtitle="// Operator Profile" />

      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        {/* LEFT: profile frame */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative flex justify-center"
        >
          <div className="relative w-[320px] h-[320px] md:w-[420px] md:h-[420px]">
            {/* rotating outer ring */}
            <div className="absolute inset-0 rounded-full border border-cyber-neon/30 animate-spin-slow" />
            <div className="absolute inset-4 rounded-full border border-dashed border-cyber-pink/30 animate-spin-rev" />

            {/* scanning ring */}
            <div className="absolute inset-8 rounded-full overflow-hidden">
              <div className="scanline" style={{ animationDuration: '2.5s' }} />
            </div>

            {/* particle aura */}
            {Array.from({ length: 12 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1.5 h-1.5 rounded-full bg-cyber-neon"
                style={{
                  top: '50%',
                  left: '50%',
                  boxShadow: '0 0 8px #00f0ff',
                }}
                animate={{
                  x: [0, Math.cos((i / 12) * Math.PI * 2) * 200],
                  y: [0, Math.sin((i / 12) * Math.PI * 2) * 200],
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                }}
                transition={{
                  duration: 4,
                  delay: (i * 0.3) % 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            ))}

            {/* profile image container */}
            <div className="absolute inset-12 rounded-full overflow-hidden glass-strong neon-border flex items-center justify-center">
              <img
                src="/assets/image.png"
                alt="Saicharan Sada"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-cyber-void/60 via-transparent to-cyber-neon/10" />
              {/* fallback placeholder */}
              <div className="absolute inset-0 flex items-center justify-center font-display text-6xl text-cyber-neon/30 -z-10">
                SS
              </div>
            </div>

            {/* floating glass cards */}
            <motion.div
              className="absolute -top-4 -left-8 glass px-3 py-2 font-mono text-[10px] text-cyber-neon tracking-widest"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              ID://AI-ENG-077
            </motion.div>
            <motion.div
              className="absolute -bottom-2 -right-6 glass px-3 py-2 font-mono text-[10px] text-cyber-pink tracking-widest"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 5, repeat: Infinity, delay: 1 }}
            >
              STATUS: ACTIVE
            </motion.div>
            <motion.div
              className="absolute top-1/2 -right-12 glass px-3 py-2 font-mono text-[10px] text-cyber-electric tracking-widest"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, delay: 0.5 }}
            >
              NEURAL.LINK
            </motion.div>
          </div>
        </motion.div>

        {/* RIGHT: text */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="font-mono text-xs text-cyber-neon/60 tracking-[0.3em] mb-3">
            // IDENTITY MATRIX
          </div>
          <h3 className="font-display text-4xl md:text-5xl font-black uppercase mb-2 text-gradient-cyber">
            Saicharan Sada
          </h3>
          <p className="font-mono text-sm text-cyber-pink neon-text-pink mb-6 tracking-wider">
            AI & ML Engineer | Agentic AI Builder | Full Stack Dev
          </p>

          <p className="text-cyber-neon/70 leading-relaxed mb-8 text-lg">
            AI & Machine Learning Engineer skilled in Python, Machine Learning, Flask,
            Full Stack Development,  AWS, and AI Agent Workflows. Experienced in building scalable AI
            solutions, intelligent automation systems, MCP integrations, and modern web
            applications. Passionate about futuristic AI technologies, automation, and immersive
            digital experiences.
          </p>

          {/* stats */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            {STATS.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="glass hud-corner p-4 text-center"
              >
                <s.icon className="w-5 h-5 mx-auto mb-2 text-cyber-neon" />
                <div className="font-display text-2xl font-bold text-white">{s.value}</div>
                <div className="font-mono text-[9px] text-cyber-neon/50 tracking-widest mt-1">
                  {s.label}
                </div>
              </motion.div>
            ))}
          </div>

          {/* actions */}
          <div className="flex flex-wrap items-center gap-4">
            <a href="/assets/sada.resume.pdf" download="Resume.SaicharanSada.pdf">
              <NeonButton variant="cyan" icon={<Download className="w-4 h-4" />}>
                Download Resume
              </NeonButton>
            </a>
            <div className="flex gap-3">
              {SOCIALS.map((s) => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ y: -4, scale: 1.1 }}
                  className="w-12 h-12 glass hud-corner flex items-center justify-center text-cyber-neon hover:text-cyber-pink transition-colors"
                  style={{ boxShadow: '0 0 12px rgba(0,240,255,0.2)' }}
                >
                  <s.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
