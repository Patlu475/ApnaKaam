'use server'

import { prisma } from '@/lib/prisma';
import { auth } from '@clerk/nextjs/server';

export async function createProduct(formData: FormData) {
  const { userId } = await auth();
  if (!userId) throw new Error('Unauthorized');

  const name = formData.get('name') as string;
  const quantity = parseInt(formData.get('quantity') as string);
  const price = parseInt(formData.get('price') as string);
  const cost = parseInt(formData.get('cost') as string);
  const lowStockThreshold = parseInt(formData.get('lowStockThreshold') as string);
  const tags = (formData.get('tags') as string)?.split(',') || [];
  const imageUrl = formData.get('imageUrl') as string;

  const product = await prisma.product.create({
    data: {
      userId,
      name,
      quantity,
      price,
      cost,
      lowStockThreshold,
      tags,
      imageUrl,
    },
  });

  return product;
}

export async function getProducts() {
  const { userId } = await auth();
  if (!userId) throw new Error('Unauthorized');

  const products = await prisma.product.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
  });

  return products;
}

export async function createSale(formData: FormData) {
  const { userId } = await auth();
  if (!userId) throw new Error('Unauthorized');

  const productId = parseInt(formData.get('productId') as string);
  const quantity = parseInt(formData.get('quantity') as string);
  const type = formData.get('type') as 'sale' | 'restock';
  const note = formData.get('note') as string;

  const sale = await prisma.sale.create({
    data: {
      userId,
      productId,
      quantity,
      type,
      note,
    },
  });

  // Update product quantity accordingly
  await prisma.product.update({
    where: { id: productId },
    data: {
      quantity: {
        increment: type === 'restock' ? quantity : -quantity,
      },
    },
  });

  return sale;
}

export async function getSales() {
  console.log('getSales server action called');
  const { userId } = await auth();
  if (!userId) throw new Error('Unauthorized');

  console.log('Fetching sales for user:', userId);
  const sales = await prisma.sale.findMany({
    where: { userId },
    include: { product: true },
    orderBy: { createdAt: 'desc' },
  });
  console.log('Sales data fetched:', sales.length, 'sales records');

  return sales;
}
