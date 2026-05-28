# Muse By Arshia

Original paintings handcrafted by Arshia — shipped across Pakistan.

## Tech Stack

- **Framework** — Next.js 14 (App Router)
- **Database** — PostgreSQL via Neon (Prisma ORM)
- **Auth** — NextAuth.js (credentials)
- **Storage** — Cloudinary (image uploads)
- **Email** — Resend
- **Styling** — Tailwind CSS + Framer Motion
- **Deployment** — Vercel

## Getting Started

1. Clone the repo
2. Copy `.env.example` to `.env.local` and fill in your values
3. Run `npm install`
4. Run `npm run db:push` to push the schema
5. Run `npm run db:seed` to seed the admin user
6. Run `npm run dev`

## Environment Variables

See `.env.example` for all required variables. Never commit `.env.local`.

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run db:push` | Push Prisma schema to database |
| `npm run db:seed` | Seed admin user |
| `npm run db:studio` | Open Prisma Studio |
