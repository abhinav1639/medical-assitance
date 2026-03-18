import Link from "next/link";
import { currentUser } from "@clerk/nextjs/server";

function Card({
  title,
  desc,
  href,
  badge,
}: {
  title: string;
  desc: string;
  href: string;
  badge?: string;
}) {
  return (
    <Link
      href={href}
      className="group rounded-3xl border border-black/10 bg-white/70 p-6 shadow-sm backdrop-blur transition hover:-translate-y-1 hover:bg-white dark:border-white/10 dark:bg-black/25 dark:hover:bg-black/35"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-base font-semibold text-zinc-950 dark:text-white">{title}</div>
          <div className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-300">{desc}</div>
        </div>
        {badge ? (
          <div className="rounded-full border border-black/10 bg-white/70 px-3 py-1 text-xs font-medium text-zinc-800 dark:border-white/10 dark:bg-white/10 dark:text-zinc-100">
            {badge}
          </div>
        ) : null}
      </div>
      <div className="mt-5 text-sm font-medium text-emerald-700 dark:text-emerald-400">
        Open <span className="opacity-70">→</span>
      </div>
    </Link>
  );
}

export default async function DashboardPage() {
  const user = await currentUser();
  const first = user?.firstName ?? "there";

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-2">
        <div className="text-sm text-zinc-600 dark:text-zinc-300">Welcome back</div>
        <h1 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
          Hi {first}, let’s get you the next right step.
        </h1>
        <p className="max-w-2xl text-pretty text-zinc-600 dark:text-zinc-300">
          Use voice consult for structured symptom intake, match to a specialist, and keep your
          summaries ready for a clinic or telehealth visit.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card
          title="Start voice consult"
          desc="Describe symptoms and answer follow-up questions. Get red flags + next steps."
          href="/dashboard/consult"
          badge="Recommended"
        />
        <Card
          title="Browse doctors"
          desc="Pick a specialty and see who’s best for your situation."
          href="/dashboard/doctors"
        />
        <Card
          title="View summaries"
          desc="Find past conversations and export a clean summary for your next appointment."
          href="/dashboard/history"
          badge="Soon"
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-3xl border border-black/10 bg-white/70 p-6 backdrop-blur dark:border-white/10 dark:bg-black/25">
          <div className="text-base font-semibold text-zinc-950 dark:text-white">Safety first</div>
          <div className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-300">
            The assistant highlights urgent warning signs and encourages appropriate care. It’s not
            a medical diagnosis tool.
          </div>
          <div className="mt-5 flex flex-wrap gap-2 text-xs">
            {["Red flags", "Triage", "Clear next steps", "Privacy controls"].map((t) => (
              <span
                key={t}
                className="rounded-full border border-black/10 bg-white/60 px-3 py-1 text-zinc-700 dark:border-white/10 dark:bg-black/20 dark:text-zinc-200"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-black/10 bg-zinc-950 p-6 text-white shadow-[0_30px_80px_-50px_rgba(0,0,0,0.7)] dark:border-white/10">
          <div className="text-base font-semibold">Next build steps</div>
          <div className="mt-2 text-sm leading-6 text-white/80">
            I can implement the actual voice pipeline next: mic capture → streaming transcription →
            streaming AI response → summary saved to Neon.
          </div>
          <div className="mt-6 grid gap-2 text-sm">
            {[
              "Realtime voice UI",
              "Doctor matching rules",
              "Conversation history",
              "Export summary PDF",
            ].map((i) => (
              <div key={i} className="flex items-center justify-between rounded-2xl bg-white/5 px-3 py-2">
                <span>{i}</span>
                <span className="text-white/50">•</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

