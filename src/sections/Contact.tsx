import { motion } from 'framer-motion';
import { useState } from 'react';
import { Mail, Linkedin, Github, Phone, Send, MapPin } from 'lucide-react';
import SectionTitle from '../components/ui/SectionTitle';
import NeonButton from '../components/ui/NeonButton';

const CONTACTS = [
  { icon: Mail, label: 'Email', value: 'saicharan.sada@example.com', href: 'mailto:saicharan.sada@example.com', color: '#00f0ff' },
  { icon: Phone, label: 'Phone', value: '+91 6300952442', href: 'tel:+916300952442', color: '#ff2bd6' },
  { icon: Linkedin, label: 'LinkedIn', value: 'saicharan-sada', href: 'https://linkedin.com/in/saicharan', color: '#1e8bff' },
  { icon: Github, label: 'GitHub', value: 'saicharan', href: 'https://github.com/saicharan', color: '#7b2fff' },
];

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setForm({ name: '', email: '', message: '' });
    }, 3000);
  };

  return (
    <section id="contact" className="relative py-32 px-6">
      <SectionTitle index="06" title="Contact" subtitle="// Establish Connection" />

      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8">
        {/* LEFT: contact info HUD */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="glass-strong hud-corner p-8 relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-cyber-neon to-cyber-pink" />
          <div className="font-mono text-xs text-cyber-neon/60 tracking-[0.3em] mb-2">
            // COMMS.CHANNEL
          </div>
          <h3 className="font-display text-2xl font-bold uppercase text-white mb-6">
            Open a Channel
          </h3>

          <div className="space-y-4">
            {CONTACTS.map((c, i) => (
              <motion.a
                key={c.label}
                href={c.href}
                target={c.href.startsWith('http') ? '_blank' : undefined}
                rel="noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ x: 8 }}
                className="flex items-center gap-4 p-4 glass hud-corner group transition-all"
                style={{ boxShadow: `0 0 14px ${c.color}22` }}
              >
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: `${c.color}15`, border: `1px solid ${c.color}55` }}
                >
                  <c.icon className="w-5 h-5" style={{ color: c.color }} />
                </div>
                <div className="min-w-0">
                  <div className="font-mono text-[10px] tracking-widest" style={{ color: c.color }}>
                    {c.label.toUpperCase()}
                  </div>
                  <div className="text-white text-sm truncate">{c.value}</div>
                </div>
              </motion.a>
            ))}
          </div>

          <div className="mt-6 flex items-center gap-2 font-mono text-[10px] text-cyber-neon/40 tracking-widest">
            <MapPin className="w-3 h-3" />
            LOCATION: INDIA // UTC+5:30
          </div>
        </motion.div>

        {/* RIGHT: form */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="glass-strong hud-corner p-8 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-cyber-pink to-cyber-electric" />
          <div className="font-mono text-xs text-cyber-pink/60 tracking-[0.3em] mb-2">
            // TRANSMIT.MESSAGE
          </div>
          <h3 className="font-display text-2xl font-bold uppercase text-white mb-6">
            Send Transmission
          </h3>

          <div className="space-y-5">
            <div className="relative group">
              <input
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder=" "
                className="w-full bg-cyber-void/60 border border-cyber-neon/30 px-4 pt-5 pb-2 text-white outline-none focus:border-cyber-neon transition-colors peer"
                style={{ clipPath: 'polygon(0 0, 100% 0, 100% 70%, 96% 100%, 0 100%)' }}
              />
              <label className="absolute left-4 top-3.5 font-mono text-xs text-cyber-neon/50 tracking-widest uppercase pointer-events-none peer-focus:text-cyber-neon transition-colors">
                Operator Name
              </label>
            </div>

            <div className="relative group">
              <input
                required
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder=" "
                className="w-full bg-cyber-void/60 border border-cyber-neon/30 px-4 pt-5 pb-2 text-white outline-none focus:border-cyber-neon transition-colors peer"
                style={{ clipPath: 'polygon(0 0, 100% 0, 100% 70%, 96% 100%, 0 100%)' }}
              />
              <label className="absolute left-4 top-3.5 font-mono text-xs text-cyber-neon/50 tracking-widest uppercase pointer-events-none peer-focus:text-cyber-neon transition-colors">
                Comms Address
              </label>
            </div>

            <div className="relative group">
              <textarea
                required
                rows={4}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder=" "
                className="w-full bg-cyber-void/60 border border-cyber-neon/30 px-4 pt-5 pb-2 text-white outline-none focus:border-cyber-neon transition-colors peer resize-none"
              />
              <label className="absolute left-4 top-3.5 font-mono text-xs text-cyber-neon/50 tracking-widest uppercase pointer-events-none peer-focus:text-cyber-neon transition-colors">
                Message Payload
              </label>
            </div>

            <NeonButton variant="pink" icon={<Send className="w-4 h-4" />}>
              {sent ? 'Transmission Sent' : 'Transmit'}
            </NeonButton>
          </div>
        </motion.form>
      </div>
    </section>
  );
}
