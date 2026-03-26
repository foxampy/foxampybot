import TelegramBot from 'node-telegram-bot-api';
import { UserModel } from '../database/models/UserModel';
import { EventModel } from '../database/models/EventModel';
import config from '../config';
import { 
  mainMenuKeyboard, 
  adminKeyboard, 
  userActionsKeyboard,
  mainMenuWithMiniAppKeyboard,
} from '../keyboards';

const { adminId } = config.bot;
const { miniApp } = config;

// Обработка команды /start
export async function handleStart(bot: TelegramBot, msg: TelegramBot.Message) {
  const chatId = msg.chat.id;
  const user = msg.from;

  if (!user) return;

  // Сохраняем пользователя в БД
  const dbUser = await UserModel.upsert({
    telegram_id: user.id,
    username: user.username,
    first_name: user.first_name,
    last_name: user.last_name,
    language_code: user.language_code,
    is_bot: user.is_bot,
  });

  // Записываем событие входа
  await EventModel.create(user.id, 'start_command', { 
    username: user.username,
    chat_id: chatId 
  });

  // Проверяем, новый ли это пользователь
  const isNewUser = new Date(dbUser.created_at).getTime() > Date.now() - 5 * 60 * 1000;

  // Если новый пользователь - уведомляем админа
  if (isNewUser && user.id !== adminId) {
    await notifyAdminAboutNewUser(bot, user);
  }

  // Приветственное сообщение
  const welcomeMessage = isNewUser 
    ? `👋 *Привет, ${user.first_name || 'друг'}!*

🎉 *Добро пожаловать в Telegram SaaS Bot Builder!*

✨ *Создайте своего бота за 5-10 минут без навыков программирования!*

🚀 *Что вы можете сделать:*
• Собрать бота из готовых функций
• Настроить сбор заявок 24/7
• Автоматизировать общение с клиентами
• Принимать оплаты через бота

💡 *Нажмите "🚀 Собрать бота" чтобы начать!*`
    : `👋 *С возвращением, ${user.first_name || 'друг'}!*

🎯 *Чем займёмся сегодня?*`;

  // Если это админ - показываем админ меню
  if (user.id === adminId) {
    await bot.sendMessage(chatId, '👑 *Панель администратора*\n\nУ вас есть доступ ко всем функциям управления.', {
      parse_mode: 'Markdown',
      reply_markup: adminKeyboard,
    });
    return;
  }

  await bot.sendMessage(chatId, welcomeMessage, {
    parse_mode: 'Markdown',
    reply_markup: mainMenuWithMiniAppKeyboard,
  });
}

// Уведомление админа о новом пользователе
async function notifyAdminAboutNewUser(bot: TelegramBot, user: TelegramBot.User) {
  const notifyMessage = `🔔 *Новый пользователь в боте!*

👤 *Информация:*
• ID: \`${user.id}\`
• Username: ${user.username ? `@${user.username}` : 'нет'}
• Имя: ${user.first_name || ''} ${user.last_name || ''}
• Язык: ${user.language_code || 'ru'}
• Бот: ${user.is_bot ? 'да' : 'нет'}

⏰ *Время:* ${new Date().toLocaleString('ru-RU')}`;

  try {
    await bot.sendMessage(adminId, notifyMessage, {
      parse_mode: 'Markdown',
    });
  } catch (error) {
    console.error('Ошибка отправки уведомления админу:', error);
  }
}

// Обработка команды /admin
export async function handleAdmin(bot: TelegramBot, msg: TelegramBot.Message) {
  const chatId = msg.chat.id;
  const user = msg.from;

  if (!user) return;

  // Проверка прав администратора
  if (user.id !== adminId) {
    await bot.sendMessage(chatId, '❌ *У вас нет доступа к этой команде*', {
      parse_mode: 'Markdown',
    });
    return;
  }

  // Записываем событие
  await EventModel.create(user.id, 'admin_command', {});

  const adminMessage = `👑 *Панель администратора*

📊 *Доступные действия:*
• Просмотр всех пользователей
• Просмотр новых пользователей
• Статистика бота
• Управление проектами

Выберите действие:`;

  await bot.sendMessage(chatId, adminMessage, {
    parse_mode: 'Markdown',
    reply_markup: adminKeyboard,
  });
}

// Обработка команды /help
export async function handleHelp(bot: TelegramBot, msg: TelegramBot.Message) {
  const chatId = msg.chat.id;
  const user = msg.from;

  if (!user) return;

  await EventModel.create(user.id, 'help_command', {});

  const helpMessage = `❓ *Помощь и поддержка*

📚 *Как это работает:*

1️⃣ *Нажмите "🚀 Собрать бота"*
2️⃣ *Выберите нужные функции*
3️⃣ *Настройте параметры*
4️⃣ *Оплатите подписку*
5️⃣ *Пользуйтесь готовым ботом!*

🛠 *Доступные функции:*
• Сбор заявок - $5/мес
• Автоответы (FAQ) - $5/мес
• Запись клиентов - $7/мес
• Google Sheets - $3/мес
• Уведомления - $3/мес
• Приём оплаты - $10/мес

💬 *Нужна помощь?*
Напишите в поддержку: @your_support`;

  await bot.sendMessage(chatId, helpMessage, {
    parse_mode: 'Markdown',
  });
}

// Обработка команды /profile
export async function handleProfile(bot: TelegramBot, msg: TelegramBot.Message) {
  const chatId = msg.chat.id;
  const user = msg.from;

  if (!user) return;

  const dbUser = await UserModel.findById(user.id);

  if (!dbUser) {
    await bot.sendMessage(chatId, '❌ Пользователь не найден');
    return;
  }

  const profileMessage = `👤 *Ваш профиль*

📋 *Информация:*
• ID: \`${user.id}\`
• Username: ${user.username ? `@${user.username}` : 'нет'}
• Имя: ${user.first_name || ''}
• Язык: ${dbUser.language_code}
• Статус: ${dbUser.state}

📅 *Дата регистрации:* ${new Date(dbUser.created_at).toLocaleDateString('ru-RU')}
🕐 *Последний вход:* ${new Date(dbUser.last_seen).toLocaleString('ru-RU')}`;

  await bot.sendMessage(chatId, profileMessage, {
    parse_mode: 'Markdown',
    reply_markup: profileKeyboard,
  });
}
