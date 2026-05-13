"use client";

import { ThemeProvider } from "./theme-provider";
import { DirectionProvider } from "@/components/ui/direction";
import { Toaster } from "sonner";

type Props = {
  children: React.ReactNode;
  dir: "ltr" | "rtl";
};

export default function ClientProviders({ children, dir }: Props) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <DirectionProvider direction={dir ?? "ltr"}>
        {children}
        <Toaster richColors position="bottom-right" />
      </DirectionProvider>
    </ThemeProvider>
  );
}
