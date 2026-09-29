import React, { useState, useEffect } from 'react';
import { X, Printer, Copy, Check, FileText, Download, ExternalLink } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleCopyMarkdown = () => {
    const md = `# Mubasheer Shaikh
(+91) 7021840296 | mubasheershkh@gmail.com | github.com/MUBIUS | Mumbra, Thane 400612

## PROFESSIONAL SUMMARY
Game Developer and AI/ML enthusiast with hands-on experience building Unity-based games and intelligent systems. Passionate about the intersection of game development and artificial intelligence — from designing modular gameplay architectures to implementing reinforcement learning agents that bring game worlds to life. Equally comfortable diving into backend systems, cryptographic protocols, and machine learning pipelines. A fast learner by nature who actively seeks out new technologies, refines existing skills, and thrives in environments that reward curiosity and initiative.

## EDUCATION
- **Lokmanya Tilak College of Engineering** — Navi Mumbai, Maharashtra (Sep 2023 – Jun 2026)
  Bachelor of Engineering in Computer Science, Specialization in AI/ML
- **Navjeevan Polytechnic** — Mumbai, Maharashtra (Sep 2020 – Jun 2023)
  Diploma in Information Technology

## EXPERIENCE
- **Game Developer Intern** – Arteon Interactive, Thane (Sep 2025 – Feb 2026)
  - Contributed to active game projects as an intern, implementing gameplay features and debugging live issues in Unity.
  - Collaborated with the design and art teams to integrate assets and iterate rapidly on feature prototypes.

## PROJECTS
- **Genesis** | Python, Flask, ECDSA, ECC, UTXO Model, Bitcoin Script, Base58Check
  - Engineered a full-stack Bitcoin-like blockchain from the ground up, including a custom Elliptic Curve Cryptography (ECC) library for secure identity and transaction signing.
  - Implemented a UTXO-based transaction model with P2PKH (Pay-to-Public-Key-Hash) scripting, ensuring robust cryptographic validation across all transactions.
  - Built a custom Bitcoin Script interpreter executing core opcodes (OP_DUP, OP_HASH160, OP_EQUALVERIFY, OP_CHECKSIG) to replicate real transaction verification logic.
- **ITERUM** | Unity, C#, Q-Learning, Reinforcement Learning
  - Designed and built an arcade/action roguelike in Unity where enemy AI agents adapt their behaviour using live Q-learning trained off player action telemetry during gameplay.
  - Engineered the full game loop including procedural level generation, player combat systems, and a real-time Q-learning reward pipeline.
- **Flappy Bird using NEAT** | JavaScript, HTML5 Canvas, Python, Pygame, NEAT, Genetic Algorithms
  - Built a browser-based Flappy Bird AI that evolves neural-network controllers using NEAT (NeuroEvolution of Augmenting Topologies), growing network topology and weights across generations.
  - Implemented speciation, crossover, and weight/structural mutation, with a live dashboard featuring a champion network visualizer, adjustable simulation speed, and tunable hyperparameter presets.
- **Dhaba Simulator** | Unity, C#
  - Developed a first-person dhaba (Indian roadside restaurant) management simulation in Unity, recreating authentic restaurant operations with an immersive gameplay experience.
  - Implemented modular gameplay systems including customer AI, order management, inventory mechanics, interactive cooking stations, and dynamic service workflows using C#.
  - Designed event-driven, reusable architecture to ensure scalability and ease of future feature integration, inspired by real-world Indian dhaba operations.

## TECHNICAL SKILLS
- **Languages**: C#, Java, Python, C++, JavaScript, HTML5/CSS3
- **Game Engines**: Unity
- **Developer Tools**: Git, GitHub, VS Code, Antigravity
- **AI / ML**: Q-Learning, Reinforcement Learning, NEAT (NeuroEvolution), Genetic Algorithms
`;

    navigator.clipboard.writeText(md);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto cursor-pointer"
      role="dialog"
      aria-modal="true"
      aria-labelledby="resume-modal-title"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl max-h-[92vh] bg-[#0A0D14] border border-white/[0.12] rounded-2xl overflow-y-auto shadow-2xl flex flex-col cursor-default print:border-none print:shadow-none print:max-h-none print:bg-white print:text-black"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-4 sm:px-6 py-3.5 sm:py-4 bg-[#0A0D14]/95 backdrop-blur-sm border-b border-white/[0.08] print:hidden">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-emerald-400 shrink-0" />
            <h3 id="resume-modal-title" className="text-sm sm:text-base font-display font-bold text-white truncate">
              Official Resume Document
            </h3>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              type="button"
              onClick={handleCopyMarkdown}
              className="px-2.5 sm:px-3 py-1.5 text-[11px] sm:text-xs font-mono rounded-lg bg-white/[0.04] text-slate-300 hover:text-white hover:bg-white/[0.08] transition-colors flex items-center gap-1 sm:gap-1.5"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>

            <button
              type="button"
              onClick={handlePrint}
              className="px-2.5 sm:px-3 py-1.5 text-[11px] sm:text-xs font-mono font-medium rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-500/30 transition-colors flex items-center gap-1 sm:gap-1.5"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.08] transition-colors"
              aria-label="Close resume modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Resume Sheet */}
        <div className="p-4 sm:p-8 md:p-10 text-slate-200 font-sans space-y-5 sm:space-y-6 print:p-0 print:text-black">
          {/* Resume Header */}
          <div className="border-b border-white/[0.1] pb-4 sm:pb-5 print:border-black/30">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-display font-extrabold text-white print:text-black uppercase">
              {PORTFOLIO_DATA.personal.name}
            </h1>
            <div className="flex flex-wrap items-center gap-x-2 sm:gap-x-3 gap-y-1 mt-2 text-[11px] sm:text-xs font-mono text-slate-400 print:text-gray-700">
              <span>{PORTFOLIO_DATA.personal.phone}</span>
              <span aria-hidden="true" className="text-slate-600">|</span>
              <a href={`mailto:${PORTFOLIO_DATA.personal.email}`} className="text-emerald-400 print:text-black underline break-all">
                {PORTFOLIO_DATA.personal.email}
              </a>
              <span aria-hidden="true" className="text-slate-600">|</span>
              <a
                href={PORTFOLIO_DATA.personal.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-400 print:text-black underline"
              >
                github.com/{PORTFOLIO_DATA.personal.githubUsername}
              </a>
              <span aria-hidden="true" className="text-slate-600">|</span>
              <span>{PORTFOLIO_DATA.personal.location}</span>
            </div>
          </div>

          {/* Professional Summary */}
          <div>
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400 print:text-black mb-2 border-b border-white/[0.06] pb-1 print:border-black/20">
              Professional Summary
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 print:text-gray-800 leading-relaxed">
              {PORTFOLIO_DATA.personal.bio}
            </p>
          </div>

          {/* Education */}
          <div>
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400 print:text-black mb-2 border-b border-white/[0.06] pb-1 print:border-black/20">
              Education
            </h2>
            <div className="space-y-3">
              {PORTFOLIO_DATA.education.map((edu, idx) => (
                <div key={idx} className="flex flex-col sm:flex-row sm:items-baseline justify-between text-xs sm:text-sm">
                  <div>
                    <span className="font-bold text-white print:text-black">{edu.institution}</span> — {edu.location}
                    <div className="text-slate-400 print:text-gray-700 text-xs">
                      {edu.degree} {edu.specialization ? `(${edu.specialization})` : ''}
                    </div>
                  </div>
                  <span className="font-mono text-xs text-slate-500 print:text-gray-600 sm:text-right shrink-0 mt-0.5 sm:mt-0">
                    {edu.period}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Experience */}
          <div>
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400 print:text-black mb-2 border-b border-white/[0.06] pb-1 print:border-black/20">
              Experience
            </h2>
            <div className="space-y-3">
              {PORTFOLIO_DATA.experience.map((exp, idx) => (
                <div key={idx} className="space-y-1.5">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between text-xs sm:text-sm">
                    <div>
                      <strong className="text-white print:text-black">{exp.role}</strong> – {exp.company}, {exp.location}
                    </div>
                    <span className="font-mono text-xs text-slate-500 print:text-gray-600 sm:text-right shrink-0">
                      {exp.period}
                    </span>
                  </div>
                  <ul className="list-disc list-inside space-y-1 text-xs text-slate-300 print:text-gray-800">
                    {exp.bulletPoints.map((b, bIdx) => (
                      <li key={bIdx} className="leading-relaxed">
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Projects */}
          <div>
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400 print:text-black mb-2 border-b border-white/[0.06] pb-1 print:border-black/20">
              Projects
            </h2>
            <div className="space-y-4">
              {PORTFOLIO_DATA.projects.map((proj) => (
                <div key={proj.id} className="space-y-1">
                  <div className="text-xs sm:text-sm">
                    <strong className="text-white print:text-black">{proj.title}</strong>{' '}
                    <span className="text-slate-400 print:text-gray-600 font-mono text-xs">
                      | {proj.technologies.join(', ')}
                    </span>
                  </div>
                  <ul className="list-disc list-inside space-y-0.5 text-xs text-slate-300 print:text-gray-800">
                    {proj.highlights.map((h, hIdx) => (
                      <li key={hIdx} className="leading-relaxed">
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Technical Skills */}
          <div>
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400 print:text-black mb-2 border-b border-white/[0.06] pb-1 print:border-black/20">
              Technical Skills
            </h2>
            <div className="space-y-1 text-xs text-slate-300 print:text-gray-800 font-mono">
              <div>
                <strong className="text-white print:text-black">Languages:</strong> C#, Java, Python, C++, JavaScript, HTML5/CSS3
              </div>
              <div>
                <strong className="text-white print:text-black">Game Engines:</strong> Unity
              </div>
              <div>
                <strong className="text-white print:text-black">Developer Tools:</strong> Git, GitHub, VS Code, Antigravity
              </div>
              <div>
                <strong className="text-white print:text-black">AI / ML:</strong> Q-Learning, Reinforcement Learning, NEAT (NeuroEvolution), Genetic Algorithms
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-[#0A0D14] border-t border-white/[0.08] flex items-center justify-between print:hidden">
          <span className="text-xs font-mono text-slate-500">
            Source: Mubasheer Shaikh Official Resume
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-300 bg-white/[0.04] border border-white/[0.08] rounded-lg hover:text-white hover:bg-white/[0.08] transition-colors"
          >
            Close Document
          </button>
        </div>
      </div>
    </div>
  );
};
