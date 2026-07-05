import { motion } from 'framer-motion';

interface GlitchTextProps {
  text: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'span' | 'p';
}

export default function GlitchText({ text, className = '', as = 'span' }: GlitchTextProps) {
  const Tag = motion[as];
  return (
    <Tag
      className={`relative inline-block ${className}`}
      data-text={text}
      style={{ position: 'relative' }}
    >
      {text}
      <span
        aria-hidden
        className="absolute inset-0 text-cyber-pink opacity-60 mix-blend-screen"
        style={{ clipPath: 'inset(0 0 60% 0)', transform: 'translate(-2px, -1px)' }}
      >
        {text}
      </span>
      <span
        aria-hidden
        className="absolute inset-0 text-cyber-neon opacity-60 mix-blend-screen"
        style={{ clipPath: 'inset(60% 0 0 0)', transform: 'translate(2px, 1px)' }}
      >
        {text}
      </span>
    </Tag>
  );
}
