"use client";

import { ThemeProvider } from "./theme-provider";
import { DirectionProvider } from "@/components/ui/direction";
import { Toaster } from "sonner";
import AuthProvider from "./auth-provider";
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";

type Props = {
  children: React.ReactNode;
  dir: "ltr" | "rtl";
};

export default function ClientProviders({ children, dir }: Props) {
  // Create a client instance using useState to prevent re-renders on every render whether its from theme provider or direction provider or auth provider or toaster or react query devtools
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: Infinity,
            retry: 1,
            refetchOnWindowFocus: false,
          },
        },
      })
  );
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <DirectionProvider direction={dir ?? "ltr"}>
          <AuthProvider>{children}</AuthProvider>
          <Toaster richColors position="bottom-right" />
        </DirectionProvider>
      </ThemeProvider>
      {process.env.NODE_ENV !== "production" && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </QueryClientProvider>
  );
}
