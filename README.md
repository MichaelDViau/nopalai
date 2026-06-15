<div align="center">

# 🌵 NopalAI

### La IA que entiende Latam.

El asistente de inteligencia artificial creado para México: negocios, turismo,
bienes raíces y vida diaria.

</div>

---

NopalAI is a production-ready SaaS chat application built with Next.js 15, with a
premium, minimalist design inspired by OpenAI, Linear and Stripe. It ships with
authentication, a streaming AI chat dashboard, four specialized assistants,
daily usage limits, a Stripe-powered Premium plan, analytics and full SEO.

## ✨ Features

- **World-class landing page** — hero, features, assistants, pricing, testimonials, FAQ, structured data.
- **4 specialized assistants** — General, Traducción, Escuela y Tareas, Contenido y Marketing, each with a unique system prompt.
- **Streaming AI chat** — ChatGPT-quality UX with markdown, copy, typing indicator, auto-titling.
- **Chat management** — new chat, history, rename, delete, responsive sidebar, full mobile support.
- **Auth** — sign up / login / logout / protected dashboard via Clerk.
- **Free plan** — 20 messages/day tracked in the database, with ad placeholders.
- **Premium plan** — 99 MXN/month via Stripe: no ads, faster responses, premium models, higher limits.
- **Analytics** — PostHog + Google Analytics 4 (signups, chats, conversions, upgrades).
- **SEO** — metadata, sitemap, robots, JSON-LD, dynamic OG image, optimized for "IA México".
- **Security** — rate limiting (daily usage), Zod input validation, XSS-safe rendering, secure server-only secrets, security headers.

## 🧱 Tech Stack

| Layer       | Technology                                            |
| ----------- | ----------------------------------------------------- |
| Framework   | Next.js 15 (App Router) · TypeScript · React 19       |
| Styling     | Tailwind CSS · shadcn/ui (Radix primitives)           |
| Auth        | Clerk                                                  |
| Database    | Supabase (Postgres)                                   |
| AI          | OpenRouter (DeepSeek · Qwen · Llama) via Vercel AI SDK |
| Payments    | Stripe Subscriptions                                  |
| Analytics   | PostHog · Google Analytics 4                          |
| Hosting     | Vercel                                                 |

## 📁 Project Structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout: Clerk, fonts, analytics, SEO
│   ├── page.tsx                # Landing page
│   ├── globals.css             # Theme tokens (emerald) + base styles
│   ├── robots.ts · sitemap.ts · manifest.ts · opengraph-image.tsx
│   ├── pricing/                # Pricing page + comparison table
│   ├── legal/                  # Privacy & Terms
│   ├── sign-in/ · sign-up/     # Clerk auth pages
│   ├── dashboard/              # Protected chat workspace
│   └── api/
│       ├── chat/               # Streaming chat (usage limit + persistence)
│       ├── chats/              # CRUD: list/create/get/rename/delete
│       ├── usage/              # Daily usage meter
│       └── stripe/             # checkout · portal · webhook
├── components/
│   ├── ui/                     # shadcn/ui primitives
│   ├── marketing/              # Landing sections
│   ├── dashboard/              # Chat app, sidebar, composer, etc.
│   ├── billing/                # Upgrade button
│   ├── analytics/              # PostHog provider + GA
│   └── brand/                  # Logo
├── lib/                        # supabase, openrouter, stripe, modes, usage, validation…
├── types/                      # database + chat types
└── middleware.ts               # Clerk route protection
supabase/schema.sql             # Database schema + RLS + RPC
```

## 🚀 Getting Started

### 1. Install

```bash
npm install
```

### 2. Configure environment

```bash
cp .env.example .env.local
```

Fill in the values (see [Environment Variables](#-environment-variables)).

### 3. Set up the database

In the [Supabase SQL Editor](https://supabase.com/dashboard), run the contents of
[`supabase/schema.sql`](./supabase/schema.sql). This creates the `profiles`,
`chats`, `messages` and `usage_daily` tables, the atomic `increment_usage`
function, and enables Row Level Security.

### 4. Run

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## 🔑 Environment Variables

| Variable | Required | Description |
| --- | --- | --- |
| `NEXT_PUBLIC_APP_URL` | ✅ | Public base URL (no trailing slash) |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | ✅ | Clerk publishable key |
| `CLERK_SECRET_KEY` | ✅ | Clerk secret key |
| `NEXT_PUBLIC_SUPABASE_URL` | ✅ | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | ✅ | Supabase anon key |
| `SUPABASE_SERVICE_ROLE_KEY` | ✅ | Supabase service role (server only) |
| `OPENROUTER_API_KEY` | ✅ | OpenRouter API key |
| `OPENROUTER_MODEL_FREE` | – | Free-tier model (default `deepseek/deepseek-chat`) |
| `OPENROUTER_MODEL_PREMIUM` | – | Premium model (default `qwen/qwen-2.5-72b-instruct`) |
| `STRIPE_SECRET_KEY` | ✅ | Stripe secret key |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | ✅ | Stripe publishable key |
| `STRIPE_PREMIUM_PRICE_ID` | ✅ | Price ID for the 99 MXN plan |
| `STRIPE_WEBHOOK_SECRET` | ✅ | Stripe webhook signing secret |
| `NEXT_PUBLIC_POSTHOG_KEY` | – | PostHog project key |
| `NEXT_PUBLIC_POSTHOG_HOST` | – | PostHog host (default US cloud) |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | – | GA4 measurement ID |

## 🔌 Service Setup

### Clerk (Auth)
1. Create an app at [clerk.com](https://dashboard.clerk.com).
2. Copy the publishable and secret keys into `.env.local`.
3. Email + Google are recommended sign-in methods. The app already points Clerk
   at `/sign-in` and `/sign-up` and redirects to `/dashboard`.

### Supabase (Database)
1. Create a project at [supabase.com](https://supabase.com/dashboard).
2. Run `supabase/schema.sql` in the SQL Editor.
3. Copy the project URL, anon key and **service role** key into `.env.local`.

> Identity is owned by Clerk; the server talks to Supabase with the service-role
> key. RLS is enabled so the anon key cannot read/write app tables.

### OpenRouter (AI)
1. Create a key at [openrouter.ai/keys](https://openrouter.ai/keys).
2. Models are configurable via env. Defaults route Free users to **DeepSeek** and
   Premium users to **Qwen 72B**, with **Llama 3.1 70B** as a fallback family.

### Stripe (Payments)
1. Create a **recurring** Product/Price of **99 MXN / month**; copy its price ID
   to `STRIPE_PREMIUM_PRICE_ID`.
2. Add a webhook endpoint pointing to `/api/stripe/webhook` and subscribe to:
   `checkout.session.completed`, `customer.subscription.created`,
   `customer.subscription.updated`, `customer.subscription.deleted`.
3. Copy the webhook signing secret to `STRIPE_WEBHOOK_SECRET`.

Local testing:
```bash
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

## 🗄️ Database Schema

See [`supabase/schema.sql`](./supabase/schema.sql). Tables:

- **profiles** — `id` (Clerk user id), `plan`, Stripe customer/subscription, status.
- **chats** — `id`, `user_id`, `title`, `mode`, timestamps.
- **messages** — `id`, `chat_id`, `user_id`, `role`, `content`.
- **usage_daily** — `(user_id, day)` → `message_count` for daily limits.
- **increment_usage(user_id, day)** — atomic counter to prevent races past the limit.

## 📈 Analytics Events

`signup_completed` · `chat_started` · `message_sent` · `mode_selected` ·
`upgrade_clicked` · `checkout_started` · `premium_upgraded` ·
`daily_limit_reached` · `cta_clicked`. Sent to both PostHog and GA4.

## 🚢 Deploy to Vercel

1. Push this repo to GitHub and import it on [Vercel](https://vercel.com).
2. Add every variable from `.env.example` in **Project → Settings → Environment Variables**.
3. Set `NEXT_PUBLIC_APP_URL` to your production domain.
4. Deploy. Then create the Stripe webhook against
   `https://your-domain/api/stripe/webhook` and save the signing secret.
5. Run `supabase/schema.sql` against your production Supabase project.

## 🧪 Scripts

```bash
npm run dev        # Start dev server
npm run build      # Production build
npm run start      # Start production server
npm run lint       # ESLint
npm run typecheck  # TypeScript (no emit)
```

## 🔒 Security & Performance

- Server-only secrets (`server-only` import guard on Supabase/Stripe clients).
- Zod validation on every API route; chat ownership checks before reads/writes.
- **Race-free daily limit** — atomic increment-then-check, so concurrent
  requests can never slip past 20 messages/day.
- **CSRF protection** — same-origin check on every mutating endpoint, on top
  of Clerk's SameSite session cookies.
- **Security headers** — HSTS, a conservative CSP (`frame-ancestors`,
  `base-uri`, `object-src`), `X-Frame-Options`, `X-Content-Type-Options`,
  `Referrer-Policy`, `Permissions-Policy`.
- Parameterized Supabase queries (no SQL injection); XSS-safe markdown
  rendering (no raw HTML, sanitized URLs).
- Stripe webhooks verified by signature; the service-role key never reaches
  the browser.
- **AI latency** — parallelized pre-stream queries, request abort on client
  disconnect, and automatic retries on transient provider errors.
- Long-cached immutable static assets, code-splitting, lazy analytics and
  optimized fonts/package imports for a fast, high-Lighthouse experience.

---

<div align="center">
Hecho con orgullo para México 🇲🇽
</div>
