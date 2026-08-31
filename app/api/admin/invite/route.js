import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

// === GET: список последних инвайт-кодов (решает находку #8) ===
export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get('admin_token')?.value;
  if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== 'admin') return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

    const { data, error } = await supabase
      .from('invite_codes')
      .select('id, code, type, used, used_by, used_at, created_at')
      .order('created_at', { ascending: false })
      .limit(50);

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ success: true, invites: data || [] });
  } catch (err) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
  }
}

// === POST: генерация нового кода ===
export async function POST(request) {
  const cookieStore = await cookies();
  const token = cookieStore.get('admin_token')?.value;
  if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== 'admin') return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    const { type } = await request.json();
    const prefix = type === 'black' ? 'NP-BLACK' : 'NP-FREE';
    const random = Math.random().toString(36).substring(2, 8).toUpperCase();
    const code = prefix + '-' + random;
    const { error } = await supabase.from('invite_codes').insert({ code, type, created_at: new Date().toISOString() });
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ code });
  } catch (err) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
  }
}
