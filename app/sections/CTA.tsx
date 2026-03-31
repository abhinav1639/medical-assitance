'use client'

import Link from 'next/link'
import { motion, useHydrationSafeReducedMotion } from '../components/Motion'

export default function CTA() {
  const reduce = useHydrationSafeReducedMotion()

  return (
    <section className="mx-auto max-w-6xl px-6 pb-20 pt-10 sm:pb-28">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.35 }}
        transition={{ duration: reduce ? 0.2 : 0.55 }}
        className="relative overflow-hidden rounded-3xl border border-black/10 bg-zinc-950 p-10 text-white shadow-[0_30px_80px_-40px_rgba(0,0,0,0.6)] dark:border-white/10 sm:p-12"
      >
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-emerald-500/25 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-sky-500/25 blur-3xl" />

        <div className="relative">
          <h3 className="text-balance text-2xl font-semibold tracking-tight sm:text-3xl">
            Ready to turn this landing page into a full voice assistant?
          </h3>
          <p className="mt-3 max-w-2xl text-pretty text-white/80">
            Next steps: voice capture, streaming responses, doctor routing, and a patient-safe
            disclaimers flow.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href="#features"
              className="inline-flex h-12 items-center justify-center rounded-full bg-white px-6 text-sm font-medium text-zinc-950 shadow-sm transition hover:bg-zinc-100"
            >
              View features
            </Link>
            <Link
              href="#doctors"
              className="inline-flex h-12 items-center justify-center rounded-full border border-white/20 bg-white/5 px-6 text-sm font-medium text-white shadow-sm backdrop-blur transition hover:bg-white/10"
            >
              Browse doctors
            </Link>
          </div>

          <div className="mt-8 text-xs text-white/70">
            Not medical advice. For emergencies, contact local emergency services.
          </div>
        </div>
      </motion.div>
    </section>
  )
}
