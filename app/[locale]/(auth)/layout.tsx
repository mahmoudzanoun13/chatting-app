import { CurrentYear } from "@/components/custom/current-year";
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
        <Suspense fallback="2026">
          <CurrentYear />
        </Suspense>{" "}
        ChattingApp
      </p>
    </section>
  );
}
