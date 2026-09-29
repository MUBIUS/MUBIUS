import React from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { Gamepad2, Calendar, MapPin, CheckCircle, Sparkles } from 'lucide-react';

export const Experience: React.FC = () => {
  return (
    <section id="experience" className="py-16 sm:py-24 border-t border-white/[0.06] relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mb-8 sm:mb-12">
          <div className="text-xs font-mono uppercase tracking-wider text-emerald-400 mb-2">
            Professional Engineering Background
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-white tracking-tight">
            Game Studio Experience
          </h2>
          <p className="mt-2.5 sm:mt-3 text-xs sm:text-sm text-slate-400 leading-relaxed">
            Hands-on production experience in commercial game development, real-time debugging, and cross-functional gameplay feature iteration.
          </p>
        </div>

        {/* Experience Studio Presentation Card */}
        <div className="space-y-6 sm:space-y-8">
          {PORTFOLIO_DATA.experience.map((exp, idx) => (
            <div
              key={idx}
              className="p-4 sm:p-6 md:p-8 rounded-2xl bg-[#090C13] border border-white/[0.08] relative overflow-hidden"
            >
              {/* Subtle accent glow */}
              <div
                className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/[0.03] blur-[80px] pointer-events-none rounded-full"
                aria-hidden="true"
              />

              <div className="flex flex-col md:flex-row md:items-start justify-between gap-3 sm:gap-4 pb-4 sm:pb-6 border-b border-white/[0.06]">
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-mono text-emerald-400 mb-1">
                    <Gamepad2 className="w-3.5 h-3.5" />
                    <span>Active Game Studio Deployment</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-display font-bold text-white">
                    {exp.role}
                  </h3>
                  <div className="text-sm sm:text-base text-slate-300 font-medium mt-0.5">
                    {exp.company}
                  </div>
                </div>

                <div className="flex flex-row md:flex-col items-center md:items-end text-xs font-mono text-slate-400 gap-3 md:gap-1">
                  <div className="flex items-center gap-1.5 text-slate-300">
                    <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{exp.period}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-500" />
                    <span>{exp.location}</span>
                  </div>
                </div>
              </div>

              {/* Bullet points & contributions */}
              <div className="mt-5 sm:mt-6 space-y-2.5 sm:space-y-3">
                <div className="text-xs font-mono uppercase tracking-wider text-slate-400">
                  Key Technical Contributions
                </div>
                <div className="space-y-2">
                  {exp.bulletPoints.map((point, pIdx) => (
                    <div key={pIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300 leading-relaxed">
                      <span className="text-emerald-400 mt-0.5 select-none">›</span>
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technologies unboxed footer */}
              <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-white/[0.06] flex flex-wrap items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-mono text-slate-400">
                <span className="text-slate-500 uppercase">Core Stack:</span>
                {exp.technologies.map((tech, tIdx) => (
                  <React.Fragment key={tech}>
                    <span className="text-slate-300">{tech}</span>
                    {tIdx < exp.technologies.length - 1 && (
                      <span aria-hidden="true" className="text-slate-700">·</span>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
