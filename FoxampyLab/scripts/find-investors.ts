#!/usr/bin/env tsx
/**
 * Скрипт для поиска инвесторов
 * 
 * Использование:
 *   npm run find-investors -- --source=github --limit=50
 *   npm run find-investors -- --all --export=csv
 *   npm run find-investors -- --blockchain --export=json
 */

import { InvestorFinder } from '../lib/investor-finder';
import { config } from 'dotenv';
import { resolve } from 'path';

// Загружаем env
config({ path: resolve(process.cwd(), '.env.local') });

const args = process.argv.slice(2);
const flags: Record<string, string | boolean> = {};

// Парсим аргументы
for (let i = 0; i < args.length; i++) {
  const arg = args[i];
  if (arg.startsWith('--')) {
    const key = arg.slice(2);
    const nextArg = args[i + 1];
    if (nextArg && !nextArg.startsWith('--')) {
      flags[key] = nextArg;
      i++;
    } else {
      flags[key] = true;
    }
  }
}

async function main() {
  const githubToken = process.env.GITHUB_TOKEN;
  const productHuntToken = process.env.PRODUCT_HUNT_TOKEN;

  if (!githubToken) {
    console.error('❌ GITHUB_TOKEN не найден в .env.local');
    console.log('Создайте токен: https://github.com/settings/tokens');
    process.exit(1);
  }

  console.log('🚀 Запуск поиска инвесторов...\n');

  const finder = new InvestorFinder({
    githubToken,
    productHuntToken,
  });

  // Проверяем лимиты
  const limits = await finder.checkLimits();
  console.log('📊 GitHub API лимиты:', limits.github?.remaining, 'запросов осталось');
  console.log('');

  // Выполняем поиск
  if (flags['all']) {
    await finder.searchAll({ blockchain: true, founders: true, makers: !!productHuntToken });
  } else if (flags['blockchain']) {
    await finder.findBlockchainDevelopers(parseInt(flags['limit'] as string) || 50);
  } else if (flags['founders']) {
    await finder.findFounders();
  } else if (flags['github']) {
    await finder.searchGitHub({
      language: flags['language'] as string,
      followers: '>100',
      per_page: parseInt(flags['limit'] as string) || 30,
    });
  } else {
    // По умолчанию ищем блокчейн разработчиков
    await finder.findBlockchainDevelopers(30);
    await finder.findFounders();
  }

  // Статистика
  const stats = finder.getStats();
  console.log('\n📈 Статистика:');
  console.log(`   Всего найдено: ${stats.total}`);
  console.log(`   По источникам:`, stats.bySource);
  console.log(`   По ролям:`, stats.byRole);
  console.log(`   Средний скор: ${stats.averageScore}`);
  console.log(`   С email: ${stats.withEmail}`);

  // Топ-10
  console.log('\n🏆 Топ-10 инвесторов:');
  finder.getTop(10).forEach((inv, i) => {
    console.log(`   ${i + 1}. ${inv.name} (${inv.score}⭐) - ${inv.role}`);
    if (inv.email) console.log(`      📧 ${inv.email}`);
    if (inv.company) console.log(`      🏢 ${inv.company}`);
    if (inv.github) console.log(`      🔗 ${inv.github}`);
  });

  // Экспорт
  const exportFormat = flags['export'] as 'csv' | 'json' | undefined;
  if (exportFormat) {
    const timestamp = new Date().toISOString().split('T')[0];
    const filename = `investors-${timestamp}.${exportFormat}`;
    await finder.saveToFile(filename, exportFormat);
    console.log(`\n💾 Сохранено в: ${filename}`);
  }

  // Сохранение в Supabase
  if (flags['save']) {
    const { createClient } = await import('@supabase/supabase-js');
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
    await finder.saveToSupabase(supabase);
  }

  console.log('\n✅ Готово!');
}

main().catch(console.error);
