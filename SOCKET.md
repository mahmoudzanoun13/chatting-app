# Socket.IO Server Documentation

This project uses a custom Socket.IO server running as a separate process to handle real-time chat functionality.

## 🏗️ Architecture

- **Frontend/API**: Next.js (Port 3000)
- **Socket Server**: Custom Node.js server using `tsx` (Port 3001)

The servers are split to ensure that long-lived WebSocket connections don't interfere with the Next.js request lifecycle or serverless constraints.

### Why a Standalone Server?

1.  **HMR Stability**: In Next.js, Hot Module Replacement (HMR) can cause the server-side code to re-run frequently during development. If the Socket server is inside the Next.js process, every code change would force a full socket reconnection for all users.
2.  **Process Isolation**: Keeping the socket server in a separate process ensures that real-time connections remain stable even when the frontend is crashing or being rebuilt.
3.  **Deployment Flexibility**: This architecture allows you to scale the socket server independently from the main web application.

## 🔐 Authentication

Authentication is handled via the same JWT token used by the Next.js app:

1. The socket server reads the `token` from the `HttpOnly` cookie in the handshake headers.
2. It verifies the token using a shared `JWT_SECRET`.
3. If valid, it attaches the `userId` to the socket instance for use in events.

## 📡 Events

### Client -> Server

| Event                | Payload                                                          | Description                                                      |
| -------------------- | ---------------------------------------------------------------- | ---------------------------------------------------------------- |
| `join_conversation`  | `conversationId: number`                                         | Joins a specific room for real-time updates.                     |
| `leave_conversation` | `conversationId: number`                                         | Leaves the conversation room.                                    |
| `send_message`       | `content: string, conversationId: number, clientTempId?: number` | Sends a message. Includes an optional temp ID for deduplication. |

### Server -> Client

| Event             | Payload                                         | Description                                          |
| ----------------- | ----------------------------------------------- | ---------------------------------------------------- |
| `receive_message` | `Message { ...message, clientTempId?: number }` | Broadcasts a new message to all members in the room. |

## 🚀 Optimistic UI & Deduplication

To provide a "premium" feel, the app uses **Optimistic Updates**:

1. When a user sends a message, it is immediately added to the UI with a negative `tempId`.
2. This `tempId` is sent as `clientTempId` to the server.
3. The server broadcasts the message back to **everyone**, including the sender, with the same `clientTempId`.
4. The sender's client sees the `clientTempId` and **replaces** the optimistic message with the permanent DB entry, preventing duplication.

## 🛠️ Running the Server

```bash
bun run dev:server
```

Requires the following env variables in `.env.local`:

- `NEXT_PUBLIC_APP_URL`: Used for CORS
- `JWT_SECRET`: Used for authentication
- `NEXT_PUBLIC_SOCKET_URL`: Used for CORS
- `HOSTNAME`: Used for CORS
- `SOCKET_PORT`: Default `3001`
