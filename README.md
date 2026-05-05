# Codex Site Template

A reusable starter repo for building polished static websites with Codex, then deploying them to GitHub Pages.

## What This Is Good For

- Local business websites
- Marketing sites
- Creator and personal brand sites
- Simple web apps with no private backend
- Lead-generation pages
- Prospect demos for outreach

## What This Is Not

GitHub Pages is static hosting. This template does not include a Node server, PostgreSQL, authentication, file uploads, or private server-side logic.

Use external services when the project needs dynamic behavior:

- Forms: Formspree, Basin, Tally, Typeform, ConvertKit, Beehiiv
- Auth and data: Supabase, Firebase, Neon, Turso, Airtable
- Payments: Stripe Payment Links, Lemon Squeezy, Gumroad, Shopify
- Media: Cloudinary, YouTube, Vimeo, Bunny, Cloudflare R2

## Quick Start

```bash
npm install
npm run dev
```

Build before shipping:

```bash
npm run lint
npm run build
```

## Customize A Site

1. Edit `src/content/site.ts`.
2. Update the `<title>` and meta description in `index.html`.
3. Replace placeholder sections in `src/App.tsx`.
4. Add optimized images to `public` or `src/assets`.
5. Run `npm run build`.

## Deploy To GitHub Pages

1. Push this repo to GitHub.
2. Go to repository settings.
3. Open `Pages`.
4. Set source to `GitHub Actions`.
5. Push to `main`.

The workflow in `.github/workflows/deploy-pages.yml` builds the app and publishes `dist`.

## Custom Domain Checklist

1. Add the domain in GitHub Pages settings.
2. Set DNS records at the domain registrar.
3. Wait for DNS to resolve.
4. Enable HTTPS in GitHub Pages.
5. Update `src/content/site.ts` with the live URL.

## Codex Prompt Template

Use this when starting a new client or prospect site:

```md
Use this repo as a static GitHub Pages site.

Business:
Audience:
Offer:
Location/service area:
Tone:
Pages/sections:
Primary CTA:
Contact details:
Available assets:
External services:

Replace the content in src/content/site.ts, update metadata, build a polished responsive first pass, run lint/build, and tell me what still needs real client assets or service connections.
```

## Prospect Demo Ethics

If you build a speculative demo for outreach, do not use copyrighted images, fake reviews, false claims, or language that implies the business approved the site. Keep the demo honest and easy to transfer if they want it.
