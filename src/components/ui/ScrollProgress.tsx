import { motion } from 'framer-motion';
import { useScrollProgress } from '../../hooks/useScrollProgress';

export default function ScrollProgress() {
  const progress = useScrollProgress();
  return (
    <div className="fixed top-0 left-0 right-0 h-[3px] z-50 pointer-events-none">
      <div className="absolute inset-0 bg-cyber-void/50" />
      <motion.div
        className="h-full origin-left"
        style={{
          scaleX: progress,
          background: 'linear-gradient(90deg, #00f0ff, #7b2fff, #ff2bd6)',
          boxShadow: '0 0 12px rgba(0,240,255,0.7)',
        }}
      />
    </div>
  );
}
