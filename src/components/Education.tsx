import React from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { GraduationCap, Calendar, MapPin, BookOpen } from 'lucide-react';

export const Education: React.FC = () => {
  return (
    <section id="education" className="py-16 sm:py-24 border-t border-white/[0.06] relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mb-8 sm:mb-12">
          <div className="text-xs font-mono uppercase tracking-wider text-emerald-400 mb-2">
            Academic Foundation
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-white tracking-tight">
            Engineering Education
          </h2>
          <p className="mt-2.5 sm:mt-3 text-xs sm:text-sm text-slate-400 leading-relaxed">
            Formal training in Computer Science, artificial intelligence algorithms, systems design, and low-level software architectures.
          </p>
        </div>

        {/* Education Timeline Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {PORTFOLIO_DATA.education.map((edu, idx) => (
            <div
              key={idx}
              className="p-4 sm:p-6 md:p-8 rounded-2xl bg-[#090C13] border border-white/[0.08] flex flex-col justify-between space-y-4 sm:space-y-5"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-mono text-slate-400 pb-3 border-b border-white/[0.06] flex-wrap gap-2">
                  <div className="flex items-center gap-1.5 text-emerald-400">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{edu.period}</span>
                  </div>
                  <div className="flex items-center gap-1 text-slate-500">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{edu.location}</span>
                  </div>
                </div>

                <div className="mt-3.5 sm:mt-4">
                  <div className="flex items-center gap-2 text-xs font-mono text-slate-400 mb-1">
                    <GraduationCap className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span className="truncate">{edu.specialization || 'Engineering'}</span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-display font-bold text-white">
                    {edu.degree}
                  </h3>
                  <div className="text-xs sm:text-sm font-medium text-slate-300 mt-1">
                    {edu.institution}
                  </div>
                </div>

                {edu.highlights && (
                  <div className="mt-3.5 sm:mt-4 space-y-2">
                    {edu.highlights.map((h, hIdx) => (
                      <div key={hIdx} className="flex items-start gap-2 text-xs text-slate-400 leading-relaxed">
                        <span className="text-emerald-400 mt-0.5 select-none">›</span>
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="pt-3 border-t border-white/[0.04] text-[10px] sm:text-[11px] font-mono text-slate-500">
                Verified Academic Record · {edu.location}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
