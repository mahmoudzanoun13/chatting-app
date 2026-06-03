"use client";

import { ThemeProvider } from "./theme-provider";
import { DirectionProvider } from "@/components/ui/direction";
import { Toaster } from "sonner";
import AuthProvider from "./auth-provider";
import {
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Suspense } from "react";
import { queryClient } from "@/lib/query-client";

type Props = {
  children: React.ReactNode;
  dir: "ltr" | "rtl";
};

export default function ClientProviders({ children, dir }: Props) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <DirectionProvider direction={dir ?? "ltr"}>
          <Suspense fallback={null}>
            <AuthProvider>{children}</AuthProvider>
          </Suspense>
          <Toaster richColors position="bottom-right" />
        </DirectionProvider>
      </ThemeProvider>
      {process.env.NODE_ENV !== "production" && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </QueryClientProvider>
  );
}
