import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import { jsonResponse } from "./api-response";

interface JwtPayload {
  userId: number;
  iat?: number;
  exp?: number;
}

/**
 * Verify JWT from HTTP-only cookie
 * @param req NextRequest
 * @returns userId if valid, null if invalid or missing
 */

export function verifyAuthCookie(req: NextRequest): { userId: number } | null {
  try {
    const token = req.cookies.get("token")?.value;
    if (!token) return null;

    const secret = process.env.JWT_SECRET;
    if (!secret) throw new Error("JWT_SECRET is not set in environment variables");

    const payload = jwt.verify(token, secret) as JwtPayload;

    return { userId: payload.userId };
  } catch (err) {
    console.warn("JWT verification failed:", err);
    return null;
  }
}

/**
 * Middleware helper for protected routes
 */

export function requireAuth(req: NextRequest) {
  const user = verifyAuthCookie(req);
  if (!user) {
    return jsonResponse(false, null, "unauthorized", {}, 401);
  }
  return user;
}
