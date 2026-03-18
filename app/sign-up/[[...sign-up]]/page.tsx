import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-white text-zinc-950 dark:bg-black dark:text-white">
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-80 [mask-image:radial-gradient(60%_50%_at_50%_18%,black,transparent)]">
        <div className="absolute -top-24 left-1/2 h-[28rem] w-[28rem] -translate-x-[70%] rounded-full bg-gradient-to-tr from-emerald-300/50 via-sky-300/40 to-indigo-300/40 blur-3xl dark:from-emerald-500/15 dark:via-sky-500/15 dark:to-indigo-500/15" />
        <div className="absolute -top-32 left-1/2 h-[30rem] w-[30rem] -translate-x-[-5%] rounded-full bg-gradient-to-tr from-fuchsia-300/40 via-rose-300/30 to-amber-300/30 blur-3xl dark:from-fuchsia-500/12 dark:via-rose-500/12 dark:to-amber-500/12" />
      </div>

      <div className="mx-auto flex min-h-screen max-w-6xl items-center justify-center px-6 py-16">
        <div className="grid w-full max-w-4xl gap-10 lg:grid-cols-2 lg:items-center">
          <div className="hidden lg:block">
            <div className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">
              Dotor AI
            </div>
            <h1 className="mt-3 text-balance text-4xl font-semibold tracking-tight">
              Create your account in seconds.
            </h1>
            <p className="mt-4 max-w-md text-pretty text-zinc-600 dark:text-zinc-300">
              After signup you’ll be redirected to your dashboard, and your profile will be saved to
              the database automatically.
            </p>
          </div>

          <div className="flex justify-center lg:justify-end">
            <SignUp
              appearance={{
                elements: {
                  card: "shadow-[0_30px_80px_-50px_rgba(0,0,0,0.5)] border border-black/10 dark:border-white/10 bg-white/70 dark:bg-black/40 backdrop-blur rounded-3xl",
                },
              }}
              forceRedirectUrl="/dashboard"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

