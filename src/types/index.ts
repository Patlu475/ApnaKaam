// Comprehensive shared types for the entire application

// ============================================================================
// DATABASE ENTITIES (matching Prisma schema)
// ============================================================================

export interface User {
  userId: string;
  email: string;
  name?: string | null;
  createdAt: Date;
}

export interface Product {
  id: number;
  userId: string;
  name: string;
  description?: string | null;
  quantity: number;
  price: number; // in cents or smallest unit
  cost: number; // cost price
  lowStockThreshold: number;
  tags: string[];
  imageUrl?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface Sale {
  id: number;
  userId: string;
  productId: number;
  quantity: number;
  type: 'sale' | 'restock';
  note?: string | null;
  createdAt: Date;
}

export interface Alert {
  id: number;
  userId: string;
  productId: number;
  resolved: boolean;
  triggeredAt: Date;
}

// ============================================================================
// FRONTEND-SPECIFIC TYPES
// ============================================================================

// Form data for creating a product (what the form sends)
export interface ProductFormData {
  name: string;
  description?: string;
  quantity: number;
  price: number;
  cost: number;
  lowStockThreshold: number;
  tags: string[];
  imageUrl: string | null;
}

// Type for editable product fields (excluding system fields)
export type EditableProductFields = Pick<Product, 'name' | 'description' | 'quantity' | 'price' | 'lowStockThreshold' | 'tags' | 'imageUrl'> & {
  cost?: number;
};

// Form data for creating a sale (what the form sends)
export interface SaleFormData {
  productId: string;
  productName: string;
  quantity: number;
  type: 'sale' | 'restock';
  note?: string;
}

// Complete sale record returned from API (with product name)
export interface SaleRecord {
  id: number;
  productId: number;
  productName: string;
  quantity: number;
  type: 'sale' | 'restock';
  note: string;
  timestamp: string;
}

// Alert with product information for frontend display
export interface AlertWithProduct {
  id: string;
  productName: string;
  currentQuantity: number;
  threshold: number;
  category: string;
  severity: 'critical' | 'warning' | 'info';
  lastUpdated: Date;
  sku: string;
}

// Date range for filtering
export interface DateRange {
  from: Date | null;
  to: Date | null;
}

// ============================================================================
// API RESPONSE TYPES
// ============================================================================

export interface ApiResponse<T> {
  data?: T;
  error?: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// ============================================================================
// CHART AND ANALYTICS TYPES
// ============================================================================

export interface SalesData {
  date: string;
  sales: number;
  totalItems: number;
}

export interface ChartDataPoint {
  name: string;
  value: number;
  color?: string;
}

// ============================================================================
// COMPONENT PROP TYPES
// ============================================================================

export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

export interface LoadingProps {
  isLoading?: boolean;
  loadingText?: string;
}

export interface ErrorProps {
  error?: string | null;
  onRetry?: () => void;
}

// ============================================================================
// UTILITY TYPES
// ============================================================================

export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type MakeRequired<T, K extends keyof T> = T & { [P in K]-?: T[P] };
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
}; 