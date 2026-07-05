import { motion } from 'framer-motion';
import { useMousePosition } from '../../hooks/useMousePosition';

export default function CursorGlow() {
  const { x, y } = useMousePosition();

  return (
    <>
      <motion.div
        className="fixed pointer-events-none z-[100] hidden md:block"
        style={{
          left: x,
          top: y,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <div className="w-6 h-6 rounded-full bg-cyber-neon shadow-neon" />
      </motion.div>
      <motion.div
        className="fixed pointer-events-none z-[99] hidden md:block"
        animate={{
          left: x,
          top: y,
        }}
        transition={{ type: 'spring', stiffness: 120, damping: 20, mass: 0.4 }}
        style={{
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <div className="w-72 h-72 rounded-full bg-cyber-neon/10 blur-3xl" />
      </motion.div>
    </>
  );
}
