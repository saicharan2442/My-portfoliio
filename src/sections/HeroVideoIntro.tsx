import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { scrollToId } from '../hooks/useSmoothScroll';

interface HeroVideoIntroProps {
  onComplete: () => void;
  skipped: boolean;
}

export default function HeroVideoIntro({ onComplete, skipped }: HeroVideoIntroProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const finishedRef = useRef(false);
  const [show, setShow] = useState(true);
  const [booting, setBooting] = useState(true);
  const [videoDuration] = useState(17000);

  useEffect(() => {
    const t = setTimeout(() => setBooting(false), 1800);
    return () => clearTimeout(t);
  }, []);

  const finish = () => {
    if (finishedRef.current) return;
    finishedRef.current = true;

    setShow(false);
    setTimeout(() => {
      onComplete();
      scrollToId('about');
    }, 900);
  };

  const startVideoPlayback = async () => {
    const video = videoRef.current;
    if (!video || finishedRef.current || !show) return;

    try {
      video.currentTime = 0;
      video.muted = false;
      video.volume = 1;
      await video.play();
    } catch {
      video.muted = true;
      video.volume = 0;
    }
  };

  useEffect(() => {
    if (!show) return;

    void startVideoPlayback();

    const handlePlayback = () => {
      const video = videoRef.current;
      if (video) {
        video.muted = false;
        video.volume = 1;
      }
      void startVideoPlayback();
    };

    window.addEventListener('click', handlePlayback, { passive: true, once: true });
    window.addEventListener('touchstart', handlePlayback, { passive: true, once: true });
    window.addEventListener('pointerdown', handlePlayback, { passive: true, once: true });
    window.addEventListener('keydown', handlePlayback, { once: true });

    return () => {
      window.removeEventListener('click', handlePlayback);
      window.removeEventListener('touchstart', handlePlayback);
      window.removeEventListener('pointerdown', handlePlayback);
      window.removeEventListener('keydown', handlePlayback);
    };
  }, [show]);

  useEffect(() => {
    if (!show) return;

    const fallback = setTimeout(() => {
      if (show) finish();
    }, videoDuration);

    return () => clearTimeout(fallback);
  }, [show, videoDuration]);

  if (skipped) return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[200] bg-cyber-void overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1, filter: 'blur(20px)' }}
          transition={{ duration: 0.9, ease: [0.7, 0, 0.84, 0] }}
        >
          {/* boot sequence */}
          <AnimatePresence>
            {booting && (
              <motion.div
                className="absolute inset-0 flex flex-col items-center justify-center font-mono text-cyber-neon z-30"
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-xs tracking-[0.4em] mb-6 text-cyber-neon/60"
                >
                  INITIALIZING AI.CORE
                </motion.div>
                <div className="w-64 h-1 bg-cyber-neon/10 overflow-hidden">
                  <motion.div
                    className="h-full bg-cyber-neon shadow-neon"
                    initial={{ width: '0%' }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 1.6, ease: 'easeInOut' }}
                  />
                </div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="mt-4 text-[10px] tracking-widest text-cyber-neon/40"
                >
                  LOADING NEURAL MATRIX...
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* video */}
          <video
            ref={videoRef}
            className="absolute inset-0 w-full h-full object-cover"
            autoPlay
            playsInline
            preload="auto"
            muted={false}
            onLoadedMetadata={() => {
              void startVideoPlayback();
            }}
            onEnded={finish}
            onError={finish}
            poster=""
          >
            <source src="/assets/intro-video.mp4" type="video/mp4" />
          </video>

          {/* overlays */}
          <div className="absolute inset-0 bg-gradient-to-b from-cyber-void/40 via-transparent to-cyber-void/80 pointer-events-none" />
          <div className="absolute inset-0 noise opacity-[0.04] pointer-events-none" />

          {/* HUD frame */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-8 left-8 right-8 flex justify-between font-mono text-[10px] text-cyber-neon/60 tracking-widest">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 bg-cyber-pink rounded-full animate-pulse" />
                REC // AI.SYSTEM.INTRO
              </span>
              <span>CH.01 // CINEMATIC</span>
            </div>
            <div className="absolute bottom-8 left-8 right-8 flex justify-between font-mono text-[10px] text-cyber-neon/60 tracking-widest">
              <span>SAICHARAN.SADA</span>
              <span>AI & ML ENGINEER</span>
            </div>

            {/* scanline */}
            <div className="scanline" />
          </div>

          {/* glitch title */}
          <AnimatePresence>
            {!booting && (
              <motion.div
                className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <h1
                  className="font-display text-5xl md:text-8xl font-black uppercase tracking-wider text-white text-center"
                  style={{ textShadow: '0 0 30px rgba(0,240,255,0.8), 0 0 60px rgba(123,47,255,0.5)' }}
                >
                  SAICHARAN
                </h1>
                <div className="mt-2 font-mono text-cyber-neon text-sm md:text-base tracking-[0.5em]">
                  SADA
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
