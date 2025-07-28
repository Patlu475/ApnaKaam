import { db } from '@/lib/database';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
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
          timestamp: new Date().toISOString() 
        },
        { status: 503 }
      );
    }
  } catch (error) {
    console.error('Health check failed:', error);
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