# ---- Base Node Image ----
FROM node:20-alpine AS base

# Set working directory
WORKDIR /app

# Install dependencies (use package-lock.json for reproducible builds)
COPY package.json package-lock.json ./
RUN npm ci --prefer-offline

# Copy all source code
COPY . .

# Build Next.js app (includes Prisma client generation)
RUN npm run build

# ---- Production Image ----
FROM node:20-alpine AS prod

WORKDIR /app

# Copy only necessary files from build stage
COPY --from=base /app/.next ./.next
COPY --from=base /app/node_modules ./node_modules
COPY --from=base /app/package.json ./package.json
COPY --from=base /app/public ./public
COPY --from=base /app/prisma ./prisma
COPY --from=base /app/src ./src

# Expose Next.js port
EXPOSE 3000

# Set environment variables (documented, not hardcoded)
# ENV NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
# ENV CLERK_SECRET_KEY=your_clerk_secret_key
# ENV DATABASE_URL=your_supabase_connection_string
# ENV DIRECT_URL=your_supabase_direct_connection_string
# ENV NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
# ENV NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
# ENV WHATSAPP_API_KEY=your_whatsapp_api_key
# ENV TELEGRAM_BOT_TOKEN=your_telegram_bot_token

# Start Next.js app
CMD ["npm", "start"] 