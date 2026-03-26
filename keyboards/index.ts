import { InlineKeyboardMarkup, ReplyKeyboardMarkup } from 'node-telegram-bot-api';
import config from '../config';

const { miniApp } = config;

// Главное меню
export const mainMenuKeyboard: ReplyKeyboardMarkup = {
  resize_keyboard: true,
  one_time_keyboard: false,
  keyboard: [
    [
      { text: '🚀 Собрать бота' },
      { text: '📊 Мои проекты' },
    ],
    [
      { text: '📚 Каталог функций' },
      { text: '💰 Тарифы' },
    ],
    [
      { text: '📖 Помощь' },
      { text: '👤 Профиль' },
    ],
  ],
};

// Меню с Mini App
export const mainMenuWithMiniAppKeyboard: ReplyKeyboardMarkup = {
  resize_keyboard: true,
  one_time_keyboard: false,
  keyboard: [
    [
      { text: '🚀 Собрать бота' },
      { text: '📊 Мои проекты' },
    ],
    [
      { text: '🎨 Конструктор (App)' },
      { text: '💰 Тарифы' },
    ],
    [
      { text: '📖 Помощь' },
      { text: '👤 Профиль' },
    ],
  ],
};

// Меню сборки бота
export const botBuilderKeyboard: InlineKeyboardMarkup = {
  inline_keyboard: [
    [
      { text: '📝 Сбор заявок', callback_data: 'feature_lead_capture' },
    ],
    [
      { text: '💬 Автоответы (FAQ)', callback_data: 'feature_faq' },
    ],
    [
      { text: '📅 Запись клиентов', callback_data: 'feature_booking' },
    ],
    [
      { text: '📊 Google Sheets', callback_data: 'feature_google_sheets' },
    ],
    [
      { text: '🔔 Уведомления', callback_data: 'feature_notifications' },
    ],
    [
      { text: '💳 Приём оплаты', callback_data: 'feature_payments' },
    ],
    [
      { text: '✅ Завершить выбор', callback_data: 'builder_finish' },
    ],
    [
      { text: '❌ Отмена', callback_data: 'builder_cancel' },
    ],
  ],
};

// Меню администратора
export const adminKeyboard: InlineKeyboardMarkup = {
  inline_keyboard: [
    [
      { text: '👥 Все пользователи', callback_data: 'admin_users_all' },
    ],
    [
      { text: '🆕 Новые пользователи (24ч)', callback_data: 'admin_users_new' },
    ],
    [
      { text: '📊 Статистика', callback_data: 'admin_stats' },
    ],
    [
      { text: '📁 Проекты', callback_data: 'admin_projects' },
    ],
  ],
};

// Клавиатура просмотра пользователя (для админа)
export function userActionsKeyboard(userId: number): InlineKeyboardMarkup {
  return {
    inline_keyboard: [
      [
        { text: '📊 История действий', callback_data: `admin_user_history_${userId}` },
      ],
      [
        { text: '🗑 Заблокировать', callback_data: `admin_user_block_${userId}` },
      ],
      [
        { text: '🔙 Назад', callback_data: 'admin_users_all' },
      ],
    ],
  };
}

// Клавиатура тарифов
export const pricingKeyboard: InlineKeyboardMarkup = {
  inline_keyboard: [
    [
      { text: '🆓 Free - $0/мес', callback_data: 'tier_free' },
    ],
    [
      { text: '⭐ Basic - $10/мес', callback_data: 'tier_basic' },
    ],
    [
      { text: '🚀 Pro - $25/мес', callback_data: 'tier_pro' },
    ],
    [
      { text: '🔧 Настройка под ключ - $50', callback_data: 'upsell_setup' },
    ],
    [
      { text: '📋 Вернуться в меню', callback_data: 'main_menu' },
    ],
  ],
};

// Клавиатура продолжения сборки
export const continueBuilderKeyboard: InlineKeyboardMarkup = {
  inline_keyboard: [
    [
      { text: '➕ Добавить функции', callback_data: 'builder_continue' },
    ],
    [
      { text: '💳 Оформить подписку', callback_data: 'builder_checkout' },
    ],
    [
      { text: '📋 Сохранить проект', callback_data: 'builder_save' },
    ],
  ],
};

// Клавиатура помощи
export const helpKeyboard: InlineKeyboardMarkup = {
  inline_keyboard: [
    [
      { text: '📖 Документация', url: 'https://t.me/your_bot_docs' },
    ],
    [
      { text: '💬 Поддержка', url: 'https://t.me/your_support' },
    ],
    [
      { text: '🔙 Главное меню', callback_data: 'main_menu' },
    ],
  ],
};

// Клавиатура профиля
export const profileKeyboard: InlineKeyboardMarkup = {
  inline_keyboard: [
    [
      { text: '📊 Моя статистика', callback_data: 'profile_stats' },
    ],
    [
      { text: '⚙️ Настройки', callback_data: 'profile_settings' },
    ],
    [
      { text: '🔙 Главное меню', callback_data: 'main_menu' },
    ],
  ],
};

// Универсальная кнопка "Назад"
export const backKeyboard: InlineKeyboardMarkup = {
  inline_keyboard: [
    [
      { text: '🔙 Назад', callback_data: 'main_menu' },
    ],
  ],
};
