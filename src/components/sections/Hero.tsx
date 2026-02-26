import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowDown, Sparkles } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/shared/Button';

export function Hero() {
  const { t } = useTranslation();
  const stats = t('hero.stats', { returnObjects: true }) as Array<{ value: string; label: string }>;

  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center text-center px-6 sm:px-8 pt-24 pb-16 bg-[var(--bg)] overflow-hidden">
      {/* Subtle background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-[var(--primary)] opacity-[0.04] blur-3xl" />
      </div>

      <div className="relative max-w-4xl mx-auto">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[var(--border)] bg-[var(--bg-secondary)] text-sm text-[var(--fg-muted)] mb-8"
        >
          <Sparkles size={14} className="text-[var(--accent)]" />
          {t('hero.badge')}
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold text-[var(--fg)] leading-tight mb-6"
        >
          {t('hero.headline')}
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg sm:text-xl text-[var(--fg-muted)] max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          {t('hero.subheadline')}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
        >
          <Link to="/#services">
            <Button size="lg">{t('hero.cta_primary')}</Button>
          </Link>
          <Link to="/contact">
            <Button size="lg" variant="outline">{t('hero.cta_secondary')}</Button>
          </Link>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-3 gap-6 max-w-sm mx-auto"
        >
          {stats.map((stat, i) => (
            <div key={i} className="text-center">
              <div className="font-serif text-2xl font-bold text-[var(--primary)]">{stat.value}</div>
              <div className="text-xs text-[var(--fg-muted)] mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-[var(--fg-muted)]"
      >
        <span className="text-xs tracking-widest uppercase">{t('hero.scroll_hint')}</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
        >
          <ArrowDown size={16} />
        </motion.div>
      </motion.div>
    </section>
  );
}
