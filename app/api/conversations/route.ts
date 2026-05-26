import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { verifyAuthCookie } from "@/lib/auth";
import { jsonResponse } from "@/lib/api-response";

export async function GET(req: NextRequest) {
  try {
    const auth = verifyAuthCookie(req);
    
    if (!auth) {
      return jsonResponse(false, null, "unauthorized", {}, 401);
    }

    // Fetch conversations with latest message included
    const conversations = await prisma.conversation.findMany({
      where: {
        OR: [
          { user1Id: auth.userId },
          { user2Id: auth.userId },
        ],
      },
      include: {
        user1: { select: { id: true, name: true, email: true, avatar: true } },
        user2: { select: { id: true, name: true, email: true, avatar: true } },
        messages: {
          take: 1,
          orderBy: { createdAt: "desc" }, // latest message
        },
      },
    });

    // Count unread messages per conversation
    const conversationsWithUnread = await Promise.all(
      conversations.map(async (conv) => {
        const unreadCount = await prisma.message.count({
          where: {
            conversationId: conv.id,
            senderId: { not: auth.userId },
            read: false,
          },
        });
        return { ...conv, unreadCount };
      })
    );

    // Sort conversations by latest message createdAt descending
    conversationsWithUnread.sort((a, b) => {
      const aDate = a.messages[0]?.createdAt?.getTime() ?? 0;
      const bDate = b.messages[0]?.createdAt?.getTime() ?? 0;
      return bDate - aDate;
    });

    return jsonResponse(true, conversationsWithUnread, "conversations_fetched_successfully", {}, 200);
  } catch (err) {
    console.error(err);
    return jsonResponse(false, null, "internal_server_error", {}, 500);
  }
}
