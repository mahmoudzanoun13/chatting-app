import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { getTranslations } from "next-intl/server";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";

type Props = {
  params: Promise<{ locale: string }>;
};

function AboutSkeleton() {
  return (
    <section className="mx-auto max-w-7xl space-y-10 px-4 py-16">
      <div className="mx-auto max-w-xl text-center">
        <Skeleton className="mx-auto mt-4 h-10 w-64 md:h-12" />
        <Skeleton className="mx-auto mt-2 h-5 w-full max-w-md" />
        <Skeleton className="mx-auto mt-1 h-5 w-3/4 max-w-sm" />
      </div>

      <div className="mx-auto w-full max-w-md space-y-4 pt-10">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="border-b last:border-0 last:pb-0 pb-4">
            <Skeleton className="h-6 w-full" />
          </div>
        ))}
      </div>
    </section>
  );
}

async function AboutContent({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: "about" });
  return (
    <section className="mx-auto max-w-7xl space-y-10 px-4 py-16">
      <div className="mx-auto max-w-xl text-center">
        <h1 className="mt-4 text-balance text-3xl font-bold tracking-tighter md:text-4xl">
          {t("title")}
        </h1>
        <p className="mt-2 text-balance text-base text-muted-foreground">
          {t("description")}
        </p>
      </div>

      <Accordion
        defaultValue={["what_is_chattingapp"]}
        className="mx-auto w-full max-w-md text-sm"
      >
        <AccordionItem value="what_is_chattingapp">
          <AccordionTrigger>{t("what_is_chattingapp")}</AccordionTrigger>
          <AccordionContent className="text-muted-foreground">
            {t("what_is_chattingapp_description")}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="what_features_does_the_app_support">
          <AccordionTrigger>
            {t("what_features_does_the_app_support")}
          </AccordionTrigger>
          <AccordionContent className="text-muted-foreground">
            {t("what_features_does_the_app_support_description")}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="which_technologies_are_used">
          <AccordionTrigger>
            {t("which_technologies_are_used")}
          </AccordionTrigger>
          <AccordionContent className="text-muted-foreground">
            {t("which_technologies_are_used_description")}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="why_was_this_project_created">
          <AccordionTrigger>
            {t("why_was_this_project_created")}
          </AccordionTrigger>
          <AccordionContent className="text-muted-foreground">
            {t("why_was_this_project_created_description")}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="what_are_the_future_plans">
          <AccordionTrigger>{t("what_are_the_future_plans")}</AccordionTrigger>
          <AccordionContent className="text-muted-foreground">
            {t("what_are_the_future_plans_description")}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </section>
  );
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  return (
    <Suspense fallback={<AboutSkeleton />}>
      <AboutContent locale={locale} />
    </Suspense>
  );
}
