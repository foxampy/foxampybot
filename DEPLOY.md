# 🚀 Деплой на Vercel + Настройка БД

## 📋 Быстрый старт деплоя

### Шаг 1: Настройка облачной БД (Neon - бесплатно)

**Neon** - это серверless PostgreSQL с бесплатным тарифом:

1. **Зарегистрируйтесь на [Neon](https://neon.tech)**
   - Войдите через GitHub
   - Бесплатно: 0.5 GB, 1 проект

2. **Создайте проект:**
   - Нажмите "New Project"
   - Назовите: `telegram-bot-builder`
   - Region: выберите ближайший (Europe)

3. **Получите connection string:**
   - Скопируйте **Connection string** из dashboard
   - Формат: `postgresql://user:password@ep-xxx.eu-central-1.aws.neon.tech/dbname?sslmode=require`

4. **Обновите `.env`:**
```env
DATABASE_URL=postgresql://user:password@ep-xxx.eu-central-1.aws.neon.tech/dbname?sslmode=require
DB_HOST=ep-xxx.eu-central-1.aws.neon.tech
DB_NAME=neondb
DB_USER=neondb_owner
DB_PASSWORD=your_password
```

### Альтернатива: Supabase

**[Supabase](https://supabase.com)** - тоже бесплатно:

1. Зарегистрируйтесь на Supabase
2. Создайте новый проект
3. Settings → Database → Connection string
4. Используйте connection string в `.env`

---

## Шаг 2: Подготовка к деплою на Vercel

### 2.1 Установите Vercel CLI

```bash
npm install -g vercel
```

### 2.2 Войдите в Vercel

```bash
vercel login
```

### 2.3 Инициализируйте проект

```bash
cd w:\Foxampy-Portfolio\TelegramBot
vercel
```

Ответьте на вопросы:
- `Set up and deploy?` **Y**
- `Which scope?` (выберите ваш аккаунт)
- `Link to existing project?` **N**
- `What's your project's name?` **telegram-bot-builder**
- `In which directory is your code located?` **./mini-app**

---

## Шаг 3: Настройка переменных окружения в Vercel

### Через CLI:

```bash
vercel env add BOT_TOKEN 8769862933:AAGKIxjwY2ahRSqRol-t8SXZ8Sr5x_X-vgg
vercel env add ADMIN_ID 268494758
vercel env add DATABASE_URL "your_neon_connection_string"
vercel env add SERVER_URL "https://your-project.vercel.app"
vercel env add MINI_APP_URL "https://your-project.vercel.app"
```

### Или через Dashboard:

1. Откройте [vercel.com/dashboard](https://vercel.com/dashboard)
2. Выберите проект
3. Settings → Environment Variables
4. Добавьте переменные:
   - `BOT_TOKEN` = `8769862933:AAGKIxjwY2ahRSqRol-t8SXZ8Sr5x_X-vgg`
   - `ADMIN_ID` = `268494758`
   - `DATABASE_URL` = ваш connection string от Neon
   - `SERVER_URL` = `https://your-project.vercel.app`
   - `MINI_APP_URL` = `https://your-project.vercel.app`

---

## Шаг 4: Деплой

### Деплой в production:

```bash
vercel --prod
```

После деплоя вы получите URL:
```
https://telegram-bot-builder-xxx.vercel.app
```

---

## Шаг 5: Настройка Telegram Webhook

### 5.1 Узнайте ваш Vercel URL

```bash
vercel --name
```

Или посмотрите в dashboard Vercel.

### 5.2 Настройте webhook

```bash
# Замените YOUR_URL на ваш vercel.app URL
curl -X POST "https://api.telegram.org/bot8769862933:AAGKIxjwY2ahRSqRol-t8SXZ8Sr5x_X-vgg/setWebhook?url=https://YOUR_URL.vercel.app/webhook"
```

### 5.3 Проверьте webhook

```bash
curl "https://api.telegram.org/bot8769862933:AAGKIxjwY2ahRSqRol-t8SXZ8Sr5x_X-vgg/getWebhookInfo"
```

Ответ должен быть:
```json
{
  "ok": true,
  "result": {
    "url": "https://YOUR_URL.vercel.app/webhook",
    "has_custom_certificate": false,
    "pending_update_count": 0,
    "last_error_date": 0,
    "last_error_message": "",
    "max_connections": 40,
    "ip_address": "xxx.xxx.xxx.xxx"
  }
}
```

---

## Шаг 6: Настройка Mini App в боте

### В @BotFather:

1. Откройте @BotFather
2. `/mybots` → выберите вашего бота
3. Bot Settings → Menu Button → Configure Menu Button
4. Отправьте URL: `https://YOUR_URL.vercel.app`
5. Введите название кнопки: `🎨 Конструктор`

---

## 🎯 Доступ к БД через админ-панель

### API Endpoints (доступны только админу)

После деплоя у вас есть API endpoints:

### 1. Получить всех пользователей

```bash
curl "https://YOUR_URL.vercel.app/api/users?telegramId=268494758"
```

Ответ:
```json
{
  "users": [
    {
      "id": 1,
      "telegram_id": 268494758,
      "username": "your_username",
      "first_name": "Your Name",
      "created_at": "2025-03-26T12:00:00Z",
      ...
    }
  ]
}
```

### 2. Получить новых пользователей (24ч)

```bash
curl "https://YOUR_URL.vercel.app/api/users/new?telegramId=268494758&hours=24"
```

### 3. Получить статистику

```bash
curl "https://YOUR_URL.vercel.app/api/stats?telegramId=268494758"
```

### 4. Получить события пользователя

```bash
curl "https://YOUR_URL.vercel.app/api/events/USER_ID?telegramId=268494758"
```

---

## 🔐 Безопасность API

Все API endpoints проверяют `telegramId` параметр:
- Только `ADMIN_ID=268494758` имеет доступ
- Возвращается 403 для других пользователей

---

## 📊 Мониторинг в Vercel

### Логи:

```bash
# Просмотр логов в реальном времени
vercel logs

# Логи production версии
vercel logs --prod
```

### Метрики:

- Откройте проект в Vercel Dashboard
- Analytics → видите количество запросов
- Functions → видите время ответа

---

## 🔄 Авто-деплой при push в Git

### Подключите GitHub репозиторий:

1. Закоммитьте изменения:
```bash
git init
git add .
git commit -m "Initial commit"
```

2. Создайте репозиторий на GitHub
3. Запушьте:
```bash
git remote add origin https://github.com/yourusername/telegram-bot-builder.git
git push -u origin main
```

4. В Vercel Dashboard:
   - Import Project
   - Выберите GitHub репозиторий
   - Нажмите Deploy

Теперь каждый `git push` будет автоматически деплоить!

---

## 🎨 Обновление Mini App

```bash
cd mini-app
npm run build
vercel --prod
```

Или просто сделайте push в Git (если настроен авто-деплой).

---

## ⚠️ Важные замечания

### Vercel Serverless ограничения:

- **Max execution time:** 10 секунд (hobby), 60 секунд (pro)
- **Memory:** 1024 MB
- **Cold start:** ~1-2 секунды

### Для Telegram бота:

- Webhook обрабатывается быстро (< 1 сек)
- Для долгих операций используйте очереди
- База данных должна быть быстрой (Neon отлично подходит)

---

## 🛠 Команды для управления

```bash
# Деплой (preview)
vercel

# Деплой (production)
vercel --prod

# Просмотр логов
vercel logs

# Переменные окружения
vercel env ls
vercel env add KEY value

# Удалить деплой
vercel rm <deployment-url>
```

---

## 📱 Проверка работы

### Чек-лист:

- [ ] БД подключена (Neon dashboard → проверьте connection)
- [ ] Vercel деплой успешен
- [ ] Webhook настроен (getWebhookInfo → ok: true)
- [ ] Mini App открывается в Telegram
- [ ] Команда /start работает
- [ ] Команда /admin работает
- [ ] Уведомления приходят админу

---

## 🎉 Готово!

Ваш бот задеплоен на Vercel с:
- ✅ Облачной БД (Neon)
- ✅ Telegram Webhook
- ✅ Mini App
- ✅ API для админ-панели
- ✅ Авто-деплой из Git

**URL вашего бота:** `https://YOUR_PROJECT.vercel.app`

**API endpoints:** `https://YOUR_PROJECT.vercel.app/api/*`

**Mini App:** `https://YOUR_PROJECT.vercel.app`

---

## 📞 Поддержка

Проблемы? Проверьте:

1. **Логи Vercel:** `vercel logs --prod`
2. **Neon Dashboard:** подключение к БД
3. **Telegram Bot API:** `getWebhookInfo`
