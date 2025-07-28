'use server'

import { db } from '@/lib/database';
import { auth } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';

// GET /api/products
export async function GET() {
  try {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const products = await db.getProducts(userId);
    return NextResponse.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

// POST /api/products
export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await request.json();
    const { name, description, quantity, price, cost, lowStockThreshold, tags, imageUrl } = body;

    const product = await db.createProduct({
      userId,
      name,
      description,
      quantity,
      price,
      cost,
      lowStockThreshold,
      tags: tags || [],
      imageUrl,
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    );
  }
}

// PUT /api/products?productId=123
export async function PUT(request: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { searchParams } = new URL(request.url);
    const productId = parseInt(searchParams.get('productId') || '');
    if (!productId) return NextResponse.json({ error: 'Missing productId' }, { status: 400 });

    const body = await request.json();
    const { name, description, quantity, price, cost, lowStockThreshold, tags, imageUrl } = body;

    const product = await db.updateProduct(productId, userId, {
      name,
      description,
      quantity,
      price,
      cost,
      lowStockThreshold,
      tags: tags || [],
      imageUrl,
    });

    return NextResponse.json(product);
  } catch (error) {
    console.error('Error updating product:', error);
    return NextResponse.json(
      { error: 'Failed to update product' },
      { status: 500 }
    );
  }
}

// DELETE /api/products?productId=123
export async function DELETE(request: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { searchParams } = new URL(request.url);
    const productId = parseInt(searchParams.get('productId') || '');
    if (!productId) return NextResponse.json({ error: 'Missing productId' }, { status: 400 });

    const deleted = await db.deleteProduct(productId, userId);
    return NextResponse.json(deleted);
  } catch (error) {
    console.error('Error deleting product:', error);
    return NextResponse.json(
      { error: 'Failed to delete product' },
      { status: 500 }
    );
  }
}
