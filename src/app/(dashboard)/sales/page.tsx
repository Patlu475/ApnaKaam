import { prisma } from '@/lib/prisma';
import { auth } from '@clerk/nextjs/server';
import SalesClient from '@/components/sales/SalesClient';
import { SiteHeader } from "@/components/dashboard/site-header";

// Define product type
interface Product {
  id: number;
  name: string;
  quantity: number;
  price: number;
  cost?: number;
  lowStockThreshold: number;
  tags: string[];
  imageUrl?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

// Define sales record type
interface SalesRecord {
  id: number;
  productId: number;
  productName: string;
  quantity: number;
  type: 'sale' | 'restock';
  note: string;
  timestamp: string;
}

export default async function SalesPage() {
  const { userId } = await auth();
  if (!userId) return <div className="p-8">Unauthorized</div>;

  // Fetch products
  const products: Product[] = await prisma.product.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
  });

  // Fetch sales and format
  const sales = await prisma.sale.findMany({
    where: { userId },
    include: { product: true },
    orderBy: { createdAt: 'desc' },
  });
  const salesData: SalesRecord[] = sales.map(sale => ({
    id: sale.id,
    productId: sale.productId,
    productName: sale.product?.name || 'Unknown Product',
    quantity: sale.quantity,
    type: sale.type,
    note: sale.note || '',
    timestamp: sale.createdAt.toISOString(),
  }));

  return (
    <div className="flex flex-1 flex-col">
      <SiteHeader />
      <SalesClient initialProducts={products} initialSales={salesData} />
    </div>
  );
}
