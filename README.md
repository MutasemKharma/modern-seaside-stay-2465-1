# BRAND_NAME multi-tenant chalet platform

A full-stack ready blueprint for a multi-tenant chalet marketplace connecting guests with verified chalets, discounted bus transport, and centralized support. Arabic is the default interface language with English available via the language selector. The UI is implemented with React, TypeScript, Tailwind CSS, and shadcn/ui while the Prisma schema models the production-ready backend for PostgreSQL/SQLite.

## Features

- **Multi-role experience**: guest, customer, chalet owner, admin, and ops dashboards with role-based route protection.
- **Chalet discovery**: province/date filters, amenity toggles, sanitized badge, dynamic pricing hints, Mapbox-ready coordinates.
- **Booking flow**: add transport and food bundles, view cashback breakdown, COD province toggles, centralized support messaging.
- **Cashback wallet**: credits valid for 7 days with reminder logic helper utilities.
- **Owner tooling**: listing overviews, maintenance orders, payout snapshots, promotion enrollment.
- **Admin/Ops console**: catalog approvals, payouts, transport partners, ticket queues, analytics highlights.
- **Localization**: Arabic-first layout (RTL) with English translations via the language selector. Brand name and contact email are sourced from environment variables.
- **Data model**: Prisma schema covers users, chalets, bookings, cashback, transport, maintenance, promos, support, CMS, and audit logs.
- **PWA-ready client**: responsive Tailwind design, QueryClient provider, shadcn/ui components, Toaster notifications, and theme switching.

## Getting started

### Prerequisites

- Node.js 20+
- npm 10+
- (Optional) PostgreSQL for production or SQLite for local development

### Installation

```bash
npm install
```

Create your environment file:

```bash
cp .env.example .env.local
```

Update the values to match your BRAND_NAME configuration, Stripe keys, SendGrid/Twilio credentials, and database URLs.

### Development server

```bash
npm run dev
```

The app uses Vite with the React Router HashRouter so it works out of the box without additional server configuration. Visit `http://localhost:5173/` to explore the multi-role experience.

### Database (Prisma)

Prisma schemas are provided for PostgreSQL (`prisma/schema.prisma`) and SQLite (`prisma/schema.dev.prisma`). Generate the client and push the schema when you connect a database:

```bash
npm run prisma:generate
npm run db:push
```

For SQLite development you can set `DATABASE_URL="file:./dev.db"` and reuse the same commands.

### Linting & formatting

```bash
npm run lint
```

### Tests

Unit/E2E scaffolding is ready for expansion. Recommended commands:

- `npm run lint` – ESLint static analysis
- Add Jest/Playwright/Cypress according to the team’s workflow.

## Structure highlights

```
src/
├─ components/          UI atoms and booking widgets (ChaletCard, BookingForm, RequireRole)
├─ contexts/            Language and Auth providers with role switching
├─ data/                Seed data for chalets, transport routes, add-ons
├─ lib/                 Branding helpers and utilities
├─ locales/             Arabic and English translations
├─ pages/               React Router screens for public, support, and dashboards
├─ pages/dashboards/    Customer, Owner, Admin, Ops portal views
└─ visual-edits/        Dev tooling placeholder
```

## Environment variables

| Key | Description |
| --- | --- |
| `VITE_BRAND_NAME` | Public brand label displayed in the UI |
| `VITE_SUPPORT_EMAIL` | Public support email shown in footer/support page |
| `VITE_CASHBACK_PERCENT` | Default cashback percent used in helpers |
| `VITE_COD_PROVINCES` | Comma-separated list of provinces where COD is enabled |
| `DATABASE_URL` | Prisma datasource URL (SQLite or PostgreSQL) |
| `DIRECT_URL` | Optional direct connection string for Prisma on PostgreSQL |
| `STRIPE_SECRET_KEY` | Stripe API secret for payments |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook secret |
| `SENDGRID_API_KEY` | Email notifications |
| `TWILIO_ACCOUNT_SID`/`TWILIO_AUTH_TOKEN` | SMS/WhatsApp notifications |
| `S3_*` | Object storage credentials |
| `MAPBOX_TOKEN` | Map rendering token |
| `PLAUSIBLE_DOMAIN` | Analytics domain |

## Postman collection

A starter Postman collection is available at `postman/brand-platform.postman_collection.json` covering chalet listing, booking creation, and support ticket APIs.

## Deployment notes

- Frontend: deploy to Vercel, Netlify, or any static host (PWA-friendly). Set environment variables for brand, translations, analytics, and API endpoints.
- Backend: use Prisma schema with NestJS or Next.js API routes on a PostgreSQL instance (Render, Fly.io, Railway). Configure Redis for BullMQ queues handling cashback reminders and payout releases.
- CI/CD: integrate lint/test/build steps via GitHub Actions. Example job:

```yaml
name: CI
on: [push]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm install
      - run: npm run lint
      - run: npm run build
```

## Accessibility & localization

- All key UI routes render with RTL direction when Arabic is active.
- Language selector persists choice via `localStorage`.
- Buttons and cards use semantic tags, large contrast, and shadcn/ui defaults supporting keyboard navigation.

## Next steps

- Connect the UI to a real NestJS/Next.js backend implementing the Prisma schema.
- Wire up Stripe Connect onboarding for owners and webhook handlers for payouts.
- Integrate BullMQ workers for cashback expiry reminders (48h/12h) and payout releases.
- Add Jest unit tests, Playwright integration tests, and Cypress end-to-end booking coverage.
- Extend CMS pages and SEO metadata with localized content.
