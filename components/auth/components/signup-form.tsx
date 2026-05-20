"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Link, useRouter } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { useLocale, useTranslations } from "next-intl";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import createRegisterSchema, {
  type CreateRegisterSchema,
} from "@/schemas/register-schema";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";

export default function SignupForm() {
  const t = useTranslations("auth");
  const validationT = useTranslations("auth.validations");
  const responseT = useTranslations("auth.responses");
  const locale = useLocale();
  const router = useRouter();

  const form = useForm<CreateRegisterSchema>({
    resolver: zodResolver(createRegisterSchema(validationT)),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(data: CreateRegisterSchema) {
    try {
      const response = await fetch("/api/auth/register", {
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
      router.push("/login");
    } catch (error) {
      console.error(error);
      toast.error(responseT("internal_server_error"));
    }
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
          name="name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="name">{t("full_name")}</FieldLabel>
              <Input
                {...field}
                id="name"
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
          name="password"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="password">{t("new_password")}</FieldLabel>
              <Input
                {...field}
                id="password"
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
          disabled={form.formState.isSubmitting}
          className="w-full cursor-pointer transition-opacity duration-300 hover:opacity-70"
        >
          {form.formState.isSubmitting ? (
            <Spinner />
          ) : (
            <>
              {t("create_account")} {locale === "en" ? "→" : "←"}
            </>
          )}
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

        <Button
          onClick={() => (window.location.href = "/api/auth/google/redirect")}
          variant="outline"
          className="w-full cursor-pointer"
        >
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
