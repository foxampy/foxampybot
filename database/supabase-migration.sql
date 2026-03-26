-- Миграция для Supabase PostgreSQL
-- Выполните этот SQL в Supabase Dashboard → SQL Editor

-- Включите Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE bot_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE selected_features ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;

-- Пользователи
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  telegram_id BIGINT UNIQUE NOT NULL,
  username VARCHAR(255),
  first_name VARCHAR(255),
  last_name VARCHAR(255),
  language_code VARCHAR(10) DEFAULT 'ru',
  is_bot BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  last_seen TIMESTAMPTZ DEFAULT NOW(),
  state VARCHAR(50) DEFAULT 'start',
  bot_project_id INTEGER
);

-- Проекты ботов
CREATE TABLE IF NOT EXISTS bot_projects (
  id SERIAL PRIMARY KEY,
  user_id BIGINT REFERENCES users(telegram_id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  status VARCHAR(50) DEFAULT 'draft',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Выбранные функции
CREATE TABLE IF NOT EXISTS selected_features (
  id SERIAL PRIMARY KEY,
  project_id INTEGER REFERENCES bot_projects(id) ON DELETE CASCADE,
  feature_id VARCHAR(50) NOT NULL,
  config JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Подписки
CREATE TABLE IF NOT EXISTS subscriptions (
  id SERIAL PRIMARY KEY,
  user_id BIGINT REFERENCES users(telegram_id) ON DELETE CASCADE,
  tier VARCHAR(50) DEFAULT 'free',
  status VARCHAR(50) DEFAULT 'inactive',
  started_at TIMESTAMPTZ,
  expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Лиды (заявки от ботов)
CREATE TABLE IF NOT EXISTS leads (
  id SERIAL PRIMARY KEY,
  bot_project_id INTEGER REFERENCES bot_projects(id) ON DELETE CASCADE,
  user_telegram_id BIGINT,
  username VARCHAR(255),
  data JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- События аналитики
CREATE TABLE IF NOT EXISTS events (
  id SERIAL PRIMARY KEY,
  user_id BIGINT REFERENCES users(telegram_id) ON DELETE CASCADE,
  event_type VARCHAR(100) NOT NULL,
  event_data JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Индексы для производительности
CREATE INDEX IF NOT EXISTS idx_users_telegram_id ON users(telegram_id);
CREATE INDEX IF NOT EXISTS idx_users_state ON users(state);
CREATE INDEX IF NOT EXISTS idx_users_created_at ON users(created_at);
CREATE INDEX IF NOT EXISTS idx_bot_projects_user_id ON bot_projects(user_id);
CREATE INDEX IF NOT EXISTS idx_selected_features_project_id ON selected_features(project_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_user_id ON subscriptions(user_id);
CREATE INDEX IF NOT EXISTS idx_events_user_id ON events(user_id);
CREATE INDEX IF NOT EXISTS idx_events_type ON events(event_type);
CREATE INDEX IF NOT EXISTS idx_events_created_at ON events(created_at);

-- RLS Policies - разрешаем всё через service role
-- Для продакшена настройте более строгие политики
CREATE POLICY "Allow all operations for service role" ON users
  FOR ALL USING (true);

CREATE POLICY "Allow all operations for service role" ON bot_projects
  FOR ALL USING (true);

CREATE POLICY "Allow all operations for service role" ON selected_features
  FOR ALL USING (true);

CREATE POLICY "Allow all operations for service role" ON subscriptions
  FOR ALL USING (true);

CREATE POLICY "Allow all operations for service role" ON leads
  FOR ALL USING (true);

CREATE POLICY "Allow all operations for service role" ON events
  FOR ALL USING (true);

-- Функция для обновления updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Триггеры для updated_at
CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_bot_projects_updated_at
  BEFORE UPDATE ON bot_projects
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
