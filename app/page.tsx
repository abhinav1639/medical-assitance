import BackgroundCanvas from '@/app/components/BackgroundCanvas'
import Link from 'next/link'
import CTA from './sections/CTA'
import Doctors from './sections/Doctors'
import Features from './sections/Features'
import Hero from './sections/Hero'
import HowItWorks from './sections/HowItWorks'
import CurrentUser from './hooks/useCurrentUser'

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-zinc-950 dark:bg-black dark:text-white">
      <CurrentUser />
      <BackgroundCanvas />
      <header className="sticky top-0 z-50 border-b border-black/5 bg-white/70 backdrop-blur dark:border-white/10 dark:bg-black/40">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <a href="#top" className="flex items-center gap-2">
            <span className="inline-block h-8 w-8 rounded-2xl bg-linear-to-br from-emerald-500 to-sky-500" />
            <span className="text-sm font-semibold tracking-tight">MedCare</span>
          </a>
          <nav className="hidden items-center gap-6 text-sm text-zinc-600 dark:text-zinc-300 sm:flex">
            <a className="hover:text-zinc-950 dark:hover:text-white" href="#features">
              Features
            </a>
            <a className="hover:text-zinc-950 dark:hover:text-white" href="#doctors">
              Doctors
            </a>
            <a className="hover:text-zinc-950 dark:hover:text-white" href="#how">
              How it works
            </a>
          </nav>
          <Link
            href="/SignUp"
            className="inline-flex h-10 items-center justify-center rounded-full bg-zinc-950 px-4 text-xs font-medium text-white transition hover:bg-zinc-900 dark:bg-white dark:text-black dark:hover:bg-zinc-100"
          >
            Get started
          </Link>
        </div>
      </header>

      <main id="top">
        <Hero />
        <Features />
        <Doctors />
        <HowItWorks />
        <CTA />
      </main>

      <footer className="border-t border-black/5 py-10 text-sm text-zinc-600 dark:border-white/10 dark:text-zinc-300">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div className="font-medium text-zinc-900 dark:text-white">MedCare</div>
            <div>© {new Date().getFullYear()} All rights reserved.</div>
          </div>
        </div>
      </footer>
    </div>
  )
}
