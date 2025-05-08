import { NextRequest, NextResponse } from "next/server";
import supabase from "@/lib/supabase";

export async function GET(req: NextRequest) {
  const email = req.nextUrl.searchParams.get("email");

  if (!email) {
    return NextResponse.json({ connected: false }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("google_tokens")
    .select("access_token")
    .eq("email", email)
    .maybeSingle();

  if (error) {
    console.error("Error checking token:", error);
    return NextResponse.json({ connected: false }, { status: 500 });
  }

  return NextResponse.json({ connected: !!data?.access_token });
}
