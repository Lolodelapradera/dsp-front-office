import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Mail, Clock } from 'lucide-react';
import { ContactForm } from '@/components/shared/ContactForm';

export function Contact() {
  const { t } = useTranslation();
  return (
    <section className="min-h-screen pt-32 pb-24 px-6 sm:px-8 bg-[var(--bg)]">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-center mb-16">
          <span className="inline-block text-xs font-semibold text-[var(--accent)] tracking-widest uppercase mb-4">
            {t('contact.badge')}
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[var(--fg)] mb-4">
            {t('contact.title')}
          </h1>
          <p className="text-lg text-[var(--fg-muted)] max-w-xl mx-auto">
            {t('contact.subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-3"
          >
            <div className="bg-[var(--bg-secondary)] rounded-2xl border border-[var(--border)] p-8">
              <ContactForm />
            </div>
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-2 flex flex-col gap-6"
          >
            <div className="rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border)] p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-lg bg-[var(--primary)] flex items-center justify-center">
                  <Mail size={16} className="text-white" />
                </div>
                <p className="text-sm font-semibold text-[var(--fg)]">{t('contact.direct_title')}</p>
              </div>
              <a href={`mailto:${t('contact.email')}`} className="text-[var(--primary)] hover:underline text-sm">
                {t('contact.email')}
              </a>
            </div>

            <div className="rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border)] p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-lg bg-[var(--primary)] flex items-center justify-center">
                  <Clock size={16} className="text-white" />
                </div>
                <p className="text-sm font-semibold text-[var(--fg)]">Délai de réponse</p>
              </div>
              <p className="text-sm text-[var(--fg-muted)]">{t('contact.response_time')}</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
