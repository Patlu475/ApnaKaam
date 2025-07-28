import { db } from '@/lib/database';
import { auth } from '@clerk/nextjs/server';
import SalesClient from '@/components/sales/SalesClient';
import { SiteHeader } from "@/components/dashboard/site-header";
import { Product, SaleRecord } from '@/types';

export default async function SalesPage() {
  try {
    const { userId } = await auth();
    if (!userId) return <div className="p-8">Unauthorized</div>;

    // Fetch products and sales in parallel
    const [products, sales] = await Promise.all([
      db.getProducts(userId),
      db.getSales(userId)
    ]);

    const salesData: SaleRecord[] = sales.map(sale => ({
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
  } catch (error) {
    console.error('Error loading sales page:', error);
    return (
      <div className="flex flex-1 flex-col">
        <SiteHeader />
        <div className="p-8">
          <div className="text-center">
            <h2 className="text-xl font-semibold text-red-600">Failed to load sales</h2>
            <p className="text-gray-600 mt-2">Please try refreshing the page.</p>
          </div>
        </div>
      </div>
    );
  }
}
