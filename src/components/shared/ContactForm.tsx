import { useState, type FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from './Button';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/VOTRE_ID';

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

export function ContactForm() {
  const { t } = useTranslation();
  const [status, setStatus] = useState<FormStatus>('idle');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');
    const form = e.currentTarget;
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      });
      if (res.ok) { setStatus('success'); form.reset(); }
      else setStatus('error');
    } catch { setStatus('error'); }
  };

  if (status === 'success') {
    return (
      <div className="rounded-xl bg-[var(--bg-secondary)] border border-[var(--border)] p-10 text-center">
        <CheckCircle className="mx-auto mb-4 text-green-500" size={40} />
        <p className="text-lg font-medium text-[var(--fg)]">{t('contact.success')}</p>
      </div>
    );
  }

  const inputClass = "w-full px-4 py-3 rounded-lg bg-[var(--bg)] border border-[var(--border)] text-[var(--fg)] placeholder:text-[var(--fg-muted)] focus:outline-none focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)] transition-colors text-sm";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Honeypot */}
      <input type="text" name="_gotcha" className="hidden" tabIndex={-1} autoComplete="off" />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-[var(--fg)] mb-1.5">
            {t('contact.form.name')} <span className="text-[var(--accent)]">*</span>
          </label>
          <input id="name" name="name" type="text" required minLength={2} placeholder={t('contact.form.name_placeholder')} className={inputClass} />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-[var(--fg)] mb-1.5">
            {t('contact.form.email')} <span className="text-[var(--accent)]">*</span>
          </label>
          <input id="email" name="email" type="email" required placeholder={t('contact.form.email_placeholder')} className={inputClass} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="firm" className="block text-sm font-medium text-[var(--fg)] mb-1.5">
            {t('contact.form.firm')}
          </label>
          <input id="firm" name="firm" type="text" placeholder={t('contact.form.firm_placeholder')} className={inputClass} />
        </div>
        <div>
          <label htmlFor="profession" className="block text-sm font-medium text-[var(--fg)] mb-1.5">
            {t('contact.form.profession')}
          </label>
          <input id="profession" name="profession" type="text" placeholder={t('contact.form.profession_placeholder')} className={inputClass} />
        </div>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-[var(--fg)] mb-1.5">
          {t('contact.form.message')} <span className="text-[var(--accent)]">*</span>
        </label>
        <textarea id="message" name="message" required rows={5} minLength={20} placeholder={t('contact.form.message_placeholder')} className={`${inputClass} resize-none`} />
      </div>

      {status === 'error' && (
        <div className="flex items-center gap-2 text-sm text-red-500">
          <AlertCircle size={16} />
          <span>{t('contact.error')}</span>
        </div>
      )}

      <Button type="submit" size="lg" disabled={status === 'submitting'} className="w-full gap-2">
        <Send size={16} />
        {status === 'submitting' ? t('contact.form.submitting') : t('contact.form.submit')}
      </Button>
    </form>
  );
}
