'use server'

import { prisma } from '@/lib/prisma';
import { auth } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';

// GET /api/sales
export async function GET() {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const sales = await prisma.sale.findMany({
    where: { userId },
    include: { product: true },
    orderBy: { createdAt: 'desc' },
  });

  // Format sales data for the frontend
  const formattedSales = sales.map(sale => ({
    id: sale.id,
    productId: sale.productId,
    productName: sale.product?.name || 'Unknown Product',
    quantity: sale.quantity,
    type: sale.type,
    note: sale.note || '',
    timestamp: sale.createdAt.toISOString(),
  }));

  return NextResponse.json(formattedSales);
}

// POST /api/sales
export async function POST(request: NextRequest) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await request.json();
  const { productId, quantity, type, note } = body;

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

  return NextResponse.json(sale, { status: 201 });
}








