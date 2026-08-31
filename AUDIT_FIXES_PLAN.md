# План исправлений по аудиту NP Sales

## ЭТАП 1: Критичные проблемы безопасности (СЕГОДНЯ)

### 1.1 Синхронизация схемы БД (Находка #5)
- Обновить `supabase/init.sql` — добавить колонки: email, password_hash, name, invite_code, free, blocked, modules_limit, progress
- Добавить колонку `type` в таблицу `invite_codes`
- Создать миграцию для существующей базы

### 1.2 Исправление регистрации (Находки #1, #2)
- `app/api/register/route.js`: добавить проверку invite_code в базе
- `app/api/verify-code/route.js`: НЕ помечать код как used сразу, только после успешной регистрации
- Связать verify-code и register в одну транзакцию

### 1.3 Разделение тарифов (Находка #4)
- `app/api/register/route.js`: читать type из invite_codes и записывать в users.free
- `app/api/me/route.js`: возвращать поле free из БД
- `app/dashboard/page.js`: использовать реальное значение из /api/me

### 1.4 Защита контента (Находка #7)
- Создать API-роут `/api/lesson/[moduleId]/[lessonId]` — отдаёт контент только авторизованным с проверкой тарифа
- `components/ui/lesson-viewer.tsx`: загружать контент через fetch, а не импортировать статически
- Убрать прямой импорт CONTENT_5_8 для бесплатных пользователей

### 1.5 Блокировка пользователей (Находка #3)
- `app/api/me/route.js`: проверять поле blocked в БД при каждом запросе
- Если blocked=true — возвращать 403 и форсить logout на клиенте

## ЭТАП 2: Прогресс и сертификат (ЗАВТРА)

### 2.1 Перенос прогресса на сервер (Находка #6)
- Создать таблицу `user_progress` в Supabase (user_id, module_id, lesson_id, completed_at)
- Создать API: `/api/progress` (GET/POST)
- `app/dashboard/page.js`: заменить localStorage на fetch к /api/progress
- `app/certificate/page.js`: проверять прогресс через серверный запрос

### 2.2 Защита сертификата
- `app/certificate/page.js`: добавить серверную проверку завершения всех модулей
- Добавить уникальную подпись сертификата (hash от user_id + completed_at)

## ЭТАП 3: Функциональные баги (ПОСЛЕЗАВТРА)

### 3.1 Исправление путей API (Находка #8)
- `app/api/admin/invites/route.js`: добавить GET-обработчик
- `app/admin/page.js`: исправить путь на /api/admin/invites

### 3.2 Telegram-логин (Находка #10)
- `app/api/me/route.js`: возвращать first_name и username из JWT payload
- `app/dashboard/page.js`: использовать user.first_name для displayName

### 3.3 Вопросы C.U.P. в тестах (Находка #11)
- `components/ui/module-quiz.tsx`: перенести вопросы про C.U.P. из Модуля 2 в Модуль 1

### 3.4 Бесплатный вход (Находка #9)
- Создать демо-режим: `/dashboard?demo=true` с доступом только к первым 3 урокам Модуля 1
- `app/page.js`: изменить кнопки "Попробовать бесплатно" на `/dashboard?demo=true`

## ЭТАП 4: Контент и гигиена (НА НЕДЕЛЕ)

### 4.1 Синхронизация числа уроков (Находка #12)
- Обновить все упоминания "71 урок" и "81 урок" на "75 уроков"
- Файлы: `app/layout.js`, `app/page.js`, `components/ui/pricing.tsx`, `app/certificate/page.js`, `components/ui/platform-showcase.tsx`

### 4.2 Цена без JS (Находка #13)
- `components/ui/pricing.tsx`: добавить статичный fallback "9900₽" для SEO/скринридеров
- Синхронизировать цену в админке (10000₽) с ценой на сайте (9900₽)

### 4.3 Удаление мёртвого кода (Находки #14, #17)
- Удалить `components/ui/social-proof.tsx` (фейковые отзывы)
- Удалить `components/VideoModal.js` (неиспользуемый компонент)

### 4.4 Гигиена репозитория (Находки #15, #16, #18, #19, #20)
- Удалить ngrok, ngrok.zip, fix_page.py из git
- Удалить дублирующиеся роуты `/api/get-users` и `/api/create-code`
- Исправить `app/layout.js`: SITE_URL, lang="ru", metadata.icons
