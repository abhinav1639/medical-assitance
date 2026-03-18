export default function HistoryPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-balance text-2xl font-semibold tracking-tight sm:text-3xl">
          Summaries
        </h1>
        <p className="mt-2 max-w-2xl text-pretty text-zinc-600 dark:text-zinc-300">
          This will list saved consult summaries from Neon (Prisma). Next step is adding a
          `Consultation` model and a seed flow.
        </p>
      </div>

      <div className="rounded-3xl border border-black/10 bg-white/70 p-6 backdrop-blur dark:border-white/10 dark:bg-black/25">
        <div className="text-sm font-semibold text-zinc-950 dark:text-white">No summaries yet</div>
        <div className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
          After we implement voice consult + saving, you’ll see items here.
        </div>
      </div>
    </div>
  );
}

