import { _Translator } from "next-intl";
import { z } from "zod"

 export const createResetPasswordSchema = (t: _Translator) => {
  return z.object({
    email: z.email({ message: t("invalid_email") }),
  })
}

export type CreateResetPasswordSchema = z.infer<ReturnType<typeof createResetPasswordSchema>>;


export const createSetPasswordSchema = (t: _Translator) => {
  return z.object({
    newPassword: z
      .string()
      .min(8, t("password_min", { min: 8 }))
      .max(32, t("password_max", { max: 32 })),
    confirmNewPassword: z
      .string()
      .min(8, t("confirm_password_min", { min: 8 }))
      .max(32, t("confirm_password_max", { max: 32 })),
  }).refine((data) => data.newPassword === data.confirmNewPassword, {
    message: t("passwords_do_not_match"),
    path: ["confirmNewPassword"],
  })
}

export type CreateSetPasswordSchema = z.infer<ReturnType<typeof createSetPasswordSchema>>;
