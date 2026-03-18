"use client";

import { motion, useReducedMotion } from "../components/Motion";

type Step = { title: string; desc: string };

const steps: Step[] = [
  {
    title: "Speak your symptoms",
    desc: "Start a voice conversation. Dotor AI asks crisp follow-up questions to reduce ambiguity.",
  },
  {
    title: "Get triage + guidance",
    desc: "Receive risk-aware next steps, self-care suggestions, and red-flag warnings when needed.",
  },
  {
    title: "Match to a specialist",
    desc: "Route to the right doctor profile and generate a clean summary for a visit or telehealth.",
  },
];

export default function HowItWorks() {
  const reduce = useReducedMotion();

  return (
    <section id="how" className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
      <div className="rounded-3xl border border-black/10 bg-gradient-to-br from-white/70 to-white/40 p-8 shadow-sm backdrop-blur dark:border-white/10 dark:from-black/40 dark:to-black/20 sm:p-10">
        <div className="flex flex-col gap-3">
          <h2 className="text-balance text-2xl font-semibold tracking-tight text-zinc-950 dark:text-white sm:text-3xl">
            How it works
          </h2>
          <p className="max-w-2xl text-pretty text-zinc-600 dark:text-zinc-300">
            A simple flow designed for real-world clarity—especially when users are stressed or in
            pain.
          </p>
        </div>

        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {steps.map((s, idx) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.35 }}
              transition={{ duration: reduce ? 0.2 : 0.5, delay: reduce ? 0 : 0.05 * idx }}
              whileHover={reduce ? undefined : { y: -4, scale: 1.01 }}
              whileTap={reduce ? undefined : { scale: 0.99 }}
              className="rounded-3xl border border-black/10 bg-white/60 p-6 backdrop-blur dark:border-white/10 dark:bg-black/30"
            >
              <div className="flex items-center gap-3">
                <div className="grid h-9 w-9 place-items-center rounded-2xl bg-zinc-950 text-sm font-semibold text-white dark:bg-white dark:text-black">
                  {idx + 1}
                </div>
                <div className="text-base font-semibold text-zinc-950 dark:text-white">
                  {s.title}
                </div>
              </div>
              <p className="mt-3 text-sm leading-6 text-zinc-600 dark:text-zinc-300">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

