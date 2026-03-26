# 🤖 FoxampyBot - Telegram SaaS Bot Builder

**Telegram-бот + Mini App для создания кастомных ботов без программирования**

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/foxampy/foxampybot&root-directory=TelegramBot)
[![Supabase](https://img.shields.io/badge/Database-Supabase-green)](https://supabase.com)
[![Telegram Bot](https://img.shields.io/badge/Platform-Telegram-blue)](https://t.me/foxampybot)

---

## 🚀 Быстрый старт

### 1. Настроить Supabase (БД)

```bash
# 1. Перейдите на https://supabase.com
# 2. Создайте новый проект
# 3. Settings → API → скопируйте ключи
# 4. SQL Editor → выполните database/supabase-migration.sql
```

### 2. Настроить Vercel

```bash
# 1. Перейдите на https://vercel.com/new
# 2. Import: foxampy/foxampybot
# 3. Root Directory: TelegramBot
# 4. Добавьте переменные окружения (см. ниже)
# 5. Deploy
```

### 3. Переменные окружения

Добавьте в Vercel (Settings → Environment Variables):

```env
# Supabase (из Settings → API)
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Telegram
BOT_TOKEN=8769862933:AAGKIxjwY2ahRSqRol-t8SXZ8Sr5x_X-vgg
ADMIN_ID=268494758

# Server
SERVER_URL=https://your-project.vercel.app
MINI_APP_URL=https://your-project.vercel.app

# Environment
NODE_ENV=production
```

### 4. Настроить Webhook

```bash
curl -X POST "https://api.telegram.org/bot8769862933:AAGKIxjwY2ahRSqRol-t8SXZ8Sr5x_X-vgg/setWebhook?url=https://your-project.vercel.app/webhook"
```

### 5. Настроить Mini App

В @BotFather:
- `/mybots` → Bot Settings → Menu Button
- URL: `https://your-project.vercel.app`
- Название: `🎨 Конструктор`

---

## 📁 Структура проекта

```
foxampybot/
├── TelegramBot/              # Основной код
│   ├── api/                  # Vercel Serverless функции
│   ├── bot/                  # Код бота
│   ├── config/               # Конфигурация
│   ├── database/             # БД модели и миграции
│   ├── handlers/             # Обработчики команд
│   ├── keyboards/            # Клавиатуры
│   ├── mini-app/             # React Mini App
│   ├── scripts/              # Скрипты
│   ├── utils/                # Утилиты
│   ├── .env.example          # Шаблон переменных
│   ├── package.json
│   └── vercel.json           # Vercel конфиг
├── FoxampyLab/               # Другие проекты
├── lib/                      # Библиотеки
└── project-cards/            # Компоненты
```

---

## 🎯 Возможности

### Telegram Бот
- ✅ Воронка onboarding
- ✅ Конструктор ботов
- ✅ Каталог функций (6 модулей)
- ✅ Админ-панель
- ✅ Уведомления о новых пользователях
- ✅ Просмотр пользователей с username

### Telegram Mini App
- ✅ React + Vite
- ✅ Dark theme дизайн
- ✅ Визуальный конструктор
- ✅ Выбор функций и тарифов
- ✅ Dashboard с метриками
- ✅ Мультиязычность (RU/EN)

### База данных (Supabase)
- ✅ PostgreSQL
- ✅ Таблицы: users, events, bot_projects, subscriptions
- ✅ RLS политики
- ✅ Автоматические миграции

---

## 💰 Монетизация

| Тариф | Цена | Возможности |
|-------|------|-------------|
| Free | $0/мес | 1 бот, 2 функции, 100 лидов |
| Basic | $10/мес | 3 бота, 5 функций, 1000 лидов |
| Pro | $25/мес | ∞ ботов, ∞ функций, ∞ лидов |

### Функции
- 📝 Сбор заявок - $5/мес
- 💬 Автоответы (FAQ) - $5/мес
- 📅 Запись клиентов - $7/мес
- 📊 Google Sheets - $3/мес
- 🔔 Уведомления - $3/мес
- 💳 Приём оплаты - $10/мес

---

## 🛠 Технологии

### Backend
- **Node.js** + **TypeScript**
- **Telegraf** / node-telegram-bot-api
- **Supabase** (PostgreSQL)
- **Vercel** (Serverless)

### Frontend (Mini App)
- **React 18** + **TypeScript**
- **Vite**
- **Framer Motion**
- **Lucide React** (иконки)
- **Telegram WebApp API**

---

## 📚 Документация

| Файл | Описание |
|------|----------|
| [`CHEATSHEET.md`](CHEATSHEET.md) | Быстрая шпаргалка |
| [`SETUP-FULL.md`](SETUP-FULL.md) | Полная инструкция |
| [`DEPLOY-GITHUB.md`](DEPLOY-GITHUB.md) | Деплой на Vercel |
| [`README-LOCAL.md`](README-LOCAL.md) | Локальная разработка |

---

## 🔐 Безопасность

- ✅ `.env` файлы в `.gitignore`
- ✅ Service Role Key только на сервере
- ✅ RLS политики в Supabase
- ✅ Проверка ADMIN_ID в API
- ✅ HTTPS (Vercel)

---

## 🔄 Разработка

### Локальный запуск

```bash
cd TelegramBot

# Установите зависимости
npm install

# Скопируйте .env.example в .env.local
copy .env.example .env.local

# Заполните .env.local (см. CHEATSHEET.md)

# Запустите бота
npm run dev

# В другом терминале - Mini App
cd mini-app
npm install
npm run dev
```

### Применение миграций БД

```bash
# Автоматически
npm run db:migrate

# Или вручную через Supabase SQL Editor
# database/supabase-migration.sql
```

### Деплой

```bash
# Push в GitHub (авто-деплой)
git push

# Или вручную
vercel --prod
```

---

## 📊 API Endpoints

После деплоя доступны API endpoints (только для админа):

| Endpoint | Описание |
|----------|----------|
| `GET /api/users?telegramId=ID` | Все пользователи |
| `GET /api/users/new?telegramId=ID` | Новые (24ч) |
| `GET /api/stats?telegramId=ID` | Статистика |
| `GET /api/events/USER_ID?telegramId=ID` | События |
| `GET /health` | Health check |

---

## 👑 Админ-панель

Команды в боте:

- `/start` - Приветствие + главное меню
- `/admin` - Админ-панель (только ADMIN_ID)
- `/help` - Справка
- `/profile` - Профиль пользователя

### Админ возможности:
- 👥 Просмотр всех пользователей
- 🆕 Новые пользователи (24ч)
- 📊 Статистика бота
- 📁 История действий пользователя

---

## 🌐 Деплой

### Vercel (рекомендуется)

```bash
npm install -g vercel
vercel login
vercel --prod
```

### Переменные для Vercel:

```
SUPABASE_URL=...
SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
BOT_TOKEN=8769862933:AAGKIxjwY2ahRSqRol-t8SXZ8Sr5x_X-vgg
ADMIN_ID=268494758
SERVER_URL=https://your-project.vercel.app
MINI_APP_URL=https://your-project.vercel.app
```

---

## 🆘 Поддержка

### Проблемы?

1. **Бот не отвечает:**
   ```bash
   vercel logs --prod
   ```

2. **БД не подключается:**
   - Проверьте ключи в Supabase Dashboard
   - Убедитесь, что миграции применены

3. **Webhook не работает:**
   ```bash
   curl "https://api.telegram.org/bot8769862933:AAGKIxjwY2ahRSqRol-t8SXZ8Sr5x_X-vgg/getWebhookInfo"
   ```

### Логи:

```bash
# Vercel
vercel logs --prod

# Локально
npm run dev
```

---

## 📝 License

MIT

---

## 👨‍💻 Автор

**Foxampy**

- GitHub: [@foxampy](https://github.com/foxampy)
- Telegram: [@foxampybot](https://t.me/foxampybot)

---

## 🎯 Следующие шаги

1. ⭐ Star этот репозиторий
2. 🍴 Fork для своих проектов
3. 🚀 Deploy на Vercel
4. 📊 Настроить Supabase
5. 🎨 Кастомизировать дизайн

---

**Готово к использованию! 🎉**

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/foxampy/foxampybot&root-directory=TelegramBot)
