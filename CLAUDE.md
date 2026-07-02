# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Development
npm run dev        # Start dev server at http://localhost:3000

# Build & production
npm run build      # Type-check + production build
npm run start      # Start production server

# Deploy
npx vercel --prod --force   # Deploy to production (--force skips build cache)
# CRITICAL: after every deploy, also run:
npx vercel alias set <new-deployment-url> future-content.nl
# Vercel only auto-aliases www.future-content.nl; the bare domain must be
# pointed manually after each deploy. Check with: npx vercel alias ls
```

No linting or test commands are configured. TypeScript errors surface via `npm run build`.

## Architecture

**Stack:** Next.js 16 (App Router) + React 19 + TypeScript + Tailwind CSS v4 + Framer Motion. Deployed on Vercel.

**Single source of truth:** All site content — prices, packages, videos, reviews, trust stats, regions — lives in [lib/constants.ts](lib/constants.ts). No CMS, no database. Blog posts are hardcoded in [lib/blog.ts](lib/blog.ts) as a `BLOG_POSTS` array with typed sections (`intro`, `h2`, `p`, `ul`, `quote`, `cta`) and a required `image` field pointing to `/public/blog/*.jpg`.

**Page structure:** The `app/` directory uses Next.js App Router. The root layout ([app/layout.tsx](app/layout.tsx)) wraps every page with `Navbar`, `Footer`, `FloatingCTA`, `CookieBanner`, and JSON-LD structured data for local business SEO.

**Layout-level fixed UI:**
- `FloatingCTA` — persistent WhatsApp button
- `CookieBanner` — small huisstijl notice bottom-left, appears after 6s (not on first paint); GA4 only loads after accept; consent stored in `localStorage` under key `"cookie-consent"`. Plausible (in `app/layout.tsx`) is cookieless and loads regardless, no consent needed.
- `NewPostNotification` — camera-viewfinder popup on homepage only; shows latest `BLOG_POSTS` entry; dismissed state stored in `sessionStorage` under key `"new-post-dismissed"`

**Contact form:** `/contact` POSTs to [app/api/contact/route.ts](app/api/contact/route.ts), validated with Zod, delivered via Resend. Without `RESEND_API_KEY` it logs to console.

**Videos:** MP4 files are in `public/videos/` (compressed to <100MB each so they can be deployed directly to Vercel). Referenced via `STACK_VIDEOS` in `constants.ts`. The `.vercelignore` does NOT exclude them.

**Blog images:** Stored in `public/blog/`. Filenames follow the pattern `{category-slug}.jpg` (e.g. `vastgoed-1.jpg`, `social-filming.jpg`, `trouwen.jpg`). Each `BlogPost` object requires an `image: string` field.

**Fonts:** Inter (body) + Playfair Display (headings) via `next/font/google`, exposed as CSS variables `--font-inter` and `--font-playfair`. Apply headings with `style={{ fontFamily: "var(--font-playfair)" }}`.

**UI components:** shadcn/ui in `components/ui/`. Custom layout in `components/layout/`. Page sections in `components/sections/`. Shared primitives in `components/common/`.

## Content Guidelines

- **No em-dashes (—) anywhere in visible text.** The owner considers them AI-looking. Use a comma, period, or colon instead.
- **Blog order:** The blog listing page (`app/blog/page.tsx`) renders `[...BLOG_POSTS].reverse()` so the last entry in the array appears first. Add new posts at the end of the array.
- **Analytics:** GA4 Measurement ID is `G-DSYW6BSNLR`. It is loaded conditionally inside `CookieBanner` only after the user consents.

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `RESEND_API_KEY` | Production only | Email delivery via resend.com |
| `CONTACT_EMAIL` | Optional | Where form emails go (default: info@future-content.nl) |

## Key Decisions

- **Bare domain alias:** Vercel CLI only auto-aliases `www.future-content.nl`. The bare domain `future-content.nl` must be re-aliased manually after every production deploy.
- **Deploy flag:** Use `--force` to skip Vercel build cache when changes aren't reflecting live.
- **Vercel framework setting:** Must be set to "Next.js" in Project Settings (not auto-detected on initial setup).
- **DNS (Vimexx):** `@` A record → `76.76.21.21`, `www` CNAME → `cname.vercel-dns.com`.
- **Browser cache:** The site uses static prerendering heavily. When verifying changes, always test in an incognito window or use Cmd+Shift+R to bypass the browser cache. The Vercel deployment URL (`*.vercel.app`) always reflects the latest build.
