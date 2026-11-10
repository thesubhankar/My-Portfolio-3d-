import React, { useState, useRef, useEffect } from 'react';
import SectionTitle from '../components/SectionTitle';
import Button from '../components/Button';
import { portfolioData } from '../data/navigation';
import { api } from '../services/api';
import { animateSectionReveal } from '../animations/gsapAnimations';
import { 
  HiOutlineMail, 
  HiOutlinePhone, 
  HiOutlineLocationMarker, 
  HiOutlineClipboardCopy, 
  HiOutlineCheck,
  HiOutlinePaperAirplane 
} from 'react-icons/hi';
import { FaGithub, FaLinkedinIn, FaKaggle } from 'react-icons/fa';

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const sectionRef = useRef(null);
  const formRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const header = sectionRef.current.querySelector('.section-header');
    const cols = sectionRef.current.querySelectorAll('.contact-col');
    animateSectionReveal(sectionRef.current, header, Array.from(cols));
  }, []);

  const handleCopy = (text, type) => {
    navigator.clipboard.writeText(text);
    if (type === 'email') {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } else {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setStatus({ type: 'error', message: 'Please fill in all required fields.' });
      return;
    }

    setSending(true);
    setStatus({ type: '', message: '' });

    try {
      await api.sendContactMessage(form);
      setStatus({ type: 'success', message: 'Message transmitted successfully! Subhankar will get back to you soon.' });
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      console.error('Contact submit error:', err);
      setStatus({ 
        type: 'error', 
        message: 'Could not send message automatically. Please reach out directly at ' + portfolioData.email 
      });
    } finally {
      setSending(false);
    }
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-20 px-4 sm:px-8 lg:px-12 border-t border-slate-900 bg-dark-950/60"
    >
      <div className="max-w-6xl mx-auto">
        <SectionTitle
          number="11"
          title="Get In Touch & Collaborate"
          subtitle="Whether you have an opportunity, a data science project, or simply want to connect on analytics architectures — my inbox is open."
          comment="contact.send_message(to='thesubhankar.giri992@gmail.com')"
        />

        {/* 2 Columns: Contact Details on Left, Interactive Form on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start my-6">
          {/* Left Column: Direct Info */}
          <div className="contact-col lg:col-span-5 space-y-6">
            <div className="p-6 rounded-2xl bg-dark-900/80 border border-slate-800/80 space-y-5">
              <h3 className="font-mono text-base font-bold text-white flex items-center gap-2">
                <span>Let's Build Something Impactful</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
                Open to full-time roles, data science internships, and freelance analytical contracts. Let's discuss how data-driven modeling can empower your business objectives.
              </p>

              {/* Direct Reach Out Cards */}
              <div className="space-y-3 font-mono text-xs">
                {/* Email */}
                <div className="p-3 rounded-xl bg-dark-800/90 border border-slate-700/60 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <HiOutlineMail className="text-neon-pink text-base shrink-0" />
                    <div>
                      <span className="block text-[10px] text-slate-500">EMAIL</span>
                      <a href={`mailto:${portfolioData.email}`} className="text-white hover:text-neon-cyan transition-colors">
                        {portfolioData.email}
                      </a>
                    </div>
                  </div>
                  <button
                    onClick={() => handleCopy(portfolioData.email, 'email')}
                    className="p-1.5 rounded bg-dark-900 text-slate-400 hover:text-white"
                    title="Copy Email"
                  >
                    {copiedEmail ? <HiOutlineCheck className="text-emerald-400" /> : <HiOutlineClipboardCopy />}
                  </button>
                </div>

                {/* Phone */}
                <div className="p-3 rounded-xl bg-dark-800/90 border border-slate-700/60 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <HiOutlinePhone className="text-neon-cyan text-base shrink-0" />
                    <div>
                      <span className="block text-[10px] text-slate-500">PHONE</span>
                      <a href={`tel:${portfolioData.phone}`} className="text-white hover:text-neon-cyan transition-colors">
                        {portfolioData.phone}
                      </a>
                    </div>
                  </div>
                  <button
                    onClick={() => handleCopy(portfolioData.phone, 'phone')}
                    className="p-1.5 rounded bg-dark-900 text-slate-400 hover:text-white"
                    title="Copy Phone"
                  >
                    {copiedPhone ? <HiOutlineCheck className="text-emerald-400" /> : <HiOutlineClipboardCopy />}
                  </button>
                </div>

                {/* Location */}
                <div className="p-3 rounded-xl bg-dark-800/90 border border-slate-700/60 flex items-center gap-3">
                  <HiOutlineLocationMarker className="text-neon-purple text-base shrink-0" />
                  <div>
                    <span className="block text-[10px] text-slate-500">LOCATION</span>
                    <span className="text-white">{portfolioData.location}</span>
                  </div>
                </div>
              </div>

              {/* Social Channels */}
              <div className="pt-2 border-t border-slate-800/80">
                <span className="block font-mono text-[11px] text-slate-400 mb-2">
                  Social Channels:
                </span>
                <div className="flex items-center gap-2.5">
                  <a
                    href="https://github.com/thesubhankar"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-lg bg-dark-800 border border-slate-700 text-slate-300 hover:text-white hover:border-neon-cyan transition-colors"
                  >
                    <FaGithub className="text-sm" />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/subhankar-giri-2a4b0a295"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-lg bg-dark-800 border border-slate-700 text-slate-300 hover:text-[#0077b5] hover:border-[#0077b5] transition-colors"
                  >
                    <FaLinkedinIn className="text-sm" />
                  </a>
                  <a
                    href="https://www.kaggle.com/thesubhankar"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-lg bg-dark-800 border border-slate-700 text-slate-300 hover:text-[#20beff] hover:border-[#20beff] transition-colors"
                  >
                    <FaKaggle className="text-sm" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="contact-col lg:col-span-7">
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="p-6 sm:p-8 rounded-2xl bg-dark-900/90 border border-slate-800/90 space-y-4"
            >
              <h3 className="font-mono text-base font-bold text-white mb-2">
                Send a Message
              </h3>

              {status.message && (
                <div
                  className={`p-3 rounded-xl font-mono text-xs border ${
                    status.type === 'success'
                      ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                      : 'bg-red-500/10 border-red-500/30 text-red-300'
                  }`}
                >
                  {status.message}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5 font-mono text-xs">
                  <label className="text-slate-400">Your Name *</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="e.g. Alex Miller"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-dark-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan"
                  />
                </div>

                <div className="space-y-1.5 font-mono text-xs">
                  <label className="text-slate-400">Your Email *</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="alex@company.com"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-dark-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan"
                  />
                </div>
              </div>

              <div className="space-y-1.5 font-mono text-xs">
                <label className="text-slate-400">Subject</label>
                <input
                  type="text"
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  placeholder="Data Science Role / Project Collaboration"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-dark-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan"
                />
              </div>

              <div className="space-y-1.5 font-mono text-xs">
                <label className="text-slate-400">Message *</label>
                <textarea
                  required
                  rows={4}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Describe your requirements, timeline, or position details..."
                  className="w-full px-3.5 py-2.5 rounded-lg bg-dark-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan"
                />
              </div>

              <Button
                variant="primary"
                size="md"
                onClick={handleSubmit}
                icon={HiOutlinePaperAirplane}
                className="w-full sm:w-auto"
                disabled={sending}
              >
                {sending ? 'Transmitting Data...' : 'Send Message'}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
