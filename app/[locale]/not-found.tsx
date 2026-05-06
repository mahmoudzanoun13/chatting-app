import { buttonVariants } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";

export default async function NotFoundPage() {
  const t = await getTranslations("not_found");
  return (
    <section className="mx-auto max-w-7xl space-y-6 px-4 py-32">
      <div className="space-y-2 text-center">
        <span className="font-semibold uppercase text-muted-foreground">
          404
        </span>
        <h1 className="text-balance text-3xl font-bold tracking-tight">
          {t("title")}
        </h1>
        <p className="text-balance text-muted-foreground">{t("description")}</p>
      </div>

      <div className="flex flex-col items-center justify-center gap-2 md:flex-row">
        <Link href="/" className={buttonVariants({ size: "sm" })}>
          {t("go_home")}
        </Link>
      </div>
    </section>
  );
}
