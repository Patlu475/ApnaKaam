import { db } from '@/lib/database';
import { auth } from '@clerk/nextjs/server';
import ProductsClient from '@/components/products/ProductsClient';
import { SiteHeader } from "@/components/dashboard/site-header";
import { Product } from '@/types';

export default async function ProductsPage() {
  try {
    const { userId } = await auth();
    if (!userId) return <div className="p-8">Unauthorized</div>;

    const products: Product[] = await db.getProducts(userId);

    return (
      <div className="flex flex-1 flex-col">
        <SiteHeader />
        <ProductsClient initialProducts={products} />
      </div>
    );
  } catch (error) {
    console.error('Error loading products page:', error);
    return (
      <div className="flex flex-1 flex-col">
        <SiteHeader />
        <div className="p-8">
          <div className="text-center">
            <h2 className="text-xl font-semibold text-red-600">Failed to load products</h2>
            <p className="text-gray-600 mt-2">Please try refreshing the page.</p>
          </div>
        </div>
      </div>
    );
  }
}
