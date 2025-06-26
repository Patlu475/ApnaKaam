# Setting Up Prisma Accelerate

## Updated Implementation

We've updated our implementation to use Prisma Accelerate properly. Here's how it works now:

1. **Cache Invalidation**: We use the `$accelerate.invalidate()` method to invalidate caches by tags
2. **Cached Queries**: When using the Accelerate extension, queries are automatically cached based on their structure
3. **Cache Tags**: We define cache tags as constants for consistency

## Setup Instructions

1. Sign up for Prisma Accelerate at https://cloud.prisma.io
2. Create a new project and get your API key
3. Update your `.env` file with:

```
# Replace with your actual API key
PRISMA_ACCELERATE_API_KEY=your-api-key-here

# Update your DATABASE_URL to use Accelerate
DATABASE_URL="prisma://accelerate.prisma-data.net/?api_key=${PRISMA_ACCELERATE_API_KEY}"
```

4. Make sure to keep your direct connection URL:

```
# Keep your direct database connection for migrations
DIRECT_URL="postgresql://username:password@localhost:5432/database?schema=public"
```

5. Add this `postinstall` script to your `package.json`:

```json
{
  "scripts": {
    "postinstall": "prisma generate"
  }
}
```

## Cache Configuration

To customize TTL and SWR settings, update your Prisma schema:

```prisma
generator client {
  provider        = "prisma-client-js"
  previewFeatures = ["accelerate"]
  
  // Default TTL and SWR
  accelerate = {
    defaultTTL = 30
    defaultSWR = 30
  }
}
```

Cache invalidation will happen automatically after write operations, but we also explicitly invalidate by tags: `inventory` and `sales`. 