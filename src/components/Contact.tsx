import React, { useState } from 'react';
import { Mail, Phone, MapPin, Github, Copy, Check, Send, ArrowUpRight } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

export const Contact: React.FC = () => {
  const [copied, setCopied] = useState<string | null>(null);
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [formSent, setFormSent] = useState(false);

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    const mailtoUrl = `mailto:${PORTFOLIO_DATA.personal.email}?subject=${encodeURIComponent(
      `Portfolio Inquiry from ${formState.name}`
    )}&body=${encodeURIComponent(`From: ${formState.name} (${formState.email})\n\n${formState.message}`)}`;
    window.location.href = mailtoUrl;
    setFormSent(true);
  };

  return (
    <section id="contact" className="py-24 border-t border-white/[0.06] relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Direct Info & CTA */}
          <div className="lg:col-span-6 space-y-5 sm:space-y-6">
            <div>
              <div className="text-xs font-mono uppercase tracking-wider text-emerald-400 mb-2">
                Initiate Contact
              </div>
              <h2 className="text-2xl sm:text-4xl md:text-5xl font-display font-bold text-white tracking-tight leading-tight">
                Have an interesting system to build?
              </h2>
              <div className="text-xl sm:text-3xl md:text-4xl font-display font-bold text-emerald-400 mt-1 sm:mt-2">
                Let's make it.
              </div>
            </div>

            <p className="text-xs sm:text-sm md:text-base text-slate-300 leading-relaxed max-w-lg">
              Open to game development opportunities, gameplay engineering, reinforcement learning research, and ambitious systems software.
            </p>

            {/* Direct Contact Cards */}
            <div className="space-y-2.5 sm:space-y-3 pt-2">
              {/* Email */}
              <div className="p-3 sm:p-4 rounded-xl bg-[#090C13] border border-white/[0.06] flex items-center justify-between gap-3 group hover:border-white/[0.12] transition-colors">
                <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                  <div className="p-2 rounded-lg bg-white/[0.04] text-emerald-400 shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[10px] sm:text-[11px] font-mono text-slate-400 uppercase">Direct Email</div>
                    <a
                      href={`mailto:${PORTFOLIO_DATA.personal.email}`}
                      className="text-xs sm:text-sm font-mono text-white hover:text-emerald-400 transition-colors block truncate"
                    >
                      {PORTFOLIO_DATA.personal.email}
                    </a>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => copyToClipboard(PORTFOLIO_DATA.personal.email, 'email')}
                  className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.06] transition-colors shrink-0"
                  title="Copy email to clipboard"
                  aria-label="Copy email"
                >
                  {copied === 'email' ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* Phone */}
              <div className="p-3 sm:p-4 rounded-xl bg-[#090C13] border border-white/[0.06] flex items-center justify-between gap-3 group hover:border-white/[0.12] transition-colors">
                <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                  <div className="p-2 rounded-lg bg-white/[0.04] text-sky-400 shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[10px] sm:text-[11px] font-mono text-slate-400 uppercase">Phone & WhatsApp</div>
                    <a
                      href={`tel:${PORTFOLIO_DATA.personal.phone.replace(/[^0-9+]/g, '')}`}
                      className="text-xs sm:text-sm font-mono text-white hover:text-sky-400 transition-colors block truncate"
                    >
                      {PORTFOLIO_DATA.personal.phone}
                    </a>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => copyToClipboard(PORTFOLIO_DATA.personal.phone, 'phone')}
                  className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.06] transition-colors shrink-0"
                  title="Copy phone number"
                  aria-label="Copy phone"
                >
                  {copied === 'phone' ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* GitHub */}
              <div className="p-3 sm:p-4 rounded-xl bg-[#090C13] border border-white/[0.06] flex items-center justify-between gap-3 group hover:border-white/[0.12] transition-colors">
                <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                  <div className="p-2 rounded-lg bg-white/[0.04] text-white shrink-0">
                    <Github className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[10px] sm:text-[11px] font-mono text-slate-400 uppercase">GitHub Profile</div>
                    <a
                      href={PORTFOLIO_DATA.personal.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs sm:text-sm font-mono text-white hover:text-emerald-400 transition-colors block truncate"
                    >
                      github.com/{PORTFOLIO_DATA.personal.githubUsername}
                    </a>
                  </div>
                </div>

                <a
                  href={PORTFOLIO_DATA.personal.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.06] transition-colors shrink-0"
                  title="Open GitHub"
                  aria-label="Open GitHub profile"
                >
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>

              {/* Location */}
              <div className="p-3 sm:p-4 rounded-xl bg-[#090C13] border border-white/[0.06] flex items-center gap-2.5 sm:gap-3">
                <div className="p-2 rounded-lg bg-white/[0.04] text-purple-400 shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <div className="text-[10px] sm:text-[11px] font-mono text-slate-400 uppercase">Base Coordinates</div>
                  <div className="text-xs sm:text-sm font-mono text-slate-200 truncate">
                    {PORTFOLIO_DATA.personal.location}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Dispatch Direct Message */}
          <div className="lg:col-span-6 bg-[#090C13] border border-white/[0.08] rounded-2xl p-4 sm:p-6 md:p-8">
            <div className="flex items-center justify-between pb-4 border-b border-white/[0.06] mb-6">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-300">
                Direct Dispatch Terminal
              </span>
              <span className="text-[10px] font-mono text-emerald-400">
                Fast Response Rate
              </span>
            </div>

            {formSent ? (
              <div className="py-8 text-center space-y-3">
                <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center">
                  <Check className="w-5 h-5" />
                </div>
                <h4 className="text-lg font-display font-bold text-white">
                  Message Dispatched to Mail Client
                </h4>
                <p className="text-xs text-slate-400 max-w-sm mx-auto">
                  Your mail app opened with the formatted message to Mubasheer Shaikh. Alternatively, send directly to <strong className="text-white">mubasheershkh@gmail.com</strong>.
                </p>
                <button
                  type="button"
                  onClick={() => setFormSent(false)}
                  className="mt-4 px-4 py-2 text-xs font-mono rounded-lg bg-white/[0.05] text-slate-300 hover:text-white"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSendMessage} className="space-y-4">
                <div>
                  <label htmlFor="contact-name" className="block text-xs font-mono text-slate-400 mb-1.5">
                    Your Name or Studio
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    placeholder="e.g. Alex Morgan / Indie Game Studio"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#07090E] border border-white/[0.08] text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="contact-email" className="block text-xs font-mono text-slate-400 mb-1.5">
                    Your Email Address
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    placeholder="alex@gamestudio.com"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#07090E] border border-white/[0.08] text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="contact-message" className="block text-xs font-mono text-slate-400 mb-1.5">
                    System Requirements / Message
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    rows={4}
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    placeholder="Tell me about the game, AI system, or role you want to collaborate on..."
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#07090E] border border-white/[0.08] text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 px-4 rounded-lg bg-white text-black font-semibold text-xs uppercase tracking-wider hover:bg-slate-200 transition-all flex items-center justify-center gap-2 active:scale-[0.99] shadow-md shadow-white/5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Message Directly</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
