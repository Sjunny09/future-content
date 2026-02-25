# Future Content — Website

Marketing site for Future Content (Bladel, NL). Built with Next.js 15 + Tailwind CSS.

Live: **[future-content.nl](https://future-content.nl)**

---

## Run locally

**Requirements:** Node 20+, npm

```bash
# 1. Install dependencies
npm install

# 2. Copy environment file and fill in your keys
cp .env.local.example .env.local

# 3. Start dev server
npm run dev
# → http://localhost:3000
```

The site works without any env keys in dev mode. The contact form logs submissions
to the console instead of sending email.

---

## Environment variables

| Variable | Required | Description |
|---|---|---|
| `RESEND_API_KEY` | Production only | Email delivery via resend.com |
| `CONTACT_EMAIL` | Optional | Where form emails go (default: info@future-content.nl) |

---

## Deploy to Vercel

```bash
# Deploy to production
npx vercel --prod --force
# --force skips build cache (use when routes return 404 unexpectedly)
```

After every deploy, check that domain aliases are correct:
```bash
npx vercel alias ls
# Should show: future-content.nl + www.future-content.nl → latest deployment
```

If the root domain isn't automatically aliased after deploy:
```bash
npx vercel alias set <deployment-url> future-content.nl
```

---

## Project structure

```
app/                    # Next.js App Router pages
├── page.tsx            # Home
├── makelaars/          # Real estate videography page
├── social-media/       # Social media subscription page
├── portfolio/          # Video portfolio (hover-to-play grid)
├── werkwijze/          # How it works
├── over/               # About
├── contact/            # Contact form page
├── blog/               # Blog (placeholder)
└── api/contact/        # POST endpoint → email via Resend

components/
├── layout/
│   ├── Navbar.tsx      # Responsive nav with mobile menu
│   └── Footer.tsx
├── sections/           # Large reusable page sections
└── common/
    ├── VideoPlayer.tsx      # Click-to-play video with poster overlay
    ├── VideoCarousel.tsx    # Scroll-snap carousel (built, not currently used)
    └── CtaButton.tsx

lib/
├── constants.ts        # All site data: packages, videos, reviews, regions
└── metadata.ts         # SEO metadata helpers per page

public/
├── photos/             # Property + photoshoot images
│   └── properties/     # Exterior shots from pitmakelaars.com
└── videos/             # MP4 files — gitignored (150–307 MB each)
```

---

## Key decisions

**All content in `constants.ts`** — prices, videos, reviews, and regions live in
one file. No database, no CMS. To update a price, edit one line.

**Videos are not on GitHub or Vercel** — MP4 files are too large (150–307 MB).
They're excluded via `.gitignore` and `.vercelignore`. For production, upload
videos to a CDN (Cloudflare R2, Bunny CDN, etc.) and update `src` in `STACK_VIDEOS`.

**Vercel framework setting** — The project was created via CLI which didn't
auto-detect Next.js. If you ever recreate the Vercel project, set the framework
to "Next.js" in Project Settings, or the routing will silently return 404.

---

## Adding content

**New portfolio video:**
1. Drop MP4 into `public/videos/`
2. Add entry to `STACK_VIDEOS` in `lib/constants.ts`
3. Add poster photo to `public/photos/properties/`

**Update prices:** edit `VASTGOED_PACKAGES` or `SOCIAL_PACKAGES` in `lib/constants.ts`

**Update reviews:** edit `REVIEWS` in `lib/constants.ts`

---

## DNS (Vimexx)

| Record | Type | Value |
|---|---|---|
| `@` | A | `76.76.21.21` |
| `www` | CNAME | `cname.vercel-dns.com` |
