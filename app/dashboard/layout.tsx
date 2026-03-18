import type { ReactNode } from "react";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { syncClerkUserToDb } from "@/src/lib/syncClerkUser";

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  // Sync authenticated user into Prisma on each dashboard visit.
  // (Safe to call multiple times; it's an upsert.)
  await syncClerkUserToDb();

  return (
    <div className="min-h-screen bg-white text-zinc-950 dark:bg-black dark:text-white">
      <div className="pointer-events-none fixed inset-0 -z-10 opacity-60 [mask-image:radial-gradient(60%_50%_at_50%_18%,black,transparent)]">
        <div className="absolute -top-24 left-1/2 h-[28rem] w-[28rem] -translate-x-[70%] rounded-full bg-gradient-to-tr from-emerald-300/45 via-sky-300/35 to-indigo-300/35 blur-3xl dark:from-emerald-500/12 dark:via-sky-500/12 dark:to-indigo-500/12" />
        <div className="absolute -top-32 left-1/2 h-[30rem] w-[30rem] -translate-x-[-5%] rounded-full bg-gradient-to-tr from-fuchsia-300/35 via-rose-300/25 to-amber-300/25 blur-3xl dark:from-fuchsia-500/10 dark:via-rose-500/10 dark:to-amber-500/10" />
      </div>

      <div className="mx-auto grid max-w-6xl gap-6 px-6 py-6 lg:grid-cols-[260px_1fr]">
        <aside className="rounded-3xl border border-black/10 bg-white/60 p-5 backdrop-blur dark:border-white/10 dark:bg-black/30">
          <Link href="/" className="flex items-center gap-2">
            <span className="inline-block h-9 w-9 rounded-2xl bg-gradient-to-br from-emerald-500 to-sky-500" />
            <div className="leading-tight">
              <div className="text-sm font-semibold">Dotor AI</div>
              <div className="text-xs text-zinc-600 dark:text-zinc-300">Dashboard</div>
            </div>
          </Link>

          <nav className="mt-6 space-y-2 text-sm">
            {[
              { href: "/dashboard", label: "Overview" },
              { href: "/dashboard/doctors", label: "Doctors" },
              { href: "/dashboard/consult", label: "Voice consult" },
              { href: "/dashboard/history", label: "Summaries" },
              { href: "/dashboard/settings", label: "Settings" },
            ].map((i) => (
              <Link
                key={i.href}
                href={i.href}
                className="flex items-center justify-between rounded-2xl px-3 py-2 text-zinc-700 transition hover:bg-black/5 dark:text-zinc-200 dark:hover:bg-white/10"
              >
                <span>{i.label}</span>
                <span className="text-xs text-zinc-400">→</span>
              </Link>
            ))}
          </nav>

          <div className="mt-8 flex items-center justify-between rounded-2xl border border-black/10 bg-white/60 px-3 py-2 dark:border-white/10 dark:bg-black/20">
            <div className="text-xs text-zinc-600 dark:text-zinc-300">Account</div>
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "h-8 w-8",
                },
              }}
            />
          </div>
        </aside>

        <main className="rounded-3xl border border-black/10 bg-white/60 p-6 backdrop-blur dark:border-white/10 dark:bg-black/30 sm:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}

