import { _Translator } from "next-intl";
import { z } from "zod"

const createSignupSchema = (t: _Translator) => {
  return z.object({
    fullName: z
      .string()
      .min(3, t("full_name_min", { min: 3 }))
      .max(50, t("full_name_max", { max: 50 })),
    email: z.email({ message: t("invalid_email") }),
    newPassword: z
      .string()
      .min(8, t("password_min", { min: 8 }))
      .max(32, t("password_max", { max: 32 })),
    confirmPassword: z
      .string()
      .min(8, t("confirm_password_min", { min: 8 }))
      .max(32, t("confirm_password_max", { max: 32 })),
  }).refine((data) => data.newPassword === data.confirmPassword, {
    message: t("passwords_do_not_match"),
    path: ["confirmPassword"],
  })
}

export type CreateSignupSchema = z.infer<ReturnType<typeof createSignupSchema>>;

export default createSignupSchema;