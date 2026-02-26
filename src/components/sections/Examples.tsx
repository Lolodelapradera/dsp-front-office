import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { SectionWrapper } from '@/components/shared/SectionWrapper';
import { AnimatedSection } from '@/components/shared/AnimatedSection';
import { Button } from '@/components/shared/Button';

const cardColors = ['#1E3A5F', '#2D5A8E', '#B8960C'];

export function Examples() {
  const { t } = useTranslation();
  const items = t('examples.items', { returnObjects: true }) as Array<{
    title: string; url: string; description: string; tags: string[];
  }>;

  return (
    <SectionWrapper id="examples">
      <AnimatedSection className="text-center mb-14">
        <h2 className="font-serif text-4xl sm:text-5xl font-bold text-[var(--fg)] mb-4">
          {t('examples.title')}
        </h2>
        <p className="text-lg text-[var(--fg-muted)] max-w-xl mx-auto">{t('examples.subtitle')}</p>
      </AnimatedSection>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {items.map((item, i) => (
          <AnimatedSection key={i} delay={i * 0.1}>
            <a href={item.url} target="_blank" rel="noopener noreferrer" className="block">
            <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-secondary)] overflow-hidden group cursor-pointer hover:shadow-lg transition-shadow">
              {/* Mock browser window */}
              <div className="h-40 relative" style={{ backgroundColor: cardColors[i % cardColors.length] }}>
                <div className="absolute top-3 left-3 flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-white/30" />
                  <div className="w-2.5 h-2.5 rounded-full bg-white/30" />
                  <div className="w-2.5 h-2.5 rounded-full bg-white/30" />
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <p className="font-serif text-2xl font-bold text-white/80">{item.title}</p>
                </div>
              </div>
              <div className="p-6">
                <p className="text-sm text-[var(--fg-muted)] leading-relaxed mb-4">{item.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {item.tags.map((tag) => (
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

      <AnimatedSection className="text-center">
        <Link to="/portfolio">
          <Button variant="outline" className="gap-2">
            Voir toutes les réalisations <ArrowRight size={16} />
          </Button>
        </Link>
      </AnimatedSection>
    </SectionWrapper>
  );
}
