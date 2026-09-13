import { Skeleton } from "@/components/shared/skeleton";

export default function AdminDashboardLoading() {
  return (
    <div aria-busy="true" aria-live="polite">
      <div className="flex items-center justify-between">
        <Skeleton className="h-9 w-40" />
        <Skeleton className="h-10 w-32" />
      </div>
      <Skeleton className="mt-8 h-64 w-full" />
    </div>
  );
}
