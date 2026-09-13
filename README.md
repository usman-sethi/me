# Usman Sethi — Portfolio

Personal developer portfolio for Usman Sethi, Full Stack Web Developer and student at the
University of Peshawar. Built with Next.js 16 (App Router), TypeScript, Tailwind CSS v4, MongoDB,
and Cloudinary.

## Quick start

```bash
npm install
cp .env.example .env.local   # fill in real values — see below
npm run dev
```

The site runs fully on local mock data (`data/*.ts`) with no environment variables set — you only
need `.env.local` for the contact form, the admin CMS, and image uploads.

## Scripts

```bash
npm run dev        # start the dev server (Turbopack)
npm run build       # production build
npm run start        # run the production build locally
npm run lint         # ESLint
npm run typecheck    # tsc --noEmit
npm run format       # Prettier, writes in place
```

## Environment variables

See `.env.example` for the full list. Summary:

| Variable | Required for |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Canonical URLs, sitemap, JSON-LD — set to your real domain before launch |
| `MONGODB_URI` | Contact form persistence, admin CMS |
| `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` / `CLOUDINARY_API_KEY` / `CLOUDINARY_API_SECRET` | Admin image uploads |
| `ADMIN_EMAIL` / `ADMIN_PASSWORD_HASH` / `SESSION_SECRET` | `/admin` login |

Generate the two secret-derived values locally and paste only the output into `.env.local`:

```bash
node -e "require('bcryptjs').hash(process.argv[1], 12).then(console.log)" "your-real-password"
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

## Replacing the placeholder projects

`data/projects.ts` ships with two clearly-labeled sample entries so every layout can be reviewed
end to end. Once `MONGODB_URI` is set, manage real projects from `/admin` instead — the public
site (`/projects`, project detail pages, sitemap, JSON-LD) reads from MongoDB automatically once
`app/projects/page.tsx` and `app/projects/[slug]/page.tsx` are pointed at `lib/db/models/Project.ts`
instead of `data/projects.ts` (the two share the same `Project` type, so this is a small,
localized change).

## Structure

```
app/          routes, layouts, metadata, sitemap/robots, OG images
components/   UI grouped by feature (hero, projects, admin, navigation, ...)
lib/          auth, db, cloudinary, server actions, seo helpers, validation
data/         typed mock content (skills, journey, playground, placeholder projects)
types/        shared TypeScript interfaces
hooks/        small client hooks (media queries, mounted state)
```

## Admin

`/admin` is a single-credential CMS (no user table) guarded by a signed, HTTP-only session
cookie. `proxy.ts` does a fast optimistic redirect for unauthenticated requests; every admin page
and Server Action independently re-verifies the session server-side via `lib/auth/dal.ts` — treat
that as the real security boundary, not the proxy check.

## Deployment

Set every variable from `.env.example` in your host's environment (not committed anywhere), point
`NEXT_PUBLIC_SITE_URL` at the real production domain, and run `npm run build`. No server-only
secret is ever read from a `NEXT_PUBLIC_*` variable or shipped to the client bundle.
