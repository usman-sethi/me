import { Skeleton } from "@/components/shared/skeleton";

export default function ProjectsLoading() {
  return (
    <section className="content-grid py-16 md:py-24" aria-busy="true" aria-live="polite">
      <Skeleton className="h-10 w-48" />
      <Skeleton className="mt-4 h-5 w-96 max-w-full" />
      <div className="mt-8 flex gap-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-8 w-24 rounded-full" />
        ))}
      </div>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="aspect-[3/2]" />
        ))}
      </div>
    </section>
  );
}
