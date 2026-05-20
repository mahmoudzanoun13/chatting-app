import prisma from "@/lib/prisma";
import createSetPasswordSchema from "@/schemas/set-password-schema";
import { jsonResponse } from "@/lib/api-response";
import { parseZodMessage } from "@/lib/i18n-zod";
import bcrypt from "bcrypt";
import { hashToken } from "@/lib/token";

const schema = createSetPasswordSchema();

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validation = schema.safeParse(body);

    if (!validation.success) {
      const { key, params } = parseZodMessage(validation.error.issues[0].message);
      return jsonResponse(false, null, key, params, 400);
    }

    const { token, newPassword } = validation.data;

    if (!token) {
      return jsonResponse(false, null, "invalid_or_expired_token", {}, 400);
    }

    const hashedToken = hashToken(token);

    const result = await prisma.$transaction(async (tx) => {
      const tokenRecord = await tx.resetToken.findFirst({
        where: {
          token: hashedToken,
          used: false,
          expiresAt: { gt: new Date() },
        },
        select: {
          id: true,
          userId: true,
        },
      });

      if (!tokenRecord) {
        return null;
      }

      // Consume token (atomic safety)
      await tx.resetToken.update({
        where: { id: tokenRecord.id },
        data: { used: true },
      });

      const hashedPassword = await bcrypt.hash(newPassword, 10);

      await tx.user.update({
        where: { id: tokenRecord.userId },
        data: {
          password: hashedPassword,
        },
      });

      return true;
    });

    if (!result) {
      return jsonResponse(false, null, "invalid_or_expired_token", {}, 400);
    }

    return jsonResponse(true, null, "password_reset_success", {}, 200);
  } catch (err) {
    console.error(err);
    return jsonResponse(false, null, "internal_server_error", {}, 500);
  }
}
