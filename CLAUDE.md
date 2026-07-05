# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repo- & werkstructuur (LEES DIT EERST)

De site woont in de GitHub-repo `Sjunny09/future-content`. Lokaal staan twee mappen die **git-worktrees van dezelfde repo** zijn:

- **`fc-rebrand/` op branch `nieuwe-huisstijl` = DE canonieke werkplek.** Hier werk je. Actuele rebrand (blogserie, huisstijl, scan, /os). Dit is een linked worktree, maar wel de up-to-date versie.
- **`future-content/` op branch `scan-op-future-content` = OUD/DOOD, niet in werken.** Dit is de hoofd-worktree (bevat de fysieke `.git`) maar de inhoud is verouderd. Wordt later veilig gearchiveerd (kan NIET met een simpele `mv`: `fc-rebrand` leunt op deze `.git`; vereist een herbouw: push → schone kloon in `future-content/` → `.env` + Vercel-koppeling terug → `npm install`).

**Één-sessie-regel (HARD):** slechts één Claude-sessie tegelijk in deze repo. Twee sessies = race conditions + gedivergeerde branches (ging mis op 3 juli 2026: twee mappen, vijf branches). Check vóór je begint `git worktree list` en werk uitsluitend in `fc-rebrand` op `nieuwe-huisstijl`.

**Deploy-flow (git-integratie, sinds 3 juli 2026 — de CLI-deploy is losgelaten):**
- Vercel-project: `future-content` (team johns-projects). Deploy loopt via de GitHub-koppeling, niet via de CLI.
- Testen: commit + push op `nieuwe-huisstijl` naar origin → Vercel bouwt automatisch een preview.
- Live: in het Vercel-dashboard de gewenste `nieuwe-huisstijl`-build **Promote to Production**. Productie draait direct van `nieuwe-huisstijl` (er wordt NIET naar `main` gemerged).
- **Na ELKE promote:** het kale domein `future-content.nl` handmatig opnieuw aliassen (`npx vercel alias set <deployment-url> future-content.nl`); alleen `www` volgt automatisch. Check met `npx vercel alias ls | grep future-content.nl`.
- Commit-auteur MOET `johnlavrijsen@gmail.com` zijn, anders blokkeert Vercel de deploy.
- Waarom geen CLI-deploy: `npx vercel --prod` faalde herhaaldelijk op de ~1GB `/film` video-assets ("Not authorized", vastlopen op building). Git-integratie is de betrouwbare route.
- `.env` (DATABASE_URL, DIRECT_DATABASE_URL, ANTHROPIC_API_KEY, ADMIN_TOKEN, e.a.) staat NIET in git; leeft lokaal + op Vercel.

## Commands

```bash
# Development
npm run dev        # Start dev server at http://localhost:3000

# Build & production
npm run build      # Type-check + production build
npm run start      # Start production server

# Deploy (git-integratie — geen CLI prod-deploy meer)
git push origin nieuwe-huisstijl   # Vercel bouwt automatisch een preview
# Go-live: in het Vercel-dashboard de nieuwste nieuwe-huisstijl-build "Promote to Production".
# CRITICAL: na elke promote het kale domein handmatig opnieuw aliassen:
npx vercel alias set <new-deployment-url> future-content.nl
# Vercel aliast alleen www.future-content.nl automatisch; de bare domain moet
# na elke deploy handmatig. Check met: npx vercel alias ls
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
- **Deploy via git-integratie:** productie gaat live via de Vercel-dashboard-knop "Promote to Production" op een `nieuwe-huisstijl`-build, niet via `vercel --prod` (die CLI-route is losgelaten, faalde op de grote video-assets). Zie de deploy-flow bovenaan.
- **Vercel framework setting:** Must be set to "Next.js" in Project Settings (not auto-detected on initial setup).
- **DNS (Vimexx):** `@` A record → `76.76.21.21`, `www` CNAME → `cname.vercel-dns.com`.
- **Browser cache:** The site uses static prerendering heavily. When verifying changes, always test in an incognito window or use Cmd+Shift+R to bypass the browser cache. The Vercel deployment URL (`*.vercel.app`) always reflects the latest build.
