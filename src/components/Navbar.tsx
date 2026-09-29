import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, FileText, Sun, Moon } from 'lucide-react';

interface NavbarProps {
  activeSection: string;
  theme?: 'dark' | 'light';
  onToggleTheme?: () => void;
  onOpenResume?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  theme = 'dark',
  onToggleTheme,
  onOpenResume,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Work', href: '#projects' },
    { label: 'About', href: '#about' },
    { label: 'Experience', href: '#experience' },
    { label: 'Skills', href: '#skills' },
    { label: 'Education', href: '#education' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        isScrolled
          ? 'bg-[#07090E]/90 backdrop-blur-md border-b border-white/[0.08] shadow-sm nav-scrolled-bg'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Zone 1: Brand title */}
          <a
            href="#"
            className="text-base sm:text-lg font-display font-bold tracking-tight text-white hover:text-emerald-400 transition-colors whitespace-nowrap brand-title-text"
          >
            MUBASHEER SHAIKH
          </a>

          {/* Zone 2: Navigation links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace('#', '');
              return (
                <a
                  key={link.label}
                  href={link.href}
                  className={`transition-colors relative py-1 nav-link-item ${
                    isActive
                      ? 'text-white font-semibold'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-400 rounded-full" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Zone 3: Actions & Theme Toggle */}
          <div className="hidden sm:flex items-center gap-3">
            {onToggleTheme && (
              <button
                type="button"
                onClick={onToggleTheme}
                className="p-2 rounded-lg bg-white/[0.05] border border-white/[0.1] text-slate-300 hover:text-white hover:bg-white/[0.1] transition-all flex items-center justify-center theme-toggle-btn"
                title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                aria-label="Toggle theme mode"
              >
                {theme === 'dark' ? (
                  <Sun className="w-4 h-4 text-amber-400" />
                ) : (
                  <Moon className="w-4 h-4 text-sky-500" />
                )}
              </button>
            )}

            {onOpenResume && (
              <button
                type="button"
                onClick={onOpenResume}
                className="px-3 py-1.5 text-xs font-mono text-slate-300 hover:text-white transition-colors flex items-center gap-1.5 nav-btn-secondary"
              >
                <FileText className="w-3.5 h-3.5 text-emerald-400" />
                <span>Resume</span>
              </button>
            )}

            <a
              href="#contact"
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-black bg-white rounded-lg hover:bg-slate-200 transition-colors whitespace-nowrap nav-btn-primary"
            >
              <span>Get in Touch</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Mobile buttons */}
          <div className="flex md:hidden items-center gap-2">
            {onToggleTheme && (
              <button
                type="button"
                onClick={onToggleTheme}
                className="p-1.5 rounded-lg bg-white/[0.05] border border-white/[0.1] text-slate-300 theme-toggle-btn"
                title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                aria-label="Toggle theme mode"
              >
                {theme === 'dark' ? (
                  <Sun className="w-4 h-4 text-amber-400" />
                ) : (
                  <Moon className="w-4 h-4 text-sky-500" />
                )}
              </button>
            )}

            {onOpenResume && (
              <button
                type="button"
                onClick={onOpenResume}
                className="px-2.5 py-1 text-xs font-mono text-emerald-300 border border-emerald-500/30 rounded bg-emerald-950/30"
              >
                Resume
              </button>
            )}

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-400 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0B0F17] border-b border-white/[0.08] px-4 pt-2 pb-4 space-y-1 nav-mobile-drawer">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-white/[0.04] rounded-lg transition-colors"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-2 border-t border-white/[0.08] flex items-center gap-2">
            {onOpenResume && (
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenResume();
                }}
                className="flex-1 text-center px-3 py-2 text-xs font-mono text-emerald-300 bg-white/[0.04] border border-emerald-500/20 rounded-lg hover:bg-white/[0.08]"
              >
                View Resume
              </button>
            )}
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="flex-1 text-center px-4 py-2 text-xs font-semibold text-black bg-white rounded-lg hover:bg-slate-200 transition-colors"
            >
              Get in Touch
            </a>
          </div>
        </div>
      )}

      {/* Precision Scroll Progress Indicator */}
      <div className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-white/[0.04] pointer-events-none">
        <div
          className="h-full bg-emerald-400 transition-all duration-75 ease-out shadow-[0_0_8px_rgba(52,211,153,0.5)]"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>
    </header>
  );
};

