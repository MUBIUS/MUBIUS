import React from 'react';
import { ArrowUp, Github, Mail } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-12 border-t border-white/[0.08] bg-[#05070B] text-slate-400 text-xs font-mono">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand info */}
          <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
            <span className="font-display font-bold text-white tracking-tight text-sm">
              MUBASHEER SHAIKH
            </span>
            <span aria-hidden="true" className="hidden sm:inline text-slate-700">·</span>
            <span>Game Developer × AI/ML Engineer</span>
            <span aria-hidden="true" className="hidden sm:inline text-slate-700">·</span>
            <span className="text-slate-500">Mumbra, Thane, Maharashtra</span>
          </div>

          {/* Links & Back to top */}
          <div className="flex items-center gap-6">
            <a
              href={PORTFOLIO_DATA.personal.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              GitHub
            </a>
            <a
              href={`mailto:${PORTFOLIO_DATA.personal.email}`}
              className="hover:text-white transition-colors"
            >
              Email
            </a>
            <button
              type="button"
              onClick={scrollToTop}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.04] text-slate-300 hover:text-white hover:bg-white/[0.08] transition-colors"
              aria-label="Back to top"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-white/[0.04] flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-600">
          <div>
            © {new Date().getFullYear()} Mubasheer Shaikh. Built with React, TypeScript & Tailwind CSS.
          </div>
          <div>
            Interactive Systems Lab · All content grounded in verified background.
          </div>
        </div>
      </div>
    </footer>
  );
};
