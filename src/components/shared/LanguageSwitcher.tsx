import { useTranslation } from 'react-i18next';

export function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const current = i18n.language.startsWith('fr') ? 'fr' : 'en';
  const next = current === 'fr' ? 'en' : 'fr';
  return (
    <button
      onClick={() => i18n.changeLanguage(next)}
      className="text-sm font-medium text-[var(--fg-muted)] hover:text-[var(--fg)] transition-colors uppercase tracking-widest px-2 py-1 rounded"
      aria-label={`Switch to ${next === 'en' ? 'English' : 'Français'}`}
    >
      {next}
    </button>
  );
}
