import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { scrollToId } from '../hooks/useSmoothScroll';

interface HeroVideoIntroProps {
  onComplete: () => void;
  skipped: boolean;
}

export default function HeroVideoIntro({ onComplete, skipped }: HeroVideoIntroProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const titleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const finishedRef = useRef(false);
  const [show, setShow] = useState(true);
  const [booting, setBooting] = useState(true);
  const [showTitle, setShowTitle] = useState(false);

  // Boot sequence: show loading for 1.8s then reveal video
  useEffect(() => {
    const t = setTimeout(() => setBooting(false), 1800);
    return () => clearTimeout(t);
  }, []);

  // Show title 2s after video starts playing, then hide after 3 seconds
  const handleVideoPlay = () => {
    const t = setTimeout(() => {
      setShowTitle(true);
      const hideT = setTimeout(() => setShowTitle(false), 3000);
      return () => clearTimeout(hideT);
    }, 3000);
    // store timeout id to clean up if needed
    titleTimerRef.current = t;
  };

  const finish = () => {
    if (finishedRef.current) return;
    finishedRef.current = true;
    setShow(false);
    setTimeout(() => {
      onComplete();
      scrollToId('about');
    }, 900);
  };

  /**
   * Auto-play with audio trick:
   * 1. Start video MUTED  → browser allows autoplay
   * 2. Once play() resolves, immediately set muted = false
   * Browsers permit un-muting a video that is already playing programmatically.
   */
  const autoPlayWithAudio = async () => {
    const video = videoRef.current;
    if (!video || finishedRef.current) return;

    // Reset to beginning and ensure muted for initial play() call
    video.muted = true;
    video.volume = 1; // pre-set volume so unmute is at full volume

    try {
      await video.play();
      // ✅ play() succeeded — now unmute immediately (no user gesture needed)
      video.muted = false;
    } catch {
      // play() rejected even muted (very rare) — keep trying muted
      try {
        video.muted = true;
        await video.play();
      } catch {
        // nothing we can do, just wait for user interaction via safety fallback
      }
    }
  };

  // Start playback as soon as component mounts
  useEffect(() => {
    if (!show) return;
    void autoPlayWithAudio();
    return () => {
      if (titleTimerRef.current) clearTimeout(titleTimerRef.current);
    };
  }, [show]);

  // Also trigger on metadata loaded (handles slow network / preload)
  const handleMetadataLoaded = () => {
    void autoPlayWithAudio();
  };

  // Safety fallback: force finish after 22s (covers full 17s video + boot time)
  useEffect(() => {
    if (!show) return;
    const fallback = setTimeout(() => {
      if (!finishedRef.current) finish();
    }, 22000);
    return () => clearTimeout(fallback);
  }, [show]);

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
          {/* Boot sequence overlay */}
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

          {/* Video element — starts muted, auto-unmuted after play() resolves */}
          <video
            ref={videoRef}
            className="absolute inset-0 w-full h-full object-cover"
            playsInline
            preload="auto"
            muted
            onLoadedMetadata={handleMetadataLoaded}
            onCanPlay={handleMetadataLoaded}
            onPlay={handleVideoPlay}
            onEnded={finish}
            onError={finish}
          >
            <source src="/assets/intro-video.mp4" type="video/mp4" />
          </video>

          {/* Overlays */}
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
              <span>AI &amp; ML ENGINEER</span>
            </div>
            <div className="scanline" />
          </div>

          {/* Name title — appears after boot, disappears after 3 seconds automatically */}
          <AnimatePresence>
            {showTitle && (
              <motion.div
                className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20, filter: 'blur(8px)' }}
                transition={{ duration: 0.5 }}
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
