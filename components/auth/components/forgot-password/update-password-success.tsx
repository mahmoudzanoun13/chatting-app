"use client";

import { buttonVariants } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { useEffect } from "react";

export default function UpdatePasswordSuccess() {
  const t = useTranslations("auth");
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/login");
    }, 2000);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <>
      <div className="flex flex-col items-center justify-center space-y-4 text-center">
        <div className="flex size-16 items-center justify-center rounded-full bg-green-500/10">
          <Check className="size-8 text-green-500" />
        </div>
        <div className="space-y-1">
          <h1 className="text-xl font-bold">
            {t("password_updated_successfully")}
          </h1>
          <p className="text-sm text-muted-foreground">
            {t("password_updated_successfully_description")}
          </p>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center space-y-2">
        <p className="text-sm text-muted-foreground">
          {t("click_here_to_login_with_your_new_password")}
        </p>
        <Link href="/login" className={cn(buttonVariants({ variant: "link" }))}>
          {t("login")}
        </Link>
      </div>
    </>
  );
}
