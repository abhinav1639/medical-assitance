import { currentUser } from "@clerk/nextjs/server";

export default async function SettingsPage() {
  const user = await currentUser();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-balance text-2xl font-semibold tracking-tight sm:text-3xl">
          Settings
        </h1>
        <p className="mt-2 max-w-2xl text-pretty text-zinc-600 dark:text-zinc-300">
          Account + privacy settings. (You can also manage profile details from the user menu.)
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-3xl border border-black/10 bg-white/70 p-6 backdrop-blur dark:border-white/10 dark:bg-black/25">
          <div className="text-sm font-semibold text-zinc-950 dark:text-white">Profile</div>
          <div className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
            <div>
              <span className="font-medium text-zinc-900 dark:text-white">Name:</span>{" "}
              {user?.fullName ?? "—"}
            </div>
            <div className="mt-1">
              <span className="font-medium text-zinc-900 dark:text-white">User ID:</span>{" "}
              {user?.id ?? "—"}
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-black/10 bg-white/70 p-6 backdrop-blur dark:border-white/10 dark:bg-black/25">
          <div className="text-sm font-semibold text-zinc-950 dark:text-white">Privacy</div>
          <div className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-300">
            Coming next: data retention controls, export/delete history, and consent screens for
            voice capture.
          </div>
        </div>
      </div>
    </div>
  );
}

