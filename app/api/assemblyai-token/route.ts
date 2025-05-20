// // app/api/assemblyai-token/route.ts
// import { NextResponse } from "next/server";
// import { AssemblyAI } from "assemblyai";

// export async function GET() {
//   const aai = new AssemblyAI({ apiKey: process.env.ASSEMBLYAI_API_KEY! });

//   try {
//     const token = await aai.realtime.createTemporaryToken({ expires_in: 600 }); // 10 minutes
//     return NextResponse.json({ token });
//   } catch (err) {
//     console.error("Failed to create AssemblyAI token:", err);
//     return new NextResponse("Error generating token", { status: 500 });
//   }
// }

import { NextResponse } from "next/server";
import { AssemblyAI } from "assemblyai";

export async function GET() {
  const apiKey = process.env.ASSEMBLYAI_API_KEY;
  if (!apiKey) {
    return new NextResponse("AssemblyAI API key not set", { status: 500 });
  }

  const aai = new AssemblyAI({ apiKey });

  try {
    const token = await aai.realtime.createTemporaryToken({ expires_in: 600 });
    return NextResponse.json({ token });
  } catch (err) {
    console.error("Failed to create AssemblyAI token:", err);
    return new NextResponse("Error generating token", { status: 500 });
  }
}
