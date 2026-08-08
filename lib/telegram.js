import crypto from 'crypto';

export function verifyTelegramAuth(data, botToken) {
  if (!data || !botToken) return false;
  const checkHash = data.hash;
  const dataCheckArr = [];
  for (const key of Object.keys(data).sort()) {
    if (key === 'hash') continue;
    dataCheckArr.push(key + '=' + data[key]);
  }
  const dataCheckString = dataCheckArr.join('\n');
  const secret = crypto.createHash('sha256').update(botToken).digest();
  const hmac = crypto.createHmac('sha256', secret).update(dataCheckString).digest('hex');
  return hmac === checkHash;
}
