# BookTech

A premium online bookstore built with **Nuxt 4**, **Vue 3**, **TypeScript**, and **SCSS (BEM)**.

## Stack

| Layer | Choice |
|---|---|
| Framework | Nuxt 4 |
| UI | Vue 3 Composition API (`<script setup lang="ts">`) |
| Language | TypeScript (strict mode) |
| Styling | SCSS with BEM methodology |
| State | Pinia + `useState` |
| Payments | Stripe |
| Search | Meilisearch / Algolia |
| Database | PostgreSQL + Drizzle ORM |
| Images | Cloudflare R2 + `<NuxtImg>` |

## Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Set up environment variables
cp .env.example .env
# Fill in your values in .env

# 3. Start dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
app/
├── assets/scss/       # Design tokens, typography, category colors
├── components/
│   ├── book/          # BookCard, BookCover, BookMeta
│   ├── category/      # CategoryCard, CategoryFilter
│   ├── cart/          # CartDrawer (client-only)
│   ├── layout/        # AppHeader, AppFooter
│   └── ui/            # UiButton, UiRating, UiBadge, UiSkeleton, UiPagination
├── composables/       # useCart, useBooks, useCategories, useWishlist
├── layouts/           # default, checkout
├── pages/             # index, books/, categories/, cart, checkout/, account/
├── stores/            # cart.store, filters.store
└── types/             # book.types, cart.types, api.types

server/
├── api/
│   ├── books/         # GET /api/books, GET /api/books/:slug
│   ├── categories/    # GET /api/categories
│   └── cart/          # POST /api/cart/checkout (Stripe)
└── ...
```

## Category Color System

Each of the 10 book categories has a 3-stop color identity:

| Category | Dark | Mid | Light |
|---|---|---|---|
| Technology | #1E3A5F | #4A9EFF | #E8F3FF |
| Science | #0D3B2E | #2ECC71 | #E8FBF3 |
| Business | #3B1F00 | #F5A623 | #FFF8EC |
| Fiction | #2D0A4E | #A855F7 | #F5EEFF |
| History | #3B2200 | #C0874F | #FFF5EB |
| Design | #1A1A2E | #FF6B9D | #FFF0F5 |
| Philosophy | #1C2340 | #64748B | #F1F5F9 |
| Self-Help | #003D2E | #10B981 | #ECFDF5 |
| Travel | #1A3A4A | #38BDF8 | #F0F9FF |
| Cooking | #3B0A00 | #EF4444 | #FFF5F5 |

## Scripts

```bash
npm run dev         # Start dev server
npm run build       # Production build
npm run typecheck   # TypeScript check
npm run test        # Vitest unit tests
npm run test:e2e    # Playwright e2e tests
npm run lint        # ESLint
```

## Deployment

- **Frontend**: Vercel (`npm run build`)
- **Database**: Railway / Supabase / Neon
- **Images**: Cloudflare R2
- **Search**: Meilisearch Cloud or self-hosted

## License

MIT
