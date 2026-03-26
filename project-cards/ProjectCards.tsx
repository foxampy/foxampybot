"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, TrendingUp, Target } from 'lucide-react';
import Link from 'next/link';
import { ProjectPreviewModal } from '@/components/modals/ProjectPreviewModal';

// ============================================
// ТИПЫ ДАННЫХ
// ============================================
export interface Project {
  id: string;
  name: string;
  nameEn: string;
  description: string;
  descriptionEn: string;
  url: string;
  status: 'active' | 'pilot' | 'beta' | 'planning';
  category: string;
  categoryEn: string;
  focus: string[];
  stageLabel: string;
}

// ============================================
// ДАННЫЕ ПРОЕКТОВ
// ============================================
export const projects: Project[] = [
  {
    id: 'civilization-protocol',
    name: 'Civilization Protocol',
    nameEn: 'Civilization Protocol',
    description: 'Децентрализованная кибер-физическая платформа для управления водными ресурсами через блокчейн. VODeco (Value of Data – Water Ecosystem) включает двойную токеномику (VODeco + VOD), DAO-управление, мониторинг через IoT и AI, токенизацию водных ресурсов и инвестиционные проекты. Глобальный маркетплейс инициатив, охватывающий воду, экологию, энергетику, медицину и науку. Phase 2.',
    descriptionEn: 'Decentralized cyber-physical platform for water resource management through blockchain. VODeco (Value of Data – Water Ecosystem) includes dual tokenomics (VODeco + VOD), DAO governance, IoT and AI monitoring, water resource tokenization, and investment projects. Global marketplace for initiatives covering water, ecology, energy, medicine, and science. Phase 2.',
    url: 'https://civilization-protocol.vercel.app/',
    status: 'active',
    category: 'Блокчейн / Экосистема',
    categoryEn: 'Blockchain / Ecosystem',
    focus: ['Blockchain', 'IoT', 'AI', 'Tokenomics'],
    stageLabel: 'Активная фаза',
  },
  {
    id: 'tradeplus',
    name: 'TradePlus',
    nameEn: 'TradePlus',
    description: 'Продвинутая платформа для торговли и инвестиций с интеграцией множественных криптовалютных бирж, инструментами технического и фундаментального анализа, автоматизацией торговых стратегий и управлением портфелем. Поддержка алгоритической торговли и социального трейдинга.',
    descriptionEn: 'Advanced trading and investment platform with multi-exchange cryptocurrency integration, technical and fundamental analysis tools, trading strategy automation, and portfolio management. Support for algorithmic trading and social trading.',
    url: 'https://github.com/TimurSama/TradePlus',
    status: 'active',
    category: 'Финтех / Трейдинг',
    categoryEn: 'Fintech / Trading',
    focus: ['Fintech', 'Quant', 'UX', 'Automation'],
    stageLabel: 'Активная фаза',
  },
  {
    id: 'dogymorbios',
    name: 'Dogymorbios',
    nameEn: 'Dogymorbios',
    description: 'Платформенная экосистема и социальная сеть для собак и их владельцев. Объединяет интерактивную карту прогулок с GPS-трекингом, социальную ленту, маркетплейс товаров и услуг, внутреннюю валюту BoneCoin и децентрализованное управление через DAO. Включает умный дейтинг для собак, систему тренировок, журнал здоровья, групповые чаты, задания с геймификацией и базу знаний. Единая платформа для безопасных прогулок, ухода, обучения и общения.',
    descriptionEn: 'Platform ecosystem and social network for dogs and their owners. Combines interactive walking map with GPS tracking, social feed, marketplace for goods and services, internal BoneCoin currency, and decentralized governance through DAO. Includes smart dating for dogs, training system, health journal, group chats, gamified quests, and knowledge base. Unified platform for safe walks, care, training, and communication.',
    url: 'https://github.com/TimurSama/dogymorbios',
    status: 'pilot',
    category: 'Социальная сеть / Экосистема',
    categoryEn: 'Social Network / Ecosystem',
    focus: ['Geo', 'Mobile', 'Community', 'Marketplace'],
    stageLabel: 'Пилот',
  },
  {
    id: 'etholife',
    name: 'EthoLife',
    nameEn: 'EthoLife',
    description: 'Платформа интеграции жизненных данных и сервисов в единую экосистему здоровья и благополучия. Обеспечивает связность между медицинскими приложениями, фитнес-трекерами, wellness-сервисами и системами здравоохранения через унифицированные API и стандарты обмена данными.',
    descriptionEn: 'Platform for integrating life data and services into a unified health and wellness ecosystem. Ensures connectivity between medical applications, fitness trackers, wellness services, and healthcare systems through unified APIs and data exchange standards.',
    url: 'https://etholife.vercel.app/',
    status: 'active',
    category: 'Здоровье / Интеграция',
    categoryEn: 'Health / Integration',
    focus: ['Health API', 'Data Fabric', 'AI', 'Security'],
    stageLabel: 'Активная фаза',
  },
];

// ============================================
// КОНФИГУРАЦИЯ СТАТУСОВ
// ============================================
const statusLabels: Record<string, string> = {
  active: 'Активен',
  pilot: 'Пилот',
  beta: 'Бета',
  planning: 'Планирование',
};

const statusColors: Record<string, string> = {
  active: 'border-emerald-500/50 bg-emerald-500/5 text-emerald-400',
  pilot: 'border-amber-500/50 bg-amber-500/5 text-amber-400',
  beta: 'border-blue-500/50 bg-blue-500/5 text-blue-400',
  planning: 'border-gray-500/50 bg-gray-500/5 text-gray-400',
};

// ============================================
// КОМПОНЕНТ КАРТОЧКИ ПРОЕКТА
// ============================================
interface ProjectCardProps {
  project: Project;
  index: number;
  language?: 'ru' | 'en';
  onOpenPreview: (url: string, name: string) => void;
}

export function ProjectCard({ project, index, language = 'ru', onOpenPreview }: ProjectCardProps) {
  const isRussian = language !== 'en';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="border border-white/10 bg-black/40 backdrop-blur-md hover:bg-black/60 transition-all group rounded-lg overflow-hidden"
    >
      <div className="p-6 md:p-8 space-y-6">
        {/* Header - Категория и Название */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="inline-block px-3 py-1 mb-3 border border-white/20 bg-white/5 rounded">
              <span className="font-mono text-[10px] text-gray-400 tracking-wider uppercase">
                {isRussian ? project.category : project.categoryEn}
              </span>
            </div>
            <h3 className="text-xl md:text-2xl font-mono text-white mb-2 group-hover:text-cyan-400 transition-colors">
              {isRussian ? project.name : project.nameEn}
            </h3>
            <p className="font-mono text-sm text-gray-400 leading-relaxed">
              {isRussian ? project.description : project.descriptionEn}
            </p>
          </div>
        </div>

        {/* Stack - Статус и Технологии */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Target size={14} className="text-gray-500" />
              <span className="font-mono text-[10px] text-gray-500 uppercase tracking-wider">
                Статус
              </span>
            </div>
            <span className={`inline-block px-3 py-1 border rounded font-mono text-[10px] tracking-wider ${statusColors[project.status]}`}>
              {statusLabels[project.status]} · {project.stageLabel}
            </span>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <TrendingUp size={14} className="text-gray-500" />
              <span className="font-mono text-[10px] text-gray-500 uppercase tracking-wider">
                Технологический фокус
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {project.focus.map((tag) => (
                <span
                  key={tag}
                  className="font-mono text-[10px] text-cyan-400 border border-cyan-400/30 px-2 py-1 rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Buttons - Кнопки действий */}
        <div className="pt-4 border-t border-white/10 flex flex-wrap gap-3">
          {/* Специальные кнопки для Civilization Protocol */}
          {project.id === 'civilization-protocol' && (
            <>
              <Link
                href="/projects/civilization-protocol"
                className="inline-flex items-center gap-2 px-4 py-2 border border-white/20 bg-white/5
                         hover:border-cyan-400/50 hover:bg-cyan-400/10 transition-all
                         font-mono text-xs text-white tracking-wider group/link rounded"
              >
                Архитектура платформы
                <ExternalLink size={12} className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
              </Link>
              <Link
                href="/projects/civilization-protocol/presentation"
                className="inline-flex items-center gap-2 px-4 py-2 border border-white/20 bg-white/5
                         hover:border-cyan-400/50 hover:bg-cyan-400/10 transition-all
                         font-mono text-xs text-white tracking-wider group/link rounded"
              >
                Инвестиционная презентация
                <ExternalLink size={12} className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
              </Link>
            </>
          )}

          {/* Кнопка презентации для TradePlus */}
          {project.id === 'tradeplus' && (
            <Link
              href="/projects/tradeplus/presentation"
              className="inline-flex items-center gap-2 px-4 py-2 border border-white/20 bg-white/5
                       hover:border-cyan-400/50 hover:bg-cyan-400/10 transition-all
                       font-mono text-xs text-white tracking-wider group/link rounded"
            >
              Инвестиционная презентация
              <ExternalLink size={12} className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
            </Link>
          )}

          {/* Кнопка презентации для Dogymorbios */}
          {project.id === 'dogymorbios' && (
            <Link
              href="/projects/dogymorbios/presentation"
              className="inline-flex items-center gap-2 px-4 py-2 border border-white/20 bg-white/5
                       hover:border-cyan-400/50 hover:bg-cyan-400/10 transition-all
                       font-mono text-xs text-white tracking-wider group/link rounded"
            >
              Инвестиционная презентация
              <ExternalLink size={12} className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
            </Link>
          )}

          {/* Кнопка презентации для EthoLife */}
          {project.id === 'etholife' && (
            <Link
              href="/projects/etholife/presentation"
              className="inline-flex items-center gap-2 px-4 py-2 border border-white/20 bg-white/5
                       hover:border-cyan-400/50 hover:bg-cyan-400/10 transition-all
                       font-mono text-xs text-white tracking-wider group/link rounded"
            >
              Инвестиционная презентация
              <ExternalLink size={12} className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
            </Link>
          )}

          {/* Кнопка открытия проекта в модальном окне */}
          <button
            onClick={() => onOpenPreview(project.url, isRussian ? project.name : project.nameEn)}
            className="inline-flex items-center gap-2 px-4 py-2 border border-white/10 bg-white/5
                     hover:border-cyan-400/50 hover:bg-cyan-400/10 transition-all
                     font-mono text-xs text-gray-300 tracking-wider group/link rounded cursor-pointer"
          >
            Открыть проект
            <ExternalLink size={12} className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// ============================================
// КОМПОНЕНТ СЕТКИ ПРОЕКТОВ
// ============================================
interface ProjectsGridProps {
  language?: 'ru' | 'en';
  className?: string;
}

export function ProjectsGrid({ language = 'ru', className = '' }: ProjectsGridProps) {
  const [previewModal, setPreviewModal] = useState<{ isOpen: boolean; url: string; name: string }>({
    isOpen: false,
    url: '',
    name: '',
  });

  const handleOpenPreview = (url: string, name: string) => {
    setPreviewModal({ isOpen: true, url, name });
  };

  const handleClosePreview = () => {
    setPreviewModal(prev => ({ ...prev, isOpen: false }));
  };

  return (
    <>
      <div className={`grid md:grid-cols-2 gap-6 ${className}`}>
        {projects.map((project, index) => (
          <ProjectCard 
            key={project.id} 
            project={project} 
            index={index} 
            language={language}
            onOpenPreview={handleOpenPreview}
          />
        ))}
      </div>

      <ProjectPreviewModal
        isOpen={previewModal.isOpen}
        onClose={handleClosePreview}
        url={previewModal.url}
        projectName={previewModal.name}
      />
    </>
  );
}

// ============================================
// КОМПОНЕНТ СТРАНИЦЫ PROJECT HUB
// ============================================
export default function ProjectHub() {
  const [previewModal, setPreviewModal] = useState<{ isOpen: boolean; url: string; name: string }>({
    isOpen: false,
    url: '',
    name: '',
  });

  const handleOpenPreview = (url: string, name: string) => {
    setPreviewModal({ isOpen: true, url, name });
  };

  const handleClosePreview = () => {
    setPreviewModal(prev => ({ ...prev, isOpen: false }));
  };

  return (
    <div className="relative min-h-screen bg-[#050505]">
      {/* Фоновый градиент */}
      <div className="fixed inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#050505] to-[#0a0a0a] pointer-events-none" />
      
      <main className="relative z-10">
        {/* Hero Section */}
        <section className="px-4 pt-32 pb-16 md:pb-24">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center space-y-6 mb-16"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 border border-white/20 bg-white/5 mb-4 rounded">
                <span className="font-mono text-[10px] text-gray-400 tracking-widest">
                  ОТКРЫТО ДЛЯ ИНВЕСТИЦИЙ
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-mono text-white tracking-tight leading-tight">
                Project Hub
              </h1>

              <p className="font-mono text-sm md:text-base text-gray-400 leading-relaxed max-w-2xl mx-auto">
                Портфолио активных проектов и стартапов. От блокчейн-экосистем до социальных платформ — 
                каждый проект решает конкретные проблемы и создаёт реальную ценность.
              </p>
            </motion.div>

            {/* Projects Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              {projects.map((project, index) => (
                <ProjectCard 
                  key={project.id} 
                  project={project} 
                  index={index}
                  onOpenPreview={handleOpenPreview}
                />
              ))}
            </div>
          </div>
        </section>
      </main>

      <ProjectPreviewModal
        isOpen={previewModal.isOpen}
        onClose={handleClosePreview}
        url={previewModal.url}
        projectName={previewModal.name}
      />
    </div>
  );
}
