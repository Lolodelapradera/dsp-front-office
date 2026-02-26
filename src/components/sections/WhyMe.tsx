import { useTranslation } from 'react-i18next';
import { Target, Zap, Globe, Handshake } from 'lucide-react';
import { SectionWrapper } from '@/components/shared/SectionWrapper';
import { AnimatedSection } from '@/components/shared/AnimatedSection';

const iconMap: Record<string, React.ElementType> = {
  target: Target, zap: Zap, globe: Globe, handshake: Handshake,
};

export function WhyMe() {
  const { t } = useTranslation();
  const items = t('whyme.items', { returnObjects: true }) as Array<{ icon: string; title: string; desc: string }>;

  return (
    <SectionWrapper alt id="whyme">
      <AnimatedSection className="text-center mb-14">
        <h2 className="font-serif text-4xl sm:text-5xl font-bold text-[var(--fg)] mb-4">
          {t('whyme.title')}
        </h2>
        <p className="text-lg text-[var(--fg-muted)]">{t('whyme.subtitle')}</p>
      </AnimatedSection>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {items.map((item, i) => {
          const Icon = iconMap[item.icon] ?? Target;
          return (
            <AnimatedSection key={i} delay={i * 0.1}>
              <div className="rounded-xl bg-[var(--bg)] border border-[var(--border)] p-8 flex gap-5 h-full">
                <div className="shrink-0 w-12 h-12 rounded-xl bg-[var(--primary)] flex items-center justify-center">
                  <Icon size={20} className="text-white" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-[var(--fg)] mb-2">{item.title}</h3>
                  <p className="text-sm text-[var(--fg-muted)] leading-relaxed">{item.desc}</p>
                </div>
              </div>
            </AnimatedSection>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
