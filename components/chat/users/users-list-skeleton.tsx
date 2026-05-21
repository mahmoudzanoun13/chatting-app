import { Skeleton } from "@/components/ui/skeleton";

export function UsersListSkeleton() {
  return (
    <div className="flex flex-col gap-2 py-4 pe-2">
      {Array.from({ length: 9 }).map((_, i) => (
        <div
          key={i}
          className="flex items-center gap-3 rounded-lg p-2 border border-transparent"
        >
          <Skeleton className="h-10 w-10 rounded-full shrink-0" />
          <Skeleton className="h-4 w-24" />
        </div>
      ))}
    </div>
  );
}
