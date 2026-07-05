import { motion } from 'framer-motion';

export default function CyberGrid() {
  return (
    <div className="fixed inset-0 -z-20 pointer-events-none overflow-hidden">
      {/* base gradient */}
      <div className="absolute inset-0 bg-cyber-void" />
      <div className="absolute inset-0 bg-neon-radial" />

      {/* perspective grid floor */}
      <div className="absolute bottom-0 left-0 right-0 h-[60vh] [perspective:600px]">
        <motion.div
          className="absolute inset-0 origin-bottom bg-grid"
          style={{
            transform: 'rotateX(70deg)',
            maskImage: 'linear-gradient(to top, black 10%, transparent 80%)',
            WebkitMaskImage: 'linear-gradient(to top, black 10%, transparent 80%)',
          }}
          animate={{ backgroundPositionY: ['0px', '44px'] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
        />
      </div>

      {/* top grid */}
      <div className="absolute top-0 left-0 right-0 h-[40vh] opacity-30 [perspective:600px]">
        <div
          className="absolute inset-0 origin-top bg-grid"
          style={{
            transform: 'rotateX(-70deg)',
            maskImage: 'linear-gradient(to bottom, black 10%, transparent 80%)',
            WebkitMaskImage: 'linear-gradient(to bottom, black 10%, transparent 80%)',
          }}
        />
      </div>

      {/* vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,#02030a_95%)]" />
    </div>
  );
}
