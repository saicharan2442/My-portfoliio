import { motion } from 'framer-motion';
import { useRef, type ReactNode } from 'react';

interface NeonButtonProps {
  children: ReactNode;
  onClick?: () => void;
  href?: string;
  variant?: 'cyan' | 'pink' | 'purple';
  icon?: ReactNode;
  className?: string;
}

const colorMap = {
  cyan: { border: 'rgba(0,240,255,0.6)', glow: 'rgba(0,240,255,0.5)', text: '#00f0ff' },
  pink: { border: 'rgba(255,43,214,0.6)', glow: 'rgba(255,43,214,0.5)', text: '#ff2bd6' },
  purple: { border: 'rgba(123,47,255,0.6)', glow: 'rgba(123,47,255,0.5)', text: '#a77bff' },
};

export default function NeonButton({
  children,
  onClick,
  href,
  variant = 'cyan',
  icon,
  className = '',
}: NeonButtonProps) {
  const ref = useRef<HTMLAnchorElement & HTMLButtonElement>(null);
  const c = colorMap[variant];

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    el.style.transform = `translate(${x * 0.2}px, ${y * 0.3}px)`;
  };
  const handleLeave = () => {
    if (ref.current) ref.current.style.transform = 'translate(0,0)';
  };

  const inner = (
    <motion.span
      ref={ref as never}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      whileTap={{ scale: 0.96 }}
      className={`relative inline-flex items-center gap-2 px-6 py-3 font-display font-semibold tracking-wider uppercase text-sm transition-all duration-300 ${className}`}
      style={{
        color: c.text,
        border: `1px solid ${c.border}`,
        background: `linear-gradient(135deg, rgba(0,0,0,0.4), rgba(0,0,0,0.1))`,
        boxShadow: `0 0 14px ${c.glow}, inset 0 0 14px ${c.glow.replace('0.5', '0.15')}`,
        clipPath:
          'polygon(8% 0, 100% 0, 100% 70%, 92% 100%, 0 100%, 0 30%)',
      }}
    >
      <span className="absolute left-2 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full" style={{ background: c.text, boxShadow: `0 0 8px ${c.text}` }} />
      {icon}
      {children}
    </motion.span>
  );

  if (href) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className="inline-block">
        {inner}
      </a>
    );
  }
  return (
    <button onClick={onClick} className="inline-block">
      {inner}
    </button>
  );
}
