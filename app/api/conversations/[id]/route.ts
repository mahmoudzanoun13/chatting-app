import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { verifyAuthCookie } from "@/lib/auth";
import { jsonResponse } from "@/lib/api-response";

interface Params {
  params: Promise<{ id: string }>;
}

export async function GET(req: NextRequest, { params }: Params) {
  try {
    const auth = verifyAuthCookie(req);

    if (!auth) {
      return jsonResponse(false, null, "unauthorized", {}, 401);
    }

    const { id } = await params;

    const conversationId = parseInt(id, 10);
    if (isNaN(conversationId)) {
      return jsonResponse(false, null, "invalid_conversation_id", {}, 400);
    }

    // Fetch conversation and participants
    const conversation = await prisma.conversation.findUnique({
      where: { id: conversationId },
      include: {
        user1: { select: { id: true, name: true, email: true, avatar: true } },
        user2: { select: { id: true, name: true, email: true, avatar: true } },
        messages: { take: 1, orderBy: { createdAt: "desc" } }, // latest message
      },
    });

    if (!conversation) {
      return jsonResponse(false, null, "conversation_not_found", {}, 404);
    }

    // Check if the authenticated user is part of this conversation
    if (auth.userId !== conversation.user1Id && auth.userId !== conversation.user2Id) {
      return jsonResponse(false, null, "unauthorized", {}, 403);
    }

    return jsonResponse(true, conversation, "conversation_fetched_successfully", {}, 200);
  } catch (err) {
    console.error(err);
    return jsonResponse(false, null, "internal_server_error", {}, 500);
  }
}
