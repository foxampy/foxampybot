# 🚀 Деплой Foxampy Bot - Пошаговая инструкция

## ✅ Что готово к деплою

### Отправлено на GitHub:
- ✅ Telegram бот с меню услуг
- ✅ Mini App с воронкой продаж
- ✅ Календарь записи (10-22 ежедневно)
- ✅ База данных (Supabase миграции)
- ✅ Админ-панель
- ✅ 4 категории услуг с ценами

---

## 📋 План деплоя (30 минут)

### Шаг 1: Supabase (10 минут)

#### 1.1 Создайте проект
1. Перейдите на https://supabase.com
2. **New Project**
3. Заполните:
   - **Name:** `foxampybot`
   - **Database Password:** [сохраните!]
   - **Region:** `Europe (Frankfurt)`
4. **Create new project** (ждите 2-3 минуты)

#### 1.2 Получите ключи
1. **Settings** (шестерёнка внизу)
2. **API**
3. Скопируйте 3 значения:
   ```
   Project URL: https://xxxxxxxxxxxxx.supabase.co
   anon/public key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   service_role key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```

#### 1.3 Примените миграции БД
1. **SQL Editor** (в левом меню)
2. **New query**
3. Откройте файл: `TelegramBot/database/supabase-migration.sql`
4. Скопируйте **всё содержимое**
5. Вставьте в SQL Editor
6. **Run** (или Ctrl+Enter)
7. ✅ Должно быть: `Success. No rows returned`

#### 1.4 Проверьте таблицы
1. **Table Editor** (в левом меню)
2. Должны появиться таблицы:
   - ✅ users
   - ✅ services
   - ✅ orders
   - ✅ appointments
   - ✅ events
   - ✅ portfolio
   - ✅ bot_projects
   - ✅ selected_features
   - ✅ subscriptions
   - ✅ leads

#### 1.5 Добавьте тестовые услуги (опционально)
```sql
-- Услуги уже добавлены в миграции!
-- Проверьте:
SELECT name, price_from, price_to FROM services ORDER BY sort_order;
```

---

### Шаг 2: Vercel (10 минут)

#### 2.1 Import проекта
1. Перейдите на https://vercel.com/new
2. **Import Git Repository**
3. Найдите: `foxampy/foxampybot`
4. **Import**

#### 2.2 Настройте проект
**Root Directory:** `TelegramBot` (обязательно!)

**Framework Preset:** `Vite`

**Build Command:** `npm run vercel:build`

**Output Directory:** `mini-app/dist`

#### 2.3 Добавьте переменные окружения

Нажмите **Environment Variables** → **Add** → Добавьте 7 переменных:

```env
# Supabase (из Settings → API)
SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Telegram
BOT_TOKEN=8769862933:AAGKIxjwY2ahRSqRol-t8SXZ8Sr5x_X-vgg
ADMIN_ID=268494758

# Server (будет после деплоя)
SERVER_URL=https://foxampybot.vercel.app
MINI_APP_URL=https://foxampybot.vercel.app

# Environment
NODE_ENV=production
```

**Важно:**
- `SUPABASE_*` - из шага 1.2
- `BOT_TOKEN` и `ADMIN_ID` - уже готовы
- `SERVER_URL` и `MINI_APP_URL` - замените на ваш Vercel URL после деплоя

#### 2.4 Deploy
1. **Deploy**
2. Ждите 2-3 минуты
3. ✅ **Congratulations!**
4. Скопируйте URL (например: `https://foxampybot.vercel.app`)

#### 2.5 Обновите переменные (если нужно)
Если URL отличается от `foxampybot.vercel.app`:
1. **Settings** → **Environment Variables**
2. Измените `SERVER_URL` и `MINI_APP_URL`
3. **Redeploy**

---

### Шаг 3: Telegram Webhook (5 минут)

#### 3.1 Настройте webhook

Откройте терминал и выполните:

```bash
curl -X POST "https://api.telegram.org/bot8769862933:AAGKIxjwY2ahRSqRol-t8SXZ8Sr5x_X-vgg/setWebhook?url=https://foxampybot.vercel.app/webhook"
```

**Замените `foxampybot` на ваш URL если отличается!**

#### 3.2 Проверьте webhook

```bash
curl "https://api.telegram.org/bot8769862933:AAGKIxjwY2ahRSqRol-t8SXZ8Sr5x_X-vgg/getWebhookInfo"
```

**Должно быть:**
```json
{
  "ok": true,
  "result": {
    "url": "https://foxampybot.vercel.app/webhook",
    "has_custom_certificate": false,
    "pending_update_count": 0,
    "last_error_message": "",
    "max_connections": 40
  }
}
```

---

### Шаг 4: Mini App в боте (5 минут)

#### 4.1 Настройте Menu Button

1. Откройте @BotFather
2. `/mybots` → выберите вашего бота
3. **Bot Settings** → **Menu Button** → **Configure Menu Button**
4. Отправьте URL: `https://foxampybot.vercel.app`
5. Введите название: `🎨 Конструктор`

#### 4.2 Проверьте бота

1. Откройте вашего бота в Telegram
2. Нажмите `/start`
3. Должно появиться приветственное сообщение
4. Кнопка меню слева должна быть: `🎨 Конструктор`
5. Нажмите на неё - должно открыться Mini App

---

## ✅ Чек-лист проверки

### Бот:
- [ ] `/start` - приветствие
- [ ] `/admin` - админ-панель (только вам)
- [ ] `/help` - справка
- [ ] Кнопка `📋 Услуги и цены` - работает
- [ ] Кнопка `🚀 Собрать бота` - каталог ботов
- [ ] Кнопка `📅 Записаться` - календарь
- [ ] Кнопка `📖 Портфолио` - портфолио
- [ ] Кнопка `👤 Мой аккаунт` - профиль

### Mini App:
- [ ] Онбординг (4 экрана) - работает
- [ ] Услуги - 4 категории
- [ ] Конструктор - выбор функций
- [ ] Запись - календарь
- [ ] Аккаунт - профиль

### База данных:
- [ ] Таблицы созданы
- [ ] Услуги добавлены
- [ ] Подключение работает

### Деплой:
- [ ] Vercel деплой успешен
- [ ] Webhook настроен
- [ ] Mini App открывается

---

## 🎯 Что где настраивать

| Компонент | Где | Что |
|-----------|-----|-----|
| **База данных** | Supabase Dashboard | Миграции, таблицы |
| **Хостинг** | Vercel Dashboard | Деплой, переменные |
| **Бот** | @BotFather | Token, Menu Button |
| **Webhook** | Terminal | curl команда |

---

## 🔑 Готовые значения

### Telegram (уже готовы):
```
BOT_TOKEN=8769862933:AAGKIxjwY2ahRSqRol-t8SXZ8Sr5x_X-vgg
ADMIN_ID=268494758
```

### Supabase (получить в Dashboard):
```
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_ANON_KEY=eyJhbG...
SUPABASE_SERVICE_ROLE_KEY=eyJhbG...
```

### Vercel (после деплоя):
```
SERVER_URL=https://foxampybot.vercel.app
MINI_APP_URL=https://foxampybot.vercel.app
```

---

## 📊 Структура Mini App

### Страницы:
1. **Онбординг** → 4 шага воронки
2. **Услуги** → фильтры + карточки
3. **Конструктор** → выбор функций бота
4. **Запись** → календарь + время
5. **Аккаунт** → профиль + статистика

### Навигация (bottom bar):
- 📋 Услуги
- 🚀 Конструктор
- 📅 Запись
- 👤 Аккаунт

---

## 🛠 Команды для управления

```bash
# Локальный запуск
cd TelegramBot
npm run dev

# Запуск Mini App
cd mini-app
npm run dev

# Сборка
npm run vercel:build

# Деплой
vercel --prod

# Логи
vercel logs --prod

# Проверка webhook
curl "https://api.telegram.org/botTOKEN/getWebhookInfo"
```

---

## ⚠️ Возможные проблемы

### Бот не отвечает:
```bash
vercel logs --prod
```

### БД не подключается:
- Проверьте ключи в Supabase → Settings → API
- Убедитесь, что миграции применены

### Webhook не работает:
```bash
# Удалить старый webhook
curl -X POST "https://api.telegram.org/botTOKEN/deleteWebhook"

# Создать новый
curl -X POST "https://api.telegram.org/botTOKEN/setWebhook?url=https://YOUR_URL.vercel.app/webhook"
```

### Mini App не открывается:
- Проверьте `MINI_APP_URL` в переменных Vercel
- Убедитесь, что `npm run build` успешен

---

## 🎉 Готово!

Ваш бот работает на:
- **Vercel:** https://foxampybot.vercel.app
- **Webhook:** https://foxampybot.vercel.app/webhook
- **БД:** Supabase PostgreSQL
- **Mini App:** Открывается в Telegram

**Админ API:**
- Пользователи: `https://foxampybot.vercel.app/api/users?telegramId=268494758`
- Статистика: `https://foxampybot.vercel.app/api/stats?telegramId=268494758`
- Заказы: `https://foxampybot.vercel.app/api/orders?telegramId=268494758`
- Записи: `https://foxampybot.vercel.app/api/appointments?telegramId=268494758`

---

## 📞 Поддержка

Документация:
- `README.md` - главная
- `DEVELOPMENT-PLAN.md` - план разработки
- `SETUP-FULL.md` - полная настройка
- `CHEATSHEET.md` - шпаргалка

**Готово к использованию! 🚀**
