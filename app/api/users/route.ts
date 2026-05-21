import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { jsonResponse } from "@/lib/api-response";
import { verifyAuthCookie } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    const auth = verifyAuthCookie(req);

    if (!auth) {
      return jsonResponse(false, null, "unauthorized", {}, 401);
    }

    const users = await prisma.user.findMany({
      where: {
        id: {
          not: auth.userId,
        },
      },
      select: {
        id: true,
        name: true,
        email: true,
        avatar: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return jsonResponse(true, users, "users_fetched_successfully", {}, 200);
  } catch (err) {
    console.error(err);
    return jsonResponse(false, null, "internal_server_error", {}, 500);
  }
}
