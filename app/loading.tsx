const Loading = () => {
  return (
    <main
      className="min-h-screen bg-zinc-950 px-6 py-10 text-zinc-100"
      aria-busy="true"
    >
      <div className="mx-auto w-full max-w-6xl">
        <p className="sr-only" role="status" aria-live="polite">
          Loading repositories…
        </p>
        <div className="mb-8 h-8 w-64 animate-pulse rounded bg-zinc-800" />
        <div className="mb-10 h-12 w-full max-w-xl animate-pulse rounded-2xl bg-zinc-800" />
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="h-40 animate-pulse rounded-2xl border border-zinc-800 bg-zinc-900"
            />
          ))}
        </div>
      </div>
    </main>
  );
};

export default Loading;
