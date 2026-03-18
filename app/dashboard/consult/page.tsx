export default function ConsultPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-balance text-2xl font-semibold tracking-tight sm:text-3xl">
          Voice consult
        </h1>
        <p className="mt-2 max-w-2xl text-pretty text-zinc-600 dark:text-zinc-300">
          UI placeholder. Next we’ll implement microphone capture + streaming voice pipeline and
          save each consult to Neon.
        </p>
      </div>

      <div className="rounded-3xl border border-black/10 bg-white/70 p-6 backdrop-blur dark:border-white/10 dark:bg-black/25">
        <div className="text-sm font-semibold text-zinc-950 dark:text-white">Coming next</div>
        <div className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-300">
          - Start/stop recording
          <br />- Live transcription
          <br />- Real-time assistant response
          <br />- Clinical summary + “when to seek urgent care”
        </div>
      </div>
    </div>
  );
}

