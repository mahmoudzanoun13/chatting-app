import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { jsonResponse } from "@/lib/api-response";
import { verifyAuthCookie } from "@/lib/auth";

interface Params {
  params: {
    id: string;
  };
}

export async function GET(req: NextRequest, { params }: Params) {
  try {
    const auth = verifyAuthCookie(req);

    if (!auth) {
      return jsonResponse(false, null, "unauthorized", {}, 401);
    }

    const userId = Number(params.id);

    if (isNaN(userId)) {
      return jsonResponse(false, null, "invalid_user_id", {}, 400);
    }

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        name: true,
        email: true,
        avatar: true,
        createdAt: true,
      },
    });

    if (!user) {
      return jsonResponse(false, null, "user_not_found", {}, 404);
    }

    return jsonResponse(true, user, "user_fetched_successfully", {}, 200);
  } catch (err) {
    console.error(err);
    return jsonResponse(false, null, "internal_server_error", {}, 500);
  }
}
