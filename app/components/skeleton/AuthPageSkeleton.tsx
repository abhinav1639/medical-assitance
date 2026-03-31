import { Skeleton } from "./Skeleton";

export function AuthPageSkeleton() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center p-6">
      <div className="w-full max-w-md space-y-6 rounded-2xl border border-border/50 bg-card p-8 shadow-sm">
        <div className="space-y-2 text-center">
          <Skeleton className="h-8 w-40 mx-auto" />
          <Skeleton className="h-4 w-56 mx-auto" />
        </div>
        <div className="space-y-4">
          <Skeleton className="h-11 w-full rounded-xl" />
          <Skeleton className="h-11 w-full rounded-xl" />
          <Skeleton className="h-11 w-full rounded-xl" />
        </div>
        <Skeleton className="h-10 w-full rounded-xl" />
      </div>
    </div>
  );
}
