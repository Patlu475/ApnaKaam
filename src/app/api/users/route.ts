// app/api/users/route.ts (app router)
import { db } from '@/lib/database';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // This is a simple example - in production you'd want proper auth
    const users = await db.getUser('example'); // You'll need to implement this
    return NextResponse.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    );
  }
}
