import { z } from "zod";
import { SchemaTranslator, defaultTranslator } from "@/lib/i18n-zod";

const createSetPasswordSchema = (t: SchemaTranslator = defaultTranslator) => {
  return z.object({
    token: z.string().optional(),
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
  });
};

export type CreateSetPasswordSchema = z.infer<ReturnType<typeof createSetPasswordSchema>>;

export default createSetPasswordSchema;

