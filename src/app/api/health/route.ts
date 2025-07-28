import { db } from '@/lib/database';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Check if DATABASE_URL is available
    if (!process.env.DATABASE_URL) {
      return NextResponse.json({ 
        status: 'unhealthy', 
        error: 'DATABASE_URL not configured',
        timestamp: new Date().toISOString() 
      }, { status: 503 });
    }

    const isHealthy = await db.healthCheck();
    
    if (isHealthy) {
      return NextResponse.json({ 
        status: 'healthy', 
        timestamp: new Date().toISOString() 
      });
    } else {
      return NextResponse.json(
        { 
          status: 'unhealthy', 
          error: 'Database connection failed',
          timestamp: new Date().toISOString() 
        },
        { status: 503 }
      );
    }
  } catch (error) {
    console.error('Health check failed:', error);
    
    // Handle specific Prisma connection errors
    if (error instanceof Error && error.message.includes('Invalid value undefined for datasource')) {
      return NextResponse.json(
        { 
          status: 'unhealthy', 
          error: 'Database configuration missing',
          timestamp: new Date().toISOString() 
        },
        { status: 503 }
      );
    }
    
    return NextResponse.json(
      { 
        status: 'error', 
        error: 'Database connection failed',
        timestamp: new Date().toISOString() 
      },
      { status: 503 }
    );
  }
} 