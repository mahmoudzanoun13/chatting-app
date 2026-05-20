import prisma from "@/lib/prisma";
import createResetPasswordSchema from "@/schemas/reset-password-schema";
import { jsonResponse } from "@/lib/api-response";
import { parseZodMessage } from "@/lib/i18n-zod";
import { generateToken, hashToken } from "@/lib/token";
import { checkRateLimit } from "@/lib/rate-limit";
import { createTransporter } from "@/lib/mailer";
import nodemailer from "nodemailer";

const schema = createResetPasswordSchema();

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validation = schema.safeParse(body);

    if (!validation.success) {
      const { key, params } = parseZodMessage(validation.error.issues[0].message);
      return jsonResponse(false, null, key, params, 400);
    }

    const { email } = validation.data;

    if (!checkRateLimit(email)) {
      return jsonResponse(false, null, "too_many_requests", {}, 429);
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    // prevent email enumeration
    if (!user) {
      return jsonResponse(true, null, "reset_email_sent", {}, 200);
    }

    // remove old reset tokens for this user
    await prisma.resetToken.deleteMany({
      where: { userId: user.id },
    });

    // generate new token
    const token = generateToken();
    const hashedToken = hashToken(token);

    const expiresAt = new Date(Date.now() + 1000 * 60 * 60); // 1 hour

    await prisma.resetToken.create({
      data: {
        userId: user.id,
        token: hashedToken,
        expiresAt,
        used: false,
      },
    });

    const resetLink = `${process.env.NEXT_PUBLIC_APP_URL}/en/forgot-password?step=set&token=${token}`;

    const { transporter } = await createTransporter();

    const message = {
      from: '"ChattingApp" <no-reply@chatting-app.com>',
      to: user.email,
      subject: "Reset your password",
      html: `
        <h2>Password Reset</h2>
        <p>Click below to reset your password:</p>
        <a href="${resetLink}">Reset Password</a>
      `,
    };

    const info = await transporter.sendMail(message);
    console.log("Preview URL:", nodemailer.getTestMessageUrl(info));

    return jsonResponse(true, null, "reset_email_sent", {}, 200);
  } catch (err) {
    console.error(err);
    return jsonResponse(false, null, "internal_server_error", {}, 500);
  }
}
