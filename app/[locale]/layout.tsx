import type { Metadata } from "next";
import { Inter, Noto_Sans_Arabic } from "next/font/google";
import "@/app/globals.css";
import { DirectionProvider } from "@/components/ui/direction";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { cn } from "@/lib/utils";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server";
import { Toaster } from "sonner";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const notoArabic = Noto_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["400", "700"],
  variable: "--font-rtl",
  display: "swap",
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  const baseUrl = new URL(
    process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  );

  return {
    metadataBase: baseUrl,
    title: t("title"),
    description: t("description"),
    keywords: [t("title"), t("description"), "chat", "app"],
    authors: [{ name: t("name") }],
    creator: t("name"),
    publisher: t("name"),
    alternates: {
      languages: {
        [routing.defaultLocale]: "/",
        [locale]: `/${locale}`,
      },
    },
    openGraph: {
      title: t("title"),
      description: t("description"),
      siteName: t("title"),
      locale: locale,
      type: "website",
    },
    twitter: {
      title: t("title"),
      description: t("description"),
      creator: t("name"),
      images: "/og-image.png",
    },
    robots: {
      index: false,
      follow: false,
      googleBot: {
        index: false,
        follow: false,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    icons: {
      icon: "/favicon.ico",
      shortcut: "/favicon.ico",
      apple: "/favicon.ico",
      other: [
        { rel: "icon", url: "/favicon.ico" },
        { rel: "icon", type: "image/png", url: "/favicon.png" },
      ],
    },
    applicationName: t("title"),
    other: {
      "theme-color": "#000000",
      "color-scheme": "dark light",
    },
  };
}

export async function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<Props>) {
  // Ensure that the incoming `locale` is valid
  const { locale } = await params;
  const dir = locale === "en" ? "ltr" : "rtl";

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <html
      lang={locale ?? "en"}
      dir={dir ?? "ltr"}
      className={cn(
        "h-full",
        "antialiased",
        inter.variable,
        notoArabic.variable,
      )}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <DirectionProvider direction={dir || "ltr"}>
            <NextIntlClientProvider messages={messages}>
              {children}
              <Toaster richColors position="bottom-right" />
            </NextIntlClientProvider>
          </DirectionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
