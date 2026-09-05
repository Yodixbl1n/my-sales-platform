/** @type {import('next').NextConfig} */
const securityHeaders = [
  // Запрет встраивания в iframe (clickjacking)
  { key: 'X-Frame-Options', value: 'DENY' },
  // Запрет угадывания MIME-типа браузером
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  // Политика реферера — не передаём полный URL при переходах
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  // Отключаем ненужные API браузера
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
  // HSTS — только HTTPS (только если у тебя SSL, а на Vercel он есть всегда)
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
];

const nextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
