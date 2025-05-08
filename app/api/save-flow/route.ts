import { NextRequest, NextResponse } from 'next/server';
import { getAuth } from '@clerk/nextjs/server';
import supabase from '@/lib/supabase';

export async function POST(req: NextRequest) {
  try {
    const { userId } = getAuth(req);
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { nodes, edges } = await req.json();

    if (!nodes || !edges) {
      return NextResponse.json({ error: 'Missing nodes or edges' }, { status: 400 });
    }

    const { error } = await supabase
      .from('user_flows')
      .upsert({ user_id: userId, flow_data: { nodes, edges } });

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ status: 'success' });
  } catch (err) {
    console.error('Error in save-flow route:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
