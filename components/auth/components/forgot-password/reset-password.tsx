"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { useLocale, useTranslations } from "next-intl";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import createResetPasswordSchema, {
  type CreateResetPasswordSchema,
} from "@/schemas/reset-password-schema";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";

type ResetPasswordProps = {
  nextStep: () => void;
};

export default function ResetPassword({ nextStep }: ResetPasswordProps) {
  const t = useTranslations("auth");
  const validationT = useTranslations("auth.validations");
  const responseT = useTranslations("auth.responses");
  const locale = useLocale();

  const form = useForm<CreateResetPasswordSchema>({
    resolver: zodResolver(createResetPasswordSchema(validationT)),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(data: CreateResetPasswordSchema) {
    try {
      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      const messageKey = result.message ?? "internal_server_error";

      if (!result.success) {
        const translatedMessage = t.has(`responses.${messageKey}`)
          ? responseT(messageKey)
          : validationT(messageKey, result.params);

        toast.error(translatedMessage);
        return;
      }

      toast.success(responseT(messageKey));
      form.reset();
    } catch (error) {
      console.error(error);
      toast.error(responseT("internal_server_error"));
    }
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
          disabled={form.formState.isSubmitting}
          className="w-full cursor-pointer transition-opacity duration-300 hover:opacity-70"
        >
          {form.formState.isSubmitting ? <Spinner /> : t("send_reset_email")}
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
