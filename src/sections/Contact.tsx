import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Mail, Linkedin, Github, Phone, Send, MapPin, CheckCircle } from 'lucide-react';
import SectionTitle from '../components/ui/SectionTitle';
import NeonButton from '../components/ui/NeonButton';

const CONTACTS = [
  { icon: Mail, label: 'Email', value: 'saicharansada@gmail.com', href: 'mailto:saicharansada@gmail.com', color: '#00f0ff' },
  { icon: Phone, label: 'Phone', value: '+91 6300952442', href: 'tel:+916300952442', color: '#ff2bd6' },
  { icon: Linkedin, label: 'LinkedIn', value: 'linkedin.com/in/saicharan-sada', href: 'https://linkedin.com/in/saicharan-sada', color: '#1e8bff' },
  { icon: Github, label: 'GitHub', value: 'github.com/saicharan2442', href: 'https://github.com/saicharan2442', color: '#7b2fff' },
];

// Phases: 'idle' | 'redirecting' | 'thankyou'
type Phase = 'idle' | 'redirecting' | 'thankyou';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [phase, setPhase] = useState<Phase>('idle');
  const [senderName, setSenderName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const whatsappNumber = '916300952442';
    const message =
      `🚀 *New Message from Portfolio*\n` +
      `━━━━━━━━━━━━━━━━━━━━\n` +
      `👤 *Name:* ${form.name}\n` +
      `📧 *Email:* ${form.email}\n` +
      `━━━━━━━━━━━━━━━━━━━━\n` +
      `💬 *Message:*\n${form.message}\n` +
      `━━━━━━━━━━━━━━━━━━━━`;

    const encoded = encodeURIComponent(message);

    // Save name for thank-you screen
    setSenderName(form.name);

    // Phase 1: redirecting animation (2s)
    setPhase('redirecting');

    setTimeout(() => {
      // Open WhatsApp after 2s animation
      window.open(`https://wa.me/${whatsappNumber}?text=${encoded}`, '_blank');

      // Phase 2: thank-you screen
      setPhase('thankyou');

      // Reset after 20s
      setTimeout(() => {
        setPhase('idle');
        setForm({ name: '', email: '', message: '' });
      }, 20000);
    }, 2000);
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

        {/* RIGHT: form box */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="glass-strong hud-corner relative overflow-hidden min-h-[520px]"
        >
          <div className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-cyber-pink to-cyber-electric" />

          {/* ── FORM CONTAINER ── */}
          <AnimatePresence mode="wait">
            {phase === 'idle' && (
              <motion.form
                key="form"
                className="absolute inset-0 p-8"
                onSubmit={handleSubmit}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20, filter: 'blur(6px)' }}
                transition={{ duration: 0.4 }}
              >
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
                    Transmit
                  </NeonButton>
                </div>
              </motion.form>
            )}

            {phase === 'redirecting' && (
              <motion.div
                key="redirecting"
                className="absolute inset-0 flex flex-col items-center justify-center gap-6 p-8"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.35 }}
              >
                <div className="relative w-24 h-24 flex items-center justify-center">
                  <motion.div
                    className="absolute inset-0 rounded-full border-2 border-transparent"
                    style={{ borderTopColor: '#25d366', borderRightColor: '#25d36666' }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                  />
                  <motion.div
                    className="absolute inset-2 rounded-full border border-transparent"
                    style={{ borderBottomColor: '#25d366', borderLeftColor: '#25d36633' }}
                    animate={{ rotate: -360 }}
                    transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
                  />
                  <svg viewBox="0 0 24 24" className="w-10 h-10" fill="#25d366">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
                  </svg>
                </div>
                <div className="text-center space-y-2">
                  <motion.div className="font-display text-xl font-bold text-white tracking-wider" animate={{ opacity: [1, 0.5, 1] }} transition={{ duration: 0.8, repeat: Infinity }}>
                    REDIRECTING
                  </motion.div>
                  <div className="font-mono text-xs text-cyber-neon/60 tracking-widest">OPENING WHATSAPP...</div>
                  <div className="w-48 h-0.5 bg-white/10 rounded-full overflow-hidden mx-auto mt-3">
                    <motion.div className="h-full rounded-full" style={{ background: '#25d366' }} initial={{ width: '0%' }} animate={{ width: '100%' }} transition={{ duration: 2, ease: 'easeInOut' }} />
                  </div>
                </div>
              </motion.div>
            )}

            {phase === 'thankyou' && (
              <motion.div
                key="thankyou"
                className="absolute inset-0 flex flex-col items-center justify-center gap-5 p-8 text-center"
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, type: 'spring', bounce: 0.3 }}
              >
                <motion.div
                  initial={{ scale: 0, rotate: -30 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 18, delay: 0.1 }}
                  className="w-20 h-20 rounded-full flex items-center justify-center"
                  style={{ background: 'radial-gradient(circle, #25d36640 0%, transparent 70%)', border: '2px solid #25d366', boxShadow: '0 0 30px #25d36655' }}
                >
                  <CheckCircle className="w-10 h-10" style={{ color: '#25d366' }} />
                </motion.div>
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="space-y-2">
                  <div className="font-display text-2xl font-black uppercase text-white tracking-wider">
                    Thank You, <span style={{ color: '#00f0ff' }}>{senderName.split(' ')[0]}!</span>
                  </div>
                  <div className="font-mono text-xs text-cyber-neon/60 tracking-widest leading-relaxed">
                    YOUR MESSAGE HAS BEEN<br />TRANSMITTED SUCCESSFULLY
                  </div>
                </motion.div>
                <motion.div className="flex gap-2 mt-2">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <motion.span key={i} className="w-1.5 h-1.5 rounded-full" style={{ background: '#25d366' }} animate={{ opacity: [0, 1, 0], scaleY: [1, 2, 1] }} transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.12 }} />
                  ))}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
