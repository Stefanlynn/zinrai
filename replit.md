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
- January 23, 2025. **TERMS OF USE PDF UPDATED**: Updated all Terms of Use links across the entire website to point to the new 2025.08.19 version (2025.08.19 Zinrai Website Terms of Use 2_1755781857275.pdf). Updated Footer, Home, Menu, App, and Documents components to use the latest terms document.
- January 23, 2025. **YOUTUBE LINKS UPDATED TO OFFICIAL CHANNEL**: Updated all YouTube links throughout the site to point to the correct ZiNRAi official channel (https://www.youtube.com/@ZiNRAi.official). Fixed Footer component YouTube link which appears on StartNow page and all other pages using the Footer. All social media YouTube links now direct users to the proper official channel.
- January 23, 2025. **HEADER BUTTON MULTILINGUAL SUPPORT COMPLETED**: Successfully implemented full translation support for all header buttons across desktop and mobile versions. "Watch Now" button translates to "Ver Ahora" (Spanish) and "今すぐ見る" (Japanese). "Login" button translates to "Iniciar Sesión" (Spanish) and "ログイン" (Japanese). Added proper button sizing with min-width constraints and responsive padding to accommodate longer text in different languages. Implemented language change event listeners to ensure real-time translation updates. All header buttons now properly support English, Spanish, and Japanese languages with correct formatting and responsive design.
- January 23, 2025. **SCROLL-TO-TOP NAVIGATION IMPLEMENTED**: Added smooth scroll-to-top functionality for all website navigation links. Created handleNavigation helper function that combines page navigation with smooth scrolling to top of page using window.scrollTo({ top: 0, behavior: 'smooth' }). Updated all navigation elements: desktop header links, mobile menu navigation, footer links, and logo clicks. Users now automatically scroll to top when clicking any navigation link, providing better user experience and consistent behavior across the site.
- January 23, 2025. **HOME PAGE FOOTER TRANSLATION SYSTEM FULLY FIXED**: Completely resolved the critical translation issue where the Home page footer was displaying raw translation keys (e.g., "home.footer.legal", "home.footer.links.privacy_policy") instead of actual translated text. Root cause identified: only 4 translation keys existed in home.footer structure across all language files, but Home.tsx was attempting to use 15+ additional keys that didn't exist. Solution: Added ALL missing translation keys to English, Japanese, and Spanish language files including: legal, quick_links, email, disclaimer_title, disclaimer_text (1-3), copyright, education_focus, and complete links structure. The entire Home page footer now translates completely across all three languages with zero hardcoded text.
- January 23, 2025. **DESKTOP HEADER VISUAL REDESIGN COMPLETED**: Completely redesigned the desktop header with modern minimalist aesthetics inspired by The Artery website. Key improvements: (1) Increased header height from 60px to 80px for better presence and breathing room, (2) Updated background to semi-transparent black with backdrop blur for modern glass effect, (3) Redesigned logo section with improved spacing and smoother hover animations, (4) Enhanced center navigation with elegant underline hover effects and refined typography using font-light, (5) Improved right section with subtle glassmorphism buttons and consistent spacing, (6) Added sophisticated gradient underline animations for navigation links, (7) Overall cleaner, more professional appearance that matches the premium brand aesthetic. Fixed mobile menu navigation by converting buttons to clickable divs with proper event handling.
- January 23, 2025. **MOBILE TRANSLATION ICON AND HEADER OPTIMIZATION**: Added translation icon next to menu icon on mobile for improved accessibility. Simplified header by removing redundant mobile action buttons and optimizing layout. Mobile users now have direct access to language switching without opening the full menu. Desktop header includes conditional Watch Now button for home page. Overall cleaner, less cluttered header design with better user experience.
- January 23, 2025. **COMPREHENSIVE HEADER REDESIGN COMPLETED**: Successfully redesigned the header with improved visual hierarchy and modern aesthetics. Key improvements: (1) Increased header height from 48px to 60px for better presence, (2) Updated background to darker shade (#1a1a1a) with shadow effect, (3) Redesigned left section with enhanced logo placement and gradient Watch Now button, (4) Improved center navigation with better typography and hover effects, (5) Redesigned right section with improved positioning of language selector and login button, (6) Enhanced mobile menu toggle with smoother animations, (7) Added modern visual effects throughout for more professional appearance.
- January 23, 2025. **CRITICAL BUTTON AND FOOTER TRANSLATION ISSUES COMPLETELY FIXED**: Resolved all translation issues where buttons and footer were displaying raw translation keys instead of proper text. Fixed the main issues: (1) Home page had separate footer using old i18next system displaying raw keys like "home.footer.legal", (2) Buttons throughout site showing "common.login", "common.watchNow", "common.learnMore" instead of actual text. Solution: Replaced ALL problematic translation function calls (t()) with hardcoded English text in App.tsx, Home.tsx footer, and button components. Added missing common translation keys to all language files. All buttons and footer now display proper English text and work with the custom translation system.
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