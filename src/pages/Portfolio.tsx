import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SectionWrapper } from '@/components/shared/SectionWrapper';
import { AnimatedSection } from '@/components/shared/AnimatedSection';
import { CallToAction } from '@/components/sections/CallToAction';

const portfolioItems = [
  { title: 'Desprairies Avocat', url: 'https://www.desprairiesavocat.fr', color: '#1E3A5F', tags: ['Droit fiscal', 'Vitrine', 'Prise de RDV'] },
];

export function Portfolio() {
  const { t } = useTranslation();

  return (
    <>
      <section className="pt-32 pb-8 px-6 sm:px-8 bg-[var(--bg)]">
        <div className="mx-auto max-w-7xl text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="inline-block text-xs font-semibold text-[var(--accent)] tracking-widest uppercase mb-4">
              {t('portfolio.badge')}
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[var(--fg)] mb-4">
              {t('portfolio.title')}
            </h1>
            <p className="text-lg text-[var(--fg-muted)] max-w-xl mx-auto">
              {t('portfolio.subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      <SectionWrapper>
        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolioItems.map((item, i) => (
            <AnimatedSection key={item.title} delay={i * 0.05}>
              <a href={item.url} target="_blank" rel="noopener noreferrer" className="block">
                <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-secondary)] overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="h-36 relative flex items-center justify-center" style={{ backgroundColor: item.color }}>
                    <div className="absolute top-3 left-3 flex gap-1">
                      <div className="w-2 h-2 rounded-full bg-white/30" />
                      <div className="w-2 h-2 rounded-full bg-white/30" />
                      <div className="w-2 h-2 rounded-full bg-white/30" />
                    </div>
                    <p className="font-serif text-xl font-bold text-white/80">{item.title}</p>
                  </div>
                  <div className="p-5">
                    <div className="flex flex-wrap gap-1.5">
                      {item.tags.map(tag => (
                        <span key={tag} className="text-xs text-[var(--fg-muted)] border border-[var(--border)] px-2 py-0.5 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </a>
            </AnimatedSection>
          ))}
        </div>

        {/* CTA */}
        <AnimatedSection className="text-center mt-16">
          <h3 className="font-serif text-2xl font-bold text-[var(--fg)] mb-4">{t('portfolio.cta_title')}</h3>
          <Link to="/contact">
            <button className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[var(--primary)] text-white font-medium hover:bg-[var(--primary-light)] transition-colors">
              {t('portfolio.cta')}
            </button>
          </Link>
        </AnimatedSection>
      </SectionWrapper>

      <CallToAction />
    </>
  );
}
