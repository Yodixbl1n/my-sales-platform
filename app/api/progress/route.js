import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { createSupabaseClient } from '../../../lib/supabaseClient';

/**
 * /api/progress — серверное хранение прогресса пользователя.
 * Решает находку #6: прогресс и сертификат больше НЕ в localStorage.
 * 
 * GET /api/progress → { success, lessons: ["1-0","1-1",...], modules: [1,2,...] }
 * POST /api/progress { type: 'lesson', module: 1, lesson: 0 } — отметить урок
 * POST /api/progress { type: 'module', module: 1 } — отметить модуль (тест пройден)
 */
export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;
  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  let payload;
  try {
    payload = jwt.verify(token, process.env.JWT_SECRET);
  } catch (e) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
  }

  const SUPABASE = createSupabaseClient();

  const { data: user, error: userErr } = await SUPABASE
    .from('users')
    .select('id, blocked')
    .eq('id', payload.id)
    .limit(1)
    .maybeSingle();

  if (userErr || !user) {
    return NextResponse.json({ error: 'User not found' }, { status: 401 });
  }
  if (user.blocked === true) {
    return NextResponse.json({ error: 'Account blocked' }, { status: 403 });
  }

  const { data: lessonRows, error: lErr } = await SUPABASE
    .from('user_progress')
    .select('module_id, lesson_id')
    .eq('user_id', user.id);

  if (lErr) {
    console.error('GET lessons error:', lErr);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }

  const { data: moduleRows, error: mErr } = await SUPABASE
    .from('user_module_progress')
    .select('module_id')
    .eq('user_id', user.id);

  if (mErr) {
    console.error('GET modules error:', mErr);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }

  const lessons = (lessonRows || []).map((r) => `${r.module_id}-${r.lesson_id}`);
  const modules = (moduleRows || []).map((r) => r.module_id);

  return NextResponse.json({ success: true, lessons, modules });
}

export async function POST(req) {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;
  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  let payload;
  try {
    payload = jwt.verify(token, process.env.JWT_SECRET);
  } catch (e) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
  }

  const SUPABASE = createSupabaseClient();

  const { data: user, error: userErr } = await SUPABASE
    .from('users')
    .select('id, blocked')
    .eq('id', payload.id)
    .limit(1)
    .maybeSingle();

  if (userErr || !user) {
    return NextResponse.json({ error: 'User not found' }, { status: 401 });
  }
  if (user.blocked === true) {
    return NextResponse.json({ error: 'Account blocked' }, { status: 403 });
  }

  const body = await req.json().catch(() => ({}));
  const { type, module, lesson } = body;

  if (type === 'lesson') {
    if (typeof module !== 'number' || typeof lesson !== 'number') {
      return NextResponse.json({ error: 'Invalid lesson params' }, { status: 400 });
    }
    const { error: upErr } = await SUPABASE
      .from('user_progress')
      .upsert(
        { user_id: user.id, module_id: module, lesson_id: lesson },
        { onConflict: 'user_id,module_id,lesson_id', ignoreDuplicates: true }
      );
    if (upErr) {
      console.error('POST lesson error:', upErr);
      return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
    return NextResponse.json({ success: true });
  }

  if (type === 'module') {
    if (typeof module !== 'number') {
      return NextResponse.json({ error: 'Invalid module param' }, { status: 400 });
    }
    const { error: upErr } = await SUPABASE
      .from('user_module_progress')
      .upsert(
        { user_id: user.id, module_id: module },
        { onConflict: 'user_id,module_id', ignoreDuplicates: true }
      );
    if (upErr) {
      console.error('POST module error:', upErr);
      return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
    return NextResponse.json({ success: true });
  }

  return NextResponse.json({ error: 'Invalid type' }, { status: 400 });
}
