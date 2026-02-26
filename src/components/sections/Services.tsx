import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Check } from 'lucide-react';
import { SectionWrapper } from '@/components/shared/SectionWrapper';
import { AnimatedSection } from '@/components/shared/AnimatedSection';
import { Button } from '@/components/shared/Button';
import { cn } from '@/lib/utils';

const creationPlans = ['essential', 'premium'] as const;
const subscriptionPlans = ['hosting', 'unlimited'] as const;

function PlanCard({ planKey, featured = false, delay = 0 }: { planKey: string; featured?: boolean; delay?: number }) {
  const { t } = useTranslation();
  const features = t(`services.plans.${planKey}.features`, { returnObjects: true }) as string[];

  return (
    <AnimatedSection delay={delay}>
      <div className={cn(
        'rounded-2xl border p-8 flex flex-col h-full relative',
        featured
          ? 'border-[var(--accent)] bg-[var(--bg-secondary)] shadow-lg'
          : 'border-[var(--border)] bg-[var(--bg-secondary)]'
      )}>
        {featured && (
          <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-semibold bg-[var(--accent)] text-[var(--accent-fg)]">
            {t('services.popular_badge')}
          </span>
        )}
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-[var(--fg)] mb-3">
            {t(`services.plans.${planKey}.name`)}
          </h3>
          <div className="flex items-baseline gap-1 mb-1">
            <span className="font-serif text-4xl font-bold text-[var(--fg)]">
              {t(`services.plans.${planKey}.price`)}
            </span>
          </div>
          <span className="text-xs text-[var(--fg-muted)]">{t(`services.plans.${planKey}.period`)}</span>
          <p className="text-sm text-[var(--fg-muted)] mt-3 leading-relaxed">
            {t(`services.plans.${planKey}.description`)}
          </p>
        </div>
        <ul className="space-y-2.5 mb-8 flex-1">
          {features.map((feature, fi) => (
            <li key={fi} className="flex items-start gap-2.5 text-sm text-[var(--fg)]">
              <Check size={16} className="text-[var(--accent)] mt-0.5 shrink-0" />
              {feature}
            </li>
          ))}
        </ul>
        <Link to="/contact">
          <Button
            variant={featured ? 'primary' : 'outline'}
            className="w-full"
          >
            {t(`services.plans.${planKey}.cta`)}
          </Button>
        </Link>
      </div>
    </AnimatedSection>
  );
}

export function Services() {
  const { t } = useTranslation();

  return (
    <SectionWrapper id="services">
      <AnimatedSection className="text-center mb-14">
        <h2 className="font-serif text-4xl sm:text-5xl font-bold text-[var(--fg)] mb-4">
          {t('services.title')}
        </h2>
        <p className="text-lg text-[var(--fg-muted)] max-w-xl mx-auto">{t('services.subtitle')}</p>
      </AnimatedSection>

      {/* Création */}
      <AnimatedSection className="mb-4">
        <h3 className="text-sm font-semibold text-[var(--fg-muted)] uppercase tracking-widest mb-6 text-center">
          {t('services.creation_title')}
        </h3>
      </AnimatedSection>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-16">
        {creationPlans.map((key, i) => (
          <PlanCard key={key} planKey={key} featured={key === 'premium'} delay={i * 0.1} />
        ))}
      </div>

      {/* Abonnements */}
      <AnimatedSection className="mb-4">
        <h3 className="text-sm font-semibold text-[var(--fg-muted)] uppercase tracking-widest mb-6 text-center">
          {t('services.subscription_title')}
        </h3>
      </AnimatedSection>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {subscriptionPlans.map((key, i) => (
          <PlanCard key={key} planKey={key} featured={key === 'unlimited'} delay={i * 0.1} />
        ))}
      </div>
    </SectionWrapper>
  );
}
