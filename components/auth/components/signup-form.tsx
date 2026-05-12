"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { useLocale, useTranslations } from "next-intl";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import createSignupSchema, {
  CreateSignupSchema,
} from "@/components/auth/schemas/signup-schema";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";

export default function SignupForm() {
  const t = useTranslations("auth");
  const validationT = useTranslations("auth.validations");
  const locale = useLocale();

  const form = useForm<CreateSignupSchema>({
    resolver: zodResolver(createSignupSchema(validationT)),
    defaultValues: {
      fullName: "",
      email: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  function onSubmit(data: CreateSignupSchema) {
    console.log(data);
  }

  return (
    <div className="flex w-full max-w-sm flex-col gap-6 rounded-lg border bg-background p-6">
      <div>
        <h1 className="text-xl font-bold tracking-tight">
          {t("create_an_account")}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">{t("get_started")}</p>
      </div>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        autoComplete="on"
        noValidate
        className="grid gap-4"
      >
        <Controller
          name="fullName"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="fullName">{t("full_name")}</FieldLabel>
              <Input
                {...field}
                id="fullName"
                aria-invalid={fieldState.invalid}
                placeholder={t("full_name")}
                autoComplete="name"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="email">{t("email")}</FieldLabel>
              <Input
                {...field}
                id="email"
                type="email"
                aria-invalid={fieldState.invalid}
                placeholder="team@chatting-app.com"
                autoComplete="email"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="newPassword"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="newPassword">{t("new_password")}</FieldLabel>
              <Input
                {...field}
                id="newPassword"
                type="password"
                aria-invalid={fieldState.invalid}
                placeholder="••••••••"
                autoComplete="new-password"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="confirmPassword"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="confirmPassword">
                {t("confirm_password")}
              </FieldLabel>
              <Input
                {...field}
                id="confirmPassword"
                type="password"
                aria-invalid={fieldState.invalid}
                placeholder="••••••••"
                autoComplete="new-password"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Button
          type="submit"
          className="w-full cursor-pointer transition-opacity duration-300 hover:opacity-70"
        >
          {t("create_account")} {locale === "en" ? "→" : "←"}
        </Button>

        <div className="flex h-2 w-full items-center gap-4 text-muted-foreground">
          <div className="w-full">
            <Separator />
          </div>
          <p>{t("or")}</p>
          <div className="w-full">
            <Separator />
          </div>
        </div>

        <Button variant="outline" className="w-full cursor-pointer">
          {t("continue_with_google")}
        </Button>
      </form>
      <p className="text-sm">
        {t("already_have_an_account")}
        <Link
          href="/login"
          className={cn(buttonVariants({ variant: "link" }), "p-0.5")}
        >
          {t("login")}
        </Link>
      </p>
    </div>
  );
}
