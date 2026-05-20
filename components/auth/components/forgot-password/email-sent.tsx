import { Check } from "lucide-react";
import { useTranslations } from "next-intl";

export default function EmailSent() {
  const t = useTranslations("auth");

  return (
    <div className="flex flex-col items-center justify-center space-y-4 text-center">
      <div className="flex size-16 items-center justify-center rounded-full bg-green-500/10">
        <Check className="size-8 text-green-500" />
      </div>
      <div className="space-y-1">
        <h1 className="text-xl font-bold">{t("email_sent")}</h1>
        <p className="text-sm text-muted-foreground">
          {t("email_sent_description")}
        </p>
      </div>
    </div>
  );
}
