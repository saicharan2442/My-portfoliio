import { motion } from 'framer-motion';
import { useRef, useState } from 'react';
import { ExternalLink, Github, Heart, GraduationCap, Workflow, FlaskConical } from 'lucide-react';
import SectionTitle from '../components/ui/SectionTitle';

const PROJECTS = [
  {
    title: 'Heart Attack Prediction System',
    desc: 'ML-powered diagnostic system using clinical features to predict heart attack risk. Trained multiple classifiers with feature engineering and explainable AI outputs.',
    tags: ['Python', 'Scikit-learn', 'Flask', 'ML'],
    icon: Heart,
    color: '#ff006e',
    demo: '#',
    github: '#',
  },
  {
    title: 'College Department Management Website',
    desc: 'Full-stack web platform for managing department operations — student records, faculty, attendance, and academic workflows with role-based access.',
    tags: ['React', 'Flask', 'MongoDB', 'REST'],
    icon: GraduationCap,
    color: '#00f0ff',
    demo: '#',
    github: '#',
  },
  {
    title: 'AI Workflow Automation Projects',
    desc: 'Agentic AI workflows built with Langflow and MCP integrations — automating document processing, data pipelines, and multi-step reasoning tasks.',
    tags: ['Langflow', 'MCP', 'AI Agents', 'Automation'],
    icon: Workflow,
    color: '#7b2fff',
    demo: '#',
    github: '#',
  },
  {
    title: 'Flask + ML Applications',
    desc: 'Production-ready Flask applications serving ML models via REST APIs — inference endpoints, batch prediction, and real-time analytics dashboards.',
    tags: ['Flask', 'TensorFlow', 'REST', 'AWS'],
    icon: FlaskConical,
    color: '#00fff0',
    demo: '#',
    github: '#',
  },
];

function ProjectCard({ project, index }: { project: typeof PROJECTS[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: py * -10, y: px * 12 });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, delay: (index % 2) * 0.15 }}
      style={{ transformStyle: 'preserve-3d', transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)` }}
      className="glass hud-corner relative p-6 overflow-hidden group transition-transform duration-200"
    >
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ boxShadow: `0 0 40px ${project.color}55, inset 0 0 40px ${project.color}11` }}
      />
      {/* glow blob */}
      <div
        className="absolute -top-20 -right-20 w-40 h-40 rounded-full blur-3xl opacity-30 group-hover:opacity-60 transition-opacity"
        style={{ background: project.color }}
      />

      <div style={{ transform: 'translateZ(40px)' }}>
        <div
          className="w-14 h-14 rounded-xl flex items-center justify-center mb-5"
          style={{ background: `${project.color}15`, border: `1px solid ${project.color}55`, boxShadow: `0 0 16px ${project.color}33` }}
        >
          <project.icon className="w-7 h-7" style={{ color: project.color }} />
        </div>

        <h4 className="font-display text-xl font-bold uppercase tracking-wide text-white mb-3">
          {project.title}
        </h4>
        <p className="text-cyber-neon/60 text-sm leading-relaxed mb-5">{project.desc}</p>

        <div className="flex flex-wrap gap-2 mb-6">
          {project.tags.map((t) => (
            <span
              key={t}
              className="font-mono text-[10px] px-2 py-1 rounded tracking-wider"
              style={{ background: `${project.color}12`, color: project.color, border: `1px solid ${project.color}33` }}
            >
              {t}
            </span>
          ))}
        </div>

        <div className="flex gap-3">
          <a
            href={project.demo}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 px-4 py-2 font-mono text-xs uppercase tracking-wider transition-all hover:scale-105"
            style={{ color: project.color, border: `1px solid ${project.color}66`, boxShadow: `0 0 10px ${project.color}33` }}
          >
            <ExternalLink className="w-3.5 h-3.5" /> Live Demo
          </a>
          <a
            href={project.github}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 px-4 py-2 font-mono text-xs uppercase tracking-wider text-cyber-neon/70 border border-cyber-neon/30 hover:text-cyber-neon transition-all hover:scale-105"
          >
            <Github className="w-3.5 h-3.5" /> Code
          </a>
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="relative py-32 px-6">
      <SectionTitle index="04" title="Projects" subtitle="// Deployed Systems" />
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-6">
        {PROJECTS.map((p, i) => (
          <ProjectCard key={p.title} project={p} index={i} />
        ))}
      </div>
    </section>
  );
}
