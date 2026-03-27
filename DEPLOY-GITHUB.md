# 🚀 Деплой FoxampyBot на Vercel + Neon БД

## ⚡ Быстрый старт (10 минут)

### Шаг 1: Создайте БД на Neon (2 минуты)

1. **Перейдите на https://neon.tech**
2. **Войдите через GitHub**
3. **Нажмите "New Project"**
4. **Заполните:**
   - Name: `foxampybot`
   - Region: `Europe (Frankfurt)` - ближе к вам
   - Branch: `main`
5. **Нажмите "Create Project"**
6. **Скопируйте Connection String** (покажется автоматически)
   - Формат: `postgresql://user:password@ep-xxx.eu-central-1.aws.neon.tech/dbname?sslmode=require`

---

### Шаг 2: Подключите GitHub репозиторий к Vercel

1. **Перейдите на https://vercel.com/new**
2. **Нажмите "Import Git Repository"**
3. **Найдите ваш репозиторий:** `foxampy/foxampybot`
4. **Нажмите "Import"**
5. **В настройках проекта укажите:**

**Root Directory:** `TelegramBot` (если бот в подпапке)

Или если файлы бота в корне репозитория - оставьте как есть.

---

### Шаг 3: Добавьте переменные окружения

В Vercel Dashboard → Settings → Environment Variables:

```
BOT_TOKEN=8769862933:AAGKIxjwY2ahRSqRol-t8SXZ8Sr5x_X-vgg
ADMIN_ID=268494758
DATABASE_URL=postgresql://... (ваш от Neon)
SERVER_URL=https://foxampybot.vercel.app
MINI_APP_URL=https://foxampybot.vercel.app
NODE_ENV=production
```

**Или через CLI:**
```bash
cd foxampybot
vercel env add BOT_TOKEN 8769862933:AAGKIxjwY2ahRSqRol-t8SXZ8Sr5x_X-vgg
vercel env add ADMIN_ID 268494758
vercel env add DATABASE_URL "ваш_connection_string_от_Neon"
```

---

### Шаг 4: Примените миграции БД

После первого деплоя:

```bash
# Локально установите зависимости
npm install

# Примените миграции (создадутся таблицы)
npm run db:migrate
```

**Или через SQL Editor в Neon:**
1. Neon Dashboard → SQL Editor
2. Скопируйте содержимое `database/migrate.ts` (SQL часть)
3. Выполните

---

### Шаг 5: Настройте Webhook

После деплоя узнайте ваш URL (например, `https://foxampybot.vercel.app`):

```bash
curl -X POST "https://api.telegram.org/bot8769862933:AAGKIxjwY2ahRSqRol-t8SXZ8Sr5x_X-vgg/setWebhook?url=https://foxampybot.vercel.app/webhook"
```

**Проверьте:**
```bash
curl "https://api.telegram.org/bot8769862933:AAGKIxjwY2ahRSqRol-t8SXZ8Sr5x_X-vgg/getWebhookInfo"
```

Должно быть: `"ok": true`

---

### Шаг 6: Настройте Mini App в боте

1. **@BotFather** → `/mybots`
2. Выберите бота
3. **Bot Settings** → **Menu Button** → **Configure Menu Button**
4. **URL:** `https://foxampybot.vercel.app`
5. **Название:** `🎨 Конструктор`

---

## 📊 Структура репозитория

Сейчас у вас:
```
foxampybot/
├── TelegramBot/          ← Основная папка с ботом
│   ├── api/
│   ├── bot/
│   ├── config/
│   ├── database/
│   ├── handlers/
│   ├── keyboards/
│   ├── mini-app/
│   ├── scripts/
│   ├── utils/
│   ├── .env
│   ├── package.json
│   ├── vercel.json
│   └── ...
├── FoxampyLab/
├── lib/
├── project-cards/
└── ...
```

### Важно для Vercel:

Vercel должен знать, где искать код. Есть 2 варианта:

**Вариант A:** Переместить файлы бота в корень
```bash
# Переместить всё из TelegramBot/ в корень
mv TelegramBot/* .
rmdir TelegramBot
```

**Вариант B:** Указать Root Directory в Vercel
- В настройках проекта: Root Directory = `TelegramBot`

---

## 🎯 Проверка работы

### 1. Health check
```bash
curl https://foxampybot.vercel.app/health
```

Ответ: `{"status":"ok",...}`

### 2. Проверка БД
Neon Dashboard → SQL Editor:
```sql
SELECT COUNT(*) FROM users;
```

### 3. API админа
```bash
curl "https://foxampybot.vercel.app/api/users?telegramId=268494758"
```

### 4. Бот в Telegram
- Откройте бота
- Нажмите `/start`
- Должно прийти приветствие

---

## 🔄 Авто-обновление

Теперь каждый `git push` будет автоматически деплоить:

```bash
git add .
git commit -m "Fix: ..."
git push
```

Через 1-2 минуты изменения на Vercel!

---

## 📁 Что можно удалить (не нужно для Vercel)

Эти файлы для локальной разработки:
- `.env` (не коммитьте!)
- `node_modules/`
- `dist/`

Убедитесь, что в `.gitignore`:
```
node_modules
dist
.env
*.log
```

---

## ⚠️ Важные моменты

### 1. БД отдельная
Neon - это внешний сервис (как AWS, Google Cloud). 
- Vercel = хостинг для кода
- Neon = хостинг для БД
- Соединяются через `DATABASE_URL`

### 2. SSL обязателен
Vercel работает только по HTTPS
Neon требует SSL (`?sslmode=require`)

### 3. Лимиты
- **Vercel Hobby:** 100GB bandwidth, 100GB hours
- **Neon Free:** 0.5 GB storage, безлимит запросов

Для старта более чем достаточно!

---

## 🆘 Если что-то не работает

### Логи Vercel:
```bash
vercel logs
```

### Проверка webhook:
```bash
curl "https://api.telegram.org/bot8769862933:AAGKIxjwY2ahRSqRol-t8SXZ8Sr5x_X-vgg/getWebhookInfo"
```

### Пересоздать webhook:
```bash
curl -X POST "https://api.telegram.org/bot8769862933:AAGKIxjwY2ahRSqRol-t8SXZ8Sr5x_X-vgg/deleteWebhook"
curl -X POST "https://api.telegram.org/bot8769862933:AAGKIxjwY2ahRSqRol-t8SXZ8Sr5x_X-vgg/setWebhook?url=https://foxampybot.vercel.app/webhook"
```

### Проверка подключения к БД:
Neon Dashboard → SQL Editor → выполните:
```sql
SELECT NOW();
```

---

## 🎉 Готово!

Ваш бот работает на:
- **Vercel:** https://foxampybot.vercel.app
- **Webhook:** https://foxampybot.vercel.app/webhook
- **БД:** Neon (автоматическое подключение)
- **Mini App:** https://foxampybot.vercel.app

**Админ API:**
- Пользователи: `https://foxampybot.vercel.app/api/users?telegramId=268494758`
- Статистика: `https://foxampybot.vercel.app/api/stats?telegramId=268494758`

---

## 📞 Следующие шаги

1. ✅ Создайте БД на Neon
2. ✅ Подключите репозиторий к Vercel
3. ✅ Добавьте переменные окружения
4. ✅ Примените миграции
5. ✅ Настройте webhook
6. ✅ Протестируйте бота

Нужна помощь с каким-то шагом?
