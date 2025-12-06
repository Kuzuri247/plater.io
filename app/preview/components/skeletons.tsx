export const LeftSidebarSkeleton = () => (
  <div className="hidden lg:flex flex-col gap-4 w-64 shrink-0 p-4">
    <div className="h-8 w-8 rounded-full bg-neutral-200 dark:bg-neutral-800 mb-4" />
    <div className="space-y-4">
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="flex items-center gap-3">
          <div className="h-6 w-6 rounded-full bg-neutral-200 dark:bg-neutral-700" />
          <div className="h-4 w-24 rounded bg-neutral-300 dark:bg-neutral-800" />
        </div>
      ))}
    </div>
    <div className="mt-auto h-12 w-full rounded-full bg-primary/10" />
  </div>
);

export const RightSidebarSkeleton = () => (
  <div className="hidden xl:flex flex-col gap-4 w-72 shrink-0 p-4 pl-8">
    <div className="h-10 w-full rounded-full bg-neutral-300 dark:bg-neutral-800 mb-2" />
    <div className="rounded-xl bg-neutral-200 dark:bg-neutral-800 p-4 space-y-4">
      <div className="h-4 w-1/3 rounded bg-neutral-300 dark:bg-neutral-700" />
      {[1, 2, 3].map((i) => (
        <div key={i} className="space-y-2">
          <div className="flex justify-between">
            <div className="h-3 w-1/4 rounded bg-neutral-300 dark:bg-neutral-800" />
            <div className="h-3 w-3 rounded bg-neutral-300 dark:bg-neutral-800" />
          </div>
          <div className="h-4 w-3/4 rounded bg-neutral-200 dark:bg-neutral-700" />
        </div>
      ))}
    </div>
  </div>
);
