// import supabase from '@/lib/supabase';
// import { getAuth } from '@clerk/nextjs/server';

// export default async function handler(req, res) {
//   const { userId } = getAuth(req); // ✅ Get Clerk user ID
//   const { node_id } = req.body;

//   if (req.method !== 'POST') return res.status(405).end();
//   if (!userId || !node_id) return res.status(400).json({ error: 'Missing user or node ID' });

//   // Load existing flow
//   const { data, error } = await supabase
//     .from('user_flows')
//     .select('flow_data')
//     .eq('user_id', userId)
//     .single();

//   if (error) return res.status(404).json({ error: 'Flow not found' });

//   // Filter out the deleted node and its edges
//   const updatedFlow = {
//     nodes: data.flow_data.nodes.filter(n => n.id !== node_id),
//     edges: data.flow_data.edges.filter(e => e.source !== node_id && e.target !== node_id),
//   };

//   // Update flow in Supabase
//   const { error: updateError } = await supabase
//     .from('user_flows')
//     .update({ flow_data: updatedFlow })
//     .eq('user_id', userId);

//   if (updateError) return res.status(500).json({ error: updateError });

//   return res.status(200).json({ status: 'success' });
// }

import { NextRequest, NextResponse } from 'next/server';
import { getAuth } from '@clerk/nextjs/server';
import supabase from '@/lib/supabase';

export async function POST(req: NextRequest) {
  const { userId } = getAuth(req);
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { node_id } = await req.json();
  if (!node_id) {
    return NextResponse.json({ error: 'Missing node ID' }, { status: 400 });
  }

  // Load the user's flow
  const { data, error } = await supabase
    .from('user_flows')
    .select('flow_data')
    .eq('user_id', userId)
    .single();

  if (error || !data) {
    return NextResponse.json({ error: 'Flow not found' }, { status: 404 });
  }

  // Filter out the deleted node and its related edges
  const updatedFlow = {
    nodes: data.flow_data.nodes.filter((n: any) => n.id !== node_id),
    edges: data.flow_data.edges.filter(
      (e: any) => e.source !== node_id && e.target !== node_id
    ),
  };

  // Save updated flow
  const { error: updateError } = await supabase
    .from('user_flows')
    .update({ flow_data: updatedFlow })
    .eq('user_id', userId);

  if (updateError) {
    return NextResponse.json({ error: updateError.message }, { status: 500 });
  }

  return NextResponse.json({ status: 'success' });
}
