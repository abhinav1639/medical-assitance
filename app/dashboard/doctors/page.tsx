import { doctors } from "@/app/data/doctors";

export default function DoctorsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-balance text-2xl font-semibold tracking-tight sm:text-3xl">
          Doctors
        </h1>
        <p className="mt-2 max-w-2xl text-pretty text-zinc-600 dark:text-zinc-300">
          This page currently shows the landing roster. Next step is to read from Neon via Prisma
          (once you run migrations + seed).
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {doctors.map((d) => (
          <div
            key={d.name}
            className="rounded-3xl border border-black/10 bg-white/70 p-6 backdrop-blur dark:border-white/10 dark:bg-black/25"
          >
            <div className="text-base font-semibold text-zinc-950 dark:text-white">{d.name}</div>
            <div className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">{d.specialty}</div>

            <div className="mt-4 flex flex-wrap gap-2 text-xs">
              {d.focus.slice(0, 3).map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-black/10 bg-white/60 px-3 py-1 text-zinc-700 dark:border-white/10 dark:bg-black/20 dark:text-zinc-200"
                >
                  {t}
                </span>
              ))}
            </div>

            <div className="mt-4 text-sm text-zinc-600 dark:text-zinc-300">
              <span className="font-medium text-zinc-900 dark:text-white">Languages:</span>{" "}
              {d.languages.join(", ")}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

