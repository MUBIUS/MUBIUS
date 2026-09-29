import React, { useState, useEffect } from 'react';
import { Github, GitBranch, Star, ExternalLink, Code2, FolderGit2 } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

interface RepoData {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  language: string | null;
  updated_at: string;
}

interface UserProfile {
  public_repos: number;
  followers: number;
  bio: string | null;
  avatar_url: string;
}

export const GitHubSection: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [repos, setRepos] = useState<RepoData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasError, setHasError] = useState<boolean>(false);

  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        setIsLoading(true);
        // Fetch user data
        const userRes = await fetch('https://api.github.com/users/MUBIUS');
        if (userRes.ok) {
          const userData = await userRes.json();
          setProfile({
            public_repos: userData.public_repos,
            followers: userData.followers,
            bio: userData.bio,
            avatar_url: userData.avatar_url,
          });
        }

        // Fetch repositories
        const reposRes = await fetch('https://api.github.com/users/MUBIUS/repos?sort=updated&per_page=4');
        if (reposRes.ok) {
          const reposData = await reposRes.json();
          if (Array.isArray(reposData)) {
            setRepos(reposData);
          }
        }
      } catch (err) {
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGitHubData();
  }, []);

  return (
    <section className="py-16 sm:py-20 border-t border-white/[0.06] relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-4 sm:p-6 md:p-8 rounded-2xl bg-[#090C13] border border-white/[0.08] relative overflow-hidden">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 sm:pb-6 border-b border-white/[0.06]">
            <div className="flex items-center gap-3 min-w-0">
              <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white shrink-0">
                <Github className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <div className="text-[10px] sm:text-xs font-mono uppercase tracking-wider text-emerald-400">
                  Open Source & Version Control
                </div>
                <h3 className="text-lg sm:text-2xl font-display font-bold text-white truncate">
                  github.com/{PORTFOLIO_DATA.personal.githubUsername}
                </h3>
              </div>
            </div>

            <a
              href={PORTFOLIO_DATA.personal.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 text-xs font-mono font-medium rounded-lg bg-white/[0.05] border border-white/[0.1] text-slate-200 hover:text-white hover:bg-white/[0.09] transition-colors self-start sm:self-auto"
            >
              <span>View GitHub Profile</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Repositories display if loaded */}
          {repos.length > 0 ? (
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              {repos.map((repo) => (
                <a
                  key={repo.id}
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-xl bg-[#07090E] border border-white/[0.06] hover:border-white/[0.16] transition-all group flex flex-col justify-between space-y-3"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-sm font-semibold text-white group-hover:text-emerald-400 transition-colors flex items-center gap-1.5 truncate">
                        <FolderGit2 className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                        <span className="truncate">{repo.name}</span>
                      </span>
                      <ExternalLink className="w-3.5 h-3.5 text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                    </div>
                    {repo.description && (
                      <p className="text-xs text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                        {repo.description}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-4 text-xs font-mono text-slate-500 pt-2 border-t border-white/[0.04]">
                    {repo.language && (
                      <span className="flex items-center gap-1.5 text-slate-400">
                        <span className="w-2 h-2 rounded-full bg-emerald-400" />
                        <span>{repo.language}</span>
                      </span>
                    )}
                    {repo.stargazers_count > 0 && (
                      <span className="flex items-center gap-1 text-slate-400">
                        <Star className="w-3 h-3 text-amber-400" />
                        <span>{repo.stargazers_count}</span>
                      </span>
                    )}
                    <span className="text-[11px] text-slate-600 truncate">
                      Updated {new Date(repo.updated_at).toLocaleDateString()}
                    </span>
                  </div>
                </a>
              ))}
            </div>
          ) : (
            /* Fallback Clean View */
            <div className="mt-6 p-6 rounded-xl bg-[#07090E] border border-white/[0.04] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-sm text-slate-400">
                Explore source code for Iterum roguelike systems, Genesis blockchain scripts, NEAT algorithms, and Unity prototypes.
              </div>
              <a
                href={PORTFOLIO_DATA.personal.github}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 text-xs font-mono font-medium rounded-lg bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-500/25 transition-colors whitespace-nowrap"
              >
                Inspect Repositories on GitHub
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
