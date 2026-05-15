import { PrismaClient } from "../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";
import bcrypt from "bcrypt";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  // Create some users
  const passwordHash = await bcrypt.hash("password123", 10);

  const alice = await prisma.user.create({
    data: {
      name: "Alice",
      email: "alice@example.com",
      password: passwordHash,
      avatar: "https://i.pravatar.cc/150?img=1",
    },
  });

  const bob = await prisma.user.create({
    data: {
      name: "Bob",
      email: "bob@example.com",
      password: passwordHash,
      avatar: "https://i.pravatar.cc/150?img=2",
    },
  });

  const carol = await prisma.user.create({
    data: {
      name: "Carol",
      email: "carol@example.com",
      password: passwordHash,
      avatar: "https://i.pravatar.cc/150?img=3",
    },
  });

  console.log("✅ Users created");

  // Create conversations between users
  const conv1 = await prisma.conversation.create({
    data: {
      user1Id: alice.id,
      user2Id: bob.id,
    },
  });

  const conv2 = await prisma.conversation.create({
    data: {
      user1Id: alice.id,
      user2Id: carol.id,
    },
  });

  console.log("✅ Conversations created");

  // Create messages
  await prisma.message.createMany({
    data: [
      {
        conversationId: conv1.id,
        senderId: alice.id,
        content: "Hi Bob! How are you?",
      },
      {
        conversationId: conv1.id,
        senderId: bob.id,
        content: "Hey Alice! I am good, you?",
      },
      {
        conversationId: conv2.id,
        senderId: carol.id,
        content: "Hello Alice, nice to meet you!",
      },
    ],
  });

  console.log("✅ Messages created");

  // Create a reset token for a user
  const expiresAt = new Date();
  expiresAt.setHours(expiresAt.getHours() + 1); // expires in 1 hour

  await prisma.resetToken.create({
    data: {
      userId: alice.id,
      token: "sample-reset-token-123",
      expiresAt,
    },
  });

  console.log("✅ Reset tokens created");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
