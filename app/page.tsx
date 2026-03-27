import { AlertTriangle } from "lucide-react";
import { RepoGalleryClient } from "@/components/repo-gallery-client";
import { fetchGithubRepos } from "@/lib/github";

type HomePageProps = {
  searchParams?: Promise<{
    username?: string;
  }>;
};

const Home = async ({ searchParams }: HomePageProps) => {
  const params = await searchParams;
  const usernameFromQuery = params?.username;
  const result = await fetchGithubRepos(usernameFromQuery);

  return (
    <main className="min-h-screen bg-zinc-950 px-6 py-10 text-zinc-100">
      <div className="mx-auto w-full max-w-6xl">
        <header className="mb-10 flex flex-col items-center gap-3 text-center">
          <p className="rounded-full border border-zinc-800 bg-zinc-900 px-4 py-1 text-xs uppercase tracking-[0.18em] text-zinc-400">
            GitHub Repository Gallery
          </p>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Public Repositories for{" "}
            <span className="text-cyan-400">@{result.username}</span>
          </h1>
          <p className="max-w-2xl text-sm text-zinc-400 sm:text-base">
            Browse repositories and filter instantly by name with local search.
          </p>
        </header>

        {!result.ok ? (
          <section className="mx-auto max-w-2xl rounded-2xl border border-rose-400/30 bg-rose-500/10 p-6 text-rose-100">
            <div className="mb-3 flex items-center gap-2 text-lg font-semibold">
              <AlertTriangle className="h-5 w-5" aria-hidden="true" />
              Something went wrong
            </div>
            <p className="mb-3 text-sm text-rose-100/90">{result.message}</p>
            <p className="text-xs text-rose-200/80">
              Tip: try a different username via{" "}
              <code className="rounded bg-black/30 px-1.5 py-0.5">
                ?username=your-github-id
              </code>
            </p>
          </section>
        ) : (
          <RepoGalleryClient repos={result.repos} />
        )}
      </div>
    </main>
  );
};

export default Home;
