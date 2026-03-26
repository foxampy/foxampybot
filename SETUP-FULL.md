# 🚀 Полная настройка Supabase + Vercel + GitHub

## 📋 Что где настраивать

### 🔑 Переменные окружения - 3 места:

| Где | Что вписывать |
|-----|---------------|
| **1. Supabase Dashboard** | Ничего не нужно (токены уже там) |
| **2. Vercel Dashboard** | Supabase URL + ключи, Bot Token, Admin ID |
| **3. Локальный .env** | То же что и в Vercel (для разработки) |

---

## ⚡ Пошаговая инструкция (15 минут)

### Шаг 1: Настройте Supabase (5 минут)

1. **Перейдите на https://supabase.com**
2. **Войдите через GitHub**
3. **Нажмите "New Project"**

4. **Заполните:**
   ```
   Name: foxampybot
   Database Password: [запомните или сохраните]
   Region: Europe (Frankfurt) - ближе к вам
   ```

5. **Нажмите "Create new project"** (ждите 2-3 минуты)

6. **Получите ключи:**
   - Перейдите в **Settings** (шестерёнка внизу)
   - Выберите **API**
   - Скопируйте 3 значения:

   ```
   Project URL: https://xxxxxxxxxxxxx.supabase.co
   anon/public key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   service_role key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```

   ⚠️ **service_role key** - это секретный ключ, не коммитьте в Git!

---

### Шаг 2: Примените миграции БД (2 минуты)

1. **В Supabase Dashboard перейдите в:**
   - **SQL Editor** (в левом меню)

2. **Откройте файл:**
   - `TelegramBot/database/supabase-migration.sql`
   - Скопируйте всё содержимое

3. **Вставьте в SQL Editor и нажмите "Run"**

4. **Проверьте:**
   - Перейдите в **Table Editor**
   - Должны появиться таблицы: `users`, `events`, `bot_projects`, etc.

---

### Шаг 3: Настройте Vercel (3 минуты)

1. **Перейдите на https://vercel.com/dashboard**
2. **Войдите через GitHub**
3. **Нажмите "Add New..." → "Project"**
4. **Найдите ваш репозиторий:** `foxampy/foxampybot`
5. **Нажмите "Import"**

6. **Настройте проект:**
   ```
   Framework Preset: Vite
   Root Directory: TelegramBot
   Build Command: npm run vercel:build
   Output Directory: mini-app/dist
   ```

7. **Нажмите "Environment Variables"** и добавьте:

   ```
   SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
   SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   
   BOT_TOKEN=8769862933:AAGKIxjwY2ahRSqRol-t8SXZ8Sr5x_X-vgg
   ADMIN_ID=268494758
   
   SERVER_URL=https://foxampybot.vercel.app
   MINI_APP_URL=https://foxampybot.vercel.app
   
   NODE_ENV=production
   ```

8. **Нажмите "Deploy"** (ждите 2-3 минуты)

---

### Шаг 4: Настройте Webhook (2 минуты)

После деплоя вы получите URL (например, `https://foxampybot.vercel.app`):

**Выполните в терминале:**
```bash
curl -X POST "https://api.telegram.org/bot8769862933:AAGKIxjwY2ahRSqRol-t8SXZ8Sr5x_X-vgg/setWebhook?url=https://foxampybot.vercel.app/webhook"
```

**Проверьте:**
```bash
curl "https://api.telegram.org/bot8769862933:AAGKIxjwY2ahRSqRol-t8SXZ8Sr5x_X-vgg/getWebhookInfo"
```

Должно быть: `"ok": true`

---

### Шаг 5: Настройте Mini App в боте (1 минута)

1. **Откройте @BotFather**
2. **`/mybots`** → выберите вашего бота
3. **Bot Settings** → **Menu Button** → **Configure Menu Button**
4. **URL:** `https://foxampybot.vercel.app`
5. **Название:** `🎨 Конструктор`

---

### Шаг 6: Локальная разработка (2 минуты)

1. **Скопируйте `.env.example` в `.env.local`:**
   ```bash
   cd TelegramBot
   copy .env.example .env.local
   ```

2. **Впишите те же значения что и в Vercel:**
   ```env
   SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
   SUPABASE_ANON_KEY=...
   SUPABASE_SERVICE_ROLE_KEY=...
   BOT_TOKEN=8769862933:AAGKIxjwY2ahRSqRol-t8SXZ8Sr5x_X-vgg
   ADMIN_ID=268494758
   SERVER_URL=http://localhost:3000
   MINI_APP_URL=http://localhost:5173
   ```

3. **Запустите:**
   ```bash
   npm run dev
   ```

---

## 📊 Сводная таблица переменных

| Переменная | Значение | Где взять |
|------------|----------|-----------|
| `SUPABASE_URL` | `https://xxxxx.supabase.co` | Supabase → Settings → API |
| `SUPABASE_ANON_KEY` | `eyJhbG...` (public) | Supabase → Settings → API |
| `SUPABASE_SERVICE_ROLE_KEY` | `eyJhbG...` (secret) | Supabase → Settings → API |
| `BOT_TOKEN` | `8769862933:AAG...` | @BotFather |
| `ADMIN_ID` | `268494758` | Ваш Telegram ID (@userinfobot) |
| `SERVER_URL` | `https://foxampybot.vercel.app` | Vercel после деплоя |
| `MINI_APP_URL` | `https://foxampybot.vercel.app` | Тот же URL |

---

## 🔐 Секреты и безопасность

### .gitignore уже настроен:
```
.env
.env.local
.env.*.local
```

Эти файлы **НЕ** попадут в Git!

### В Supabase хранятся:
- ✅ Project URL (публичный)
- ✅ Anon Key (публичный, для клиента)
- ✅ Service Role Key (секретный, только для сервера)

### В Vercel хранятся:
- ✅ Все переменные окружения (зашифрованы)
- ✅ Service Role Key (используется только на сервере)

### Локально:
- ✅ `.env.local` - в .gitignore
- ✅ Не коммитьте вручную!

---

## 🎯 Проверка работы

### 1. Health check:
```bash
curl https://foxampybot.vercel.app/health
```

### 2. API админа (получить пользователей):
```bash
curl "https://foxampybot.vercel.app/api/users?telegramId=268494758"
```

### 3. БД (в Supabase):
- SQL Editor: `SELECT COUNT(*) FROM users;`
- Table Editor: вкладка `users`

### 4. Бот в Telegram:
- Откройте бота
- Нажмите `/start`
- Должно прийти приветствие

### 5. Уведомление админа:
- Зайдите в бота с другого аккаунта
- Нажмите `/start`
- Вам (админу) должно прийти уведомление

---

## 🔄 Авто-обновление

Теперь каждый `git push` будет деплоить:

```bash
git add .
git commit -m "Feature: ..."
git push
```

Vercel автоматически задеплоит через 1-2 минуты!

---

## 📁 Структура проекта

```
foxampybot (GitHub)
└── TelegramBot/
    ├── .env.example      ← Шаблон (можно в Git)
    ├── .env.local        ← Локальные секреты (НЕ в Git!)
    ├── .gitignore        ← Игнор секретов
    ├── database/
    │   └── supabase-migration.sql  ← SQL для БД
    ├── config/
    │   └── index.ts      ← Читает переменные
    └── ...
```

---

## ⚠️ Важные моменты

### 1. Supabase ключи:
- **Anon Key** - публичный, можно в frontend
- **Service Role Key** - секретный, ТОЛЬКО в backend!

### 2. Vercel переменные:
- Добавляются в Dashboard → Settings → Environment Variables
- Или через CLI: `vercel env add KEY value`
- Для разных сред (Production/Preview/Development) можно разные значения

### 3. Локальная разработка:
- Используйте `.env.local`
- Не коммитьте!
- Синхронизируйте с Vercel переменными

---

## 🆘 Если что-то не работает

### Бот не отвечает:
```bash
# Проверьте логи
vercel logs --prod

# Проверьте webhook
curl "https://api.telegram.org/bot8769862933:AAGKIxjwY2ahRSqRol-t8SXZ8Sr5x_X-vgg/getWebhookInfo"
```

### БД не подключается:
- Проверьте ключи в Supabase → Settings → API
- Убедитесь, что миграции применены (Table Editor)
- Проверьте `.env.local` локально

### Ошибка CORS в Mini App:
- Убедитесь, что `MINI_APP_URL` совпадает с реальным URL
- Проверьте CORS настройки в Supabase

---

## 🎉 Готово!

Ваш бот работает на:
- **Vercel:** https://foxampybot.vercel.app
- **БД:** Supabase (PostgreSQL)
- **Webhook:** настроен
- **Mini App:** открывается в Telegram
- **GitHub:** авто-деплой при push

**Админ API:**
- Пользователи: `https://foxampybot.vercel.app/api/users?telegramId=268494758`
- Статистика: `https://foxampybot.vercel.app/api/stats?telegramId=268494758`

---

## 📞 Шпаргалка команд

```bash
# Локальный запуск
npm run dev

# Применение миграций
npm run db:migrate

# Деплой
vercel --prod

# Логи
vercel logs --prod

# Переменные Vercel
vercel env ls
vercel env add KEY value
```
