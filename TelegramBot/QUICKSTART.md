# 🚀 Быстрый старт - Telegram SaaS Bot Builder

## 📋 Что уже настроено

✅ Токен бота: `8769862933:AAGKIxjwY2ahRSqRol-t8SXZ8Sr5x_X-vgg`
✅ Admin ID: `268494758`
✅ Структура проекта создана
✅ Все зависимости установлены

## 🎯 Запуск бота (режим разработки)

### 1. Запустите базу данных PostgreSQL

Убедитесь, что PostgreSQL запущен:
```bash
# Проверка статуса (Linux/Mac)
sudo systemctl status postgresql

# Или запустите через Docker
docker run --name postgres-bot -e POSTGRES_PASSWORD=postgres -p 5432:5432 -d postgres
```

### 2. Создайте базу данных

```bash
# Войдите в PostgreSQL
psql -U postgres

# Создайте базу данных
CREATE DATABASE telegram_bot_builder;

# Выйдите
\q
```

### 3. Примените миграции

```bash
cd w:\Foxampy-Portfolio\TelegramBot
npm run db:migrate
```

### 4. Запустите бота

```bash
npm run dev
```

Если всё верно, вы увидите:
```
✅ База данных подключена
🤖 Telegram Bot запускается...
✅ Бот запущен: @your_bot_username
👑 Admin ID: 268494758
📡 Бот готов к работе!
```

## 🎮 Запуск Mini App

Откройте новый терминал:

```bash
cd w:\Foxampy-Portfolio\TelegramBot\mini-app
npm run dev
```

Mini App запустится на: `http://localhost:5173`

## 📱 Тестирование бота

1. Откройте Telegram
2. Найдите вашего бота (создайте через @BotFather если ещё не создан)
3. Нажмите `/start`
4. Бот отправит вам приветственное сообщение
5. Вы (админ) получите уведомление о новом пользователе

## 👑 Админ-панель

Вам доступны команды:

### /admin
Открывает панель администратора:
- 👥 Все пользователи
- 🆕 Новые пользователи (24ч)
- 📊 Статистика
- 📁 Проекты

### /start
Приветственное сообщение + главное меню

### /help
Справка по боту

### /profile
Информация о вашем профиле

## 🔔 Уведомления админу

Когда новый пользователь заходит в бота, вы получите сообщение:
```
🔔 Новый пользователь в боте!

👤 Информация:
• ID: `123456789`
• Username: @username
• Имя: Иван
• Язык: ru
• Бот: нет

⏰ Время: 26.03.2025, 12:00:00
```

## 🎨 Mini App в боте

В меню бота есть кнопка **"🎨 Конструктор (App)"** - она открывает Telegram Mini App с визуальным конструктором ботов.

Для тестирования в реальном Telegram:
1. Задеплойте Mini App (например, на Vercel)
2. Обновите `MINI_APP_URL` в `.env`
3. Перезапустите бота

## 🛠 Отладка

### Логи бота
Все логи выводятся в консоль при запуске `npm run dev`

### Проверка webhook
```bash
curl https://api.telegram.org/bot<YOUR_TOKEN>/getWebhookInfo
```

### Просмотр пользователей в БД
```sql
SELECT * FROM users ORDER BY created_at DESC;
```

## 📦 Продакшен сборка

### 1. Сборка бота
```bash
npm run build
```

### 2. Сборка Mini App
```bash
cd mini-app
npm run build
```

### 3. Деплой на сервер
- Скопируйте файлы на сервер
- Установите зависимости
- Настройте `.env`
- Запустите через PM2 или Docker

### 4. Настройка webhook
```bash
npm run setup:webhook
```

## ⚠️ Возможные проблемы

### "База данных не подключена"
- Проверьте, запущен ли PostgreSQL
- Проверьте credentials в `.env`

### "BOT_TOKEN не найден"
- Убедитесь, что файл `.env` существует
- Проверьте правильность токена

### "Port already in use"
- Измените `SERVER_PORT` в `.env`
- Или остановите процесс на порту 3000

## 📚 Документация

- [Полная документация](README.md)
- [Telegram Bot API](https://core.telegram.org/bots/api)
- [Telegram Mini Apps](https://core.telegram.org/bots/webapps)

---

**Готово! Бот запущен и готов к работе! 🎉**
