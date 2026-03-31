'use client'

import { motion, useHydrationSafeReducedMotion } from '../components/Motion'
import { doctors } from '../data/doctors'

function initials(name: string) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join('')
}

export default function Doctors() {
  const reduce = useHydrationSafeReducedMotion()

  return (
    <section id="doctors" className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
      <div className="flex items-end justify-between gap-6">
        <div className="max-w-2xl">
          <h2 className="text-balance text-2xl font-semibold tracking-tight text-zinc-950 dark:text-white sm:text-3xl">
            20+ doctors, across the specialties people need most.
          </h2>
          <p className="mt-3 text-pretty text-zinc-600 dark:text-zinc-300">
            This is a starter roster for the landing page. You can swap in real profiles later from
            your database.
          </p>
        </div>
        <div className="hidden text-sm text-zinc-600 dark:text-zinc-300 sm:block">
          Showing{' '}
          <span className="font-semibold text-zinc-950 dark:text-white">{doctors.length}</span>{' '}
          doctors
        </div>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {doctors.map((d, idx) => (
          <motion.div
            key={d.name}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.25 }}
            transition={{ duration: reduce ? 0.2 : 0.45, delay: reduce ? 0 : 0.03 * idx }}
            whileHover={reduce ? undefined : { y: -4, scale: 1.01 }}
            whileTap={reduce ? undefined : { scale: 0.99 }}
            className="rounded-3xl border border-black/10 bg-white/60 p-6 shadow-sm backdrop-blur dark:border-white/10 dark:bg-black/30"
          >
            <div className="flex items-center gap-4">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-linear-to-br from-emerald-500/90 to-sky-500/90 text-sm font-semibold text-white">
                {initials(d.name)}
              </div>
              <div className="min-w-0">
                <div className="truncate text-base font-semibold text-zinc-950 dark:text-white">
                  {d.name}
                </div>
                <div className="truncate text-sm text-zinc-600 dark:text-zinc-300">
                  {d.specialty}
                </div>
              </div>
              <div className="ml-auto shrink-0 rounded-full border border-black/10 bg-white/70 px-3 py-1 text-xs font-medium text-zinc-800 dark:border-white/10 dark:bg-white/10 dark:text-zinc-100">
                ★ {d.rating.toFixed(1)}
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {d.focus.slice(0, 3).map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-black/10 bg-white/60 px-3 py-1 text-xs text-zinc-700 dark:border-white/10 dark:bg-black/20 dark:text-zinc-200"
                >
                  {t}
                </span>
              ))}
            </div>

            <div className="mt-4 text-sm text-zinc-600 dark:text-zinc-300">
              <span className="font-medium text-zinc-900 dark:text-white">Languages:</span>{' '}
              {d.languages.join(', ')}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
