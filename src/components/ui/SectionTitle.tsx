import { motion } from 'framer-motion';

interface SectionTitleProps {
  index: string;
  title: string;
  subtitle?: string;
}

export default function SectionTitle({ index, title, subtitle }: SectionTitleProps) {
  return (
    <div className="mb-16 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6 }}
        className="inline-flex items-center gap-3 mb-4"
      >
        <span className="font-mono text-cyber-neon/60 text-sm tracking-[0.3em]">{index}</span>
        <span className="h-px w-12 bg-gradient-to-r from-cyber-neon/60 to-transparent" />
      </motion.div>
      <motion.h2
        initial={{ opacity: 0, y: 30, letterSpacing: '0.5em' }}
        whileInView={{ opacity: 1, y: 0, letterSpacing: '0.05em' }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="font-display text-4xl md:text-6xl font-black uppercase tracking-wider text-gradient-cyber"
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-4 font-mono text-sm text-cyber-neon/50 tracking-widest uppercase"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
