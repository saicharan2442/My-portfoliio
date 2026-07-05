import { motion } from 'framer-motion';
import { Building2, Calendar } from 'lucide-react';
import SectionTitle from '../components/ui/SectionTitle';

const EXPERIENCE = [
  {
    role: 'Agentic AI Flow Building',
    company: 'MicroGrid Inc.',
    period: '2024 — Present',
    desc: 'Designing and deploying agentic AI workflows with Langflow, MCP integrations, and multi-step reasoning pipelines for intelligent automation.',
    tags: ['Langflow', 'MCP', 'AI Agents', 'Automation'],
    color: '#00f0ff',
  },
  {
    role: 'AI & Python Full Stack Intern',
    company: 'ExcelR EdTech Pvt. Ltd.',
    period: '2023 — 2024',
    desc: 'Built full-stack AI applications with Python, Flask, and React. Developed ML model serving APIs and integrated predictive analytics into web platforms.',
    tags: ['Python', 'Flask', 'React', 'ML'],
    color: '#7b2fff',
  },
  {
    role: 'AWS Cloud Intern',
    company: 'Brainovision Pvt. Ltd.',
    period: '2023',
    desc: 'Provisioned and managed AWS infrastructure — EC2, S3, Lambda. Deployed containerized ML workloads and configured CI/CD pipelines on the cloud.',
    tags: ['AWS', 'EC2', 'S3', 'Lambda'],
    color: '#ff2bd6',
  },
  {
    role: 'Java Full Stack Intern',
    company: 'Blend Vidya EdTech Pvt. Ltd.',
    period: '2022 — 2023',
    desc: 'Developed Java-based full-stack web applications with Spring and front-end frameworks. Built RESTful services and database-driven modules.',
    tags: ['Java', 'Spring', 'REST', 'SQL'],
    color: '#00fff0',
  },
];

export default function Experience() {
  return (
    <section id="experience" className="relative py-32 px-6">
      <SectionTitle index="03" title="Experience" subtitle="// Career Timeline" />

      <div className="max-w-4xl mx-auto relative">
        {/* vertical line */}
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px -translate-x-1/2 bg-gradient-to-b from-cyber-neon via-cyber-electric to-cyber-pink opacity-40" />

        {EXPERIENCE.map((exp, i) => {
          const isLeft = i % 2 === 0;
          return (
            <motion.div
              key={exp.role}
              initial={{ opacity: 0, x: isLeft ? -60 : 60, y: 20 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className={`relative flex items-center mb-12 ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'}`}
            >
              {/* node */}
              <div className="absolute left-4 md:left-1/2 -translate-x-1/2 z-10">
                <motion.div
                  className="w-5 h-5 rounded-full"
                  style={{ background: exp.color, boxShadow: `0 0 16px ${exp.color}` }}
                  animate={{ scale: [1, 1.3, 1], opacity: [0.8, 1, 0.8] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                />
                <div className="absolute inset-0 rounded-full border-2 animate-ping" style={{ borderColor: exp.color }} />
              </div>

              {/* card */}
              <div className={`w-full md:w-[45%] pl-14 md:pl-0 ${isLeft ? 'md:pr-12' : 'md:pl-12'}`}>
                <motion.div
                  whileHover={{ y: -6, scale: 1.02 }}
                  className="glass hud-corner p-6 relative overflow-hidden"
                  style={{ boxShadow: `0 0 20px ${exp.color}22` }}
                >
                  <div
                    className="absolute top-0 left-0 w-1 h-full"
                    style={{ background: exp.color, boxShadow: `0 0 12px ${exp.color}` }}
                  />
                  <div className="flex items-center gap-2 mb-2 font-mono text-xs" style={{ color: exp.color }}>
                    <Calendar className="w-3 h-3" />
                    {exp.period}
                  </div>
                  <h4 className="font-display text-lg font-bold uppercase tracking-wide text-white mb-1">
                    {exp.role}
                  </h4>
                  <div className="flex items-center gap-2 text-cyber-neon/70 text-sm mb-3">
                    <Building2 className="w-3.5 h-3.5" />
                    {exp.company}
                  </div>
                  <p className="text-cyber-neon/60 text-sm leading-relaxed mb-4">{exp.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {exp.tags.map((t) => (
                      <span
                        key={t}
                        className="font-mono text-[10px] px-2 py-1 rounded tracking-wider"
                        style={{ background: `${exp.color}15`, color: exp.color, border: `1px solid ${exp.color}33` }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
