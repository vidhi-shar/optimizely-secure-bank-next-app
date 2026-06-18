# SecureBank — Next.js App

Demo banking website built with Next.js 15, showcasing Optimizely SaaS CMS headless rendering capabilities.

## Pages

| Route | Description |
|---|---|
| `/` | Home — Hero Banner fetched from Optimizely GraphQL |
| `/bank-and-save` | Banking & savings accounts |
| `/credit-cards` | Credit card comparison |
| `/loans` | Personal, home & education loans |
| `/retirement` | Superannuation & retirement planning |
| `/calculators` | Interactive financial calculators (React state) |
| `/contact` | Contact form |
| `/login` | Hardcoded authentication (3 demo users) |
| `/sign-up` | Account registration form |
| `/dashboard` | Protected dashboard (requires login) |

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Optimizely GraphQL Setup

1. Copy `.env.local.example` to `.env.local`
2. Fill in your Optimizely SaaS Content Graph credentials:
   - `OPTIMIZELY_GRAPH_SINGLE_KEY` — from your Optimizely project settings
   - `OPTIMIZELY_GRAPH_GATEWAY` — `https://cg.optimizely.com`

### Content Model (HeroBannerBlock)

Create a `HeroBannerBlock` content type in Optimizely SaaS CMS with these fields:

| Property | Type |
|---|---|
| `Heading` | LongString |
| `SubHeading` | LongString |
| `BadgeText` | LongString |
| `CtaPrimaryLabel` | LongString |
| `CtaSecondaryLabel` | LongString |
| `Image` | ContentReference (image) |
| `ImageAltText` | LongString |

If not configured, the banner falls back to static defaults — the app works fully without Optimizely credentials.

## Demo Login Credentials

| Email | Password |
|---|---|
| john.smith@example.com | SecureBank@123 |
| sarah.jones@example.com | Banking@456 |
| demo@securebank.com | Demo@2024 |

## Deploy to Vercel

```bash
npm install -g vercel
vercel --prod
```

Set the following environment variables in your Vercel project settings:
- `OPTIMIZELY_GRAPH_SINGLE_KEY`
- `OPTIMIZELY_GRAPH_GATEWAY`
