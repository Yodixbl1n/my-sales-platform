import { NextResponse } from 'next/server';
import { createSupabaseClient } from '../../../lib/supabaseClient';

export async function GET(req) {
  const adminPass = req.headers.get('x-admin-password');
  if (adminPass !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }
  const SUPABASE = createSupabaseClient();
  const { data, error } = await SUPABASE.from('users').select('*').order('created_at', { ascending: false });
  if (error) return NextResponse.json({ success: false, message: 'DB error' }, { status: 500 });
  return NextResponse.json({ success: true, users: data });
}
