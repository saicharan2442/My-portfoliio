import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import {
  Brain, Cpu, Code2, Database, Cloud, Workflow,
  Server, Globe, Layers, FlaskConical, Network,
} from 'lucide-react';
import SectionTitle from '../components/ui/SectionTitle';

const SKILLS = [
  { name: 'Python', level: 95, icon: Code2, color: '#00f0ff' },
  { name: 'Machine Learning', level: 90, icon: Brain, color: '#7b2fff' },
  { name: 'TensorFlow', level: 85, icon: Cpu, color: '#ff2bd6' },
  { name: 'Scikit-learn', level: 88, icon: Brain, color: '#00fff0' },
  { name: 'Flask', level: 90, icon: FlaskConical, color: '#1e8bff' },
  { name: 'React.js', level: 85, icon: Globe, color: '#00f0ff' },
  { name: 'JavaScript', level: 88, icon: Code2, color: '#ffd166' },
  { name: 'AWS', level: 82, icon: Cloud, color: '#ff006e' },
  { name: 'Langflow', level: 80, icon: Workflow, color: '#7b2fff' },
  { name: 'MCP Integration', level: 85, icon: Network, color: '#ff2bd6' },
  { name: 'MongoDB', level: 85, icon: Database, color: '#00fff0' },
  { name: 'SQLite', level: 88, icon: Database, color: '#1e8bff' },
  { name: 'REST APIs', level: 90, icon: Server, color: '#00f0ff' },
  { name: 'Full Stack Dev', level: 87, icon: Layers, color: '#7b2fff' },
];

function SkillCard({ skill, index }: { skill: typeof SKILLS[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30, rotateX: -10 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: (index % 7) * 0.08 }}
      whileHover={{ y: -8, scale: 1.03 }}
      className="glass hud-corner relative p-5 group overflow-hidden"
      style={{ '--glow': skill.color } as React.CSSProperties}
    >
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ boxShadow: `0 0 30px ${skill.color}66, inset 0 0 30px ${skill.color}22` }}
      />
      <div className="flex items-center justify-between mb-4">
        <div
          className="w-11 h-11 rounded-lg flex items-center justify-center"
          style={{ background: `${skill.color}15`, border: `1px solid ${skill.color}55` }}
        >
          <skill.icon className="w-5 h-5" style={{ color: skill.color }} />
        </div>
        <span className="font-mono text-xs" style={{ color: skill.color }}>
          {skill.level}%
        </span>
      </div>
      <h4 className="font-display text-sm font-bold uppercase tracking-wider text-white mb-3">
        {skill.name}
      </h4>
      <div className="h-1.5 bg-cyber-void rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ background: `linear-gradient(90deg, ${skill.color}, ${skill.color}88)`, boxShadow: `0 0 8px ${skill.color}` }}
          initial={{ width: 0 }}
          animate={inView ? { width: `${skill.level}%` } : {}}
          transition={{ duration: 1.2, delay: 0.3 + (index % 7) * 0.08, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </motion.div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="relative py-32 px-6">
      <SectionTitle index="02" title="Skills" subtitle="// Capability Matrix" />
      <div className="max-w-7xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {SKILLS.map((s, i) => (
          <SkillCard key={s.name} skill={s} index={i} />
        ))}
      </div>
    </section>
  );
}
