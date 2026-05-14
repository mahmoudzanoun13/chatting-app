# Chatting App

A learning-focused real-time chat application built with Next.js 16.2.4, manual JWT authentication, Google OAuth, Socket.IO, and PostgreSQL with Prisma.

The app supports:

- Email/password signup and login
- Google login via OAuth2
- Forgot password flow with token-based reset
- Real-time messaging
- Online user status
- Notifications for new messages

## Table of Contents

1. Technologies
2. System Architecture
3. Features
4. Database Schema
5. Getting Started
6. Environment Variables
7. Future Improvements

## Technologies

- Frontend: Next.js 16.2.4, React 19
- Authentication: Manual JWT (HTTP-only cookie) + Google OAuth2
- Backend: Next.js API Routes / Node.js
- Real-time: Socket.IO
- Database: PostgreSQL (local)
- ORM: Prisma (Type-safe, migrations, relationships)
- State Management: Zustand (for online users + notifications)

## System Architecture

Frontend (Next.js) communicates with Backend API Routes for authentication and chat messages. Socket.IO handles real-time messaging, online/offline status, and notifications. JWTs are stored in HTTP-only cookies. Prisma connects to PostgreSQL for all persistent data.

Frontend Next.js  
├─ /chat (users list)  
├─ /chat/:id (chat window)  
└─ Notifications & online users (Zustand)  
 │  
 ▼  
Socket.IO (real-time events)  
 │  
 ▼  
Backend Next.js API Routes  
├─ /api/auth/... (email/password + Google login)  
├─ /api/messages  
├─ /api/conversations  
└─ JWT issuance / verification  
 │  
 ▼  
HTTP-only JWT Cookie  
 │  
 ▼  
Prisma ORM  
 │  
 ▼  
PostgreSQL DB  
├─ Users  
├─ Conversations  
├─ Messages  
└─ ResetTokens

## Features

**Authentication**

- Email/password signup & login
- Google login via OAuth2
- Forgot password flow:
  1. Request reset (generate token)
  2. Reset password using token

**Real-time Chat**

- One-to-one conversations
- Real-time message delivery via Socket.IO
- Online/offline user status
- Notifications for new messages

**Frontend**

- `/chat` → list all users and select a conversation
- `/chat/:id` → chat view for specific conversation
- Notifications & online users managed globally with Zustand

## Database Schema

**Users**  
id | name | email | password_hash | avatar | created_at

**Conversations**  
id | user1_id | user2_id | created_at

**Messages**  
id | conversation_id | sender_id | content | created_at | read_status

**ResetTokens**  
id | user_id | token | expires_at

## Getting Started

1. Clone the repository:  
   git clone https://github.com/mahmoudzanoun13/chatting-app.git  
   cd chatting-app

2. Install dependencies with Bun:  
   bun install

3. Set up Prisma:  
   bun prisma generate  
   bun prisma migrate dev --name init

4. Run the development server:  
   bun dev

## Environment Variables

Create a `.env` file:

DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/chatting_app"  
JWT_SECRET="your_super_secret_key"  
GOOGLE_CLIENT_ID="your_google_client_id"  
GOOGLE_CLIENT_SECRET="your_google_client_secret"

## Future Improvements

- Multi-user group chats
- File/image sharing
- Message reactions (likes, emojis)
