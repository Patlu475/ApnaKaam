'use server'

import { prisma } from '@/lib/prisma';
import { auth } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';

// GET /api/products
export async function GET(request: NextRequest) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const products = await prisma.product.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
  });

  return NextResponse.json(products);
}

// POST /api/products
export async function POST(request: NextRequest) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await request.json();
  const { name, quantity, price, cost, lowStockThreshold, tags, imageUrl } = body;

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

  return NextResponse.json(product, { status: 201 });
}

// PUT /api/products?productId=123
export async function PUT(request: NextRequest) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const productId = parseInt(searchParams.get('productId') || '');
  if (!productId) return NextResponse.json({ error: 'Missing productId' }, { status: 400 });

  const body = await request.json();
  const { name, quantity, price, cost, lowStockThreshold, tags, imageUrl } = body;

  const product = await prisma.product.update({
    where: { id: productId, userId },
    data: { name, quantity, price, cost, lowStockThreshold, tags, imageUrl },
  });

  return NextResponse.json(product);
}

// DELETE /api/products?productId=123
export async function DELETE(request: NextRequest) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const productId = parseInt(searchParams.get('productId') || '');
  if (!productId) return NextResponse.json({ error: 'Missing productId' }, { status: 400 });

  const deleted = await prisma.product.delete({
    where: { id: productId, userId },
  });

  return NextResponse.json(deleted);
}
