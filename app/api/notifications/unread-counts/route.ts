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

    // Get all conversations for the user
    const conversations = await prisma.conversation.findMany({
      where: {
        OR: [{ user1Id: auth.userId }, { user2Id: auth.userId }],
      },
      select: { id: true },
    });

    const conversationIds = conversations.map((c) => c.id);

    // Count unread messages per conversation where the user is NOT the sender
    const unreadCounts = await prisma.message.groupBy({
      by: ["conversationId"],
      where: {
        conversationId: { in: conversationIds },
        senderId: { not: auth.userId },
        read: false,
      },
      _count: {
        id: true,
      },
    });

    // Format into { conversationId: count }
    const result: Record<number, number> = {};
    unreadCounts.forEach((group) => {
      result[group.conversationId] = group._count.id;
    });

    return jsonResponse(true, result, "unread_counts_fetched_successfully", {}, 200);
  } catch (err) {
    console.error(err);
    return jsonResponse(false, null, "internal_server_error", {}, 500);
  }
}
