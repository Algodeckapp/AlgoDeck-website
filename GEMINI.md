# AlgoDeck Website - Project Instructions

## Project Overview
AlgoDeck Website is a modern, high-performance marketing platform for **AlgoDeck**, a mobile trading automation platform (Android & iOS). The website emphasizes the mobile nature of the product and drives users toward app downloads.

### Core Technologies
- **Frontend**: React 19, Vite, TypeScript, Tailwind CSS, Shadcn/UI, Lucide React, GSAP (animations), Three.js.
- **Backend**: Hono (Node.js runtime), TRPC (Typesafe API), Jose (JWT/Auth), AWS SDK (S3).
- **Database**: MySQL managed with Drizzle ORM.
- **Build Tooling**: Vite for dev/frontend build, Esbuild for backend bundling.

---

## Directory Structure
- `api/`: Hono server and TRPC router logic.
  - `index.ts`: Vercel serverless entry point for Hono server.
  - `_src/`: Internal server modules ignored by Vercel serverless build (routers, context, middleware, lib).
- `src/`: React frontend application.
  - `pages/`: Individual route components.
  - `sections/`: Reusable landing page sections (Hero, Features, Pricing, etc.).
  - `components/`: UI components, including Shadcn/UI primitives in `ui/`.
  - `hooks/`: Custom React hooks (e.g., `useAuth`, `useInView`).
  - `providers/`: Context providers (e.g., TRPC/React Query).
- `db/`: Database schema and migrations.
  - `schema.ts`: Drizzle table definitions.
- `contracts/`: Shared types and constants between frontend and backend.
- `public/`: Static assets (images, logos, etc.).

---

## Development Workflow

### Building and Running
- **Development**: `npm run dev` (Starts Vite with Hono dev server on port 3000).
- **Production Build**: `npm run build` (Builds React frontend to `dist/` and bundles `api/boot.ts` to `dist/boot.js`).
- **Start Production**: `npm run start` (Runs the bundled server).
- **Type Checking**: `npm run check` (Runs `tsc`).
- **Testing**: `npm run test` (Runs Vitest).
- **Formatting/Linting**: `npm run format` (Prettier) and `npm run lint` (ESLint).

### Database Management
- **Generate Migrations**: `npm run db:generate`
- **Apply Migrations**: `npm run db:migrate`
- **Push Schema (Dev)**: `npm run db:push`

### Environment Variables
Refer to `.env.example` for required variables. Key variables include:
- `DATABASE_URL`: Connection string for MySQL.
- `JWT_SECRET`: For authentication.
- `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `AWS_S3_BUCKET`: For file storage.

---

## Technical Standards & Conventions

### API & Data Fetching
- **Always use TRPC**: Do not use raw `fetch` or `axios` for internal API calls.
- **Define Routers**: Add new sub-routers in `api/_src/` and register them in `api/_src/router.ts`.
- **Typesafety**: Use the exported `AppRouter` type in the frontend via TanStack Query.

### Frontend Development
- **Styling**: Use Tailwind CSS utility classes.
- **UI Components**: Check `src/components/ui` for existing Radix-based primitives before creating new ones.
- **Animations**: Prefer GSAP for complex timeline-based animations and `framer-motion` (if added) or CSS transitions for simple interactions.
- **Mobile First**: Design for mobile responsiveness first, as the target audience is mobile app users.

### Code Style
- **TypeScript**: Strict mode enabled. Use interfaces/types for all data structures.
- **Path Aliases**:
  - `@/` -> `src/`
  - `@contracts/` -> `contracts/`
  - `@db/` or `db/` -> `db/`
- **Imports**: Organize imports (built-ins, external libraries, internal modules).

### Design Guidelines
- **Theme**: Dark navy background (`#0A0E27`) with vibrant accents (Blue, Purple).
- **Imagery**: Focus on phone mockups and app screenshots to reinforce the mobile platform message.
- **CTAs**: Primary calls to action should always point to "Download for Android" or "Download for iOS" (Coming Soon).
