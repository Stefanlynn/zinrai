# ZiNRAi Official Website

## Overview
The ZiNRAi official website is a full-stack React application designed to provide an immersive digital experience for users. Its core purpose is to showcase ZiNRAi's offerings, primarily educational courses, and facilitate user engagement through a modern, minimalist interface. The site integrates client-side functionalities with a robust Express.js backend, focusing on a black background, grid-based layout, and cinematic visual effects to enhance user interaction. The project aims to establish a strong online presence, support user onboarding, and manage subscriptions, contributing to ZiNRAi's business growth and market reach in financial education.

## User Preferences
Preferred communication style: Simple, everyday language.

## System Architecture
### Frontend
- **Framework**: React 18 with TypeScript.
- **Build Tool**: Vite.
- **Styling**: Tailwind CSS with a custom design system.
- **Routing**: Wouter.
- **State Management**: React hooks and TanStack Query.
- **UI Components**: Radix UI primitives and shadcn/ui.
- **Animation**: CSS animations and transitions for cinematic effects.
- **Design System**: 2x4 grid layout, dark theme (#000000 background), minimalist typography, white text with opacity variations, and animated grid lines.

### Backend
- **Runtime**: Node.js 20 with TypeScript.
- **Framework**: Express.js for REST API.
- **Database**: PostgreSQL with Drizzle ORM.
- **Session Management**: In-memory storage (with planned database integration).
- **Build Process**: ESBuild.

### Key Features
- **Pages**: Home, Product (course offerings, onboarding forms), Partner (brand promoter program), Culture (company values), Insights (video content, testimonials - coming soon), Leadership (team profiles - coming soon), ZiNRAi Cares (impact initiative - hidden), Profile (user account), Contact, and Legal pages (Terms, Privacy, Refund Policy).
- **UI Elements**: Animated grid lines, styled forms with validation, modals, corner-positioned navigation elements, and video integration (backgrounds, YouTube embeds).
- **Business Logic**: Multi-step user onboarding, subscription management, URL parameter-based referral tracking, GDPR-compliant cookie management, and Google Analytics integration with consent mode.
- **Internationalization**: Comprehensive multilingual support for English, Japanese, and Spanish across all pages and components.

### Data Flow and Management
- **Client-Server Communication**: RESTful API calls to `/api/*` endpoints, JSON responses.
- **Database Schema**: Managed via Drizzle ORM (`shared/schema.ts`), with Drizzle Kit for migrations.
- **State Management**: React `useState` for local state, TanStack Query for server state, React Hook Form with Zod for form state, and Context Providers for global state (e.g., authentication).

### Deployment
- **Production**: Replit with autoscale deployment, `npm run build` and `npm run start`.
- **Development**: `npm run dev` with hot reload, PostgreSQL 16 module in Replit, environment variables managed via Replit secrets.
- **Static Assets**: Vite handles bundling and optimization, Netlify for static site deployment (fallback).

## External Dependencies
- **Database**: Neon PostgreSQL (serverless).
- **Email Service**: SendGrid.
- **Payment Processing**: Stripe.
- **Cookie Management**: CookieYes.
- **Analytics**: Google Analytics 4.
- **Libraries/Tools**: TypeScript, ESLint, Prettier, dotenv, React Icons, Lucide React.
- **Integrations**: Instagram, YouTube (for links and video embeds).

## Changelog
- September 3, 2025. **JAPAN STATUTORY ADVERTISEMENT MATTERS PDF UPDATED**: Updated all Japan Statutory Advertisement Matters links across the entire website to point to the new 2025.09.03 version (2025.09.03 Zinrai Japan Statutory Advertisement Matters_1756912064941.pdf). Updated Footer, Home, and Menu components to use the latest Japan statutory document. Fixed 404 error that was occurring when users clicked on this link.
- January 23, 2025. **REFUND POLICY PDF UPDATED**: Updated all Refund Policy links across the entire website to point to the new 2025.08.22 version (2025.08.22 Zinrai Refund Policy 1_1755871091881.pdf). Updated Footer, Home, Menu, App, and Documents components to use the latest refund policy document.
- January 23, 2025. **PRIVACY POLICY PDF UPDATED**: Updated all Privacy Policy links across the entire website to point to the new 2025.08.19 version (2025.08.19 Zinrai Website Privacy Policy 2_1755781937112.pdf). Updated Footer, Home, Menu, App, Documents, and CookieSettings components to use the latest privacy policy document.
- January 23, 2025. **TERMS OF USE PDF UPDATED**: Updated all Terms of Use links across the entire website to point to the new 2025.08.19 version (2025.08.19 Zinrai Website Terms of Use 2_1755781857275.pdf). Updated Footer, Home, Menu, App, and Documents components to use the latest terms document.