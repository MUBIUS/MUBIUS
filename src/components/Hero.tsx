import React from 'react';
import { ArrowDown, Github, Terminal, Cpu, Gamepad2, Shield } from 'lucide-react';
import { HeroSimulation } from './HeroSimulation';
import { PORTFOLIO_DATA } from '../data/portfolioData';

export const Hero: React.FC = () => {
  return (
    <section className="relative min-h-[92vh] flex items-center justify-center pt-24 pb-16 overflow-hidden">
      {/* Background Interactive Particle Simulation */}
      <HeroSimulation />

      {/* Subtle radial ambient gradients */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-emerald-500/[0.04] blur-[120px] rounded-full pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-1/4 left-1/3 w-[500px] h-[300px] bg-sky-500/[0.03] blur-[100px] rounded-full pointer-events-none"
        aria-hidden="true"
      />

      {/* Grid Pattern */}
      <div className="absolute inset-0 lab-grid pointer-events-none opacity-40" aria-hidden="true" />

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        {/* Lab Concept Flag */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-500/25 bg-emerald-950/20 backdrop-blur-sm text-xs font-mono text-emerald-300 mb-8 animate-fade-in">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
          <span>Interactive Systems Lab</span>
          <span aria-hidden="true" className="text-emerald-500/40">/</span>
          <span className="text-slate-400">Engineering Workstation</span>
        </div>

        {/* Name */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-display font-extrabold tracking-tight text-white uppercase max-w-full flex flex-wrap justify-center gap-x-4 gap-y-1">
          <span className="whitespace-nowrap">MUBASHEER</span>
          <span className="whitespace-nowrap">SHAIKH</span>
        </h1>

        {/* Primary Title */}
        <div className="mt-3 sm:mt-5 text-sm sm:text-lg md:text-xl lg:text-2xl font-mono font-medium text-emerald-400 tracking-wider uppercase px-2 text-balance">
          {PORTFOLIO_DATA.personal.title}
        </div>

        {/* Supporting Statement */}
        <p className="mt-5 sm:mt-6 text-sm sm:text-base md:text-lg lg:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed text-balance font-normal px-2">
          {PORTFOLIO_DATA.personal.statement}
        </p>

        {/* Two Primary Actions */}
        <div className="mt-8 sm:mt-9 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto px-4 sm:px-0">
          <a
            href="#projects"
            className="w-full sm:w-auto px-6 py-3 text-sm font-semibold text-black bg-white rounded-lg hover:bg-slate-200 transition-all flex items-center justify-center gap-2 group shadow-lg shadow-white/5 active:scale-95"
          >
            <span>Explore My Work</span>
            <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
          </a>

          <a
            href={PORTFOLIO_DATA.personal.github}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-6 py-3 text-sm font-semibold text-slate-200 bg-white/[0.05] border border-white/[0.12] rounded-lg hover:bg-white/[0.09] hover:border-white/[0.2] transition-all flex items-center justify-center gap-2 active:scale-95"
          >
            <Github className="w-4 h-4" />
            <span>GitHub</span>
          </a>
        </div>

        {/* Sub-system Indicators Bar (clean unboxed metadata) */}
        <div className="mt-12 sm:mt-14 pt-6 sm:pt-8 border-t border-white/[0.08] w-full max-w-4xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 text-left">
          <div className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.04]">
            <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
              <Gamepad2 className="w-3.5 h-3.5 text-emerald-400" />
              <span className="font-mono">Game AI</span>
            </div>
            <div className="text-xs font-medium text-slate-200">Adaptive Q-Learning Agents</div>
          </div>

          <div className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.04]">
            <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
              <Shield className="w-3.5 h-3.5 text-sky-400" />
              <span className="font-mono">Blockchain</span>
            </div>
            <div className="text-xs font-medium text-slate-200">Custom ECC & Script VM</div>
          </div>

          <div className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.04]">
            <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
              <Cpu className="w-3.5 h-3.5 text-amber-400" />
              <span className="font-mono">Neuroevolution</span>
            </div>
            <div className="text-xs font-medium text-slate-200">NEAT Topology Evolution</div>
          </div>

          <div className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.04]">
            <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
              <Terminal className="w-3.5 h-3.5 text-purple-400" />
              <span className="font-mono">Engine</span>
            </div>
            <div className="text-xs font-medium text-slate-200">Unity C# Architecture</div>
          </div>
        </div>
      </div>
    </section>
  );
};
