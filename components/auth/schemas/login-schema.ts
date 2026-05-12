import { _Translator } from "next-intl";
import { z } from "zod"

const createLoginSchema = (t: _Translator) => {
  return z.object({
    email: z.email({ message: t("invalid_email") }),
    password: z
      .string()
      .min(8, t("password_min", { min: 8 }))
      .max(32, t("password_max", { max: 32 })),
  })
}

export type CreateLoginSchema = z.infer<ReturnType<typeof createLoginSchema>>;

export default createLoginSchema;