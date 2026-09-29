import React, { useEffect } from 'react';
import { X, Github, AlertCircle, Wrench } from 'lucide-react';
import { ProjectData } from '../data/portfolioData';

interface ProjectModalProps {
  project: ProjectData | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto cursor-pointer"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl max-h-[92vh] bg-[#0A0D14] border border-white/[0.12] rounded-2xl overflow-y-auto shadow-2xl flex flex-col cursor-default"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Sticky Header */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-4 sm:px-6 py-3.5 sm:py-4 bg-[#0A0D14]/95 backdrop-blur-sm border-b border-white/[0.08]">
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shrink-0" />
            <div className="min-w-0">
              <div className="text-[10px] sm:text-[11px] font-mono text-emerald-400 uppercase tracking-wider flex items-center gap-2 truncate">
                <span>System Inspection Mode</span>
                <span className="text-slate-600 hidden sm:inline">·</span>
                <span className="text-slate-500 text-[10px] hidden sm:inline">Press ESC to exit</span>
              </div>
              <h3 id="modal-title" className="text-lg sm:text-xl font-display font-bold text-white leading-tight truncate">
                {project.title}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 sm:p-2 rounded-lg bg-white/[0.04] text-slate-300 hover:text-white hover:bg-white/[0.08] transition-colors"
                title="View GitHub Repository"
                aria-label="View on GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
            )}
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 sm:p-2 rounded-lg bg-white/[0.04] text-slate-400 hover:text-white hover:bg-white/[0.08] transition-colors"
              aria-label="Close project modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 md:p-8 space-y-6 sm:space-y-8">
          {/* Subtitle & Metadata */}
          <div>
            <p className="text-lg text-slate-200 font-medium">{project.subtitle}</p>
            <div className="flex flex-wrap items-center gap-2 mt-2 text-xs text-slate-400 font-mono">
              {project.technologies.map((tech, idx) => (
                <React.Fragment key={tech}>
                  <span className="text-slate-300">{tech}</span>
                  {idx < project.technologies.length - 1 && <span aria-hidden="true" className="text-slate-600">·</span>}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Summary & Core Highlights */}
          <div className="space-y-4">
            <h4 className="text-sm font-mono uppercase tracking-wider text-slate-400">
              System Architecture & Core Highlights
            </h4>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              {project.summary}
            </p>
            <ul className="space-y-2 mt-3">
              {project.highlights.map((h, i) => (
                <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                  <span className="text-emerald-400 mt-1 select-none">›</span>
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Problem & Engineering Solution */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-white/[0.08]">
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.04] space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-mono text-rose-300">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>The Core Engineering Problem</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {project.problem}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.04] space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-mono text-emerald-300">
                <Wrench className="w-3.5 h-3.5" />
                <span>Architectural Implementation</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {project.architecture}
              </p>
            </div>
          </div>

          {/* Technical Challenges & Solutions */}
          {project.technicalChallenges && project.technicalChallenges.length > 0 && (
            <div className="space-y-4 pt-4 border-t border-white/[0.08]">
              <h4 className="text-sm font-mono uppercase tracking-wider text-slate-400">
                Key Technical Challenges & Resolutions
              </h4>
              <div className="space-y-3">
                {project.technicalChallenges.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-[#07090E] border border-white/[0.06] space-y-1.5"
                  >
                    <div className="text-xs font-semibold text-white flex items-center gap-2">
                      <span className="font-mono text-amber-400">0{idx + 1}.</span>
                      <span>{item.challenge}</span>
                    </div>
                    <div className="text-xs text-slate-400 pl-6 leading-relaxed">
                      {item.solution}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* System Metrics Table */}
          {project.systemMetrics && project.systemMetrics.length > 0 && (
            <div className="pt-4 border-t border-white/[0.08]">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {project.systemMetrics.map((metric, idx) => (
                  <div key={idx} className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.04]">
                    <div className="text-[11px] font-mono text-slate-400">{metric.label}</div>
                    <div className="text-xs sm:text-sm font-mono font-semibold text-emerald-400 mt-0.5 truncate">
                      {metric.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-[#0A0D14] border-t border-white/[0.08] flex items-center justify-between">
          <div className="text-xs text-slate-500 font-mono">
            Source: Verified Resume Facts · Mubasheer Shaikh
          </div>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-300 bg-white/[0.04] border border-white/[0.08] rounded-lg hover:text-white hover:bg-white/[0.08] transition-colors"
          >
            Close Inspector
          </button>
        </div>
      </div>
    </div>
  );
};
