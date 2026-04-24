# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Project Overview

Atlas Batiment Modulaire (Atlas BTM) -- corporate website for a modular/prefabricated building company based in Guinea. Built with Next.js 16, React 19, and next-intl for French/English internationalization.

## Commands

```bash
npm run dev      # Start dev server (localhost:3000)
npm run build    # Production build (standalone output)
npm run lint     # ESLint
```

No test suite exists. Deployed via Docker (standalone output mode) to Hetzner/Dockploy.

## Architecture

### Routing & i18n

- **next-intl v4** handles all i18n. Middleware at `src/middleware.ts` auto-detects locale.
- Locales: `fr` (default), `en`. Config in `src/i18n/routing.ts` uses `localePrefix: "as-needed"` -- French URLs have no prefix, English gets `/en`.
- Translation files: `messages/fr.json`, `messages/en.json`. All user-visible text must go through `useTranslations()` / server-side equivalents.
- Navigation helpers (`Link`, `usePathname`, `useRouter`): always import from `@/i18n/navigation`, never from `next/link` or `next/navigation` directly.

### App Structure

```
src/app/[locale]/           # All pages are locale-parameterized
  page.tsx                  # Home
  about/page.tsx            # About
  products/page.tsx         # Products catalog
  sectors/page.tsx          # Sectors overview
  sectors/[sector]/page.tsx # Dynamic: prefab, mining, construction, defense, energy
  projects/page.tsx         # Projects/references
  contact/page.tsx          # Contact form
  privacy/page.tsx          # Privacy policy
  mentions-legales/page.tsx # Legal mentions
src/app/actions/contact.ts  # Server Action: sends contact form via nodemailer (Gmail SMTP)
```

### Component Organization

- `src/components/layout/` -- Header, Footer, WhatsAppButton (shared layout)
- `src/components/home/` -- Homepage sections (HeroSection, ProductsGrid, SectorsSection, etc.)
- `src/components/ui/` -- shadcn/ui primitives + custom UI elements (BlueprintGrid, RedLineFill, LogoWatermark)
- Feature components: `about/`, `products/`, `sectors/`, `projects/`, `contact/`, `legal/`, `catalog/`, `solutions/`, `references/`

### Styling & Animations

- **Tailwind CSS v4** with custom theme tokens defined in `src/app/globals.css` (atlas-navy, atlas-red `#bf0a28`, atlas-charcoal, etc.)
- **shadcn/ui** for base components (button, card, dialog, sheet, etc.)
- **GSAP + ScrollTrigger** for animations. Import from `@/lib/gsap` (client-only barrel that registers ScrollTrigger). Use `useGSAP` hook from `@gsap/react`.
- Fonts: Archivo (headings via `--font-heading`), Be Vietnam Pro (body via `--font-sans`)

### Key Conventions

- Path alias: `@/*` maps to `src/*`
- `output: "standalone"` in next.config.ts for Docker deployment
- `next.config.ts` wraps config with `createNextIntlPlugin`
- Environment variables needed: `SMTP_EMAIL`, `SMTP_PASSWORD`, `CONTACT_TO_EMAIL`

## Content Rules

- **No fabricated data**: never invent statistics, capacity numbers, certifications, or any claims that cannot be verified from existing content.
- **No emoji** in code or content unless explicitly requested.
- **Color palette**: grays + red (#bf0a28). The site must look professional and industrial.
- **Incremental changes only**: no large rewrites. Ask before making structural changes.
