// Скрипт для настройки webhook на Vercel
// Запуск: npx tsx scripts/setup-webhook.ts

import dotenv from 'dotenv';
import { setWebhook, getWebhookInfo } from '../lib/bot/webhook';

dotenv.config({ path: '.env.local' });

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN;
const WEBHOOK_URL = process.env.TELEGRAM_WEBHOOK_URL || process.env.VERCEL_URL 
  ? `https://${process.env.VERCEL_URL}/api/telegram/webhook`
  : undefined;
const SECRET_TOKEN = process.env.TELEGRAM_WEBHOOK_SECRET;

async function main() {
  if (!BOT_TOKEN) {
    console.error('❌ TELEGRAM_BOT_TOKEN не установлен');
    process.exit(1);
  }

  if (!WEBHOOK_URL) {
    console.error('❌ TELEGRAM_WEBHOOK_URL или VERCEL_URL не установлен');
    console.log('💡 Установите переменную окружения TELEGRAM_WEBHOOK_URL или VERCEL_URL');
    process.exit(1);
  }

  console.log('🔧 Настройка webhook для Telegram бота...');
  console.log(`📡 URL: ${WEBHOOK_URL}`);

  // Получаем текущую информацию о webhook
  const currentInfo = await getWebhookInfo(BOT_TOKEN);
  if (currentInfo) {
    console.log('📋 Текущий webhook:', currentInfo.url || 'не установлен');
  }

  // Устанавливаем webhook
  const success = await setWebhook({
    token: BOT_TOKEN,
    webhookUrl: WEBHOOK_URL,
    secretToken: SECRET_TOKEN,
  });

  if (success) {
    console.log('✅ Webhook успешно установлен!');
    console.log(`🌐 URL: ${WEBHOOK_URL}`);
    if (SECRET_TOKEN) {
      console.log('🔐 Secret token установлен');
    }
  } else {
    console.error('❌ Не удалось установить webhook');
    process.exit(1);
  }

  // Проверяем информацию о webhook после установки
  const newInfo = await getWebhookInfo(BOT_TOKEN);
  if (newInfo) {
    console.log('\n📊 Информация о webhook:');
    console.log(`   URL: ${newInfo.url}`);
    console.log(`   Pending updates: ${newInfo.pending_update_count || 0}`);
    if (newInfo.last_error_date) {
      console.log(`   ⚠️  Последняя ошибка: ${newInfo.last_error_message}`);
    }
  }
}

main().catch(console.error);
