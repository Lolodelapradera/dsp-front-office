import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Ear, Layout, Rocket, ShieldCheck, ArrowRight } from 'lucide-react';
import { SectionWrapper } from '@/components/shared/SectionWrapper';
import { AnimatedSection } from '@/components/shared/AnimatedSection';
import { Button } from '@/components/shared/Button';
import { CallToAction } from '@/components/sections/CallToAction';

const iconMap: Record<string, React.ElementType> = {
  ear: Ear, layout: Layout, rocket: Rocket, 'shield-check': ShieldCheck,
};

export function About() {
  const { t } = useTranslation();
  const values = t('about.values', { returnObjects: true }) as Array<{ icon: string; title: string; desc: string }>;

  return (
    <>
      {/* Hero about */}
      <section className="pt-32 pb-16 px-6 sm:px-8 bg-[var(--bg)]">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
          >
            {/* Photo placeholder */}
            <div className="order-2 lg:order-1">
              <div className="rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border)] aspect-[4/3] flex items-center justify-center">
                <div className="text-center text-[var(--fg-muted)]">
                  <div className="w-24 h-24 rounded-full bg-[var(--primary)]/20 mx-auto mb-4 flex items-center justify-center">
                    <span className="font-serif text-4xl font-bold text-[var(--primary)]">VN</span>
                  </div>
                  <p className="text-sm">Photo à venir</p>
                </div>
              </div>
            </div>

            {/* Text */}
            <div className="order-1 lg:order-2">
              <span className="inline-block text-xs font-semibold text-[var(--accent)] tracking-widest uppercase mb-4">
                {t('about.badge')}
              </span>
              <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[var(--fg)] mb-8 leading-tight">
                {t('about.title')}
              </h1>
              <div className="space-y-4 text-[var(--fg-muted)] leading-relaxed mb-8">
                <p>{t('about.bio_1')}</p>
                <p>{t('about.bio_2')}</p>
                <p>{t('about.bio_3')}</p>
              </div>
              <Link to="/contact">
                <Button size="lg" className="gap-2">
                  {t('about.cta')} <ArrowRight size={16} />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <SectionWrapper alt>
        <AnimatedSection className="text-center mb-12">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[var(--fg)]">
            {t('about.values_title')}
          </h2>
        </AnimatedSection>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {values.map((val, i) => {
            const Icon = iconMap[val.icon] ?? Rocket;
            return (
              <AnimatedSection key={i} delay={i * 0.1}>
                <div className="rounded-xl bg-[var(--bg)] border border-[var(--border)] p-6 flex gap-4">
                  <div className="shrink-0 w-10 h-10 rounded-lg bg-[var(--primary)] flex items-center justify-center">
                    <Icon size={18} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[var(--fg)] mb-1">{val.title}</h3>
                    <p className="text-sm text-[var(--fg-muted)] leading-relaxed">{val.desc}</p>
                  </div>
                </div>
              </AnimatedSection>
            );
          })}
        </div>
      </SectionWrapper>

      <CallToAction />
    </>
  );
}
