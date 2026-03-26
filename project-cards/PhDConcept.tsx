"use client";

import { motion } from 'framer-motion';
import { BookOpen, Lightbulb, Network, Scale, Database } from 'lucide-react';
import { useI18n } from '@/lib/i18n/context';

export function PhDResearchBlock() {
  const { language } = useI18n();
  const isRussian = language !== 'en';

  const theses = [
    {
      icon: Network,
      title: 'Protocol Institutionalism',
      titleRu: 'Протокольный институционализм',
      desc: 'Теория перехода от иерархических организаций к самоисполняемым институциональным протоколам, где правила экономических систем кодифицируются в алгоритмических конструкциях (smart contracts)',
      descEn: 'Theory of transition from hierarchical organizations to self-enforcing institutional protocols where economic rules are codified in algorithmic constructs (smart contracts)'
    },
    {
      icon: Database,
      title: 'Cyber-Physical Systems',
      titleRu: 'Кибер-физические системы',
      desc: 'CPSES создают objective trusted data layer через IoT-инфраструктуру, исключая информационную асимметрию и делая возможным верифицируемое управление общественными благами',
      descEn: 'CPSES create objective trusted data layer through IoT infrastructure, eliminating information asymmetry and enabling verifiable common pool resource governance'
    },
    {
      icon: Scale,
      title: 'Algorithmic Constitutionalism',
      titleRu: 'Алгоритмический конституционализм',
      desc: 'Механизмы самоограничения экономических акторов через program-level constraints. В отличие от традиционных конституций, обеспечивают endogenous enforcement через криптоэкономические стимулы',
      descEn: 'Self-constraint mechanisms for economic actors through protocol-level constraints. Unlike traditional constitutions, ensure endogenous enforcement through cryptoeconomic incentives'
    },
    {
      icon: Lightbulb,
      title: 'Resource-Backed Tokenomics',
      titleRu: 'Resource-Backed Tokenomics',
      desc: 'Токены представляют права доступа к физическим ресурсам (water rights, energy credits), а не спекулятивные активы. Преодоление «трагедии общин» через механизмы краудфандинга инфраструктуры',
      descEn: 'Tokens represent access rights to physical resources (water rights, energy credits), not speculative assets. Overcoming the "tragedy of the commons" through infrastructure crowdfunding mechanisms'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="mt-16"
    >
      {/* Header */}
      <div className="text-center mb-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-3 px-5 py-2 
                     border border-white/20 bg-white/[0.03] 
                     rounded-full mb-4"
        >
          <BookOpen size={16} className="text-white/60" />
          <span className="font-mono text-xs text-white/60 uppercase tracking-[0.2em]">
            {isRussian ? 'Исследование' : 'Research'}
          </span>
        </motion.div>
        
        <h3 className="text-2xl md:text-3xl font-mono text-white mb-4">
          {isRussian 
            ? '«Институциональная инженерия многоуровневых протоколов»'
            : '"Institutional Engineering of Multi-Level Protocols"'
          }
        </h3>
        
        <p className="font-mono text-sm text-white/50 max-w-3xl mx-auto leading-relaxed">
          {isRussian 
            ? 'PhD концепция: теория и механизмы управления глобальными общественными благами в условиях цифровой автономии. Исследование разрабатывает теорию протокольных институтов — новое направление в институциональной экономике.'
            : 'PhD concept: theory and mechanisms for managing global common pool resources in conditions of digital autonomy. The research develops the theory of protocol institutions — a new direction in institutional economics.'
          }
        </p>
      </div>

      {/* Main Concept Card */}
      <div className="p-8 md:p-10
                      bg-white/[0.02] backdrop-blur-xl 
                      border border-white/[0.08] 
                      rounded-lg
                      hover:border-white/[0.15]
                      transition-all duration-500">
        
        {/* Concept Field */}
        <div className="mb-8 pb-8 border-b border-white/[0.08]">
          <h4 className="font-mono text-xs text-white/40 uppercase tracking-[0.2em] mb-4">
            {isRussian ? 'Концептуальное поле' : 'Conceptual Field'}
          </h4>
          <p className="font-mono text-sm text-white/60 leading-relaxed">
            {isRussian 
              ? 'Предметом является многоуровневая архитектура управления ресурсами, представленная как каскадная система взаимосвязанных протоколов: базовый уровень (водные ресурсы) → инфраструктурный уровень (энергетика, транспорт) → социальный уровень (здравоохранение, образование) → мета-уровень (Civilization Core как координационный протокол протоколов).'
              : 'The subject is a multi-level resource management architecture represented as a cascade system of interconnected protocols: base level (water resources) → infrastructure level (energy, transport) → social level (healthcare, education) → meta-level (Civilization Core as protocol of protocols).'
            }
          </p>
        </div>

        {/* Key Theses Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {theses.map((thesis, index) => (
            <motion.div
              key={thesis.title}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              className="group p-5
                        bg-white/[0.02] 
                        border border-white/[0.06] 
                        rounded-lg
                        hover:bg-white/[0.04] hover:border-white/[0.12]
                        transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="p-2.5 
                              bg-white/[0.05] 
                              border border-white/10 
                              rounded-lg
                              group-hover:border-white/20
                              transition-colors">
                  <thesis.icon size={18} className="text-white/50" />
                </div>
                <div className="flex-1">
                  <h5 className="font-mono text-sm text-white mb-2">
                    {isRussian ? thesis.titleRu : thesis.title}
                  </h5>
                  <p className="font-mono text-xs text-white/40 leading-relaxed">
                    {isRussian ? thesis.desc : thesis.descEn}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Methodology */}
        <div className="mt-8 pt-8 border-t border-white/[0.08]">
          <h4 className="font-mono text-xs text-white/40 uppercase tracking-[0.2em] mb-4">
            {isRussian ? 'Методология' : 'Methodology'}
          </h4>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-4 bg-white/[0.02] border border-white/[0.05] rounded-lg">
              <span className="font-mono text-[10px] text-white/30 uppercase block mb-2">
                {isRussian ? 'Структурный анализ' : 'Structural Analysis'}
              </span>
              <p className="font-mono text-xs text-white/50">
                {isRussian 
                  ? 'Онтологическая модель «Объект-Субъект-Инструмент-Механизм-Продукт»'
                  : 'Ontological model "Object-Subject-Instrument-Mechanism-Product"'
                }
              </p>
            </div>
            <div className="p-4 bg-white/[0.02] border border-white/[0.05] rounded-lg">
              <span className="font-mono text-[10px] text-white/30 uppercase block mb-2">
                {isRussian ? 'Количественный анализ' : 'Quantitative Analysis'}
              </span>
              <p className="font-mono text-xs text-white/50">
                {isRussian 
                  ? 'Эконометрическое моделирование эффективности протоколов'
                  : 'Econometric modeling of protocol efficiency'
                }
              </p>
            </div>
            <div className="p-4 bg-white/[0.02] border border-white/[0.05] rounded-lg">
              <span className="font-mono text-[10px] text-white/30 uppercase block mb-2">
                {isRussian ? 'Практическая реализация' : 'Practical Implementation'}
              </span>
              <p className="font-mono text-xs text-white/50">
                {isRussian 
                  ? 'Civilization Protocol как «живая лаборатория» экономики'
                  : 'Civilization Protocol as economic "living laboratory"'
                }
              </p>
            </div>
          </div>
        </div>

        {/* Expected Results */}
        <div className="mt-8 pt-8 border-t border-white/[0.08]">
          <h4 className="font-mono text-xs text-white/40 uppercase tracking-[0.2em] mb-4">
            {isRussian ? 'Ожидаемые результаты' : 'Expected Results'}
          </h4>
          <div className="flex flex-wrap gap-2">
            {[
              isRussian ? 'Формальная модель устойчивости DAO' : 'Formal DAO governance robustness model',
              isRussian ? 'Типология fail-modes децентрализованных систем' : 'Typology of decentralized system fail-modes',
              isRussian ? 'Protocol Efficiency Metrics' : 'Protocol Efficiency Metrics',
              isRussian ? 'Institutional transition theory' : 'Institutional transition theory',
              isRussian ? 'Теория институциональной масштабируемости' : 'Theory of institutional scalability',
            ].map((tag) => (
              <span
                key={tag}
                className="font-mono text-[10px] text-white/50 
                         border border-white/10 
                         px-3 py-1.5 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
