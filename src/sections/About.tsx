import { motion } from 'framer-motion';
import { Download, Github, Linkedin, Mail, Cpu, Zap, Brain } from 'lucide-react';
import SectionTitle from '../components/ui/SectionTitle';
import NeonButton from '../components/ui/NeonButton';

const STATS = [
  { icon: Brain, label: 'AI MODELS', value: '15+' },
  { icon: Cpu, label: 'PROJECTS', value: '12+' },
  { icon: Zap, label: 'UPTIME', value: '99.9%' },
];

const SOCIALS = [
  { icon: Github, href: 'https://github.com/saicharan', label: 'GitHub' },
  { icon: Linkedin, href: 'https://linkedin.com/in/saicharan', label: 'LinkedIn' },
  { icon: Mail, href: 'mailto:saicharan@example.com', label: 'Email' },
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
            <NeonButton variant="cyan" icon={<Download className="w-4 h-4" />}>
              Download Resume
            </NeonButton>
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
