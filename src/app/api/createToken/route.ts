import bs58 from "bs58";
import { Connection, Keypair, PublicKey, sendAndConfirmTransaction, Transaction } from "@solana/web3.js";
import { getOrCreateAssociatedTokenAccount, createMint, mintTo } from "@solana/spl-token";
import * as mplTokenMetadata from "@metaplex-foundation/mpl-token-metadata";
import { NextResponse } from 'next/server';

const { createCreateMetadataAccountV3Instruction } = mplTokenMetadata;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, symbol, uri } = body;  // Get values from request body

    // 🔐 Private Key (Keep it secure!)
    const secretKey = bs58.decode("MWjhJ8ifsHhSuxr1tv51TChPEPUetmydj4hZyBg7ZZNeFYatn8xU9uxLeycNVU5rJ4dvKQWqMkaLPa94SJmB2Cz");
    const payer = Keypair.fromSecretKey(secretKey);

    // ✅ Set up Solana connection
    const connection = new Connection("https://api.devnet.solana.com", "confirmed");

    // ✅ Create SPL Token Mint
    const mint = await createMint(connection, payer, payer.publicKey, null, 9);

    // ✅ Create an Associated Token Account
    const associatedTokenAccount = await getOrCreateAssociatedTokenAccount(
      connection, 
      payer, 
      mint, 
      payer.publicKey
    );

    // ✅ Mint tokens
    const amountToMint = 1000000000000000;
    await mintTo(
      connection, 
      payer, 
      mint, 
      associatedTokenAccount.address, 
      payer, 
      amountToMint
    );

    // ✅ Adding Metadata
    const METAPLEX_PROGRAM_ID = new PublicKey("metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s");
    const metadataAccount = PublicKey.findProgramAddressSync(
      [
        Buffer.from("metadata"),
        METAPLEX_PROGRAM_ID.toBuffer(),
        mint.toBuffer()
      ],
      METAPLEX_PROGRAM_ID
    )[0];

    const metadataInstruction = createCreateMetadataAccountV3Instruction(
      {
        metadata: metadataAccount,
        mint,
        mintAuthority: payer.publicKey,
        payer: payer.publicKey,
        updateAuthority: payer.publicKey,
      },
      {
        createMetadataAccountArgsV3: {
          data: {
            name,       // Use passed name instead of hardcoded value
            symbol,     // Use passed symbol instead of hardcoded value
            uri,        // Use passed URI instead of hardcoded value
            sellerFeeBasisPoints: 0,
            creators: null,
            collection: null,
            uses: null,
          },
          isMutable: false,
          collectionDetails: null,
        },
      }
    );

    const transaction = new Transaction().add(metadataInstruction);
    await sendAndConfirmTransaction(connection, transaction, [payer]);

    return NextResponse.json({
      success: true,
      mintAddress: mint.toBase58(),
      associatedTokenAccount: associatedTokenAccount.address.toBase58(),
    });
  } catch (error: unknown) {
    console.error("Error:", error);
    
    // Safely handle the error message
    const errorMessage = error instanceof Error 
      ? error.message 
      : 'An unknown error occurred';

    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
} 