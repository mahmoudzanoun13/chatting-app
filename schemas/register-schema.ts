import { z } from "zod";
import { SchemaTranslator, defaultTranslator } from "@/lib/i18n-zod";

const createRegisterSchema = (t: SchemaTranslator = defaultTranslator) => {
  return z.object({
    name: z
      .string()
      .min(3, t("full_name_min", { min: 3 }))
      .max(50, t("full_name_max", { max: 50 })),
    email: z.email({ message: t("invalid_email") }),
    password: z
      .string()
      .min(8, t("password_min", { min: 8 }))
      .max(32, t("password_max", { max: 32 })),
    confirmPassword: z
      .string()
      .min(8, t("confirm_password_min", { min: 8 }))
      .max(32, t("confirm_password_max", { max: 32 })),
  }).refine((data) => data.password === data.confirmPassword, {
    message: t("passwords_do_not_match"),
    path: ["confirmPassword"],
  });
};

export type CreateRegisterSchema = z.infer<ReturnType<typeof createRegisterSchema>>;

export default createRegisterSchema;