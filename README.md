# 🤖 Telegram SaaS Bot Builder

**Telegram-бот + Mini App для создания и продажи кастомных ботов**

## 📋 Описание

Платформа позволяет пользователям за 5-10 минут собрать своего Telegram-бота без навыков программирования через геймифицированную воронку продаж.

### 🎯 Целевая аудитория
- Малый бизнес
- Соло-предприниматели
- Услуги (косметологи, массажисты, мастера)
- Инфобизнес

### ✨ Основные возможности

#### Telegram Бот
- 🎯 Воронка onboarding с вау-эффектом
- 🛠 Конструктор ботов из готовых функций
- 💰 Каталог функций с ценами
- 📊 Админ-панель с аналитикой
- 🔔 Уведомления админу о новых пользователях
- 👥 Просмотр всех пользователей с username

#### Telegram Mini App
- 🎨 Стильный dark theme интерфейс
- 📱 Адаптивный дизайн для мобильных
- 🎮 Геймификация сборки
- 📊 Dashboard с метриками
- 🛒 Выбор функций и тарифов

## 🏗 Архитектура

```
TelegramBot/
├── bot/                    # Основной код бота
│   ├── index.ts           # Бот с polling
│   └── server.ts          # Бот с webhook + Express
├── config/                 # Конфигурация
│   ├── index.ts           # Основные настройки
│   └── webhook.ts         # Настройка webhook
├── database/               # База данных
│   ├── index.ts           # Подключение к PostgreSQL
│   ├── migrate.ts         # Миграции
│   └── models/            # Модели данных
│       ├── UserModel.ts
│       └── EventModel.ts
├── handlers/               # Обработчики
│   ├── commands.ts        # Команды (/start, /admin, etc.)
│   ├── callbacks.ts       # Callback query
│   └── messages.ts        # Текстовые сообщения
├── keyboards/              # Клавиатуры
│   └── index.ts           # Inline и Reply клавиатуры
├── mini-app/               # Telegram Mini App
│   └── src/
│       ├── App.tsx        # Основное приложение
│       ├── main.tsx       # Точка входа
│       └── styles/        # Стили
└── utils/                  # Утилиты
```

## 🚀 Быстрый старт

### 1. Установка зависимостей

```bash
cd TelegramBot
npm install

cd mini-app
npm install
```

### 2. Настройка переменных окружения

Скопируйте `.env.example` в `.env` и заполните:

```env
BOT_TOKEN=8769862933:AAGKIxjwY2ahRSqRol-t8SXZ8Sr5x_X-vgg
ADMIN_ID=268494758

DATABASE_URL=postgresql://postgres:postgres@localhost:5432/telegram_bot_builder
DB_HOST=localhost
DB_PORT=5432
DB_NAME=telegram_bot_builder
DB_USER=postgres
DB_PASSWORD=postgres

SERVER_PORT=3000
SERVER_URL=https://your-domain.com
MINI_APP_URL=https://your-domain.com/mini-app
```

### 3. Настройка базы данных

```bash
# Создайте базу данных
createdb telegram_bot_builder

# Примените миграции
npm run db:migrate
```

### 4. Запуск бота

#### Режим разработки (polling):
```bash
npm run dev
```

#### Продакшен режим (webhook):
```bash
# Сборка
npm run build

# Запуск сервера
node dist/bot/server.js

# Настройка webhook
npm run setup:webhook
```

### 5. Запуск Mini App

```bash
cd mini-app
npm run dev
```

## 📦 Доступные функции

| Функция | Цена/мес | Описание |
|---------|----------|----------|
| 📝 Сбор заявок | $5 | Сбор контактных данных и заявок |
| 💬 Автоответы (FAQ) | $5 | Автоматические ответы на вопросы |
| 📅 Запись клиентов | $7 | Онлайн-запись на услуги |
| 📊 Google Sheets | $3 | Сохранение в таблицы |
| 🔔 Уведомления | $3 | Мгновенные уведомления |
| 💳 Приём оплаты | $10 | Платежи через Telegram/Stripe |

## 💰 Тарифы

### Free - $0/мес
- 1 бот
- 2 функции
- 100 лидов/мес
- Базовая поддержка

### Basic - $10/мес
- 3 бота
- 5 функций
- 1000 лидов/мес
- Приоритетная поддержка

### Pro - $25/мес
- ∞ ботов
- ∞ функций
- ∞ лидов
- VIP поддержка
- API доступ

## 👑 Админ-панель

### Команда /admin
Доступна только администратору (ADMIN_ID):

- 👥 **Все пользователи** - просмотр всех пользователей с username
- 🆕 **Новые пользователи** - пользователи за последние 24 часа
- 📊 **Статистика** - общая статистика бота
- 📁 **Проекты** - управление проектами

### Уведомления
Бот автоматически отправляет уведомление админу при входе нового пользователя:
- Telegram ID
- Username (с ссылкой на профиль)
- Имя
- Время входа

## 🎨 Дизайн

Стиль заимствован из проекта Foxampy:
- 🌙 Dark theme
- 💙 Neon cyan акценты (#22d3ee)
- 🔤 Monospace шрифты
- 🎮 Pixel art эстетика
- ✨ Glassmorphism эффекты

## 📊 База данных

### Таблицы
- `users` - пользователи Telegram
- `bot_projects` - проекты ботов
- `selected_features` - выбранные функции
- `subscriptions` - подписки
- `leads` - заявки от ботов
- `events` - события аналитики

## 🔧 Скрипты

```bash
# Запуск в режиме разработки
npm run dev

# Сборка проекта
npm run build

# Запуск продакшен версии
npm run start

# Запуск Mini App
npm run dev:mini-app

# Сборка Mini App
npm run build:mini-app

# Настройка webhook
npm run setup:webhook

# Миграция БД
npm run db:migrate
```

## 🌐 Деплой

### Варианты хостинга
- **Oracle Cloud Always Free** - бесплатный VPS
- **Fly.io** - бесплатный тариф
- **Railway** - простой деплой
- **Heroku** - классический вариант

### Требования
- Node.js 18+
- PostgreSQL
- HTTPS для webhook

### Настройка webhook

1. Задеплойте приложение
2. Обновите `SERVER_URL` в `.env`
3. Выполните:
```bash
npm run setup:webhook
```

## 📱 Telegram Mini App

### Интеграция с ботом

Добавьте кнопку для открытия Mini App:

```typescript
bot.sendMessage(chatId, 'Открыть конструктор:', {
  reply_markup: {
    inline_keyboard: [[
      { text: '🚀 Открыть Mini App', web_app: { url: config.miniApp.url } }
    ]]
  }
});
```

### Возможности Mini App
- 🎯 Выбор функций бота
- 💰 Расчет стоимости
- 📊 Dashboard с метриками
- ⚙️ Настройки профиля
- 🌐 Мультиязычность (RU/EN)

## 🔐 Безопасность

- ✅ Валидация данных от Telegram
- ✅ Проверка прав администратора
- ✅ Защита от SQL инъекций
- ✅ Rate limiting (рекомендуется добавить)

## 📈 Аналитика

Отслеживаемые события:
- Вход в бота (/start)
- Нажатия кнопок (callback_query)
- Выбор функций
- Оплата подписки
- Конверсия воронки

## 🛠 Технологии

### Backend
- Node.js + TypeScript
- node-telegram-bot-api
- PostgreSQL + pg
- Express (для webhook)

### Frontend (Mini App)
- React 18
- TypeScript
- Vite
- Framer Motion
- Lucide React (иконки)

## 📝 License

MIT

## 👨‍💻 Автор

Foxampy Portfolio

---

**Готово к использованию! 🚀**

Для запуска:
```bash
npm install
npm run dev
```

Для открытия бота: https://t.me/your_bot_name
