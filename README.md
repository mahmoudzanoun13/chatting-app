# Chatting App

A modern, high-performance chatting application built with Next.js 16+, React 19, and Tailwind CSS 4. This project is optimized for speed, accessibility, and internationalization.

## 🚀 Features

- **Modern Tech Stack**: Built with Next.js 16, React 19, and Tailwind CSS 4.
- **Internationalization**: Full RTL/LTR support using `next-intl`.
- **Premium UI/UX**: Designed with Shadcn UI (Nova style) for a sleek, modern look.
- **Fast Performance**: Powered by Bun for blazing fast installation and execution.
- **Form Validation**: Type-safe forms using React Hook Form and Zod.
- **Dark Mode**: Seamless theme switching with `next-themes`.
- **Responsive Design**: Fully optimized for mobile and desktop experiences.
- **Authentication**: JWT-based session management with HttpOnly cookies.
- **Google OAuth**: Sign in with Google via OAuth 2.0.
- **Password Reset**: Secure email-based password reset with single-use tokens.
- **Route Protection**: Middleware guards protecting authenticated and guest-only routes.
- **Rate Limiting**: IP-based rate limiting on reset password auth endpoint (local memory not Redis for now).

## 🛠️ Tech Stack

- **Framework**: [Next.js](https://nextjs.org/)
- **Library**: [React 19](https://react.dev/)
- **ORM**: [Prisma](https://www.prisma.io/)
- **Database**: [PostgreSQL](https://www.postgresql.org/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **UI Components**: [Shadcn UI](https://ui.shadcn.com/)
- **Package Manager**: [Bun](https://bun.sh/)
- **I18n**: [next-intl](https://next-intl-docs.vercel.app/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Mailer**: [Nodemailer](https://nodemailer.com/)

## 🏁 Getting Started

### Prerequisites

You need to have [Bun](https://bun.sh/) and [PostgreSQL](https://www.postgresql.org/) installed on your machine.

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd chatting-app
   ```

2. Install dependencies:

   ```bash
   bun install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory with the following variables:

   ```env
   # Database
   DATABASE_URL="postgresql://user:password@localhost:5432/chatting_app"

   # JWT
   JWT_SECRET="your-super-secret-jwt-key"
   JWT_EXPIRES_IN=3600

   # Google OAuth
   GOOGLE_CLIENT_ID="your-google-client-id"
   GOOGLE_CLIENT_SECRET="your-google-client-secret"

   # App
   NEXT_PUBLIC_APP_URL="http://localhost:3000"
   NEXT_PUBLIC_GOOGLE_CLIENT_ID="your-google-client-id"
   NEXT_PUBLIC_GOOGLE_REDIRECT_URI="http://localhost:3000/api/auth/google/callback"
   ```

4. Initialize the database:

   ```bash
   bun db:migrate
   bun db:seed
   ```

5. Run the development server:
   ```bash
   bun run dev
   ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🔐 Authentication

The app uses a custom JWT-based auth system — no third-party auth libraries.

### Credential Auth Flow

1. User registers or logs in via `/api/auth/register` or `/api/auth/login`.
2. A signed JWT is issued and stored in a secure `HttpOnly` cookie.
3. The middleware (`proxy.ts`) reads and verifies the cookie on every request.

### Google OAuth Flow

1. User is redirected to Google via `/api/auth/google/redirect`.
2. Google returns to `/api/auth/google/callback` with an auth code.
3. The server exchanges the code for user info and issues a session cookie.

### Password Reset Flow

1. User submits their email at `/forgot-password` → `POST /api/auth/reset-password`.
2. A single-use, time-limited token is generated and emailed to the user.
3. The user clicks the link and sets a new password via `POST /api/auth/set-password`.
4. The token is marked as `used` to prevent replay attacks.

### Route Protection (Middleware)

| Route                                   | Behaviour                                     |
| --------------------------------------- | --------------------------------------------- |
| `/chat`                                 | Redirects to `/login` if unauthenticated      |
| `/login`, `/signup`, `/forgot-password` | Redirects to `/chat` if already authenticated |

## 🗄️ Database Schema

The application uses Prisma with PostgreSQL. Key models include:

- **User**: Stores user profiles, authentication details, and avatars.
- **Conversation**: Manages chat sessions between two users.
- **Message**: Stores individual chat messages with read status.
- **ResetToken**: Manages password reset tokens (`token` is unique; `used` flag prevents replay).

## 🏗️ Project Structure

```
.
├── app/
│   ├── api/auth/          # Auth API routes (login, register, logout, me, google, reset/set-password)
│   └── [locale]/          # Internationalised page routes
├── components/            # Reusable UI and feature components
├── lib/                   # Shared utilities
│   ├── auth.ts            # JWT signing/verification & cookie helpers
│   ├── token.ts           # Reset-token generation & validation
│   ├── mailer.ts          # Nodemailer transactional email helper
│   ├── rate-limit.ts      # IP-based rate limiter
│   ├── api-response.ts    # Standardised JSON response helpers
│   └── i18n-zod.ts        # Shared Zod translator type for server-side validation
├── schemas/               # Shared Zod validation schemas (login, register, reset/set-password)
├── messages/              # Localisation files (en, ar)
├── prisma/                # Database schema, migrations, and seed scripts
├── stores/                # Zustand global state stores
└── public/                # Static assets
```

## 📜 Scripts

- `bun dev`: Starts the development server.
- `bun build`: Builds the application for production.
- `bun start`: Starts the production server.
- `bun lint`: Runs ESLint for code quality checks.
- `bun db:migrate`: Creates and runs database migrations.
- `bun db:generate`: Generates the Prisma client.
- `bun db:seed`: Seeds the database with initial data.
- `bun db:studio`: Opens Prisma Studio to view/edit data.
- `bun db:reset`: Resets the database and reapplies migrations.

## 📄 License

This project is licensed under the MIT License.
