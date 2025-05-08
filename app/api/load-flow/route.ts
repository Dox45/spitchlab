// import supabase from '@/lib/supabase';
// import { getAuth } from '@clerk/nextjs/server';

// export default async function handler(req, res) {
//   const { userId } = getAuth(req); // ✅ Get the Clerk user ID

//   if (!userId) {
//     return res.status(401).json({ error: 'Unauthorized: Clerk user ID missing' });
//   }

//   const { data, error } = await supabase
//     .from('user_flows')
//     .select('flow_data')
//     .eq('user_id', userId)
//     .single();

//   if (error) {
//     return res.status(500).json({ error: error.message });
//   }

//   return res.status(200).json(data.flow_data || { nodes: [], edges: [] });
// }

import { NextRequest, NextResponse } from 'next/server';
import supabase from '@/lib/supabase';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const user_id = searchParams.get('user_id');

  if (!user_id) {
    return NextResponse.json({ error: 'Missing user_id' }, { status: 400 });
  }

  const { data, error } = await supabase
    .from('user_flows')
    .select('flow_data')
    .eq('user_id', user_id)
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data?.flow_data || { nodes: [], edges: [] });
}
