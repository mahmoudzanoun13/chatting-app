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
   Create a `.env` file in the root directory and add your database connection string:

   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/chatting_app
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

## 🗄️ Database Schema

The application uses Prisma with PostgreSQL. Key models include:

- **User**: Stores user profiles, authentication details, and avatars.
- **Conversation**: Manages chat sessions between two users.
- **Message**: Stores individual chat messages with read status.
- **ResetToken**: Manages password reset tokens for users.

## 🏗️ Project Structure

- `app/`: Next.js App Router and page layouts.
- `components/`: Reusable UI components and feature-specific components.
- `lib/`: Utility functions and shared logic (including Prisma client).
- `messages/`: Localization files for different languages.
- `prisma/`: Database schema, migrations, and seed scripts.
- `public/`: Static assets.

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
