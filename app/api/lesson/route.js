import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { createSupabaseClient } from '../../../lib/supabaseClient';
import { CONTENT_1_4 } from '../../../lib/content-part1';
import { CONTENT_5_8 } from '../../../lib/content-part2';
import { CONTENT_PRACTICE } from '../../../lib/content-practice';

/**
 * API-роут для получения контента урока.
 * 
 * Логика доступа:
 * - Демо (role=demo): только модуль 1, урок 0 (первый урок полностью открыт)
 * - Free (free=true): модуль 1, уроки 0-4 (первые 5 уроков полностью)
 * - Paid (free=false): все модули и уроки
 * 
 * GET /api/lesson?moduleId=1&lessonId=0
 */
export async function GET(req) {
  const cookieStore = await cookies();
  let token = cookieStore.get('token')?.value;
  
  // Если нет основного токена, проверяем демо-токен
  if (!token) {
    token = cookieStore.get('demo_token')?.value;
  }

  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  let payload;
  try {
    payload = jwt.verify(token, process.env.JWT_SECRET);
  } catch (e) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
  }

  // === Парсим параметры запроса ===
  const { searchParams } = new URL(req.url);
  const moduleId = parseInt(searchParams.get('moduleId') || '0', 10);
  const lessonId = parseInt(searchParams.get('lessonId') || '0', 10);

  if (!moduleId || Number.isNaN(moduleId) || Number.isNaN(lessonId) || moduleId < 1 || moduleId > 8 || lessonId < 0) {
    return NextResponse.json({ error: 'Invalid parameters' }, { status: 400 });
  }

  // === Демо-пользователь: только первый урок модуля 1 ===
  const isDemoUser = payload.role === 'demo';
  if (isDemoUser) {
    if (moduleId !== 1 || lessonId !== 0) {
      return NextResponse.json({ 
        error: 'В демо-режиме доступен только первый урок',
        demo: true 
      }, { status: 403 });
    }
  }

  // === Проверяем пользователя в БД (для не-демо) ===
  let user = null;
  if (!isDemoUser) {
    const SUPABASE = createSupabaseClient();
    const { data, error: userErr } = await SUPABASE
      .from('users')
      .select('id, email, name, first_name, username, free, blocked, progress')
      .eq('id', payload.id)
      .limit(1)
      .maybeSingle();

    if (userErr || !data) {
      return NextResponse.json({ error: 'User not found' }, { status: 401 });
    }

    if (data.blocked === true) {
      return NextResponse.json({ error: 'Account blocked' }, { status: 403 });
    }

    user = data;
  }

  // === Проверяем доступ по тарифу ===
  const isFreeUser = isDemoUser || (user && user.free === true);
  
  // Платные пользователи: всё открыто
  // Бесплатные: только модуль 1
  if (isFreeUser && moduleId !== 1) {
    return NextResponse.json({ 
      error: 'Этот модуль доступен в платной версии',
      locked: true 
    }, { status: 403 });
  }

  // Бесплатные (не демо): только первые 5 уроков модуля 1
  if (isFreeUser && !isDemoUser && lessonId > 4) {
    return NextResponse.json({ 
      error: 'Этот урок доступен в платной версии',
      locked: true 
    }, { status: 403 });
  }

  // === Получаем контент урока ===
  const COURSE = { ...CONTENT_1_4, ...CONTENT_5_8 };
  const lessons = COURSE[moduleId] || [];
  const lesson = lessons[lessonId];

  if (!lesson) {
    // Возможно это практика
    const practice = CONTENT_PRACTICE[moduleId];
    if (practice && lessonId === lessons.length) {
      // Практика доступна только платным
      if (isFreeUser) {
        return NextResponse.json({ 
          error: 'Практика доступна в платной версии',
          locked: true 
        }, { status: 403 });
      }
      return NextResponse.json({ 
        success: true,
        lesson: { title: practice.title, body: practice.body }
      });
    }
    return NextResponse.json({ error: 'Lesson not found' }, { status: 404 });
  }

  // === Возвращаем ПОЛНЫЙ контент урока (без обрезки) ===
  return NextResponse.json({
    success: true,
    lesson: {
      title: lesson.title,
      body: lesson.body
    }
  });
}
