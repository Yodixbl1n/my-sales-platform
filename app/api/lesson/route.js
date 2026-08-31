import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { createSupabaseClient } from '../../../lib/supabaseClient';
import { CONTENT_1_4 } from '../../../lib/content-part1';
import { CONTENT_5_8 } from '../../../lib/content-part2';
import { CONTENT_PRACTICE } from '../../../lib/content-practice';

/**
 * API-роут для получения контента урока.
 * Решает проблему #7 из аудита: платный контент больше не лежит в JS-бандле открыто.
 * 
 * Логика доступа:
 * - Бесплатные пользователи: только модуль 1, уроки 0-4
 * - Платные пользователи: все модули
 * - Проверка авторизации и блокировки
 * 
 * GET /api/lesson?moduleId=1&lessonId=0
 */
export async function GET(req) {
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

  // === Проверяем пользователя в БД ===
  const SUPABASE = createSupabaseClient();
  const { data: user, error: userErr } = await SUPABASE
    .from('users')
    .select('id, email, name, first_name, username, free, blocked, progress')
    .eq('id', payload.id)
    .limit(1)
    .maybeSingle();

  if (userErr || !user) {
    return NextResponse.json({ error: 'User not found' }, { status: 401 });
  }

  if (user.blocked === true) {
    return NextResponse.json({ error: 'Account blocked' }, { status: 403 });
  }

  // === Парсим параметры запроса ===
  const { searchParams } = new URL(req.url);
  const moduleId = parseInt(searchParams.get('moduleId') || '0', 10);
  const lessonId = parseInt(searchParams.get('lessonId') || '0', 10);

  if (!moduleId || !lessonId || moduleId < 1 || moduleId > 8 || lessonId < 0) {
    return NextResponse.json({ error: 'Invalid parameters' }, { status: 400 });
  }

  // === Проверяем доступ по тарифу ===
  const isFreeUser = user.free === true;
  
  if (isFreeUser && moduleId !== 1) {
    return NextResponse.json({ error: 'Доступно только в платной версии' }, { status: 403 });
  }

  if (isFreeUser && lessonId > 4) {
    return NextResponse.json({ error: 'Бесплатно доступны только первые 5 уроков' }, { status: 403 });
  }

  // === Получаем контент урока ===
  const COURSE = { ...CONTENT_1_4, ...CONTENT_5_8 };
  const lessons = COURSE[moduleId] || [];
  const lesson = lessons[lessonId];

  if (!lesson) {
    // Возможно это практика
    const practice = CONTENT_PRACTICE[moduleId];
    if (practice && lessonId === lessons.length) {
      return NextResponse.json({ 
        success: true,
        lesson: { title: practice.title, body: practice.body }
      });
    }
    return NextResponse.json({ error: 'Lesson not found' }, { status: 404 });
  }

  // === Возвращаем контент ===
  return NextResponse.json({
    success: true,
    lesson: {
      title: lesson.title,
      body: lesson.body
    }
  });
}
