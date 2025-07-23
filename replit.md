# ZiNRAi Official Website

## Overview

This is a full-stack React application for the ZiNRAi official website. The application features a modern, minimalist design with a black background, grid-based layout, and immersive digital experience. It includes both client-side functionality and a backend API server built with Express.js.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **Styling**: Tailwind CSS with custom design system
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: React hooks and TanStack Query for server state
- **UI Components**: Radix UI primitives with shadcn/ui components
- **Animation**: CSS animations and transitions for cinematic effects

### Backend Architecture
- **Runtime**: Node.js 20 with TypeScript
- **Framework**: Express.js for REST API
- **Database**: PostgreSQL with Drizzle ORM
- **Session Management**: In-memory storage with planned database integration
- **Build Process**: ESBuild for server bundling

### Design System
- **Layout**: 2x4 grid system for content organization
- **Theme**: Dark theme with black background (#000000)
- **Typography**: Light, minimalist font weights
- **Color Palette**: White text with opacity variations for hierarchy
- **Animations**: Grid line animations and subtle hover effects

## Key Components

### Pages Structure
- **Home**: Main landing page with video backgrounds and navigation grid
- **Product**: Course offerings with onboarding forms
- **Partner**: Brand promoter program information
- **Culture**: Company values and mission (Z.I.N.R.A.I pillars)
- **Insights**: Video content and testimonials (coming soon)
- **Leadership**: Team profiles (coming soon)
- **ZiNRAi Cares**: Impact initiative and statistics (page hidden from navigation)
- **Profile**: User account management
- **Contact**: Support and company information
- **Legal Pages**: Terms, privacy policy, refund policy, etc.

### UI Components
- **Grid System**: Animated grid lines for visual structure
- **Forms**: Styled form components with validation
- **Modals**: Overlay components for additional content
- **Navigation**: Corner-positioned UI elements
- **Video Integration**: Background videos and YouTube embeds

### Business Logic
- **Onboarding Flow**: Multi-step user registration process
- **Subscription Management**: Membership tiers and billing
- **Referral System**: URL parameter-based referral tracking
- **Cookie Compliance**: GDPR-compliant cookie management
- **Analytics Integration**: Google Analytics with consent mode

## Data Flow

### Client-Server Communication
1. Client makes API requests to `/api/*` endpoints
2. Express server processes requests and interacts with database
3. Responses formatted as JSON with error handling
4. Client updates UI based on server responses

### Database Schema
- **Users Table**: Basic user authentication and profile data
- **Schema Location**: `shared/schema.ts` using Drizzle ORM
- **Migration Strategy**: Drizzle Kit for schema management

### State Management
- **Local State**: React useState for component-level state
- **Server State**: TanStack Query for API data caching
- **Form State**: React Hook Form with Zod validation
- **Global State**: Context providers for user authentication

## External Dependencies

### Core Dependencies
- **Database**: Neon PostgreSQL (serverless)
- **Email Service**: SendGrid for transactional emails
- **Payment Processing**: Stripe for subscription billing
- **Cookie Management**: CookieYes for compliance
- **Analytics**: Google Analytics 4 with consent mode

### Development Tools
- **Type Safety**: TypeScript throughout the stack
- **Code Quality**: ESLint and Prettier (inferred from structure)
- **Build Optimization**: Vite with tree-shaking and code splitting
- **Environment Management**: dotenv for configuration

### Third-Party Integrations
- **Social Media**: Instagram, YouTube links
- **Video Content**: Local MP4 files and YouTube embeds
- **Forms**: Custom form handling with validation
- **Icons**: React Icons and Lucide React

## Deployment Strategy

### Production Environment
- **Platform**: Replit with autoscale deployment
- **Build Command**: `npm run build` (Vite + ESBuild)
- **Start Command**: `npm run start` (production server)
- **Port Configuration**: Internal port 5000, external port 80

### Development Environment
- **Dev Server**: `npm run dev` with hot reload
- **Database**: PostgreSQL 16 module in Replit
- **Environment Variables**: Managed through Replit secrets

### Static Assets
- **CDN Strategy**: Netlify for static site deployment (fallback)
- **Asset Optimization**: Vite handles asset bundling and optimization
- **Routing**: SPA with client-side routing and server fallback

### Database Management
- **ORM**: Drizzle with PostgreSQL dialect
- **Migrations**: `npm run db:push` for schema updates
- **Connection**: Environment variable-based configuration

## User Preferences

Preferred communication style: Simple, everyday language.

## Changelog

Changelog:
- January 23, 2025. **COMPLETE TRANSLATION IMPLEMENTATION**: Successfully implemented comprehensive internationalization across ALL pages and components. Added 50+ translation keys across English, Japanese, and Spanish language files. Every page (Product, Partner, Contact, Culture, Profile, Leadership, Insights, StartNow, Footer) now fully translates when switching languages. Fixed footer translation issues by adding useTranslation support and all missing footer translation keys. Zero hardcoded text remains - entire website is fully internationalized.
- January 16, 2025. Removed Facebook from all social media components across the website. Updated Home.tsx, Footer.tsx, App.tsx to remove Facebook links and icons. Removed Facebook Pixel tracking from cookie management system. Social media now shows only Instagram and YouTube links.
- January 8, 2025. Added country selection dropdown to Start Now page with OFAC compliance. Users must select country before proceeding. Excluded sanctioned countries: Afghanistan, Belarus, Burma (Myanmar), Chad, China, Cote D'Ivoire (Ivory Coast), Cuba, Democratic Republic of the Congo, Equatorial Guinea, Iran, Iraq, Lebanon, Liberia, North Korea, Russia, Rwanda, Sudan, Syria, Zimbabwe, and Crimea region of Ukraine. Added helper text "To better serve you, let us know what country you are in."
- January 8, 2025. Updated Home page footer text: changed "investment education" to "financial education" and updated address from "Suite #209" to "Suite #213" in both Home.tsx inline footer sections.
- January 8, 2025. Removed ZiNRAi Cares page from all navigation menus and disabled routing to hide the page from users. Updated Home.tsx, App.tsx, and mobile navigation to completely remove all references to ZiNRAi Cares.
- January 5, 2025. Completed final verification and updates for all legal document links across entire site (mobile and web). All Cookie Policy links now point to PDF instead of web page. Updated all components including CookieConsent.tsx, CookieSettings.tsx, Footer.tsx, and mobile navigation.
- January 5, 2025. Updated all "Japan Statutory Advertisement Matters" links to point directly to DOCX file instead of web page, removed JapanStatutoryMatters.tsx page
- January 5, 2025. Updated all "Refund Policy" links to point directly to PDF file instead of web page, removed RefundPolicy.tsx page
- January 5, 2025. Updated all "Privacy Policy" links to point directly to PDF file instead of web page, removed PrivacyPolicy.tsx page
- January 5, 2025. Updated all "Terms of Use" links to point directly to PDF file instead of web page, removed TermsOfUse.tsx page
- January 5, 2025. Updated all "Brand Promoter Agreement" links to point directly to PDF file instead of web page, removed BrandPromoterAgreement.tsx page
- January 5, 2025. Updated all "Terms & Conditions" references to "Member Agreement" and linked directly to PDF file instead of web page
- June 16, 2025. Initial setup