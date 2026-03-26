# ⚡ Шпаргалка по настройке

## 📍 Где что настраивать

### 1️⃣ SUPABASE (https://supabase.com/dashboard)
```
Создать проект → Settings → API
↓
Скопировать 3 значения:
- Project URL
- anon/public key  
- service_role key (секрет!)
```

### 2️⃣ Vercel (https://vercel.com/dashboard)
```
Import Project → foxampy/foxampybot
↓
Settings → Environment Variables
↓
Добавить 7 переменных:
- SUPABASE_URL
- SUPABASE_ANON_KEY
- SUPABASE_SERVICE_ROLE_KEY
- BOT_TOKEN=8769862933:AAGKIxjwY2ahRSqRol-t8SXZ8Sr5x_X-vgg
- ADMIN_ID=268494758
- SERVER_URL=https://foxampybot.vercel.app
- MINI_APP_URL=https://foxampybot.vercel.app
```

### 3️⃣ Локально (.env.local)
```
cd TelegramBot
copy .env.example .env.local
↓
Вписать те же 7 переменных
```

---

## 🎯 Быстрый старт

### Supabase:
1. https://supabase.com → New Project
2. Settings → API → скопировать ключи
3. SQL Editor → выполнить `database/supabase-migration.sql`

### Vercel:
1. https://vercel.com/new → Import foxampy/foxampybot
2. Root Directory: `TelegramBot`
3. Добавить 7 переменных окружения
4. Deploy

### Webhook:
```bash
curl -X POST "https://api.telegram.org/bot8769862933:AAGKIxjwY2ahRSqRol-t8SXZ8Sr5x_X-vgg/setWebhook?url=https://foxampybot.vercel.app/webhook"
```

### Mini App:
@BotFather → /mybots → Bot Settings → Menu Button
- URL: `https://foxampybot.vercel.app`
- Название: `🎨 Конструктор`

---

## 📋 Чек-лист

- [ ] Supabase проект создан
- [ ] Ключи Supabase скопированы
- [ ] Миграции БД применены (SQL Editor)
- [ ] Vercel проект создан
- [ ] 7 переменных добавлены в Vercel
- [ ] Webhook настроен
- [ ] Mini App настроен в боте
- [ ] Бот отвечает на /start
- [ ] Уведомления админу приходят

---

## 🔑 Готовые значения

```env
BOT_TOKEN=8769862933:AAGKIxjwY2ahRSqRol-t8SXZ8Sr5x_X-vgg
ADMIN_ID=268494758
```

Остальное берёте из Supabase Dashboard.

---

## 📚 Полная инструкция

`SETUP-FULL.md` - подробная инструкция с скриншотами
