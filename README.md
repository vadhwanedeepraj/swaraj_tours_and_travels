# 🚩 Swaraj Tours & Travels (स्वराज टुर्स अँड ट्रॅव्हल्स) - Nanded

> **प्रवास सुखकर... आमची जबाबदारी...!**  
> Premium bilingual (Marathi & English) tour booking management platform and fleet control system for **Swaraj Tours & Travels**, based in Nanded, Maharashtra.

[![Next.js 14](https://img.shields.io/badge/Next.js-14.2-black?style=flat&logo=next.js)](https://nextjs.org/)
[![React 18](https://img.shields.io/badge/React-18-blue?style=flat&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3ECF8E?style=flat&logo=supabase)](https://supabase.com/)

---

## 🌟 Key Highlights & Features

### 👤 Customer-Facing Experience
- **Bilingual Interface**: Seamless 1-click toggle between **मराठी (Marathi)** and **English** with persistent local preference.
- **Hero & Cultural Identity**: Chhatrapati Shivaji Maharaj frame and saffron/navy royal color theme.
- **Quick Quotation Calculator**: Real-time quote estimation with 1-click WhatsApp inquiry forwarding directly to the owner.
- **Fleet Showcase**: Real vehicle profiles with per-km rates, seating capacity, AC status, and luggage allowances (Hyundai Aura, Maruti Ertiga, Toyota Innova, Tempo Traveller).
- **Tour Packages**: Curated pilgrimage and tourist itineraries from Nanded (Shirdi Sai Darshan, Jyotirlinga Darshan, Tuljapur Bhavani, Mahur Gad, Nanded Sachkhand Gurudwara, Hyderabad).
- **Interactive Map**: Lightweight OpenStreetMap & Leaflet integration pinned to Nanded headquarters without expensive Google Maps API billing.
- **Mobile Sticky Action Bar**: One-touch Call (`+91 9325232301`) and WhatsApp buttons optimized for mobile travellers.

### 🛡️ Owner & Admin Control Panel (`/admin`)
- **PIN-Protected Gatekeeper**: Instant mobile/PIN authentication screen (`9325` / `Swaraj@9325`).
- **Fleet & Pricing Manager**:
  - Live 1-click availability toggles (Available 🟢 / On Request 🟡) that reflect immediately on the customer portal.
  - Rate-per-km and driver allowance live editor.
  - Add, edit, and remove vehicles with photo previews.
- **Booking & Enquiries Pipeline**:
  - Centralized booking list with status lifecycle: `New Enquiry` ➔ `Quotation Sent` ➔ `Confirmed` ➔ `Completed` ➔ `Cancelled`.
  - 1-click WhatsApp quote generator pre-filled with customer details and fare estimate.

---

## 🏗️ Architecture & Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | Next.js 14 (App Router) |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS + Lucide Icons |
| **Forms & Validation** | React Hook Form + Zod |
| **Database** | Supabase (PostgreSQL with Row Level Security) |
| **Maps** | Leaflet + OpenStreetMap (No API key needed) |
| **SEO & Schema** | Schema.org `TravelAgency` JSON-LD + OpenGraph metadata |

---

## 📁 Project Structure

```text
swaraj_tours_and_travels/
├── public/
│   ├── branding/           # Logos, banners, Maharaj portrait
│   └── vehicles/           # Real fleet vehicle images
├── src/
│   ├── actions/
│   │   └── bookings.ts     # Server action for booking submissions
│   ├── app/
│   │   ├── page.tsx        # Main homepage
│   │   ├── about/          # About Us & Nanded story
│   │   ├── book/           # Multi-step booking form
│   │   ├── fleet/          # Fleet overview & vehicle slug details
│   │   ├── packages/       # Tour package catalog & slug itineraries
│   │   ├── gallery/        # Photo gallery
│   │   ├── contact/        # Contact info & Leaflet Nanded map
│   │   ├── admin/          # Admin dashboard, vehicles & bookings
│   │   └── api/admin/      # Fleet CRUD endpoints
│   ├── components/         # Reusable modular UI components
│   ├── lib/
│   │   ├── data/           # Default fleet & package datasets
│   │   ├── supabase/       # Supabase client configuration
│   │   └── validations/    # Zod schemas for booking & validation
│   └── locales/
│       ├── en.json         # English translations
│       └── mr.json         # Marathi translations
└── supabase/
    └── migrations/         # 3 SQL files (Schema, RLS, Seed data)
```

---

## 🚀 Getting Started Locally

### 1. Prerequisites
- **Node.js**: v18.17+ or v20+
- **npm** or **pnpm**

### 2. Installation
```bash
git clone https://github.com/vadhwanedeepraj/swaraj_tours_and_travels.git
cd swaraj_tours_and_travels
npm install
```

### 3. Setup Environment Variables
Create a `.env.local` file in the root directory:

```env
# Website URL
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Supabase (Optional for local demo mode; Required for live database)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Business Contact Settings
NEXT_PUBLIC_WHATSAPP_NUMBER=919325232301
NEXT_PUBLIC_BUSINESS_PHONE=+919325232301
NEXT_PUBLIC_DEFAULT_CITY=Nanded
```

> **Note:** The application includes an automatic fallback demo mode. If Supabase keys are not set, booking inquiries will succeed locally with mock reference numbers!

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Production Build Test
```bash
npm run build
```

---

## 🗄️ Supabase Database Setup

1. Create a free project at [supabase.com](https://supabase.com).
2. Open the **SQL Editor** in your Supabase dashboard.
3. Run the migrations in order:
   1. `supabase/migrations/001_initial_schema.sql` (17 core relational tables)
   2. `supabase/migrations/002_rls_policies.sql` (Security rules)
   3. `supabase/migrations/003_seed_data.sql` (Pre-loaded fleet & services)
4. Copy your **Project URL** and **Anon Key** from `Project Settings > API` into `.env.local` and your hosting environment variables.

---

## 🚢 Deployment (Vercel)

1. Push your changes to GitHub: `https://github.com/vadhwanedeepraj/swaraj_tours_and_travels`.
2. Go to [Vercel](https://vercel.com) and click **"Add New Project"**.
3. Import `swaraj_tours_and_travels`.
4. In the **Environment Variables** section, add:
   - `NEXT_PUBLIC_SITE_URL` = your live domain (e.g. `https://swarajtravels.in` or Vercel URL)
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `NEXT_PUBLIC_WHATSAPP_NUMBER` = `919325232301`
   - `NEXT_PUBLIC_BUSINESS_PHONE` = `+919325232301`
   - `NEXT_PUBLIC_DEFAULT_CITY` = `Nanded`
5. Click **Deploy**. Your site is now live!

---

## 📞 Business Information
- **Business Name**: Swaraj Tours & Travels (स्वराज टुर्स अँड ट्रॅव्हल्स)
- **Headquarters**: Nanded, Maharashtra, India
- **Contact / WhatsApp**: [+91 9325232301](https://wa.me/919325232301)
- **Email**: contact@swarajtravels.in
- **Website**: [https://swarajtravels.in](https://swarajtravels.in)
