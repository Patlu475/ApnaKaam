'use server'

import { db } from '@/lib/database';
import { auth } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';

// GET /api/sales
export async function GET() {
  try {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const sales = await db.getSales(userId);

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
  } catch (error) {
    console.error('Error fetching sales:', error);
    return NextResponse.json(
      { error: 'Failed to fetch sales' },
      { status: 500 }
    );
  }
}

// POST /api/sales
export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await request.json();
    const { productId, quantity, type, note } = body;

    const sale = await db.createSale({
      userId,
      productId,
      quantity,
      type,
      note,
    });

    return NextResponse.json(sale, { status: 201 });
  } catch (error) {
    console.error('Error creating sale:', error);
    return NextResponse.json(
      { error: 'Failed to create sale' },
      { status: 500 }
    );
  }
}








