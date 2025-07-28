import { prisma, checkDatabaseConnection } from './prisma';

// Retry configuration
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 second

// Utility function to delay execution
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Type guard for error objects
function isErrorWithCode(error: unknown): error is { code: string } {
  return typeof error === "object" && error !== null && "code" in error;
}

function isErrorWithMessage(error: unknown): error is { message: string } {
  return typeof error === "object" && error !== null && "message" in error;
}

// Retry wrapper for database operations
async function withRetry<T>(
  operation: () => Promise<T>,
  retries = MAX_RETRIES
): Promise<T> {
  try {
    return await operation();
  } catch (error: unknown) {
    // Check if it's a connection-related error
    const isConnectionError =
      typeof error === "object" &&
      error !== null &&
      (
        (isErrorWithCode(error) && (
          error.code === "P1001" ||
          error.code === "P1008" ||
          error.code === "P1017"
        )) ||
        (isErrorWithMessage(error) &&
          (
            error.message.includes("prepared statement") ||
            error.message.includes("connection")
          )
        )
      );

    if (isConnectionError && retries > 0) {
      console.warn(`Database connection error, retrying... (${retries} attempts left)`);
      await delay(RETRY_DELAY);
      
      // Try to reconnect
      await checkDatabaseConnection();
      
      return withRetry(operation, retries - 1);
    }
    
    throw error;
  }
}

// Database service functions with retry logic
export const db = {
  // Product operations
  async getProducts(userId: string) {
    return withRetry(() =>
      prisma.product.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' },
      })
    );
  },

  async createProduct(data: {
    userId: string;
    name: string;
    description?: string;
    quantity: number;
    price: number;
    cost: number;
    lowStockThreshold: number;
    tags: string[];
    imageUrl?: string;
  }) {
    return withRetry(() =>
      prisma.product.create({
        data,
      })
    );
  },

  async updateProduct(id: number, userId: string, data: {
    name?: string;
    description?: string;
    quantity?: number;
    price?: number;
    cost?: number;
    lowStockThreshold?: number;
    tags?: string[];
    imageUrl?: string;
  }) {
    return withRetry(() =>
      prisma.product.update({
        where: { id, userId },
        data,
      })
    );
  },

  async deleteProduct(id: number, userId: string) {
    return withRetry(() =>
      prisma.product.delete({
        where: { id, userId },
      })
    );
  },

  // Sale operations
  async getSales(userId: string) {
    return withRetry(() =>
      prisma.sale.findMany({
        where: { userId },
        include: { product: true },
        orderBy: { createdAt: 'desc' },
      })
    );
  },

  async createSale(data: {
    userId: string;
    productId: number;
    quantity: number;
    type: 'sale' | 'restock';
    note?: string;
  }) {
    return withRetry(async () => {
      // Use a transaction to ensure data consistency
      return await prisma.$transaction(async (tx) => {
        // Create the sale
        const sale = await tx.sale.create({
          data,
        });

        // Update product quantity
        await tx.product.update({
          where: { id: data.productId },
          data: {
            quantity: {
              increment: data.type === 'restock' ? data.quantity : -data.quantity,
            },
          },
        });

        return sale;
      });
    });
  },

  // User operations
  async getUser(userId: string) {
    return withRetry(() =>
      prisma.user.findUnique({
        where: { userId },
        include: {
          products: true,
          sales: true,
        },
      })
    );
  },

  async createUser(data: {
    userId: string;
    email: string;
    name?: string;
  }) {
    return withRetry(() =>
      prisma.user.create({
        data,
      })
    );
  },

  // Health check
  async healthCheck() {
    return withRetry(() => checkDatabaseConnection());
  },
}; 