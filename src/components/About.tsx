import React from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { Code2, Sparkles, Orbit, Terminal } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <section id="about" className="py-16 sm:py-24 border-t border-white/[0.06] relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Section Kicker / Left Column */}
          <div className="lg:col-span-4">
            <div className="text-xs font-mono uppercase tracking-wider text-emerald-400 mb-2">
              Engineering Philosophy
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-white tracking-tight text-balance">
              Where games and intelligent systems intersect.
            </h2>
            <p className="mt-3 sm:mt-4 text-xs sm:text-sm text-slate-400 leading-relaxed">
              I treat game development not just as entertainment, but as the ultimate sandbox for testing adaptive autonomous systems, physics constraints, and real-time state machines.
            </p>

            {/* Quick Facts */}
            <div className="mt-6 sm:mt-8 space-y-2.5 sm:space-y-3 font-mono text-[11px] sm:text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <span className="text-emerald-400">›</span>
                <span>Focus: <strong className="text-white">Game Development × AI/ML</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-emerald-400">›</span>
                <span>Primary Engine: <strong className="text-white">Unity (C#)</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-emerald-400">›</span>
                <span>Specialization: <strong className="text-white">Computer Science (AI/ML)</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-emerald-400">›</span>
                <span>Location: <strong className="text-white">Mumbra, Thane, Maharashtra</strong></span>
              </div>
            </div>
          </div>

          {/* Narrative Content / Right Column */}
          <div className="lg:col-span-8 space-y-5 sm:space-y-6">
            <div className="p-4 sm:p-6 md:p-8 rounded-2xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-sm space-y-4">
              <p className="text-sm sm:text-base md:text-lg text-slate-200 leading-relaxed font-normal">
                {PORTFOLIO_DATA.personal.bio}
              </p>

              <div className="pt-4 border-t border-white/[0.06] grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <div className="font-semibold text-white mb-1">Adaptive Game AI</div>
                  <div className="text-xs text-slate-400 leading-relaxed">
                    Implementing live reinforcement learning and Q-learning agents that analyze player behavior telemetry and dynamically adapt tactics.
                  </div>
                </div>

                <div>
                  <div className="font-semibold text-white mb-1">Cryptographic Protocols</div>
                  <div className="text-xs text-slate-400 leading-relaxed">
                    Engineering custom elliptic curve mathematics, deterministic transaction signatures, and stack-based script virtual machines from scratch.
                  </div>
                </div>

                <div>
                  <div className="font-semibold text-white mb-1">Modular Architecture</div>
                  <div className="text-xs text-slate-400 leading-relaxed">
                    Designing decoupled, event-driven C# gameplay loops and robust state machines that scale gracefully in live 60 FPS environments.
                  </div>
                </div>
              </div>
            </div>

            {/* Quote / Highlight Strip */}
            <div className="p-3.5 sm:p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/20 text-[11px] sm:text-xs font-mono text-emerald-300 flex items-center gap-2.5 sm:gap-3">
              <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>
                "A fast learner by nature who actively seeks out new technologies, refines existing skills, and thrives in environments that reward curiosity and initiative."
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
