# Inventory SaaS - Inventory & Sales Tracker

A scalable Inventory & Sales Tracker SaaS designed for home-based sellers with integrated WhatsApp and Telegram chat functionality.

![Inventory SaaS Screenshot](public/localhost_3000_sales.png)

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
- **Docker** - Containerized deployment option

## Getting Started

### Prerequisites
- Node.js 16.8+ and npm/yarn/pnpm
- Supabase account for database
- Clerk account for authentication
- (Optional) WhatsApp Business API and Telegram Bot API keys

### Option 1: Local Development

#### Installation

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

```env
# Database Configuration
DATABASE_URL="postgresql://username:password@host:port/database"

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_clerk_publishable_key
CLERK_SECRET_KEY=sk_test_your_clerk_secret_key

# Clerk URLs (Optional - defaults to /sign-in, /sign-up, /dashboard)
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard

# Supabase Configuration (if using Supabase)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Chat Integration (Optional)
WHATSAPP_API_KEY=your_whatsapp_api_key
TELEGRAM_BOT_TOKEN=your_telegram_bot_token

# Environment
NODE_ENV=development
```

**Important Notes:**
- Create `.env.local` for local development (this file is gitignored)
- For production, use `.env` file
- Never commit sensitive keys to version control
- Get your Clerk keys from [Clerk Dashboard](https://dashboard.clerk.com)
- Get your Supabase connection string from [Supabase Dashboard](https://supabase.com/dashboard)

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

### Option 2: Docker Deployment

#### Prerequisites
- Docker installed on your system
- Docker Compose (optional, for easier management)

#### Quick Start with Docker

1. Clone the repository:
```bash
git clone https://github.com/yourusername/inventory-saas.git
cd inventory-saas
```

2. Create environment file:
```bash
cp .env.example .env
# Edit .env with your actual values
```

3. Build and run with Docker:
```bash
# Build the Docker image
docker build -t inventory-saas .

# Run the container
docker run -p 3000:3000 --env-file .env inventory-saas
```

#### Using Docker Compose (Recommended)

1. Create a `docker-compose.yml` file in the root directory:
```yaml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
    env_file:
      - .env
    restart: unless-stopped
```

2. Run with Docker Compose:
```bash
docker-compose up -d
```

3. Access the application at [http://localhost:3000](http://localhost:3000)

#### Docker Environment Variables

When using Docker, ensure your `.env` file contains all required variables:

```env
# Database Configuration
DATABASE_URL="postgresql://username:password@host:port/database"

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_clerk_publishable_key
CLERK_SECRET_KEY=sk_test_your_clerk_secret_key

# Clerk URLs
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard

# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Chat Integration
WHATSAPP_API_KEY=your_whatsapp_api_key
TELEGRAM_BOT_TOKEN=your_telegram_bot_token

# Environment
NODE_ENV=production
```

## Deployment

### Vercel Deployment (Recommended)

The application can be easily deployed to Vercel:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https://github.com/yourusername/inventory-saas)

1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on every push to main branch

### Docker Deployment

For production deployment with Docker:

```bash
# Build production image
docker build -t inventory-saas:latest .

# Run with environment variables
docker run -d \
  -p 3000:3000 \
  --env-file .env \
  --name inventory-saas \
  inventory-saas:latest
```

## Environment Variables Reference

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `DATABASE_URL` | Yes | PostgreSQL connection string | `postgresql://user:pass@host:5432/db` |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Yes | Clerk public key | `pk_test_...` |
| `CLERK_SECRET_KEY` | Yes | Clerk secret key | `sk_test_...` |
| `NEXT_PUBLIC_CLERK_SIGN_IN_URL` | No | Sign-in page URL | `/sign-in` |
| `NEXT_PUBLIC_CLERK_SIGN_UP_URL` | No | Sign-up page URL | `/sign-up` |
| `NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL` | No | Redirect after sign-in | `/dashboard` |
| `NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL` | No | Redirect after sign-up | `/dashboard` |
| `NEXT_PUBLIC_SUPABASE_URL` | No | Supabase project URL | `https://project.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | No | Supabase anonymous key | `eyJ...` |
| `WHATSAPP_API_KEY` | No | WhatsApp Business API key | `your_whatsapp_key` |
| `TELEGRAM_BOT_TOKEN` | No | Telegram Bot token | `1234567890:ABC...` |
| `NODE_ENV` | No | Environment mode | `development` or `production` |

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Creator

Created by [patlu475](https://github.com/patlu475) - Apna Kaam Founder, SaaS Developer
