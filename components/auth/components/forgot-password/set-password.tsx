"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { useLocale, useTranslations } from "next-intl";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import createSetPasswordSchema, {
  type CreateSetPasswordSchema,
} from "@/schemas/set-password-schema";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";
import { useSearchParams } from "next/navigation";
import { useAuthStore } from "@/stores/auth-store";

type SetPasswordProps = {
  nextStep: () => void;
};

export default function SetPassword({ nextStep }: SetPasswordProps) {
  const t = useTranslations("auth");
  const validationT = useTranslations("auth.validations");
  const responseT = useTranslations("auth.responses");
  const locale = useLocale();
  const searchParams = useSearchParams();
  const token = searchParams.get("token") ?? "";
  const fetchMe = useAuthStore((state) => state.fetchMe);

  const form = useForm<CreateSetPasswordSchema>({
    resolver: zodResolver(createSetPasswordSchema(validationT)),
    defaultValues: {
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  async function onSubmit(data: CreateSetPasswordSchema) {
    try {
      const response = await fetch("/api/auth/set-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...data, token }),
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
      await fetchMe();
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
          {t("set_a_new_password")}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {t("set_password_description")}
        </p>
      </div>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        noValidate
        className="grid gap-4"
      >
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
          name="confirmNewPassword"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="confirmNewPassword">
                {t("confirm_new_password")}
              </FieldLabel>
              <Input
                {...field}
                id="confirmNewPassword"
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
          disabled={form.formState.isSubmitting}
          className="w-full cursor-pointer transition-opacity duration-300 hover:opacity-70"
        >
          {form.formState.isSubmitting ? <Spinner /> : t("set_new_password")}
        </Button>
      </form>
      <p className="text-sm">
        {locale === "ar" ? "→" : "←"} {t("back_to")}{" "}
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
