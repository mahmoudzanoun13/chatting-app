import { Skeleton } from "@/components/ui/skeleton";

export function MessagesListSkeleton() {
  return (
    <div className="flex flex-col h-full w-full justify-end max-h-[calc(100vh-357px)] lg:max-h-[calc(100vh-317px)]">
      {/* TopBar Skeleton */}
      <div className="flex items-center justify-between py-2 mb-auto">
        <div className="flex items-center gap-2">
          <div className="relative">
            <Skeleton className="size-8 rounded-full" />
          </div>
          <div className="flex flex-col gap-1">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-3 w-12" />
          </div>
        </div>
        <Skeleton className="h-8 w-8 rounded-md" />
      </div>

      {/* Messages Skeleton */}
      <div className="flex-1 flex flex-col gap-4 overflow-y-auto py-4 pe-2">
        <div className="flex justify-end">
          <Skeleton className="h-12 w-[60%] rounded-2xl rounded-tr-none" />
        </div>
        <div className="flex justify-start">
          <Skeleton className="h-16 w-[70%] rounded-2xl rounded-tl-none" />
        </div>
        <div className="flex justify-end">
          <Skeleton className="h-10 w-[40%] rounded-2xl rounded-tr-none" />
        </div>
        <div className="flex justify-start">
          <Skeleton className="h-20 w-[80%] rounded-2xl rounded-tl-none" />
        </div>
      </div>

      {/* Input Skeleton */}
      <div className="flex w-full items-end gap-2 pt-2">
        <Skeleton className="h-12 flex-1 rounded-xl" />
        <Skeleton className="h-12 w-12 rounded-full shrink-0" />
      </div>
    </div>
  );
}
