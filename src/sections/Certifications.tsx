import { motion } from 'framer-motion';
import { Award, Cloud, BarChart3, Code2, Briefcase } from 'lucide-react';
import SectionTitle from '../components/ui/SectionTitle';

const CERTS = [
  { title: 'AWS Cloud Practitioner', issuer: 'Amazon Web Services', icon: Cloud, color: '#ff006e' },
  { title: 'IBM SPSS', issuer: 'IBM', icon: BarChart3, color: '#00f0ff' },
  { title: 'Web Development', issuer: 'IBM', icon: Code2, color: '#7b2fff' },
  { title: 'Power BI Certification', issuer: 'Microsoft', icon: BarChart3, color: '#00fff0' },
  { title: 'Workplace Proficiency', issuer: 'Professional', icon: Briefcase, color: '#ff2bd6' },
];

const LOOP = [...CERTS, ...CERTS];

export default function Certifications() {
  return (
    <section id="certifications" className="relative py-32 overflow-hidden">
      <SectionTitle index="05" title="Certifications" subtitle="// Verified Credentials" />

      <div className="relative">
        {/* edge fades */}
        <div className="absolute left-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-r from-cyber-void to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-l from-cyber-void to-transparent pointer-events-none" />

        <motion.div
          className="flex gap-6 w-max"
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        >
          {LOOP.map((c, i) => (
            <div
              key={i}
              className="glass hud-corner relative w-72 p-6 flex-shrink-0 group overflow-hidden"
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ boxShadow: `0 0 30px ${c.color}55` }}
              />
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center"
                  style={{ background: `${c.color}15`, border: `1px solid ${c.color}55` }}
                >
                  <c.icon className="w-6 h-6" style={{ color: c.color }} />
                </div>
                <Award className="w-5 h-5 ml-auto" style={{ color: c.color }} />
              </div>
              <h4 className="font-display text-base font-bold uppercase tracking-wide text-white mb-1">
                {c.title}
              </h4>
              <p className="font-mono text-xs" style={{ color: c.color }}>
                {c.issuer}
              </p>
              <div className="mt-4 h-px w-full bg-gradient-to-r from-transparent via-cyber-neon/30 to-transparent" />
              <div className="mt-3 font-mono text-[10px] text-cyber-neon/40 tracking-widest">
                VERIFIED // {String(i + 1).padStart(3, '0')}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
