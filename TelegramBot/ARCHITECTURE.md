# 🏗 Архитектура проекта

## Структура файлов

```
TelegramBot/
│
├── 📁 bot/                          # Основной код бота
│   ├── index.ts                     # Бот с polling (для разработки)
│   └── server.ts                    # Бот с webhook + Express (для продакшена)
│
├── 📁 config/                       # Конфигурация
│   ├── index.ts                     # Основные настройки из .env
│   └── webhook.ts                   # Скрипт настройки webhook
│
├── 📁 database/                     # Работа с базой данных
│   ├── index.ts                     # Подключение к PostgreSQL
│   ├── migrate.ts                   # SQL миграции
│   └── models/                      # Модели данных
│       ├── UserModel.ts             # Модель пользователя
│       └── EventModel.ts            # Модель событий
│
├── 📁 handlers/                     # Обработчики событий
│   ├── commands.ts                  # Команды бота (/start, /admin, /help)
│   ├── callbacks.ts                 # Callback query (кнопки)
│   └── messages.ts                  # Текстовые сообщения
│
├── 📁 keyboards/                    # Клавиатуры
│   └── index.ts                     # Inline и Reply клавиатуры
│
├── 📁 middlewares/                  # Middleware (заглушка)
│
├── 📁 utils/                        # Утилиты
│   └── helpers.ts                   # Вспомогательные функции
│
├── 📁 mini-app/                     # Telegram Mini App (React)
│   ├── 📁 src/
│   │   ├── App.tsx                  # Основное приложение
│   │   ├── main.tsx                 # Точка входа
│   │   └── 📁 styles/
│   │       └── global.css           # Глобальные стили
│   ├── 📁 public/
│   │   └── vite.svg                 # Иконка
│   ├── index.html                   # HTML шаблон
│   ├── package.json                 # Зависимости Mini App
│   ├── tsconfig.json                # TypeScript конфиг
│   ├── tsconfig.node.json           # TypeScript конфиг для Node
│   └── vite.config.ts               # Vite конфиг
│
├── .env                             # Переменные окружения
├── .env.example                     # Пример переменных
├── .gitignore                       # Git ignore
├── package.json                     # Зависимости проекта
├── tsconfig.json                    # TypeScript конфиг
├── README.md                        # Полная документация
├── QUICKSTART.md                    # Быстрый старт
└── ARCHITECTURE.md                  # Этот файл
```

## 📊 Схема базы данных

```
┌─────────────────┐
│     users       │
├─────────────────┤
│ id              │
│ telegram_id     │ ← PK
│ username        │
│ first_name      │
│ last_name       │
│ language_code   │
│ state           │
│ created_at      │
│ last_seen       │
└─────────────────┘
         │
         │ 1:N
         ▼
┌─────────────────┐
│  bot_projects   │
├─────────────────┤
│ id              │
│ user_id         │ ← FK → users.telegram_id
│ name            │
│ description     │
│ status          │
│ created_at      │
└─────────────────┘
         │
         │ 1:N
         ▼
┌─────────────────┐
│selected_features│
├─────────────────┤
│ id              │
│ project_id      │ ← FK → bot_projects.id
│ feature_id      │
│ config (JSONB)  │
│ created_at      │
└─────────────────┘

┌─────────────────┐
│  subscriptions  │
├─────────────────┤
│ id              │
│ user_id         │ ← FK → users.telegram_id
│ tier            │
│ status          │
│ started_at      │
│ expires_at      │
└─────────────────┘

┌─────────────────┐
│      leads      │
├─────────────────┤
│ id              │
│ bot_project_id  │ ← FK → bot_projects.id
│ user_telegram_id│
│ data (JSONB)    │
│ created_at      │
└─────────────────┘

┌─────────────────┐
│     events      │
├─────────────────┤
│ id              │
│ user_id         │ ← FK → users.telegram_id
│ event_type      │
│ event_data(JSONB)
│ created_at      │
└─────────────────┘
```

## 🔄 Поток данных

### 1. Пользователь запускает бота

```
User → Telegram → Bot (/start)
                ↓
        handleStart()
                ↓
        UserModel.upsert() → DB
                ↓
        EventModel.create() → DB
                ↓
        Если новый → notifyAdmin()
                ↓
        Отправка приветствия
```

### 2. Админ команда

```
Admin → Telegram → Bot (/admin)
                 ↓
         handleAdmin()
                 ↓
         Проверка adminId
                 ↓
         EventModel.create()
                 ↓
         Отправка админ-панели
```

### 3. Callback query (кнопки)

```
User → Кнопка → Telegram → Bot (callback_query)
                          ↓
                  handleCallbackQuery()
                          ↓
                  Проверка data
                          ↓
                  Действие + answerCallbackQuery()
```

### 4. Mini App

```
User → Кнопка "Конструктор" → Telegram Web View
                              ↓
                      Mini App (React)
                              ↓
                      Telegram WebApp API
                              ↓
                      Взаимодействие с UI
```

## 🎯 Ключевые компоненты

### Bot (index.ts)
- Polling режим для разработки
- Обработчики команд и событий
- Глобальная обработка ошибок

### Server (server.ts)
- Webhook режим для продакшена
- Express сервер
- Health check endpoint

### UserModel
- `upsert()` - создание или обновление
- `findById()` - поиск по Telegram ID
- `findAll()` - все пользователи
- `findNewUsers()` - новые пользователи за N часов
- `updateState()` - обновление состояния

### EventModel
- `create()` - создание события
- `findByUser()` - события пользователя
- `findByType()` - события по типу
- `getStats()` - статистика

### Commands Handler
- `/start` - приветствие + онбординг
- `/admin` - админ-панель
- `/help` - справка
- `/profile` - профиль пользователя

### Callbacks Handler
- Навигация по меню
- Выбор функций бота
- Админ-функции
- Тарифы и оплата

### Keyboards
- `mainMenuKeyboard` - главное меню
- `botBuilderKeyboard` - конструктор ботов
- `adminKeyboard` - админ-панель
- `pricingKeyboard` - тарифы
- `userActionsKeyboard()` - действия с пользователем

## 🔐 Безопасность

### Проверка прав администратора
```typescript
if (userId !== adminId) {
  await bot.answerCallbackQuery(query.id, { 
    text: '❌ Нет доступа', 
    show_alert: true 
  });
  return;
}
```

### Валидация данных
- Проверка Telegram ID
- Экранирование Markdown
- Обработка ошибок

### Защита БД
- Параметризованные запросы
- ON CONFLICT для upsert
- Каскадное удаление

## 📈 Масштабирование

### Оптимизация БД
- Индексы на telegram_id, event_type
- Connection pooling (max: 20)
- JSONB для гибких данных

### Rate Limiting (рекомендуется добавить)
```typescript
// Пример для future реализации
const rateLimit = require('express-rate-limit');

app.use('/webhook', rateLimit({
  windowMs: 15 * 60 * 1000, // 15 минут
  max: 1000 // лимит запросов
}));
```

### Кэширование
```typescript
// Пример для future реализации
const NodeCache = require('node-cache');
const cache = new NodeCache({ stdTTL: 300 }); // 5 минут
```

## 🚀 Деплой

### Варианты

1. **Oracle Cloud Always Free**
   - VM: 1 OCPU, 1GB RAM
   - PostgreSQL: установить вручную
   - Node.js: через nvm

2. **Fly.io**
   - PostgreSQL included
   - Auto-deploy из GitHub
   - ~$5/мес

3. **Railway**
   - PostgreSQL included
   - Простой деплой
   - ~$5/мес

4. **Docker**
   ```dockerfile
   FROM node:18-alpine
   WORKDIR /app
   COPY package*.json ./
   RUN npm install
   COPY . .
   RUN npm run build
   CMD ["node", "dist/bot/server.js"]
   ```

## 📊 Мониторинг

### Логи
- Console.log в development
- Winston/Pino для production
- Отправка в Sentry для ошибок

### Метрики
- Количество пользователей
- Активность по событиям
- Конверсия воронки
- Ошибки и исключения

### Health Checks
- `/health` - статус сервера
- Проверка БД
- Проверка webhook

---

**Архитектура готова к масштабированию! 🚀**
