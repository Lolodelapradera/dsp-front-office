import { useTranslation } from 'react-i18next';
import { Quote } from 'lucide-react';
import { SectionWrapper } from '@/components/shared/SectionWrapper';
import { AnimatedSection } from '@/components/shared/AnimatedSection';

export function Testimonials() {
  const { t } = useTranslation();
  const items = t('testimonials.items', { returnObjects: true }) as Array<{
    text: string; name: string; role: string; company: string;
  }>;

  return (
    <SectionWrapper alt id="testimonials">
      <AnimatedSection className="text-center mb-14">
        <h2 className="font-serif text-4xl sm:text-5xl font-bold text-[var(--fg)] mb-4">
          {t('testimonials.title')}
        </h2>
        <p className="text-lg text-[var(--fg-muted)]">{t('testimonials.subtitle')}</p>
      </AnimatedSection>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {items.map((item, i) => {
          const initials = item.name.split(' ').map(n => n[0]).join('').slice(0, 2);
          return (
            <AnimatedSection key={i} delay={i * 0.1}>
              <div className="rounded-xl bg-[var(--bg)] border border-[var(--border)] p-8 flex flex-col h-full">
                <Quote size={28} className="text-[var(--accent)] mb-5 opacity-70" />
                <p className="text-sm text-[var(--fg)] leading-relaxed flex-1 mb-6 italic">
                  "{item.text}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[var(--primary)] flex items-center justify-center text-white text-xs font-semibold shrink-0">
                    {initials}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[var(--fg)]">{item.name}</p>
                    <p className="text-xs text-[var(--fg-muted)]">{item.role} · {item.company}</p>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
