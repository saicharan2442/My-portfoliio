import { useRef, useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { scrollToId } from "../hooks/useSmoothScroll";

// ---------------------------------------------------------------------------
// The definitive Chrome fix: play() is called directly inside a user-gesture
// handler (button click). Chrome ALWAYS allows media playback triggered by a
// real click event — no autoplay policy, no CORS complication, no lag.
// ---------------------------------------------------------------------------

const VIDEO_URL =
  "/assets/intro-video.mp4";

interface HeroVideoIntroProps {
  onComplete: () => void;
  skipped: boolean;
}

export default function HeroVideoIntro({ onComplete, skipped }: HeroVideoIntroProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const finishedRef = useRef(false);

  // "idle"    → splash screen with button
  // "playing" → video is running
  // "done"    → fade out
  const [phase, setPhase] = useState<"idle" | "playing" | "done">("idle");
  const [showTitle, setShowTitle] = useState(false);
  const [cursor, setCursor] = useState({ x: -100, y: -100 });
  const [cursorHover, setCursorHover] = useState(false);

  // Dynamic current year
  const currentYear = new Date().getFullYear();

  // Track mouse position for custom cursor during splash
  useEffect(() => {
    if (phase !== "idle") return;
    const move = (e: MouseEvent) => setCursor({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [phase]);

  const finish = useCallback(() => {
    if (finishedRef.current) return;
    finishedRef.current = true;
    setPhase("done");
    setTimeout(() => { onComplete(); scrollToId("about"); }, 900);
  }, [onComplete]);

  // ── Called directly by button click (guaranteed user gesture) ─────────────
  const handleExploreClick = useCallback(async () => {
    const v = videoRef.current;
    if (!v || finishedRef.current) return;

    // Switch UI to video phase immediately so video element is visible
    setPhase("playing");

    // Small rAF delay to let React paint the video element before play()
    requestAnimationFrame(async () => {
      v.src = VIDEO_URL;
      v.preload = "auto";
      v.muted = false; // user gestured — unmuted playback is allowed
      v.volume = 1;

      try {
        await v.load();
      } catch { /* load() doesn't return a real promise in all browsers */ }

      try {
        await v.play();
      } catch {
        // Extremely unlikely after a real click — but muted fallback just in case
        v.muted = true;
        try { await v.play(); } catch { finish(); }
      }

      // Show name overlay 3 s after playback starts
      setTimeout(() => {
        setShowTitle(true);
        setTimeout(() => setShowTitle(false), 3000);
      }, 3000);
    });
  }, [finish]);

  if (skipped) return null;

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          className="fixed inset-0 z-[200] bg-cyber-void overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05, filter: "blur(20px)" }}
          transition={{ duration: 0.9, ease: [0.7, 0, 0.84, 0] }}
        >
          {/* ── Hidden video element (always mounted, src set on click) ─── */}
          <video
            ref={videoRef}
            className="absolute inset-0 w-full h-full object-cover"
            playsInline
            preload="none"
            style={{ opacity: phase === "playing" ? 1 : 0 }}
            onEnded={finish}
            onError={finish}
          />

          {/* ── Overlays (always visible over the video) ───────────────── */}
          <div className="absolute inset-0 bg-gradient-to-b from-cyber-void/40 via-transparent to-cyber-void/80 pointer-events-none" />
          <div className="absolute inset-0 noise opacity-[0.04] pointer-events-none" />

          {/* ── Splash screen (idle phase only) ───────────────────────── */}
          <AnimatePresence>
            {phase === "idle" && (
              <motion.div
                key="splash"
                className="absolute inset-0 flex flex-col items-center justify-center z-20"
                style={{ cursor: "none" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.5 }}
              >
                {/* Ambient glow rings */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-[600px] h-[600px] rounded-full border border-cyber-neon/5 animate-ping" style={{ animationDuration: "3s" }} />
                  <div className="absolute w-[400px] h-[400px] rounded-full border border-cyber-pink/5 animate-ping" style={{ animationDuration: "4.5s", animationDelay: "0.5s" }} />
                  <div className="absolute w-[200px] h-[200px] rounded-full border border-cyber-neon/10 animate-ping" style={{ animationDuration: "2s", animationDelay: "1s" }} />
                </div>

                {/* Logo / Name */}
                <motion.div
                  className="text-center mb-12 z-10"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.7 }}
                >
                  <div className="font-mono text-[10px] tracking-[0.6em] text-cyber-neon/50 mb-3">
                    PORTFOLIO // {currentYear}
                  </div>
                  <h1
                    className="font-display text-6xl md:text-9xl font-black uppercase tracking-widest text-white"
                    style={{ textShadow: "0 0 40px rgba(0,240,255,0.6), 0 0 80px rgba(123,47,255,0.35)" }}
                  >
                    SAICHARAN
                  </h1>
                  <div className="mt-2 font-mono text-cyber-neon text-lg tracking-[0.8em]">
                    SADA
                  </div>
                  <div className="mt-3 font-mono text-[11px] tracking-[0.35em] text-white/40">
                    AI &amp; ML ENGINEER
                  </div>
                </motion.div>

                {/* CTA Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.55, duration: 0.6 }}
                  className="z-10"
                >
                  <button
                    id="explore-btn"
                    onClick={handleExploreClick}
                    onMouseEnter={() => setCursorHover(true)}
                    onMouseLeave={() => setCursorHover(false)}
                    className="group relative px-10 py-4 font-mono text-sm tracking-[0.3em] uppercase text-cyber-void font-bold overflow-hidden rounded-sm"
                    style={{ background: "transparent", cursor: "none" }}
                  >
                    {/* Animated border */}
                    <span
                      className="absolute inset-0 rounded-sm"
                      style={{
                        background: "linear-gradient(90deg, #00f0ff, #7b2fff, #ff2d78, #00f0ff)",
                        backgroundSize: "300% 100%",
                        animation: "borderSlide 3s linear infinite",
                        padding: "1.5px",
                      }}
                    >
                      <span
                        className="absolute inset-[1.5px] rounded-sm"
                        style={{ background: "#04050a" }}
                      />
                    </span>

                    {/* Fill on hover */}
                    <span
                      className="absolute inset-0 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{
                        background: "linear-gradient(135deg, rgba(0,240,255,0.15), rgba(123,47,255,0.15))",
                      }}
                    />

                    {/* Text */}
                    <span
                      className="relative z-10 bg-clip-text text-transparent group-hover:opacity-90 transition-all duration-300"
                      style={{
                        backgroundImage: "linear-gradient(90deg, #00f0ff, #7b2fff)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                      }}
                    >
                      ▶&nbsp;&nbsp;Let&apos;s Explore Him
                    </span>

                    {/* Glow on hover */}
                    <span className="absolute inset-0 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-md"
                      style={{ background: "linear-gradient(135deg, rgba(0,240,255,0.2), rgba(123,47,255,0.2))" }}
                    />
                  </button>

                  {/* Sub-hint */}
                  <motion.p
                    className="mt-5 text-center font-mono text-[9px] tracking-[0.3em] text-white/20"
                    animate={{ opacity: [0.2, 0.5, 0.2] }}
                    transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
                  >
                    CLICK TO BEGIN THE EXPERIENCE
                  </motion.p>
                </motion.div>

                {/* ── Custom neon cursor (splash phase only) ───────────── */}
                <div
                  className="pointer-events-none fixed z-[999]"
                  style={{
                    left: cursor.x,
                    top: cursor.y,
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  {/* Outer ring — expands on hover */}
                  <motion.div
                    animate={{
                      width: cursorHover ? 52 : 32,
                      height: cursorHover ? 52 : 32,
                      borderColor: cursorHover ? "rgba(255,43,214,0.9)" : "rgba(0,240,255,0.7)",
                      boxShadow: cursorHover
                        ? "0 0 16px rgba(255,43,214,0.6), 0 0 32px rgba(255,43,214,0.3)"
                        : "0 0 10px rgba(0,240,255,0.5), 0 0 20px rgba(0,240,255,0.2)",
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 22 }}
                    style={{
                      borderRadius: "50%",
                      border: "1.5px solid rgba(0,240,255,0.7)",
                      position: "absolute",
                      transform: "translate(-50%, -50%)",
                    }}
                  />

                  {/* Crosshair lines */}
                  <motion.div
                    animate={{ opacity: cursorHover ? 0.4 : 0.6, scale: cursorHover ? 1.3 : 1 }}
                    transition={{ duration: 0.2 }}
                    style={{ position: "absolute", transform: "translate(-50%, -50%)" }}
                  >
                    {/* Horizontal */}
                    <div style={{
                      position: "absolute",
                      width: cursorHover ? 18 : 12,
                      height: 1,
                      background: cursorHover ? "rgba(255,43,214,0.8)" : "rgba(0,240,255,0.8)",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      transition: "all 0.2s",
                    }} />
                    {/* Vertical */}
                    <div style={{
                      position: "absolute",
                      width: 1,
                      height: cursorHover ? 18 : 12,
                      background: cursorHover ? "rgba(255,43,214,0.8)" : "rgba(0,240,255,0.8)",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      transition: "all 0.2s",
                    }} />
                  </motion.div>

                  {/* Inner dot */}
                  <motion.div
                    animate={{
                      width: cursorHover ? 5 : 3,
                      height: cursorHover ? 5 : 3,
                      background: cursorHover ? "#ff2bd6" : "#00f0ff",
                      boxShadow: cursorHover
                        ? "0 0 8px #ff2bd6, 0 0 16px #ff2bd6"
                        : "0 0 6px #00f0ff, 0 0 12px #00f0ff",
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                    style={{
                      borderRadius: "50%",
                      position: "absolute",
                      transform: "translate(-50%, -50%)",
                    }}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>


          {/* ── HUD (shown during playing phase) ─────────────────────── */}
          {phase === "playing" && (
            <div className="absolute inset-0 pointer-events-none z-10">
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
          )}

          {/* ── Name title overlay (mid-video) ───────────────────────── */}
          <AnimatePresence>
            {showTitle && (
              <motion.div
                className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20, filter: "blur(8px)" }}
                transition={{ duration: 0.5 }}
              >
                <h2
                  className="font-display text-5xl md:text-8xl font-black uppercase tracking-wider text-white text-center"
                  style={{ textShadow: "0 0 30px rgba(0,240,255,0.8), 0 0 60px rgba(123,47,255,0.5)" }}
                >
                  SAICHARAN
                </h2>
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
