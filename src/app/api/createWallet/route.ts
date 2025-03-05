"use server";

import { Keypair } from "@solana/web3.js";
import { NextResponse } from 'next/server';
import * as bip39 from 'bip39';
import * as fs from 'fs';
import * as path from 'path';

const WALLETS_FILE = path.join(process.cwd(), 'data', 'wallets.json');

// Ensure the data directory exists
if (!fs.existsSync(path.join(process.cwd(), 'data'))) {
  fs.mkdirSync(path.join(process.cwd(), 'data'));
}

// Initialize wallets.json if it doesn't exist
if (!fs.existsSync(WALLETS_FILE)) {
  fs.writeFileSync(WALLETS_FILE, JSON.stringify([], null, 2));
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    // Generate a new mnemonic (seed phrase)
    const mnemonic = bip39.generateMnemonic();
    
    // Create a new keypair
    const keypair = Keypair.generate();

    // Convert private key to string format
    const privateKey = Buffer.from(keypair.secretKey).toString('hex');
    const publicKey = keypair.publicKey.toString();

    // Add timestamp and id to wallet data
    const walletData = {
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      network: body.network,
      type: body.type,
      publicKey,
      privateKey,
      mnemonic,
    };

    // Read existing wallets
    // const wallets = JSON.parse(fs.readFileSync(WALLETS_FILE, 'utf-8'));
    
    // // Add new wallet
    // wallets.push(walletData);
    
    // Save updated wallets
    // fs.writeFileSync(WALLETS_FILE, JSON.stringify(wallets, null, 2));

    return NextResponse.json({
      success: true,
      wallet: walletData
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error 
      ? error.message 
      : 'An unknown error occurred';

    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
} 