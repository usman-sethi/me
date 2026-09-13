import { Skeleton } from "@/components/shared/skeleton";

export default function ProjectLoading() {
  return (
    <article className="content-grid py-16 md:py-24" aria-busy="true" aria-live="polite">
      <Skeleton className="h-4 w-32" />
      <Skeleton className="mt-6 h-12 w-96 max-w-full" />
      <Skeleton className="mt-4 h-6 w-full max-w-xl" />
      <Skeleton className="mt-10 aspect-video w-full" />
    </article>
  );
}
