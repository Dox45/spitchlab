// import { auth } from "@clerk/nextjs";
import { getAuth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
// import { createClient } from "@supabase/supabase-js";

import supabase from '@/lib/supabase';

// export async function POST(req: NextRequest) {
//   // const { userId } = getAuth(req);
//   // if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

//   const body = await req.json();
//   const { tokens, email } = body;

//   if (!tokens?.access_token || !email) {
//     return NextResponse.json({ error: "Missing token or email" }, { status: 400 });
//   }

//   const { error } = await supabase.from("google_tokens").upsert({
//     clerk_user_id: userId,
//     email,
//     access_token: tokens.access_token,
//     refresh_token: tokens.refresh_token,
//     token_type: tokens.token_type,
//     expiry_date: tokens.expiry_date,
//   });

//   if (error) {
//     console.error("Error saving tokens:", error);
//     return NextResponse.json({ error: "Failed to save tokens" }, { status: 500 });
//   }

//   return NextResponse.json({ success: true });
// }

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { tokens, email } = body;

  if (!tokens?.access_token || !email) {
    return NextResponse.json({ error: "Missing token or email" }, { status: 400 });
  }

  const { error } = await supabase.from("google_tokens").upsert({
    email,
    access_token: tokens.access_token,
    refresh_token: tokens.refresh_token,
    token_type: tokens.token_type,
    expiry_date: tokens.expiry_date,
  });

  if (error) {
    console.error("Error saving tokens:", error);
    return NextResponse.json({ error: "Failed to save tokens" }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
