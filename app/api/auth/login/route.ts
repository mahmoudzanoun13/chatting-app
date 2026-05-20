import prisma from "@/lib/prisma";
import createLoginSchema from "@/schemas/login-schema";
import bcrypt from "bcrypt";
import { NextRequest } from "next/server";
import { jsonResponse } from "@/lib/api-response";
import { parseZodMessage } from "@/lib/i18n-zod";
import jwt from "jsonwebtoken";

const schema = createLoginSchema();
const JWT_SECRET = process.env.JWT_SECRET!;
const JWT_EXPIRES_IN = Number(process.env.JWT_EXPIRES_IN ?? 3600);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const validation = schema.safeParse(body);

    if (!validation.success) {
      const { key, params } = parseZodMessage(validation.error.issues[0].message);

      if (process.env.NODE_ENV === "development") {
        console.warn(`Validation failed [${req.method}] ${req.url}`);
        console.warn("Body:", body);
        console.warn("Error details:", validation.error.issues);
      }

      return jsonResponse(false, null, key, params, 400);
    }

    const { email, password } = validation.data;

    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        name: true,
        email: true,
        avatar: true,
        password: true,
      },
    });

    if (!user) {
      return jsonResponse(false, null, "invalid_credentials", {}, 401);
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return jsonResponse(false, null, "invalid_credentials", {}, 401);
    }

    // Generate JWT
    const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });

    // Remove password from response
    const { password: _, ...userData } = user;

    // Set JWT as HTTP-only cookie
    const response = jsonResponse(true, userData, "login_success", {}, 200);
    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: JWT_EXPIRES_IN,
      path: "/",
    });

    return response;
  } catch (error) {
    console.error(error);
    return jsonResponse(false, null, "internal_server_error", {}, 500);
  }
}
