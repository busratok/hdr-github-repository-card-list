"use client";

import { Search, Star } from "lucide-react";
import { useMemo, useState } from "react";
import type { GithubRepo } from "@/lib/github";
import { formatStars } from "@/lib/format";

type RepoGalleryClientProps = {
  repos: GithubRepo[];
};

const languageColorMap: Record<string, string> = {
  TypeScript: "bg-blue-400",
  JavaScript: "bg-yellow-400",
  Python: "bg-sky-400",
  Go: "bg-cyan-400",
  Rust: "bg-orange-400",
  HTML: "bg-rose-400",
  CSS: "bg-indigo-400",
  Shell: "bg-emerald-400",
};

const getLanguageColor = (language: string | null) => {
  if (!language) {
    return "bg-zinc-500";
  }

  return languageColorMap[language] || "bg-violet-400";
};

export const RepoGalleryClient = ({ repos }: RepoGalleryClientProps) => {
  const [query, setQuery] = useState("");

  const filteredRepos = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
      return repos;
    }

    return repos.filter((repo) =>
      repo.name.toLowerCase().includes(normalizedQuery),
    );
  }, [repos, query]);

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  return (
    <section className="w-full">
      <h2 className="sr-only">Search repositories</h2>
      <div className="mx-auto mb-8 max-w-xl">
        <label htmlFor="repo-search" className="sr-only">
          Search repositories by name
        </label>
        <div className="flex items-center gap-3 rounded-2xl border border-zinc-800 bg-zinc-900 px-4 py-3 shadow-lg shadow-black/20 focus-within:outline focus-within:outline-2 focus-within:outline-offset-4 focus-within:outline-blue-500">
          <Search className="h-5 w-5 text-zinc-400" aria-hidden="true" />
          <input
            id="repo-search"
            type="text"
            value={query}
            onChange={handleQueryChange}
            placeholder="Search repositories by name..."
            className="w-full bg-transparent text-sm text-zinc-100 placeholder:text-zinc-400 focus:outline-none"
            aria-label="Search repositories by name"
          />
        </div>
      </div>

      <section aria-live="polite" aria-atomic="true">
        <p className="sr-only" role="status">
          {filteredRepos.length}{" "}
          {filteredRepos.length === 1 ? "repository" : "repositories"} shown.
        </p>

        {filteredRepos.length === 0 ? (
          <div
            className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-8 text-center text-zinc-200"
            role="status"
            aria-live="polite"
          >
            No repositories found.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filteredRepos.map((repo) => (
              <article
                key={repo.id}
                className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-5 shadow-md shadow-black/20 transition-transform duration-200 hover:-translate-y-1"
              >
                <h3 className="mb-2 line-clamp-1 text-lg font-semibold text-zinc-100">
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`View ${repo.name} on GitHub`}
                    className="underline decoration-zinc-700 underline-offset-4 hover:decoration-zinc-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-500"
                  >
                    {repo.name}
                  </a>
                </h3>

                <p className="mb-5 min-h-12 text-sm text-zinc-300">
                  {repo.description?.trim() || "No description provided"}
                </p>

                <div className="flex items-center justify-between text-sm text-zinc-200">
                  <div className="flex items-center gap-2">
                    <span
                      className={`h-2.5 w-2.5 rounded-full ${getLanguageColor(
                        repo.language,
                      )}`}
                      aria-hidden="true"
                    />
                    <span>{repo.language || "Unknown"}</span>
                  </div>

                  <div className="flex items-center gap-1.5 text-amber-300">
                    <Star className="h-4 w-4" aria-hidden="true" />
                    <span>{formatStars(repo.stargazers_count)}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </section>
  );
};
