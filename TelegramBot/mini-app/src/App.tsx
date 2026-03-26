import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Rocket, Layers, DollarSign, BarChart3, Settings, User, Zap } from 'lucide-react';
import './styles/global.css';

// ============================================
// ТИПЫ ДАННЫХ
// ============================================
interface Feature {
  id: string;
  name: string;
  nameEn: string;
  price: number;
  description: string;
  descriptionEn: string;
  icon: string;
}

interface BotProject {
  id: string;
  name: string;
  features: string[];
  totalPrice: number;
  status: 'draft' | 'active' | 'paused';
}

// ============================================
// ДАННЫЕ
// ============================================
const features: Feature[] = [
  {
    id: 'lead_capture',
    name: 'Сбор заявок',
    nameEn: 'Lead Capture',
    price: 5,
    description: 'Сбор контактных данных и заявок от клиентов 24/7',
    descriptionEn: 'Collect customer data and leads 24/7',
    icon: '📝',
  },
  {
    id: 'faq',
    name: 'Автоответы',
    nameEn: 'Auto Answers',
    price: 5,
    description: 'Автоматические ответы на частые вопросы',
    descriptionEn: 'Automatic answers to FAQs',
    icon: '💬',
  },
  {
    id: 'booking',
    name: 'Запись клиентов',
    nameEn: 'Booking System',
    price: 7,
    description: 'Онлайн-запись на услуги и встречи',
    descriptionEn: 'Online booking for services',
    icon: '📅',
  },
  {
    id: 'google_sheets',
    name: 'Google Sheets',
    nameEn: 'Google Sheets',
    price: 3,
    description: 'Сохранение данных в Google Таблицы',
    descriptionEn: 'Save data to Google Sheets',
    icon: '📊',
  },
  {
    id: 'notifications',
    name: 'Уведомления',
    nameEn: 'Notifications',
    price: 3,
    description: 'Мгновенные уведомления владельцу',
    descriptionEn: 'Instant notifications to owner',
    icon: '🔔',
  },
  {
    id: 'payments',
    name: 'Приём оплаты',
    nameEn: 'Payments',
    price: 10,
    description: 'Приём платежей через Telegram/Stripe',
    descriptionEn: 'Accept payments via Telegram/Stripe',
    icon: '💳',
  },
];

const tiers = [
  {
    id: 'free',
    name: 'Free',
    price: 0,
    features: ['1 бот', '2 функции', '100 лидов/мес', 'Базовая поддержка'],
    highlighted: false,
  },
  {
    id: 'basic',
    name: 'Basic',
    price: 10,
    features: ['3 бота', '5 функций', '1000 лидов/мес', 'Приоритетная поддержка', 'Google Sheets'],
    highlighted: true,
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 25,
    features: ['∞ ботов', '∞ функций', '∞ лидов', 'VIP поддержка', 'Все интеграции', 'API доступ'],
    highlighted: false,
  },
];

// ============================================
// КОМПОНЕНТЫ
// ============================================

// Карточка функции
function FeatureCard({ 
  feature, 
  selected, 
  onToggle 
}: { 
  feature: Feature; 
  selected: boolean; 
  onToggle: (id: string) => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onToggle(feature.id)}
      className={`card cursor-pointer ${selected ? 'border-accent' : ''}`}
      style={{
        borderColor: selected ? 'var(--color-accent)' : undefined,
        boxShadow: selected ? 'var(--shadow-glow)' : undefined,
      }}
    >
      <div className="flex items-start justify-between mb-3">
        <span className="text-3xl">{feature.icon}</span>
        <div className={`badge ${selected ? 'badge-accent' : ''}`}>
          ${feature.price}/мес
        </div>
      </div>
      
      <h3 className="text-lg font-mono text-white mb-2">{feature.name}</h3>
      <p className="text-sm text-secondary">{feature.description}</p>
      
      {selected && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute top-3 right-3 w-6 h-6 bg-accent rounded-full flex items-center justify-center"
        >
          ✓
        </motion.div>
      )}
    </motion.div>
  );
}

// Карточка тарифа
function TierCard({ 
  tier, 
  selected, 
  onSelect 
}: { 
  tier: typeof tiers[0]; 
  selected: boolean; 
  onSelect: (id: string) => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      onClick={() => onSelect(tier.id)}
      className={`card cursor-pointer ${tier.highlighted ? 'border-accent' : ''} ${selected ? 'selected' : ''}`}
      style={{
        borderColor: selected ? 'var(--color-accent)' : (tier.highlighted ? 'var(--color-accent)' : undefined),
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {tier.highlighted && (
        <div className="badge badge-accent mb-3">Популярный</div>
      )}
      
      <h3 className="text-2xl font-mono text-white mb-2">{tier.name}</h3>
      <div className="text-3xl font-bold text-accent mb-4">
        ${tier.price}<span className="text-sm text-secondary">/мес</span>
      </div>
      
      <ul className="space-y-2 mb-6">
        {tier.features.map((feature, i) => (
          <li key={i} className="text-sm text-secondary flex items-center gap-2">
            <span className="text-accent">✓</span> {feature}
          </li>
        ))}
      </ul>
      
      <button
        className={`btn btn-block ${selected ? 'btn-primary' : ''}`}
      >
        {selected ? 'Выбрано' : 'Выбрать'}
      </button>
    </motion.div>
  );
}

// Прогресс сборки
function BuilderProgress({ step, total }: { step: number; total: number }) {
  const percentage = (step / total) * 100;
  
  return (
    <div className="mb-6">
      <div className="flex justify-between text-sm mb-2">
        <span className="text-mono text-muted">Прогресс сборки</span>
        <span className="text-mono text-accent">{Math.round(percentage)}%</span>
      </div>
      <div className="progress-bar">
        <div 
          className="progress-bar-fill" 
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

// ============================================
// ГЛАВНЫЙ КОМПОНЕНТ
// ============================================
function App() {
  const [currentScreen, setCurrentScreen] = useState<'dashboard' | 'builder' | 'pricing' | 'settings'>('dashboard');
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [selectedTier, setSelectedTier] = useState<string>('free');
  const [language, setLanguage] = useState<'ru' | 'en'>('ru');
  
  // Telegram WebApp инициализация
  useEffect(() => {
    const tg = (window as any).TelegramWebApp;
    if (tg) {
      tg.ready();
      tg.expand();
      
      // Применяем тему Telegram
      if (tg.colorScheme === 'light') {
        document.documentElement.classList.add('theme-light');
      }
      
      // Инициализируем пользователя
      const user = tg.initDataUnsafe?.user;
      console.log('Telegram user:', user);
    }
  }, []);
  
  const toggleFeature = (featureId: string) => {
    setSelectedFeatures(prev => 
      prev.includes(featureId)
        ? prev.filter(id => id !== featureId)
        : [...prev, featureId]
    );
  };
  
  const totalPrice = selectedFeatures.reduce((sum, id) => {
    const feature = features.find(f => f.id === id);
    return sum + (feature?.price || 0);
  }, 0);
  
  const isRussian = language !== 'en';

  return (
    <div className="relative min-h-screen">
      {/* Фон */}
      <div className="app-background" />
      
      {/* Контент */}
      <main className="relative z-10 px-4 py-8 pb-24">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <div>
            <h1 className="text-2xl md:text-3xl font-mono text-white">
              🤖 Bot Builder
            </h1>
            <p className="text-sm text-secondary">
              {isRussian ? 'Создайте своего бота за 5 минут' : 'Build your bot in 5 minutes'}
            </p>
          </div>
          
          <button
            onClick={() => setLanguage(isRussian ? 'en' : 'ru')}
            className="btn"
          >
            {isRussian ? 'EN' : 'RU'}
          </button>
        </motion.header>

        {/* Dashboard */}
        {currentScreen === 'dashboard' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            {/* Stats Widgets */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="card">
                <div className="flex items-center gap-3 mb-2">
                  <Rocket size={20} className="text-accent" />
                  <span className="text-sm text-muted">Боты</span>
                </div>
                <div className="text-2xl font-mono text-white">0</div>
              </div>
              
              <div className="card">
                <div className="flex items-center gap-3 mb-2">
                  <Zap size={20} className="text-accent" />
                  <span className="text-sm text-muted">Лиды</span>
                </div>
                <div className="text-2xl font-mono text-white">0</div>
              </div>
              
              <div className="card">
                <div className="flex items-center gap-3 mb-2">
                  <BarChart3 size={20} className="text-accent" />
                  <span className="text-sm text-muted">Конверсия</span>
                </div>
                <div className="text-2xl font-mono text-white">0%</div>
              </div>
              
              <div className="card">
                <div className="flex items-center gap-3 mb-2">
                  <DollarSign size={20} className="text-accent" />
                  <span className="text-sm text-muted">Доход</span>
                </div>
                <div className="text-2xl font-mono text-white">$0</div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="card">
              <h2 className="text-lg font-mono text-white mb-4">
                {isRussian ? 'Быстрые действия' : 'Quick Actions'}
              </h2>
              
              <div className="space-y-3">
                <button
                  onClick={() => setCurrentScreen('builder')}
                  className="btn btn-primary btn-block"
                >
                  <Rocket size={18} />
                  {isRussian ? '🚀 Собрать бота' : '🚀 Build Bot'}
                </button>
                
                <button
                  onClick={() => setCurrentScreen('pricing')}
                  className="btn btn-block"
                >
                  <DollarSign size={18} />
                  {isRussian ? '💰 Тарифы' : '💰 Pricing'}
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Builder */}
        {currentScreen === 'builder' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <BuilderProgress step={selectedFeatures.length} total={features.length} />
            
            <h2 className="text-xl font-mono text-white mb-4">
              {isRussian ? 'Выберите функции' : 'Select Features'}
            </h2>
            
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              {features.map(feature => (
                <FeatureCard
                  key={feature.id}
                  feature={feature}
                  selected={selectedFeatures.includes(feature.id)}
                  onToggle={toggleFeature}
                />
              ))}
            </div>
            
            <div className="card mb-4">
              <div className="flex justify-between items-center mb-4">
                <span className="text-mono text-muted">
                  {isRussian ? 'Итого:' : 'Total:'}
                </span>
                <span className="text-2xl font-mono text-accent">
                  ${totalPrice}/мес
                </span>
              </div>
              
              <div className="space-y-3">
                <button
                  onClick={() => setCurrentScreen('pricing')}
                  className="btn btn-primary btn-block"
                >
                  {isRussian ? 'Выбрать тариф' : 'Choose Tier'}
                </button>
                
                <button
                  onClick={() => setCurrentScreen('dashboard')}
                  className="btn btn-block"
                >
                  {isRussian ? 'Назад' : 'Back'}
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Pricing */}
        {currentScreen === 'pricing' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <h2 className="text-xl font-mono text-white mb-6">
              {isRussian ? 'Выберите тариф' : 'Choose Your Plan'}
            </h2>
            
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              {tiers.map(tier => (
                <TierCard
                  key={tier.id}
                  tier={tier}
                  selected={selectedTier === tier.id}
                  onSelect={setSelectedTier}
                />
              ))}
            </div>
            
            <div className="card">
              <div className="flex justify-between items-center mb-4">
                <span className="text-mono text-muted">
                  {isRussian ? 'Функции:' : 'Features:'}
                </span>
                <span className="text-mono text-accent">
                  {selectedFeatures.length}
                </span>
              </div>
              
              <div className="space-y-3">
                <button className="btn btn-primary btn-block">
                  {isRussian ? '💳 Оплатить' : '💳 Pay Now'}
                </button>
                
                <button
                  onClick={() => setCurrentScreen('builder')}
                  className="btn btn-block"
                >
                  {isRussian ? 'Назад' : 'Back'}
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Settings */}
        {currentScreen === 'settings' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="card">
              <h2 className="text-xl font-mono text-white mb-4">
                {isRussian ? 'Настройки' : 'Settings'}
              </h2>
              <p className="text-secondary">
                {isRussian ? 'В разработке...' : 'Coming soon...'}
              </p>
            </div>
          </motion.div>
        )}
      </main>

      {/* Navigation Bar */}
      <nav className="fixed bottom-0 left-0 right-0 z-20 border-t border-[var(--color-border)] bg-[var(--color-bg-secondary)] backdrop-blur-md">
        <div className="flex items-center justify-around py-3">
          <button
            onClick={() => setCurrentScreen('dashboard')}
            className={`flex flex-col items-center gap-1 ${currentScreen === 'dashboard' ? 'text-accent' : 'text-muted'}`}
          >
            <BarChart3 size={20} />
            <span className="text-[10px] font-mono">
              {isRussian ? 'Главная' : 'Home'}
            </span>
          </button>
          
          <button
            onClick={() => setCurrentScreen('builder')}
            className={`flex flex-col items-center gap-1 ${currentScreen === 'builder' ? 'text-accent' : 'text-muted'}`}
          >
            <Layers size={20} />
            <span className="text-[10px] font-mono">
              {isRussian ? 'Конструктор' : 'Builder'}
            </span>
          </button>
          
          <button
            onClick={() => setCurrentScreen('pricing')}
            className={`flex flex-col items-center gap-1 ${currentScreen === 'pricing' ? 'text-accent' : 'text-muted'}`}
          >
            <DollarSign size={20} />
            <span className="text-[10px] font-mono">
              {isRussian ? 'Тарифы' : 'Pricing'}
            </span>
          </button>
          
          <button
            onClick={() => setCurrentScreen('settings')}
            className={`flex flex-col items-center gap-1 ${currentScreen === 'settings' ? 'text-accent' : 'text-muted'}`}
          >
            <Settings size={20} />
            <span className="text-[10px] font-mono">
              {isRussian ? 'Настройки' : 'Settings'}
            </span>
          </button>
        </div>
      </nav>
    </div>
  );
}

export default App;
