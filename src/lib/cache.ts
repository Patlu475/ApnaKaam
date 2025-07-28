import { useRouter } from 'next/navigation'

// Cache storage for preloaded pages
const pageCache = new Map<string, any>()

// Dashboard pages to preload
const DASHBOARD_PAGES = [
  '/dashboard',
  '/products',
  '/sales',
  '/alerts',
  '/chatbot'
]

// Cache configuration
const CACHE_CONFIG = {
  maxAge: 5 * 60 * 1000, // 5 minutes
  maxSize: 50, // Maximum number of cached pages
}

interface CacheEntry {
  data: any
  timestamp: number
  expiresAt: number
}

interface CacheOptions {
  maxAge?: number
  forceRefresh?: boolean
}

export class PageCacheService {
  private static instance: PageCacheService
  private cache = new Map<string, CacheEntry>()

  static getInstance(): PageCacheService {
    if (!PageCacheService.instance) {
      PageCacheService.instance = new PageCacheService()
    }
    return PageCacheService.instance
  }

  // Preload all dashboard pages
  async preloadDashboardPages(): Promise<void> {
    console.log('🔄 Preloading dashboard pages...')
    
    const preloadPromises = DASHBOARD_PAGES.map(async (page) => {
      try {
        await this.preloadPage(page)
      } catch (error) {
        console.error(`Failed to preload ${page}:`, error)
      }
    })

    await Promise.allSettled(preloadPromises)
    console.log('✅ Dashboard pages preloaded successfully')
  }

  // Preload a specific page
  async preloadPage(path: string, options: CacheOptions = {}): Promise<void> {
    const { maxAge = CACHE_CONFIG.maxAge, forceRefresh = false } = options
    
    // Check if page is already cached and not expired
    const cached = this.cache.get(path)
    if (cached && !forceRefresh && Date.now() < cached.expiresAt) {
      return
    }

    try {
      // Simulate page data fetching (replace with actual API calls)
      const pageData = await this.fetchPageData(path)
      
      this.cache.set(path, {
        data: pageData,
        timestamp: Date.now(),
        expiresAt: Date.now() + maxAge
      })

      // Clean up old entries if cache is full
      this.cleanupCache()
      
      console.log(`📄 Preloaded: ${path}`)
    } catch (error) {
      console.error(`❌ Failed to preload ${path}:`, error)
      throw error
    }
  }

  // Get cached page data
  getCachedPage(path: string): any | null {
    const cached = this.cache.get(path)
    if (cached && Date.now() < cached.expiresAt) {
      return cached.data
    }
    
    // Remove expired entry
    if (cached) {
      this.cache.delete(path)
    }
    
    return null
  }

  // Invalidate cache for specific page
  invalidatePage(path: string): void {
    this.cache.delete(path)
    console.log(`🗑️ Invalidated cache for: ${path}`)
  }

  // Invalidate all cache
  invalidateAll(): void {
    this.cache.clear()
    console.log('🗑️ All cache invalidated')
  }

  // Get cache statistics
  getCacheStats(): { size: number; entries: string[] } {
    return {
      size: this.cache.size,
      entries: Array.from(this.cache.keys())
    }
  }

  // Cleanup expired entries
  private cleanupCache(): void {
    const now = Date.now()
    const expiredEntries = Array.from(this.cache.entries())
      .filter(([_, entry]) => now >= entry.expiresAt)

    expiredEntries.forEach(([key]) => {
      this.cache.delete(key)
    })

    // If cache is still too large, remove oldest entries
    if (this.cache.size > CACHE_CONFIG.maxSize) {
      const entries = Array.from(this.cache.entries())
        .sort((a, b) => a[1].timestamp - b[1].timestamp)
      
      const toRemove = entries.slice(0, this.cache.size - CACHE_CONFIG.maxSize)
      toRemove.forEach(([key]) => {
        this.cache.delete(key)
      })
    }
  }

  // Simulate fetching page data (replace with actual API calls)
  private async fetchPageData(path: string): Promise<any> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 100))
    
    // Return mock data based on path
    switch (path) {
      case '/dashboard':
        return { type: 'dashboard', data: { stats: [], recentActivity: [] } }
      case '/products':
        return { type: 'products', data: { products: [], categories: [] } }
      case '/sales':
        return { type: 'sales', data: { transactions: [], analytics: {} } }
      case '/alerts':
        return { type: 'alerts', data: { alerts: [], notifications: [] } }
      case '/chatbot':
        return { type: 'chatbot', data: { conversations: [], settings: {} } }
      default:
        return { type: 'unknown', data: {} }
    }
  }
}

// Custom hook for page caching
export function usePageCache() {
  const router = useRouter()
  const cacheService = PageCacheService.getInstance()

  const preloadPage = async (path: string, options?: CacheOptions) => {
    await cacheService.preloadPage(path, options)
  }

  const getCachedData = (path: string) => {
    return cacheService.getCachedPage(path)
  }

  const invalidatePage = (path: string) => {
    cacheService.invalidatePage(path)
  }

  const preloadAllDashboardPages = async () => {
    await cacheService.preloadDashboardPages()
  }

  const getCacheStats = () => {
    return cacheService.getCacheStats()
  }

  return {
    preloadPage,
    getCachedData,
    invalidatePage,
    preloadAllDashboardPages,
    getCacheStats
  }
}

// Cache middleware for API routes
export function withCache<T extends (...args: any[]) => Promise<any>>(
  fn: T,
  cacheKey: string,
  options: CacheOptions = {}
): T {
  const cacheService = PageCacheService.getInstance()
  
  return (async (...args: any[]) => {
    const cached = cacheService.getCachedPage(cacheKey)
    if (cached && !options.forceRefresh) {
      return cached
    }

    const result = await fn(...args)
    cacheService.preloadPage(cacheKey, { ...options, forceRefresh: true })
    
    return result
  }) as T
} 