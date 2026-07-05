import { motion, useInView } from 'framer-motion';
import { useRef, type ReactNode } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  glow?: 'cyan' | 'pink' | 'purple';
  delay?: number;
}

const glowMap = {
  cyan: 'rgba(0,240,255,0.4)',
  pink: 'rgba(255,43,214,0.4)',
  purple: 'rgba(123,47,255,0.4)',
};

export default function GlassCard({ children, className = '', glow = 'cyan', delay = 0 }: GlassCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, scale: 0.97 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6 }}
      className={`glass hud-corner relative overflow-hidden ${className}`}
      style={{ '--glow': glowMap[glow] } as React.CSSProperties}
    >
      <div
        className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ boxShadow: `0 0 30px ${glowMap[glow]}, inset 0 0 30px ${glowMap[glow].replace('0.4', '0.08')}` }}
      />
      {children}
    </motion.div>
  );
}
