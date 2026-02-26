import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { ThemeToggle } from '@/components/shared/ThemeToggle';
import { LanguageSwitcher } from '@/components/shared/LanguageSwitcher';
import { Button } from '@/components/shared/Button';
import { cn } from '@/lib/utils';

const navLinks = [
  { key: 'nav.services', to: '/#services' },
  { key: 'nav.portfolio', to: '/portfolio' },
  { key: 'nav.about', to: '/about' },
];

export function Navbar() {
  const { t } = useTranslation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const { scrollY } = useScroll();
  const bgOpacity = useTransform(scrollY, [0, 60], [0, 1]);

  const isActive = (to: string) => {
    const pathWithoutHash = to.split('#')[0];
    return location.pathname === pathWithoutHash || location.pathname === '/';
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <motion.div
        style={{ opacity: bgOpacity }}
        className="absolute inset-0 bg-[var(--bg)]/90 backdrop-blur-md border-b border-[var(--border)]"
      />
      <nav className="relative mx-auto max-w-7xl px-6 sm:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="font-serif text-xl font-bold text-[var(--fg)] hover:text-[var(--primary)] transition-colors">
          [Votre Nom]
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map(({ key, to }) => (
            <Link
              key={key}
              to={to}
              className={cn(
                'px-4 py-2 rounded-md text-sm font-medium transition-colors',
                isActive(to)
                  ? 'text-[var(--primary)]'
                  : 'text-[var(--fg-muted)] hover:text-[var(--fg)] hover:bg-[var(--bg-secondary)]'
              )}
            >
              {t(key)}
            </Link>
          ))}
        </div>

        {/* Right controls */}
        <div className="hidden md:flex items-center gap-2">
          <LanguageSwitcher />
          <ThemeToggle />
          <Link to="/contact">
            <Button size="sm">{t('nav.cta')}</Button>
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 rounded-md text-[var(--fg-muted)] hover:text-[var(--fg)] hover:bg-[var(--bg-secondary)]"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Menu"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden absolute top-16 left-0 right-0 bg-[var(--bg)] border-b border-[var(--border)] shadow-lg px-6 py-4 flex flex-col gap-2"
        >
          {navLinks.map(({ key, to }) => (
            <Link
              key={key}
              to={to}
              onClick={() => setMobileOpen(false)}
              className="py-2 text-sm font-medium text-[var(--fg-muted)] hover:text-[var(--fg)]"
            >
              {t(key)}
            </Link>
          ))}
          <div className="flex items-center gap-3 pt-2 border-t border-[var(--border)] mt-2">
            <LanguageSwitcher />
            <ThemeToggle />
            <Link to="/contact" onClick={() => setMobileOpen(false)} className="flex-1">
              <Button size="sm" className="w-full">{t('nav.cta')}</Button>
            </Link>
          </div>
        </motion.div>
      )}
    </header>
  );
}
