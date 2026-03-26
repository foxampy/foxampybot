import TelegramBot from 'node-telegram-bot-api';
import { UserModel } from '../database/models/UserModel';
import { EventModel } from '../database/models/EventModel';
import config from '../config';
import { 
  mainMenuKeyboard,
  botBuilderKeyboard,
  pricingKeyboard,
} from '../keyboards';

const { miniApp } = config;

// Обработка текстовых сообщений
export async function handleTextMessage(bot: TelegramBot, msg: TelegramBot.Message) {
  const chatId = msg.chat.id;
  const user = msg.from;
  const text = msg.text || '';

  if (!user) return;

  // Записываем событие
  await EventModel.create(user.id, 'text_message', { text, chat_id: chatId });

  // Обработка команд меню
  switch (text) {
    case '🎨 Конструктор (App)':
      // Открываем Mini App
      await bot.sendMessage(chatId, '🎨 *Открываем конструктор...*\n\nЗагрузка Mini App...', {
        parse_mode: 'Markdown',
        reply_markup: {
          inline_keyboard: [[
            { text: '🚀 Открыть конструктор', web_app: { url: miniApp.url } }
          ]]
        },
      });
      break;

    case '🚀 Собрать бота':
      await bot.sendMessage(chatId, '🛠 *Конструктор ботов*\n\n*Выберите функции для вашего бота:*\n\n💰 *Базовая стоимость:* $0/мес (Free тариф)\n\nДобавляйте функции и стоимость обновится:', {
        parse_mode: 'Markdown',
        reply_markup: botBuilderKeyboard,
      });
      break;

    case '📊 Мои проекты':
      const projects = await get_user_projects(user.id);
      if (projects.length === 0) {
        await bot.sendMessage(chatId, '📭 *У вас пока нет проектов*\n\nСоздайте своего первого бота!', {
          parse_mode: 'Markdown',
          reply_markup: mainMenuKeyboard,
        });
      } else {
        const projectsList = projects.map((p: any, i: number) => 
          `${i + 1}. *${p.name}* - ${p.status}`
        ).join('\n');
        
        await bot.sendMessage(chatId, `📁 *Ваши проекты*\n\n${projectsList}`, {
          parse_mode: 'Markdown',
          reply_markup: mainMenuKeyboard,
        });
      }
      break;

    case '📚 Каталог функций':
      const catalogMessage = `📚 *Каталог функций*\n\n*Доступные модули для вашего бота:*\n\n` +
        `📝 *Сбор заявок* - $5/мес\nСбор контактных данных и заявок\n\n` +
        `💬 *Автоответы (FAQ)* - $5/мес\nАвтоматические ответы на вопросы\n\n` +
        `📅 *Запись клиентов* - $7/мес\nОнлайн-запись на услуги\n\n` +
        `📊 *Google Sheets* - $3/мес\nСохранение в таблицы\n\n` +
        `🔔 *Уведомления* - $3/мес\nМгновенные уведомления\n\n` +
        `💳 *Приём оплаты* - $10/мес\nПлатежи через Telegram/Stripe`;
      
      await bot.sendMessage(chatId, catalogMessage, {
        parse_mode: 'Markdown',
        reply_markup: mainMenuKeyboard,
      });
      break;

    case '💰 Тарифы':
      const pricingMessage = `💰 *Тарифные планы*\n\n` +
        `🆓 *Free* - $0/мес\n• 1 бот\n• 2 функции\n• 100 лидов/мес\n\n` +
        `⭐ *Basic* - $10/мес\n• 3 бота\n• 5 функций\n• 1000 лидов/мес\n\n` +
        `🚀 *Pro* - $25/мес\n• ∞ ботов\n• ∞ функций\n• ∞ лидов\n\n` +
        `🔧 *Настройка под ключ* - $50 (единоразово)`;
      
      await bot.sendMessage(chatId, pricingMessage, {
        parse_mode: 'Markdown',
        reply_markup: pricingKeyboard,
      });
      break;

    case '📖 Помощь':
      const helpMessage = `❓ *Помощь и поддержка*\n\n` +
        `📚 *Как это работает:*\n\n` +
        `1️⃣ Нажмите "🚀 Собрать бота"\n` +
        `2️⃣ Выберите нужные функции\n` +
        `3️⃣ Настройте параметры\n` +
        `4️⃣ Оплатите подписку\n` +
        `5️⃣ Пользуйтесь готовым ботом!\n\n` +
        `💬 *Нужна помощь?*\n` +
        `Напишите в поддержку: @your_support`;
      
      await bot.sendMessage(chatId, helpMessage, {
        parse_mode: 'Markdown',
        reply_markup: mainMenuKeyboard,
      });
      break;

    case '👤 Профиль':
      const dbUser = await UserModel.findById(user.id);
      if (dbUser) {
        const profileMessage = `👤 *Ваш профиль*\n\n` +
          `📋 *Информация:*\n` +
          `• ID: \`${user.id}\`\n` +
          `• Username: ${user.username ? `@${user.username}` : 'нет'}\n` +
          `• Имя: ${user.first_name || ''}\n` +
          `• Язык: ${dbUser.language_code}\n\n` +
          `📅 *Дата регистрации:* ${new Date(dbUser.created_at).toLocaleDateString('ru-RU')}\n` +
          `🕐 *Последний вход:* ${new Date(dbUser.last_seen).toLocaleString('ru-RU')}`;
        
        await bot.sendMessage(chatId, profileMessage, {
          parse_mode: 'Markdown',
          reply_markup: mainMenuKeyboard,
        });
      }
      break;

    default:
      // Неизвестная команда - показываем главное меню
      await bot.sendMessage(chatId, '🏠 *Главное меню*\n\nВыберите действие:', {
        parse_mode: 'Markdown',
        reply_markup: mainMenuKeyboard,
      });
  }
}

// Получение проектов пользователя (заглушка)
async function get_user_projects(userId: number) {
  // Здесь будет запрос к БД
  return [];
}
