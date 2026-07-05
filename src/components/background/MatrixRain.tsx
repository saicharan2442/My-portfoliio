import { useEffect, useRef } from 'react';

export default function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let raf = 0;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const fontSize = 14;
    let columns = Math.floor(width / fontSize);
    let drops: number[] = new Array(columns).fill(1).map(() => Math.random() * -50);

    const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノ0123456789ABCDEF<>/[]{}=+*';

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      columns = Math.floor(width / fontSize);
      drops = new Array(columns).fill(1).map(() => Math.random() * -50);
    };
    window.addEventListener('resize', handleResize);

    let last = 0;
    const draw = (time: number) => {
      raf = requestAnimationFrame(draw);
      if (time - last < 60) return;
      last = time;

      ctx.fillStyle = 'rgba(2, 3, 10, 0.12)';
      ctx.fillRect(0, 0, width, height);
      ctx.font = `${fontSize}px "JetBrains Mono", monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;
        const grad = ctx.createLinearGradient(x, y - fontSize * 4, x, y);
        grad.addColorStop(0, 'rgba(0,240,255,0)');
        grad.addColorStop(1, 'rgba(0,240,255,0.9)');
        ctx.fillStyle = grad;
        ctx.fillText(text, x, y);

        if (y > height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }
    };
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-15 pointer-events-none opacity-[0.18]"
      style={{ zIndex: -15 }}
    />
  );
}
