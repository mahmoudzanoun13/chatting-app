import { CurrentYear } from "@/components/custom/current-year";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col w-full items-center justify-center gap-10 py-10 md:min-h-[calc(100vh-192px)]">
      {children}
      <p dir="ltr" className="text-sm text-muted-foreground">
        ©{" "}
        <Suspense fallback={<Skeleton className="inline-block h-3 w-10" />}>
          <CurrentYear />
        </Suspense>{" "}
        ChattingApp
      </p>
    </section>
  );
}
