'use client'

import type { Variants } from 'framer-motion'
import Link from 'next/link'
import { motion, useHydrationSafeReducedMotion } from '../components/Motion'

function GlowBlob({ className, delay = 0 }: { className: string; delay?: number }) {
  const reduce = useHydrationSafeReducedMotion()
  const easeInOut = [0.4, 0, 0.2, 1] as const
  return (
    <motion.div
      aria-hidden="true"
      className={className}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={
        reduce
          ? { opacity: 1, scale: 1 }
          : {
              opacity: 1,
              scale: [1, 1.08, 1],
              x: [0, 18, 0],
              y: [0, -14, 0],
            }
      }
      transition={
        reduce
          ? { duration: 0.6, delay }
          : {
              duration: 10,
              delay,
              repeat: Infinity,
              ease: easeInOut,
            }
      }
    />
  )
}

export default function Hero() {
  const reduce = useHydrationSafeReducedMotion()
  const easeOut = [0.16, 1, 0.3, 1] as const

  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: reduce ? { duration: 0.2 } : { staggerChildren: 0.08 },
    },
  }

  const item: Variants = {
    hidden: { opacity: 0, y: 10, filter: 'blur(6px)' },
    show: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: reduce ? { duration: 0.2 } : { duration: 0.6, ease: easeOut },
    },
  }

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-linear-to-b from-white via-white to-white dark:from-black dark:via-black dark:to-black" />
      <div className="absolute inset-0 -z-10 opacity-70 mask-[radial-gradient(60%_50%_at_50%_12%,black,transparent)]">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.04)_1px,transparent_1px)] bg-size-[52px_52px] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)]" />
      </div>

      <GlowBlob
        delay={0}
        className="pointer-events-none absolute -top-24 left-1/2 -z-10 h-112 w-md -translate-x-[70%] rounded-full bg-linear-to-tr from-emerald-300/50 via-sky-300/40 to-indigo-300/40 blur-3xl dark:from-emerald-500/20 dark:via-sky-500/20 dark:to-indigo-500/20"
      />
      <GlowBlob
        delay={1.2}
        className="pointer-events-none absolute -top-32 left-1/2 -z-10 h-120 w-120 -translate-x-[-5%] rounded-full bg-linear-to-tr from-fuchsia-300/40 via-rose-300/30 to-amber-300/30 blur-3xl dark:from-fuchsia-500/15 dark:via-rose-500/15 dark:to-amber-500/15"
      />

      <div className="mx-auto max-w-6xl px-6 pb-20 pt-20 sm:pb-28 sm:pt-28">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.4 }}
          className="grid items-center gap-12 lg:grid-cols-2"
        >
          <div className="space-y-7">
            <motion.div variants={item}>
              <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/70 px-3 py-1 text-sm text-zinc-700 backdrop-blur dark:border-white/10 dark:bg-black/40 dark:text-zinc-200">
                <span className="inline-block h-2 w-2 rounded-full bg-emerald-500" />
                Voice-first medical guidance, 24/7
              </div>
            </motion.div>

            <motion.h1
              variants={item}
              className="text-balance text-4xl font-semibold tracking-tight text-zinc-950 dark:text-white sm:text-5xl"
            >
              Meet <span className="text-emerald-600 dark:text-emerald-400">MedCare</span>, your
              voice medical assistant—backed by 20+ specialists.
            </motion.h1>

            <motion.p
              variants={item}
              className="max-w-xl text-pretty text-lg leading-8 text-zinc-600 dark:text-zinc-300"
            >
              Describe symptoms by voice. Get structured follow-up questions, risk-aware next steps,
              and specialist-guided suggestions—fast, clear, and private.
            </motion.p>

            <motion.div variants={item} className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href="#doctors"
                className="inline-flex h-12 items-center justify-center rounded-full bg-zinc-950 px-6 text-sm font-medium text-white shadow-sm transition hover:bg-zinc-900 dark:bg-white dark:text-black dark:hover:bg-zinc-100"
              >
                Explore doctors
              </Link>
              <Link
                href="#how"
                className="inline-flex h-12 items-center justify-center rounded-full border border-black/10 bg-white/60 px-6 text-sm font-medium text-zinc-900 shadow-sm backdrop-blur transition hover:bg-white dark:border-white/10 dark:bg-black/30 dark:text-white dark:hover:bg-black/40"
              >
                See how it works
              </Link>
            </motion.div>

            <motion.div
              variants={item}
              className="flex flex-wrap gap-3 text-sm text-zinc-600 dark:text-zinc-300"
            >
              <div className="rounded-full border border-black/10 bg-white/60 px-4 py-2 backdrop-blur dark:border-white/10 dark:bg-black/30">
                HIPAA-ready architecture (configurable)
              </div>
              <div className="rounded-full border border-black/10 bg-white/60 px-4 py-2 backdrop-blur dark:border-white/10 dark:bg-black/30">
                Symptom triage + red flags
              </div>
              <div className="rounded-full border border-black/10 bg-white/60 px-4 py-2 backdrop-blur dark:border-white/10 dark:bg-black/30">
                Multilingual support
              </div>
            </motion.div>
          </div>

          <motion.div variants={item} className="relative">
            <div className="relative overflow-hidden rounded-3xl border border-black/10 bg-white/60 p-6 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.35)] backdrop-blur dark:border-white/10 dark:bg-black/30">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-10 w-10 rounded-2xl bg-linear-to-br from-emerald-500 to-sky-500" />
                  <div>
                    <div className="text-sm font-semibold text-zinc-950 dark:text-white">
                      Voice Consultation
                    </div>
                    <div className="text-xs text-zinc-600 dark:text-zinc-300">
                      Listening • analyzing • guiding
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  <span className="text-xs text-zinc-600 dark:text-zinc-300">Live</span>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                {[
                  { who: 'You', text: 'I have a sore throat and fever since yesterday.' },
                  {
                    who: 'Dotor AI',
                    text: 'Got it. Any cough, trouble breathing, or difficulty swallowing? What’s your temperature?',
                  },
                  {
                    who: 'Dotor AI',
                    text: 'Based on your answers, I’ll suggest next steps and when to seek urgent care.',
                  },
                ].map((m, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false }}
                    transition={{ delay: reduce ? 0 : 0.12 * idx, duration: 0.5 }}
                    className={`rounded-2xl border px-4 py-3 text-sm leading-6 backdrop-blur ${
                      m.who === 'You'
                        ? 'ml-auto max-w-[90%] border-black/10 bg-white/70 text-zinc-800 dark:border-white/10 dark:bg-white/10 dark:text-zinc-100'
                        : 'mr-auto max-w-[92%] border-black/10 bg-linear-to-br from-emerald-50/60 to-sky-50/60 text-zinc-900 dark:border-white/10 dark:from-emerald-500/10 dark:to-sky-500/10 dark:text-zinc-100'
                    }`}
                  >
                    <div className="mb-1 text-xs font-medium opacity-70">{m.who}</div>
                    {m.text}
                  </motion.div>
                ))}
              </div>

              <div className="mt-6">
                <div className="flex items-center justify-between text-xs text-zinc-600 dark:text-zinc-300">
                  <span>Signal clarity</span>
                  <span className="font-medium text-zinc-900 dark:text-white">Excellent</span>
                </div>
                <div className="mt-2 h-2 overflow-hidden rounded-full bg-black/5 dark:bg-white/10">
                  <motion.div
                    className="h-full w-[78%] rounded-full bg-linear-to-r from-emerald-500 to-sky-500"
                    initial={{ width: 0 }}
                    whileInView={{ width: '78%' }}
                    viewport={{ once: false }}
                    transition={{ duration: reduce ? 0.2 : 1.0, ease: 'easeOut' }}
                  />
                </div>
              </div>
            </div>

            <div className="pointer-events-none absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-emerald-400/20 blur-3xl dark:bg-emerald-400/10" />
            <div className="pointer-events-none absolute -top-12 -right-12 h-40 w-40 rounded-full bg-sky-400/20 blur-3xl dark:bg-sky-400/10" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
