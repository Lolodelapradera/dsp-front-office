import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="bg-[var(--bg-secondary)] border-t border-[var(--border)]">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 py-12">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <p className="font-serif text-lg font-bold text-[var(--fg)] mb-1">[Votre Nom]</p>
            <p className="text-sm text-[var(--fg-muted)]">{t('footer.tagline')}</p>
          </div>
          <nav className="flex flex-wrap gap-4 text-sm text-[var(--fg-muted)]">
            <Link to="/" className="hover:text-[var(--fg)] transition-colors">{t('nav.home')}</Link>
            <Link to="/#services" className="hover:text-[var(--fg)] transition-colors">{t('nav.services')}</Link>
            <Link to="/portfolio" className="hover:text-[var(--fg)] transition-colors">{t('nav.portfolio')}</Link>
            <Link to="/about" className="hover:text-[var(--fg)] transition-colors">{t('nav.about')}</Link>
            <Link to="/contact" className="hover:text-[var(--fg)] transition-colors">{t('nav.contact')}</Link>
          </nav>
        </div>
        <div className="mt-8 pt-6 border-t border-[var(--border)] flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-[var(--fg-muted)]">
          <span>{t('footer.copyright')}</span>
          <Link to="/legal" className="hover:text-[var(--fg)] transition-colors">{t('footer.legal')}</Link>
        </div>
      </div>
    </footer>
  );
}
