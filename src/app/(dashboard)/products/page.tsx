import { prisma } from '@/lib/prisma';
import { auth } from '@clerk/nextjs/server';
import ProductsClient from '@/components/products/ProductsClient';
import { SiteHeader } from "@/components/dashboard/site-header";

// Define type for product
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

export default async function ProductsPage() {
  const { userId } = await auth();
  if (!userId) return <div className="p-8">Unauthorized</div>;

  const products: Product[] = await prisma.product.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="flex flex-1 flex-col">
      <SiteHeader />
      <ProductsClient initialProducts={products} />
    </div>
  );
}
