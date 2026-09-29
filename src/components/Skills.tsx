import React, { useState } from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { Terminal, Cpu, Gamepad2, Wrench, Sparkles, Code2 } from 'lucide-react';

export const Skills: React.FC = () => {
  const [activeSkill, setActiveSkill] = useState<{ name: string; context: string } | null>({
    name: 'C#',
    context: 'Core language for Unity game loops, player systems, and event architectures',
  });

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'LANGUAGES':
        return <Code2 className="w-4 h-4 text-emerald-400" />;
      case 'GAME ENGINES':
        return <Gamepad2 className="w-4 h-4 text-sky-400" />;
      case 'AI / MACHINE LEARNING':
        return <Cpu className="w-4 h-4 text-purple-400" />;
      case 'DEVELOPER TOOLS':
        return <Wrench className="w-4 h-4 text-amber-400" />;
      default:
        return <Terminal className="w-4 h-4 text-emerald-400" />;
    }
  };

  return (
    <section id="skills" className="py-24 border-t border-white/[0.06] relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mb-12">
          <div className="text-xs font-mono uppercase tracking-wider text-emerald-400 mb-2">
            Technical Arsenal & Toolkit
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight">
            Systems & Technologies
          </h2>
          <p className="mt-3 text-sm text-slate-400 leading-relaxed">
            No vanity percentage bars — just real languages, simulation algorithms, and engine frameworks applied in production and research projects.
          </p>
        </div>

        {/* Live Contextual Inspector Bar */}
        <div className="mb-8 sm:mb-10 p-3.5 sm:p-4 rounded-xl bg-white/[0.02] border border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4">
          <div className="flex items-center gap-2.5 shrink-0">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
            <span className="text-[11px] sm:text-xs font-mono text-slate-400 uppercase">Contextual Inspector:</span>
            <span className="text-xs sm:text-sm font-mono font-semibold text-white">
              {activeSkill ? activeSkill.name : 'Hover or tap any skill'}
            </span>
          </div>
          <div className="text-[11px] sm:text-xs font-mono text-emerald-400 text-left sm:text-right truncate max-w-full">
            {activeSkill ? activeSkill.context : 'Hover below to view real-world implementation context'}
          </div>
        </div>

        {/* Skills Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {PORTFOLIO_DATA.skills.map((categoryGroup) => (
            <div
              key={categoryGroup.category}
              className="p-4 sm:p-6 rounded-2xl bg-[#090C13] border border-white/[0.06] flex flex-col justify-between space-y-4 sm:space-y-5"
            >
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
                  <div className="flex items-center gap-2">
                    {getCategoryIcon(categoryGroup.category)}
                    <h3 className="font-mono text-xs uppercase tracking-wider text-slate-200">
                      {categoryGroup.category}
                    </h3>
                  </div>
                  <span className="text-[10px] font-mono text-slate-500">
                    {categoryGroup.skills.length} Capabilities
                  </span>
                </div>

                {/* Skills Interactive Tiles */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-2.5 mt-3 sm:mt-4">
                  {categoryGroup.skills.map((skill) => {
                    const isSelected = activeSkill?.name === skill.name;
                    return (
                      <button
                        key={skill.name}
                        type="button"
                        onMouseEnter={() => setActiveSkill(skill)}
                        onClick={() => setActiveSkill(skill)}
                        className={`p-2.5 sm:p-3 rounded-xl border text-left transition-all duration-200 ${
                          isSelected
                            ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-200 shadow-sm'
                            : 'bg-white/[0.02] border-white/[0.04] text-slate-300 hover:border-white/[0.12] hover:bg-white/[0.04]'
                        }`}
                      >
                        <div className="text-xs sm:text-sm font-mono font-medium truncate">
                          {skill.name}
                        </div>
                        <div className="text-[9px] sm:text-[10px] text-slate-500 mt-0.5 truncate">
                          Inspect Usage
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="text-[10px] sm:text-[11px] text-slate-500 font-mono pt-2 border-t border-white/[0.04]">
                Applied directly in Unity gameplay loops, ML pipelines, and custom VMs.
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
