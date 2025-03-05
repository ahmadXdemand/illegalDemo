import { NextResponse } from 'next/server';
import * as fs from 'fs';
import * as path from 'path';

const WALLETS_FILE = path.join(process.cwd(), 'data', 'wallets.json');

export async function GET() {
  try {
    if (!fs.existsSync(WALLETS_FILE)) {
      return NextResponse.json({
        success: true,
        wallets: []
      });
    }

    const wallets = JSON.parse(fs.readFileSync(WALLETS_FILE, 'utf-8'));
    
    return NextResponse.json({
      success: true,
      wallets
    });
  } catch (error) {
    console.error('Error reading wallets:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch wallets' },
      { status: 500 }
    );
  }
} 