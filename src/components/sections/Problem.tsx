import { useTranslation } from 'react-i18next';
import { SearchX, Clock, CalendarX } from 'lucide-react';
import { SectionWrapper } from '@/components/shared/SectionWrapper';
import { AnimatedSection } from '@/components/shared/AnimatedSection';

const iconMap: Record<string, React.ElementType> = {
  'search-x': SearchX,
  'clock': Clock,
  'calendar-x': CalendarX,
};

export function Problem() {
  const { t } = useTranslation();
  const items = t('problem.items', { returnObjects: true }) as Array<{ icon: string; title: string; desc: string }>;

  return (
    <SectionWrapper alt id="problem">
      <AnimatedSection className="text-center mb-14">
        <h2 className="font-serif text-4xl sm:text-5xl font-bold text-[var(--fg)] mb-3">
          {t('problem.title')}
        </h2>
        <p className="text-2xl text-[var(--accent)] font-serif font-semibold">{t('problem.subtitle')}</p>
      </AnimatedSection>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {items.map((item, i) => {
          const Icon = iconMap[item.icon] ?? Clock;
          return (
            <AnimatedSection key={i} delay={i * 0.1}>
              <div className="rounded-xl border border-[var(--border)] bg-[var(--bg)] p-8 h-full flex flex-col gap-4">
                <div className="w-12 h-12 rounded-xl bg-[var(--bg-secondary)] flex items-center justify-center">
                  <Icon size={22} className="text-[var(--primary)]" />
                </div>
                <h3 className="text-lg font-semibold text-[var(--fg)]">{item.title}</h3>
                <p className="text-sm text-[var(--fg-muted)] leading-relaxed">{item.desc}</p>
              </div>
            </AnimatedSection>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
