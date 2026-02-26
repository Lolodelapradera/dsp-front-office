import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export function CallToAction() {
  const { t } = useTranslation();
  return (
    <section className="py-24 px-6 sm:px-8 bg-[var(--primary)]">
      <div className="mx-auto max-w-3xl text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="font-serif text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight"
        >
          {t('cta_section.title')}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-lg text-white/80 mb-10"
        >
          {t('cta_section.subtitle')}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Link to="/contact">
            <button className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white text-[var(--primary)] font-semibold text-base hover:bg-gray-50 transition-colors shadow-lg">
              {t('cta_section.cta')}
              <ArrowRight size={18} />
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
