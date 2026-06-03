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
        conversations1: {
          where: {
            user2Id: auth.userId,
          },
          select: { id: true },
        },
        conversations2: {
          where: {
            user1Id: auth.userId,
          },
          select: { id: true },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const transformedUsers = users.map((user) => {
      const conversation = user.conversations1[0] || user.conversations2[0];
      return {
        id: user.id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        createdAt: user.createdAt,
        conversationId: conversation?.id,
      };
    });

    return jsonResponse(true, transformedUsers, "users_fetched_successfully", {}, 200);
  } catch (err) {
    console.error(err);
    return jsonResponse(false, null, "internal_server_error", {}, 500);
  }
}
