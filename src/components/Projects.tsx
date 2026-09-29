import React, { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { PORTFOLIO_DATA, ProjectData } from '../data/portfolioData';
import { ProjectModal } from './ProjectModal';

export const Projects: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeModalProject, setActiveModalProject] = useState<ProjectData | null>(null);

  const categories = [
    { id: 'all', label: 'All Systems' },
    { id: 'game-ai', label: 'Game AI & RL' },
    { id: 'blockchain', label: 'Blockchain & Cryptography' },
    { id: 'neuroevolution', label: 'Neuroevolution' },
    { id: 'simulation', label: 'Simulation & Architecture' },
  ];

  const filteredProjects = PORTFOLIO_DATA.projects.filter(
    (p) => selectedCategory === 'all' || p.category === selectedCategory
  );

  return (
    <section id="projects" className="py-24 border-t border-white/[0.06] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-12">
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-emerald-400 mb-2">
              Engineering Lab
            </div>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-display font-bold text-white tracking-tight">
              Engineered Systems & Games
            </h2>
            <p className="mt-3 text-xs sm:text-sm md:text-base text-slate-400 max-w-2xl leading-relaxed">
              Every project represents an autonomous system — from adaptive Q-learning AI agents and custom cryptographic blockchain interpreters to first-person Unity simulation engines.
            </p>
          </div>

          {/* Filter Controls */}
          <div className="w-full md:w-auto overflow-x-auto pb-1 sm:pb-0 -mx-4 px-4 sm:mx-0 sm:px-0">
            <div className="inline-flex items-center gap-1.5 p-1 bg-white/[0.03] border border-white/[0.06] rounded-xl whitespace-nowrap">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors shrink-0 ${
                    selectedCategory === cat.id
                      ? 'bg-white text-slate-950 font-semibold shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Projects Cards Stack */}
        <div className="space-y-8 sm:space-y-10">
          {filteredProjects.map((project, index) => {
            return (
              <article
                key={project.id}
                className="rounded-2xl border border-white/[0.08] bg-[#090C13] overflow-hidden transition-all duration-300 hover:border-white/[0.16] shadow-xl"
              >
                {/* Card Header Bar */}
                <div className="px-4 sm:px-6 py-3.5 border-b border-white/[0.06] bg-[#07090E]/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                    <span className="font-mono text-xs text-slate-500">
                      SYS_0{index + 1}
                    </span>
                    <span aria-hidden="true" className="text-slate-700">/</span>
                    <span className="text-xs font-mono text-emerald-400 truncate">
                      {project.categoryLabel}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 self-stretch sm:self-auto justify-end">
                    <button
                      type="button"
                      onClick={() => setActiveModalProject(project)}
                      className="flex-1 sm:flex-initial justify-center px-3.5 py-1.5 text-xs font-medium text-black bg-white rounded-lg hover:bg-slate-200 transition-colors flex items-center gap-1"
                    >
                      <span>Inspect Details</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Card Body - Clean Full Width Layout */}
                <div className="p-5 sm:p-7 md:p-8 space-y-6">
                  <div>
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                      <h3 className="text-xl sm:text-2xl md:text-3xl font-display font-bold text-white tracking-tight">
                        {project.title}
                      </h3>
                      <span className="text-xs font-mono text-slate-400">
                        {project.subtitle}
                      </span>
                    </div>

                    <p className="mt-1.5 text-xs sm:text-sm font-medium text-emerald-400 font-mono">
                      {project.tagline}
                    </p>

                    <p className="mt-3 text-xs sm:text-sm text-slate-300 leading-relaxed max-w-4xl">
                      {project.summary}
                    </p>
                  </div>

                  {/* Highlights Bullet List */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 pt-2">
                    {project.highlights.map((item, hIdx) => (
                      <div key={hIdx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-300 bg-white/[0.015] border border-white/[0.03] p-2.5 rounded-lg">
                        <span className="text-emerald-400 select-none font-mono">›</span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>

                  {/* Technology Pills & System Metrics Row */}
                  <div className="pt-4 border-t border-white/[0.06] flex flex-col md:flex-row md:items-center justify-between gap-4">
                    {/* Tech Badges */}
                    <div className="flex flex-wrap items-center gap-2">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 text-xs font-mono text-slate-300 bg-white/[0.04] border border-white/[0.08] rounded-md"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Quick System Metrics Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 shrink-0">
                      {project.systemMetrics.map((m, mIdx) => (
                        <div key={mIdx} className="px-2.5 py-1.5 rounded-md bg-white/[0.02] border border-white/[0.04] text-center min-w-[100px]">
                          <div className="text-[10px] font-mono text-slate-400 uppercase truncate">{m.label}</div>
                          <div className="text-xs font-mono font-semibold text-emerald-400 truncate">
                            {m.value}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* Case-Study Inspector Modal */}
      <ProjectModal
        project={activeModalProject}
        onClose={() => setActiveModalProject(null)}
      />
    </section>
  );
};
