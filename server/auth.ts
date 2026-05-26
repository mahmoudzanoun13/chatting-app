import jwt from "jsonwebtoken";

interface JwtPayload {
  userId: number;
}

export function verifySocketToken(token: string): { userId: number } | null {
  try {
    const secret = process.env.JWT_SECRET;
    if (!secret) throw new Error("JWT_SECRET missing");

    const payload = jwt.verify(token, secret) as JwtPayload;

    return { userId: payload.userId };
  } catch {
    return null;
  }
}
