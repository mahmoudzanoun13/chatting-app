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

    const messageId = parseInt(id, 10);
    if (isNaN(messageId)) {
      return jsonResponse(false, null, "invalid_message_id", {}, 400);
    }

    const message = await prisma.message.findUnique({
      where: { id: messageId },
      include: {
        sender: { select: { id: true, name: true, email: true, avatar: true } },
        conversation: {
          select: { user1Id: true, user2Id: true },
        },
      },
    });

    if (!message) {
      return jsonResponse(false, null, "message_not_found", {}, 404);
    }

    // Ensure the authenticated user is part of the conversation
    const { user1Id, user2Id } = message.conversation;
    if (auth.userId !== user1Id && auth.userId !== user2Id) {
      return jsonResponse(false, null, "unauthorized", {}, 403);
    }

    return jsonResponse(true, message, "message_fetched_successfully", {}, 200);
  } catch (err) {
    console.error(err);
    return jsonResponse(false, null, "internal_server_error", {}, 500);
  }
}
