"use server";

import { Keypair } from "@solana/web3.js";
import { NextResponse } from 'next/server';
import * as bip39 from 'bip39';

export async function POST(_request: Request) {
  try {
    // Generate a new mnemonic (seed phrase)
    const mnemonic = bip39.generateMnemonic();
    
    // Create a new keypair
    const keypair = Keypair.generate();

    // Convert private key to string format
    const privateKey = Buffer.from(keypair.secretKey).toString('hex');
    const publicKey = keypair.publicKey.toString();

    return NextResponse.json({
      success: true,
      wallet: {
        network: "solana",
        publicKey,
        privateKey,
        mnemonic,
        type: "test",
      }
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