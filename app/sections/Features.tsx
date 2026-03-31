'use client'
import { motion, useHydrationSafeReducedMotion } from '../components/Motion'
type Feature = { title: string; desc: string }
const features: Feature[] = [
  {
    title: 'Voice-first symptom capture',
    desc: 'Natural, conversational intake that turns speech into structured clinical notes.',
  },
  {
    title: 'Risk-aware triage',
    desc: 'Detects red flags and suggests the right level of care—self-care, clinic, or urgent.',
  },
  {
    title: 'Specialist-backed guidance',
    desc: 'Coverage across common specialties with consistent questioning and next-step clarity.',
  },
  {
    title: 'Privacy by design',
    desc: 'Minimize data retention and keep controls configurable for your deployment needs.',
  },
  {
    title: 'Multilingual support',
    desc: 'Handle diverse patients with language-aware prompting and culturally sensitive phrasing.',
  },
  {
    title: 'Fast handoff',
    desc: 'Generate a concise summary for a doctor or telehealth visit in seconds.',
  },
]
export default function Features() {
  const reduce = useHydrationSafeReducedMotion()
  return (
    <section id="features" className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
      <div className="flex flex-col gap-4">
        <h2 className="text-balance text-2xl font-semibold tracking-tight text-zinc-950 dark:text-white sm:text-3xl">
          Built for clarity, speed, and safer next steps.
        </h2>
        <p className="max-w-2xl text-pretty text-zinc-600 dark:text-zinc-300">
          A landing-page foundation you can extend into the full product: voice UI, doctor matching,
          and clinical summarization.
        </p>
      </div>
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((f, idx) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: reduce ? 0.2 : 0.5, delay: reduce ? 0 : 0.05 * idx }}
            whileHover={reduce ? undefined : { y: -4, scale: 1.01 }}
            whileTap={reduce ? undefined : { scale: 0.99 }}
            className="group rounded-3xl border border-black/10 bg-white/60 p-6 shadow-sm backdrop-blur transition hover:bg-white dark:border-white/10 dark:bg-black/30 dark:hover:bg-black/40"
          >
            <div className="flex items-start gap-3">
              <div className="mt-1 h-3 w-3 shrink-0 rounded-full bg-linear-to-r from-emerald-500 to-sky-500" />
              <div>
                <div className="text-base font-semibold text-zinc-950 dark:text-white">
                  {f.title}
                </div>
                <div className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-300">
                  {f.desc}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
