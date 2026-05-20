import { NextRequest } from "next/server";
import { OAuth2Client } from "google-auth-library";
import prisma from "@/lib/prisma";
import jwt from "jsonwebtoken";
import { jsonResponse } from "@/lib/api-response";

const client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI
);

const JWT_SECRET = process.env.JWT_SECRET!;
const JWT_EXPIRES_IN = Number(process.env.JWT_EXPIRES_IN ?? 3600);

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const code = url.searchParams.get("code");

    if (!code) return jsonResponse(false, null, "missing_code", {}, 400);

    // Exchange code for tokens
    const { tokens } = await client.getToken(code);
    client.setCredentials(tokens);

    // Get user info
    const ticket = await client.verifyIdToken({
      idToken: tokens.id_token!,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    if (!payload?.email || !payload.name) {
      return jsonResponse(false, null, "invalid_google_token", {}, 400);
    }

    // Check or create user
    let user = await prisma.user.findUnique({
      where: { email: payload.email },
    });

    let userCreated = false;
    if (!user) {
      user = await prisma.user.create({
        data: {
          name: payload.name,
          email: payload.email,
          avatar: payload.picture,
          password: "",
        },
      });
      userCreated = true;
    }

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });

    const messageKey = userCreated ? "registration_success" : "login_success";

    // Redirect to front-end with JWT cookie
    const response = jsonResponse(true, { ...user }, messageKey, {}, 200);
    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: JWT_EXPIRES_IN,
      path: "/",
    });

    const redirectUrl = `/chat${userCreated ? "?newRegistration=true" : "?successLogin=true"}`;

    response.headers.set("Location", redirectUrl);
    return new Response(null, { status: 302, headers: response.headers });
  } catch (err) {
    console.error(err);
    return jsonResponse(false, null, "internal_server_error", {}, 500);
  }
}
