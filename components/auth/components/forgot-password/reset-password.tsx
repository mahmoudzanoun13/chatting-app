"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { useLocale, useTranslations } from "next-intl";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createResetPasswordSchema,
  CreateResetPasswordSchema,
} from "@/components/auth/schemas/forgot-password-schema";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";

type ResetPasswordProps = {
  nextStep: () => void;
};

export default function ResetPassword({ nextStep }: ResetPasswordProps) {
  const t = useTranslations("auth");
  const validationT = useTranslations("auth.validations");
  const locale = useLocale();

  const form = useForm<CreateResetPasswordSchema>({
    resolver: zodResolver(createResetPasswordSchema(validationT)),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(data: CreateResetPasswordSchema) {
    console.log(data);
    nextStep();
  }

  return (
    <>
      <div>
        <h1 className="text-xl font-bold tracking-tight">
          {t("reset_password")}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {t("reset_password_description")}
        </p>
      </div>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        noValidate
        className="grid gap-4"
      >
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
        <Button
          type="submit"
          className="w-full cursor-pointer transition-opacity duration-300 hover:opacity-70"
        >
          {t("send_reset_email")}
        </Button>
      </form>
      <p className="text-sm">
        {locale === "ar" ? "→" : "←"} {t("back_to")}
        <Link
          href="/login"
          className={cn(buttonVariants({ variant: "link" }), "p-0.5")}
        >
          {t("login")}
        </Link>
      </p>
    </>
  );
}
