const jwt = require('jsonwebtoken');
require('dotenv').config({ path: '.env.local' });

// Создаём тестовый токен для test99@test.com (предположим, что free: false после обновления)
const token = jwt.sign(
  { id: 'test-user-id', email: 'test99@test.com', name: 'Test', free: false },
  process.env.JWT_SECRET,
  { expiresIn: '1h' }
);

console.log('Тестовый токен:', token.substring(0, 50) + '...');
console.log('Payload: { id, email, name, free: false }');
console.log('\nТеперь зайди на сайт с этим токеном в cookie "token" и открой Модуль 2, Урок 1');
