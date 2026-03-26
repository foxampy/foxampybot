# ⚡ Быстрый деплой на Vercel за 5 минут

## 📋 Чек-лист

### 1️⃣ Настройте БД (Neon) - 2 минуты

1. Перейдите на https://neon.tech
2. Войдите через GitHub
3. Нажмите **"New Project"**
4. Назовите: `telegram-bot`
5. Region: **Europe (Frankfurt)**
6. Скопируйте **Connection string**

Обновите `.env`:
```env
DATABASE_URL=postgresql://... (ваш string от Neon)
```

### 2️⃣ Установите Vercel CLI - 1 минута

```bash
npm install -g vercel
```

### 3️⃣ Войдите в Vercel

```bash
vercel login
```

### 4️⃣ Задеплойте - 1 минута

```bash
cd w:\Foxampy-Portfolio\TelegramBot
vercel --prod
```

Запомните URL: `https://your-project.vercel.app`

### 5️⃣ Настройте переменные в Vercel

```bash
vercel env add BOT_TOKEN 8769862933:AAGKIxjwY2ahRSqRol-t8SXZ8Sr5x_X-vgg
vercel env add ADMIN_ID 268494758
vercel env add DATABASE_URL "ваш_connection_string_от_Neon"
vercel env add SERVER_URL https://your-project.vercel.app
vercel env add MINI_APP_URL https://your-project.vercel.app
```

Или через dashboard: https://vercel.com/dashboard

### 6️⃣ Настройте Webhook

```bash
# После деплоя выполните:
vercel env pull
npm run setup:vercel-webhook
```

Или вручную через curl:
```bash
curl -X POST "https://api.telegram.org/bot8769862933:AAGKIxjwY2ahRSqRol-t8SXZ8Sr5x_X-vgg/setWebhook?url=https://YOUR_URL.vercel.app/webhook"
```

### 7️⃣ Настройте Mini App в боте

1. Откройте @BotFather
2. `/mybots` → ваш бот
3. Bot Settings → Menu Button → Configure Menu Button
4. URL: `https://YOUR_URL.vercel.app`
5. Название: `🎨 Конструктор`

---

## ✅ Проверка

### Бот работает?
```bash
curl https://YOUR_URL.vercel.app/health
```

Ответ: `{"status":"ok",...}`

### Webhook настроен?
```bash
curl "https://api.telegram.org/bot8769862933:AAGKIxjwY2ahRSqRol-t8SXZ8Sr5x_X-vgg/getWebhookInfo"
```

Ответ: `"ok": true`

### БД подключена?
Проверьте в Neon dashboard → SQL Editor:
```sql
SELECT COUNT(*) FROM users;
```

---

## 🎯 Готово!

Ваш бот работает на Vercel!

**URL:** `https://YOUR_URL.vercel.app`
**Webhook:** `https://YOUR_URL.vercel.app/webhook`
**Mini App:** `https://YOUR_URL.vercel.app`

---

## 🔄 Обновление

При изменениях в коде:

```bash
git add .
git commit -m "Fix: ..."
git push
vercel --prod
```

Или настройте авто-деплой из GitHub в dashboard Vercel.

---

## 📊 Админ-доступ к API

### Получить всех пользователей:
```bash
curl "https://YOUR_URL.vercel.app/api/users?telegramId=268494758"
```

### Получить статистику:
```bash
curl "https://YOUR_URL.vercel.app/api/stats?telegramId=268494758"
```

### Получить новые пользователей (24ч):
```bash
curl "https://YOUR_URL.vercel.app/api/users/new?telegramId=268494758"
```

---

## 🆘 Проблемы?

### Логи Vercel:
```bash
vercel logs --prod
```

### Проверка webhook:
```bash
curl "https://api.telegram.org/bot8769862933:AAGKIxjwY2ahRSqRol-t8SXZ8Sr5x_X-vgg/getWebhookInfo"
```

### Пересоздать webhook:
```bash
curl -X POST "https://api.telegram.org/bot8769862933:AAGKIxjwY2ahRSqRol-t8SXZ8Sr5x_X-vgg/deleteWebhook"
curl -X POST "https://api.telegram.org/bot8769862933:AAGKIxjwY2ahRSqRol-t8SXZ8Sr5x_X-vgg/setWebhook?url=https://YOUR_URL.vercel.app/webhook"
```
