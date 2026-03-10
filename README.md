# Cambry International Admission Centre

A modern, full-stack web application for **Cambry International Admission Centre** — a study-abroad consultancy that helps students explore global education opportunities, find universities, and book IELTS exams.

Built with **Next.js 16**, **React 19**, **Prisma 7**, and **Tailwind CSS v4**.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Database Setup](#database-setup)
- [Scripts](#scripts)
- [Architecture Overview](#architecture-overview)
- [Public Pages](#public-pages)
- [Admin Dashboard](#admin-dashboard)
- [API Routes](#api-routes)
- [Server Actions](#server-actions)
- [Components](#components)
- [Database Schema](#database-schema)
- [Authentication](#authentication)
- [AI Chatbot](#ai-chatbot)
- [Deployment](#deployment)

---

## Features

- **Study Destination Explorer** — Browse countries with detailed info, visa requirements, and infographics
- **University Finder** — Search and filter universities by country, ranking, and programs
- **Course Catalog** — View available courses across partner universities
- **IELTS Booking** — IELTS test info and booking enquiry
- **Scholarship Spotlight** — Featured scholarships with criteria and deadlines
- **Lead Capture (CRM)** — Contact forms with UTM tracking and lead status management
- **AI Chatbot** — Google Gemini-powered conversational assistant with full database context
- **Testimonials Carousel** — Student success stories
- **Announcement Marquee** — Live scrolling news/announcements
- **Admin Dashboard** — Full CRUD management for all content types
- **Bulk Import/Export** — CSV/JSON data import and export for admin
- **Responsive Design** — Mobile-first with smooth Framer Motion animations
- **WhatsApp Integration** — Floating WhatsApp contact widget

---

## Tech Stack

| Category | Technology | Version |
|----------|-----------|---------|
| Framework | Next.js (App Router) | 16.1.6 |
| UI Library | React | 19.2.3 |
| Language | TypeScript | 5.x |
| Styling | Tailwind CSS | 4.x |
| ORM | Prisma (with driver adapters) | 7.4.2 |
| Database | PostgreSQL | — |
| Animations | Framer Motion | 12.35.x |
| Icons | Lucide React | 0.577.x |
| AI | Google Generative AI (Gemini) | 1.44.x |
| Auth | JWT via jose | 6.2.x |
| Password Hashing | bcryptjs | 3.x |
| Notifications | react-hot-toast | 2.6.x |
| Lottie Animations | @lottiefiles/react-lottie-player | 3.6.x |
| Progress Bar | next-nprogress-bar | 2.4.x |
| Dev Server | Turbopack | Built-in |

---

## Project Structure

```
sonic-orbit v3/
├── prisma/
│   ├── schema.prisma          # Database schema (15 models)
│   └── seed.ts                # Database seed script
├── public/
│   └── lottie/                # Lottie animation JSON files
├── src/
│   ├── proxy.ts               # Admin route protection middleware
│   ├── actions/               # Server actions (13 files)
│   │   ├── announcements.ts
│   │   ├── auth.ts
│   │   ├── certifications.ts
│   │   ├── counselors.ts
│   │   ├── countries.ts
│   │   ├── courses.ts
│   │   ├── englishTests.ts
│   │   ├── faqs.ts
│   │   ├── ieltsInfo.ts
│   │   ├── leads.ts
│   │   ├── scholarships.ts
│   │   ├── testimonials.ts
│   │   └── universities.ts
│   ├── app/
│   │   ├── globals.css        # Global styles (Tailwind)
│   │   ├── layout.tsx         # Root layout with metadata
│   │   ├── loading.tsx        # Global loading state
│   │   ├── (public)/          # Public-facing pages
│   │   │   ├── layout.tsx     # Navbar + Footer wrapper
│   │   │   ├── page.tsx       # Homepage
│   │   │   ├── about/
│   │   │   ├── certifications/
│   │   │   ├── contact/
│   │   │   ├── destinations/
│   │   │   │   └── [slug]/    # Dynamic country pages
│   │   │   ├── ielts-booking/
│   │   │   └── services/
│   │   ├── admin/             # Admin dashboard
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx       # Dashboard home
│   │   │   ├── login/
│   │   │   ├── announcements/
│   │   │   ├── certifications/
│   │   │   ├── counselors/
│   │   │   ├── countries/
│   │   │   ├── courses/
│   │   │   ├── english-tests/
│   │   │   ├── faqs/
│   │   │   ├── ielts-booking/
│   │   │   ├── leads/
│   │   │   ├── scholarships/
│   │   │   ├── testimonials/
│   │   │   └── universities/
│   │   └── api/
│   │       ├── chat/          # AI chatbot endpoint
│   │       └── admin/import/  # Bulk data import
│   ├── components/
│   │   ├── PageHero.tsx       # Shared hero section
│   │   ├── Navbar.tsx         # Navigation bar
│   │   ├── Footer.tsx         # Site footer
│   │   ├── Chatbot.tsx        # AI chat widget
│   │   ├── LeadForm.tsx       # Contact/enquiry form
│   │   ├── WhatsAppWidget.tsx # WhatsApp floating button
│   │   ├── MotionWrappers.tsx # Framer Motion utilities
│   │   ├── UniversityFinder.tsx
│   │   ├── UniversityMarquee.tsx
│   │   ├── TestimonialsCarousel.tsx
│   │   ├── ScholarshipSpotlight.tsx
│   │   ├── AnnouncementMarquee.tsx
│   │   ├── JourneyStepper.tsx
│   │   ├── TrustBanner.tsx
│   │   ├── UrgencyCTA.tsx
│   │   ├── LottiePlayerClient.tsx
│   │   ├── admin/             # Admin-specific components
│   │   │   ├── AdminLayout.tsx
│   │   │   ├── DeleteConfirmModal.tsx
│   │   │   └── ImportExportButtons.tsx
│   │   └── Providers/
│   │       ├── ProgressBarProvider.tsx
│   │       └── NavigationLoader.tsx
│   └── lib/
│       ├── prisma.ts          # Prisma client singleton
│       └── session.ts         # JWT session utilities
├── package.json
├── tsconfig.json
├── next.config.ts
├── postcss.config.mjs
├── eslint.config.mjs
└── prisma.config.ts
```

---

## Getting Started

### Prerequisites

- **Node.js** 18+ (20+ recommended)
- **PostgreSQL** database (local or hosted)
- **npm** (comes with Node.js)

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd "sonic-orbit v3"

# Install dependencies
npm install

# Set up environment variables (see below)
cp .env.example .env

# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma db push

# (Optional) Seed the database
npx prisma db seed

# Start the development server (with Turbopack)
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Environment Variables

Create a `.env` file in the project root:

```env
# Database (required)
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"

# Admin Authentication
ADMIN_SECRET="your-secure-secret-key"

# Google Gemini AI (for chatbot)
GOOGLE_GENAI_API_KEY="your-google-genai-api-key"
```

| Variable | Required | Description |
|----------|----------|-------------|
| `DATABASE_URL` | Yes | PostgreSQL connection string |
| `ADMIN_SECRET` | Recommended | Secret key for JWT signing (defaults to a dev fallback) |
| `GOOGLE_GENAI_API_KEY` | For chatbot | API key for Google Generative AI |

---

## Database Setup

The project uses **Prisma** with the PostgreSQL driver adapter (`@prisma/adapter-pg`). The Prisma config is split between:

- `prisma/schema.prisma` — Schema definition (models, enums, relations)
- `prisma.config.ts` — Runtime configuration (driver adapter setup)

```bash
# Push schema to database
npx prisma db push

# Open Prisma Studio (GUI)
npx prisma studio

# Seed with sample data
npx prisma db seed

# Generate client after schema changes
npx prisma generate
```

---

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server with Turbopack |
| `npm run build` | Generate Prisma client + build for production |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |

---

## Architecture Overview

### Rendering Strategy

- **Server Components** (default) — Pages and layouts fetch data directly via server actions
- **Client Components** — Interactive UI (forms, carousels, animations) marked with `"use client"`
- **Server Actions** — All data mutations go through `src/actions/` using `"use server"` with `revalidatePath()`

### Route Groups

- `(public)/` — Public-facing pages with shared Navbar + Footer layout
- `admin/` — Admin dashboard with sidebar layout, protected by JWT auth

### Data Flow

```
Browser → Next.js Route → Server Component → Server Action → Prisma → PostgreSQL
                              ↓
                        Client Component (interactive parts)
```

---

## Public Pages

| Route | Page | Description |
|-------|------|-------------|
| `/` | Home | Hero, stats, university marquee, services, testimonials, urgency CTA |
| `/about` | About Us | Team, mission, vision, counselor profiles |
| `/services` | Services | Six core services offered by Cambry |
| `/destinations` | Destinations | Browse study-abroad countries with stats |
| `/destinations/[slug]` | Country Detail | Country-specific info, universities, courses, scholarships |
| `/certifications` | Certifications | Agency certifications and credentials |
| `/contact` | Contact | Lead capture form + FAQ section |
| `/ielts-booking` | IELTS Booking | IELTS test info and enquiry form |

All public pages use the shared `PageHero` component for visual consistency.

---

## Admin Dashboard

Access at `/admin/login`. Protected by JWT-based authentication.

| Section | Manages | Features |
|---------|---------|----------|
| Dashboard | Overview | Stats and quick links |
| Countries | Study destinations | CRUD + image, flag, infographic data |
| Universities | Partner institutions | CRUD + country relationship |
| Courses | Academic programs | CRUD + university/level filters |
| Leads | Student enquiries | CRM with status tracking (New → Contacted → Processing → Converted → Closed) |
| Counselors | Team members | CRUD + active/inactive toggle |
| Testimonials | Student reviews | CRUD + featured toggle |
| FAQs | Help content | CRUD + category filtering |
| Scholarships | Funding info | CRUD + university linkage |
| English Tests | Language requirements | CRUD + university linkage |
| Certifications | Agency credentials | CRUD management |
| IELTS Booking | Test information | CRUD management |
| Announcements | News/updates | CRUD + active/inactive toggle |

Each admin section has a `page.tsx` (server component) and a `[Name]Client.tsx` (client component with full CRUD UI, modals, and data tables). Supports bulk import/export via `ImportExportButtons`.

---

## API Routes

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/chat` | POST | AI chatbot — sends user message to Google Gemini with database context (countries, universities, courses) |
| `/api/admin/import` | POST | Bulk data import — accepts `{ model, payload: [] }` and batch creates records |

---

## Server Actions

Located in `src/actions/`. All use `"use server"` directive and call `revalidatePath()` after mutations.

| File | Key Functions |
|------|--------------|
| `auth.ts` | `loginAdmin`, `logoutAdmin` (cookie-based JWT sessions) |
| `countries.ts` | `getCountries`, `getCountryBySlug` (includes universities) |
| `universities.ts` | `getTopUniversities`, `getUniversityBySlug`, `getAllUniversities` |
| `courses.ts` | `getCourses`, `getCourseById`, CRUD |
| `leads.ts` | `getLeads`, `getLeadById`, CRUD with status tracking |
| `counselors.ts` | `getCounselors`, `getAllCounselors`, CRUD |
| `testimonials.ts` | `getTestimonials`, `getFeaturedTestimonials`, CRUD |
| `faqs.ts` | `getFaqs(category?)`, `getAllFaqs`, CRUD |
| `scholarships.ts` | `getScholarships`, CRUD with university context |
| `englishTests.ts` | `getEnglishTests`, CRUD |
| `certifications.ts` | `getCertifications`, `getActiveCertifications`, CRUD |
| `ieltsInfo.ts` | `getIELTSInfo`, `getActiveIELTSInfo`, CRUD |
| `announcements.ts` | `getAnnouncements`, `getActiveAnnouncements`, CRUD |

---

## Components

### Shared UI Components

| Component | Description |
|-----------|-------------|
| `PageHero` | Unified hero section with badge, title, subtitle, CTA, and ambient orb effects |
| `Navbar` | Responsive nav with country dropdown, scroll-aware styling |
| `Footer` | Site footer with quick links, social media, and contact info |
| `LeadForm` | Contact form that creates leads via server action |
| `Chatbot` | AI-powered chat widget (Google Gemini) |
| `WhatsAppWidget` | Floating WhatsApp contact button |
| `MotionWrappers` | Framer Motion utilities: `FadeIn`, `StaggerContainer`, `StaggerItem`, `HoverCard` |
| `UniversityFinder` | University search and filter interface |
| `UniversityMarquee` | Auto-scrolling university carousel |
| `TestimonialsCarousel` | Student testimonial slider |
| `ScholarshipSpotlight` | Featured scholarships display |
| `AnnouncementMarquee` | Scrolling announcement ticker |
| `JourneyStepper` | Step-by-step process indicator |
| `TrustBanner` | Stats and credibility section |
| `UrgencyCTA` | Call-to-action with urgency messaging |
| `LottiePlayerClient` | Lottie animation player wrapper |

### Admin Components

| Component | Description |
|-----------|-------------|
| `AdminLayout` | Dashboard sidebar layout with navigation links |
| `DeleteConfirmModal` | Confirmation dialog for delete actions |
| `ImportExportButtons` | Bulk CSV/JSON import and export UI |

### Providers

| Component | Description |
|-----------|-------------|
| `ProgressBarProvider` | Top-of-page navigation progress bar |
| `NavigationLoader` | Full-screen loading animation for route transitions |

---

## Database Schema

### Models (15 total)

| Model | Key Fields | Relations |
|-------|-----------|-----------|
| **Country** | name, slug, description, imageUrl, flagUrl, currency, visaRequirements, infographicData (JSON) | Has many Universities |
| **University** | name, slug, location, ranking, website, tuitionEstimate | Belongs to Country; has many Courses, Scholarships, EnglishTestRequirements |
| **Course** | title, level (enum), duration, description | Belongs to University |
| **Lead** | name, email, phone, desiredCountry, status (enum), utmSource, utmMedium, utmCampaign | — |
| **AdminUser** | email (unique), passwordHash, name | — |
| **EnglishTestRequirement** | testName, minimumScore, acceptsMOI | Belongs to University |
| **Scholarship** | name, amount, description, criteria, deadline | Belongs to University |
| **Counselor** | name, role, bio, imageUrl, email, phone, isActive | — |
| **Testimonial** | studentName, studentCourse, universityName, quote, featured | — |
| **FAQ** | question, answer, category, isActive | — |
| **Service** | title, slug, description, icon, order | — |
| **Content** | key (unique), type (enum), body, imageUrl, linkUrl | — |
| **Certification** | title, issuingBody, description, imageUrl, dateIssued | — |
| **IELTSInfo** | testType, fee, venue, requirements, nextDate | — |
| **Announcement** | title, content, type, isActive | — |

### Enums

- **CourseLevel**: `BACHELORS`, `MASTERS`, `PHD`, `DIPLOMA`, `CERTIFICATE`, `FOUNDATION`
- **LeadStatus**: `NEW`, `CONTACTED`, `PROCESSING`, `CONVERTED`, `CLOSED`
- **ContentType**: `PAGE_HERO`, `PAGE_SECTION`, `GENERAL`

---

## Authentication

Admin authentication uses **JWT tokens** (via `jose` library):

1. Admin logs in at `/admin/login` with email + password
2. Password verified against bcrypt hash in `AdminUser` table
3. On success, a JWT token is created (7-day expiry) and stored as `admin_session` cookie
4. `src/proxy.ts` acts as middleware — intercepts all `/admin/*` routes (except `/admin/login`), validates the JWT, and redirects to login if invalid

### Session Utilities (`src/lib/session.ts`)

- `createSession(adminId)` — Creates a signed JWT with HS256 algorithm
- `verifySession(token)` — Validates token and returns `adminId` or `null`

---

## AI Chatbot

The chatbot is powered by **Google Gemini** and has full access to the database context:

- **Endpoint**: `POST /api/chat`
- **How it works**:
  1. On each request, fetches all countries, universities, and courses from the database
  2. Constructs a system prompt with this data so the AI has full knowledge of Cambry's offerings
  3. Sends the user's message to Google Gemini
  4. Streams the AI response back to the client
- **Frontend**: `Chatbot.tsx` — Floating chat widget with message history

---

## Deployment

### Build for Production

```bash
npm run build    # Generates Prisma client + builds Next.js
npm start        # Starts the production server
```

### Deploy on Vercel

1. Push to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Set environment variables (`DATABASE_URL`, `ADMIN_SECRET`, `GOOGLE_GENAI_API_KEY`)
4. Deploy — Vercel auto-detects Next.js

### Deploy on Other Platforms

The app is a standard Next.js application. Ensure:
- PostgreSQL database is accessible
- Environment variables are configured
- `npm run build` runs successfully (includes `prisma generate`)
- Node.js 18+ runtime is available

---

## License

Private project. All rights reserved.
