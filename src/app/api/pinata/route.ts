import { NextResponse } from "next/server";
import { pinata } from "@/utils/config";

export async function POST(request: Request) {
  try {
    const data = await request.formData();
    const file: File | null = data.get('file') as unknown as File;

    if (!file) {
      return NextResponse.json({ error: "No file received." }, { status: 400 });
    }

    const responsePinata = await pinata.upload.public.file(file);
    const baseUrl = "https://green-manual-tapir-637.mypinata.cloud/ipfs/"
    const url =  baseUrl + responsePinata.cid

    return NextResponse.json({ success: true,responsePinata, url });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error uploading file" },
      { status: 500 }
    );
  }
} 