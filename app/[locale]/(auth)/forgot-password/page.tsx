import ForgotPasswordForm from "@/components/auth/components/forgot-password/forgot-password-form";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";

export default function ForgotPasswordPage() {
  return (
    <Suspense
      fallback={
        <div className="flex w-full max-w-sm flex-col gap-6 rounded-lg border bg-background p-6">
          <div>
            <Skeleton className="h-7 w-40 mb-1" />
            <Skeleton className="h-5 w-64" />
          </div>
          <div className="grid gap-4">
            <div className="space-y-2">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-10 w-full" />
            </div>
            <Skeleton className="h-10 w-full mt-2" />
          </div>
          <Skeleton className="h-5 w-32" />
        </div>
      }
    >
      <ForgotPasswordForm />
    </Suspense>
  );
}
