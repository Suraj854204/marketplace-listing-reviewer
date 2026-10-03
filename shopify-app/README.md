# QuickList AI - Shopify App

AI-powered product listing optimization for Shopify merchants. Optimize your product titles, descriptions, and tags for multiple marketplaces including Amazon, eBay, Etsy, and Shopify itself.

## Features

- **Single Product Optimization** - Paste any product listing and get AI-optimized titles, descriptions, and tags
- **Bulk Optimization** - Select multiple products from your store and optimize them all at once
- **Multi-Marketplace Support** - Tailored optimization for Amazon, eBay, Etsy, and Shopify SEO best practices
- **BYOK (Bring Your Own Key)** - Use your own Gemini API key or try with built-in demo mode
- **Brand Voice** - Configure your brand voice so AI-generated content matches your tone
- **Before/After Preview** - See exactly what changed before applying optimizations
- **Shopify Billing Integration** - Free, Pro ($29/mo), and Business ($79/mo) plans via Shopify subscriptions

## Tech Stack

- **Framework**: Remix (Vite) with TypeScript
- **UI**: Shopify Polaris component library
- **AI**: Google Gemini 2.5 Flash
- **Platform**: Shopify App Bridge for embedded app experience
- **Payments**: Shopify Billing API
- **Deployment**: Designed for Vercel or any Node.js host

## Architecture Overview

```
shopify-app/
  app/
    root.tsx                  # Root layout with Polaris provider
    routes/
      _index.tsx              # Dashboard with stats and quick actions
      optimize.tsx            # Single product optimization flow
      bulk.tsx                # Bulk optimization for multiple products
      settings.tsx            # BYOK, brand voice, preferences
      billing.tsx             # Plan selection and subscription management
    services/
      gemini.server.ts        # Gemini AI integration for listing optimization
      shopify.server.ts       # Shopify Admin API wrapper
      billing.server.ts       # Plan definitions and billing logic
    components/
      OptimizationPreview.tsx  # Before/after comparison view
      PlanCard.tsx             # Pricing plan card
      ProductCard.tsx          # Product card for bulk list
  shopify.app.toml            # Shopify app configuration
  vite.config.ts              # Vite + Remix configuration
```

## Setup Instructions

### Prerequisites

- Node.js 18+
- A Shopify Partner account
- A Shopify development store

### 1. Clone and Install

```bash
git clone <repo-url>
cd shopify-app
npm install
```

### 2. Configure Environment

```bash
cp .env.example .env
```

Fill in your environment variables:

- `SHOPIFY_API_KEY` - From your Shopify Partner dashboard
- `SHOPIFY_API_SECRET` - From your Shopify Partner dashboard
- `GEMINI_API_KEY` - (Optional) From Google AI Studio. Without it, the app runs in demo mode
- `HOST` - Your app's public URL (use ngrok for local dev)

### 3. Shopify Partner Setup

1. Go to [partners.shopify.com](https://partners.shopify.com)
2. Create a new app (choose "Build app manually")
3. Set the App URL to your HOST
4. Set the Allowed redirection URL(s) to `{HOST}/auth/callback`
5. Copy the API key and secret to your `.env`

### 4. Run Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:5173` and can be installed on your development store.

## Demo Mode

The app works without a Shopify connection or Gemini API key. In demo mode:

- Product data is simulated with realistic mock data
- AI optimizations return pre-built example improvements
- All UI flows are fully functional for testing and demonstration

## License

Proprietary - All rights reserved.
