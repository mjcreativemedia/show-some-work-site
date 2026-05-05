# Codex Site Template Rules

This repo is a reusable starter for fast static sites and simple front-end apps hosted on GitHub Pages.

## Default Stack

- Vite
- React
- TypeScript
- Tailwind CSS
- lucide-react
- GitHub Pages via GitHub Actions

## Product Direction

- Build the actual site or app experience first, not a marketing explanation of the tech.
- Keep the first screen specific to the brand, offer, product, place, or person.
- Favor clear navigation, sharp copy, responsive layouts, and fast loading.
- Put client-editable copy and lists in `src/content`.
- Do not add a backend unless explicitly requested.
- Do not commit secrets, API keys, private client notes, or raw lead data.
- Do not use copyrighted photos, scraped testimonials, or claims that cannot be verified.

## Visual Direction

- Use Tailwind utility classes and local components.
- Use lucide-react for icons.
- Keep cards to repeated items, modals, and real framed tools.
- Avoid decorative blob backgrounds and one-note palettes.
- Check that text fits on mobile and desktop.
- Optimize images before adding them to the repo.

## Deployment

- The site must build with `npm run build`.
- GitHub Pages deploys from `.github/workflows/deploy-pages.yml`.
- `vite.config.ts` uses a relative base path so the same build works for user sites, organization sites, project pages, and custom domains.

## Client/Prospect Workflow

1. Capture the business name, audience, offer, service area, tone, contact details, domain, and calls to action.
2. Replace content in `src/content/site.ts`.
3. Update metadata in `index.html`.
4. Add real images to `public` or `src/assets` only after optimizing them.
5. Run `npm run lint` and `npm run build`.
6. Inspect desktop and mobile layouts before shipping.
7. Connect custom domain, HTTPS, form endpoint, analytics, and external services.

## Backend Boundaries

GitHub Pages is static hosting. Use external services for dynamic behavior:

- Forms: Formspree, Basin, Tally, Typeform, ConvertKit, Beehiiv, or a serverless endpoint.
- Auth/data: Supabase, Firebase, Neon, Turso, or Airtable.
- Payments: Stripe Payment Links, Lemon Squeezy, Gumroad, or Shopify.
- Media: Cloudinary, YouTube, Vimeo, Bunny, or Cloudflare R2.
