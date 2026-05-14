import LoginForm from "@/components/auth/components/login-form";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="flex w-full max-w-sm flex-col gap-6 rounded-lg border bg-background p-6">
          <div>
            <Skeleton className="h-7 w-24 mb-1" />
            <Skeleton className="h-5 w-64" />
          </div>
          <div className="grid gap-4">
            <div className="space-y-2">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-10 w-full" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-10 w-full" />
            </div>
            <Skeleton className="h-10 w-full mt-2" />
            <div className="flex items-center gap-4 py-2">
              <Skeleton className="h-px w-full" />
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-px w-full" />
            </div>
            <Skeleton className="h-10 w-full" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-5 w-56" />
            <Skeleton className="h-5 w-40" />
          </div>
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
