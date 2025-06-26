# Inventory SaaS - Inventory & Sales Tracker

A scalable Inventory & Sales Tracker SaaS designed for home-based sellers with integrated WhatsApp and Telegram chat functionality.

![Inventory SaaS Screenshot](https://via.placeholder.com/800x400?text=Inventory+SaaS+Screenshot)

## Features

### Core Functionality
- **Inventory Management**
  - Product CRUD operations with image uploads
  - Stock level tracking and automatic updates
  - Low stock alerts and critical notifications
  - Product categorization and tagging

- **Sales Tracking**
  - Record sales transactions
  - Monitor sales metrics over time
  - Filter sales by date ranges
  - Sales performance dashboard

- **Alert System**
  - Critical stock level notifications
  - Warning-level stock alerts
  - Visual indicators for inventory status
  - Real-time monitoring

- **Chat Integration**
  - WhatsApp Business API integration
  - Telegram Bot API integration
  - Natural language command processing
  - Manage inventory through chat commands (e.g., "/sold 2 rice")

- **Dashboard & Analytics**
  - Sales performance metrics
  - Daily sales charts
  - Inventory status at a glance
  - Product category distribution

### Additional Features
- **Responsive Design** - Works on mobile, tablet, and desktop
- **Authentication** - Secure user login and registration
- **Multi-tenant Architecture** - Support for multiple users/businesses
- **Restock Management** - Tracking of inventory replenishment

## Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Reusable component library
- **Lucide Icons** - Beautiful, consistent icon set
- **React Hook Form** - Form validation and handling
- **Recharts** - Interactive chart components
- **date-fns** - Date manipulation library

### Backend
- **Supabase** - PostgreSQL database with RLS policies
- **Prisma** - ORM for database access
- **Clerk** - Authentication and user management
- **Next.js API Routes** - Serverless API endpoints

### Chat Integration
- **WhatsApp Business API** - For WhatsApp messaging
- **Telegram Bot API** - For Telegram bot functionality

### Deployment & Hosting
- **Vercel** - Hosting and deployment platform

## Getting Started

### Prerequisites
- Node.js 16.8+ and npm/yarn/pnpm
- Supabase account for database
- Clerk account for authentication
- (Optional) WhatsApp Business API and Telegram Bot API keys

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/inventory-saas.git
cd inventory-saas
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Set up environment variables:
Create a `.env.local` file in the root directory and add the following variables:
```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
DATABASE_URL=your_supabase_connection_string
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
WHATSAPP_API_KEY=your_whatsapp_api_key
TELEGRAM_BOT_TOKEN=your_telegram_bot_token
```

4. Initialize the database:
```bash
npx prisma db push
```

5. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Deployment

The application can be easily deployed to Vercel:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https://github.com/yourusername/inventory-saas)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Creator

Created by [patlu475](https://github.com/patlu475) - Apna Kaam Founder, SaaS Developer
