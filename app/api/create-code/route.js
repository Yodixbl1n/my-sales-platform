import { NextResponse } from 'next/server';
import { createSupabaseClient } from '../../../lib/supabaseClient';

function genCode(len = 8) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let s = '';
  for (let i = 0; i < len; i++) s += chars[Math.floor(Math.random() * chars.length)];
  return s;
}

export async function POST(req) {
  const adminPass = req.headers.get('x-admin-password');
  if (adminPass !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }

  const SUPABASE = createSupabaseClient();
  let code = genCode();
  
  for (let i = 0; i < 5; i++) {
    const { data } = await SUPABASE.from('invite_codes').select('id').eq('code', code).limit(1);
    if (!data || data.length === 0) break;
    code = genCode();
  }

  const { error } = await SUPABASE.from('invite_codes').insert({ code });
  if (error) {
    return NextResponse.json({ success: false, message: 'DB error' }, { status: 500 });
  }

  return NextResponse.json({ success: true, code });
}
