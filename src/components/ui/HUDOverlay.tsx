import { motion } from 'framer-motion';

export default function HUDOverlay() {
  return (
    <div className="fixed inset-0 pointer-events-none z-40">
      {/* top bar */}
      <div className="absolute top-0 left-0 right-0 h-10 flex items-center justify-between px-6 font-mono text-[10px] text-cyber-neon/40 tracking-widest">
        <motion.div
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="flex items-center gap-2"
        >
          <span className="w-2 h-2 rounded-full bg-cyber-neon shadow-neon animate-pulse" />
          SYS.ONLINE
        </motion.div>
        <div className="hidden md:block">AI.CORE // v2.077</div>
        <div className="flex items-center gap-3">
          <span>LAT 17.38</span>
          <span>LON 78.48</span>
        </div>
      </div>

      {/* corner brackets */}
      <div className="absolute top-12 left-4 w-16 h-16 border-l-2 border-t-2 border-cyber-neon/30" />
      <div className="absolute top-12 right-4 w-16 h-16 border-r-2 border-t-2 border-cyber-neon/30" />
      <div className="absolute bottom-4 left-4 w-16 h-16 border-l-2 border-b-2 border-cyber-neon/30" />
      <div className="absolute bottom-4 right-4 w-16 h-16 border-r-2 border-b-2 border-cyber-neon/30" />

      {/* side ticks */}
      <div className="absolute left-2 top-1/2 -translate-y-1/2 flex flex-col gap-2">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="w-3 h-px bg-cyber-neon/30"
            style={{ width: i % 2 === 0 ? '14px' : '8px' }}
          />
        ))}
      </div>
      <div className="absolute right-2 top-1/2 -translate-y-1/2 flex flex-col gap-2">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="h-px bg-cyber-neon/30"
            style={{ width: i % 2 === 0 ? '14px' : '8px' }}
          />
        ))}
      </div>
    </div>
  );
}
