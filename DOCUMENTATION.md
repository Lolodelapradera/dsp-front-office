# Documentation — Site Vitrine Développeur Web (Clients : Professionnels de Services)

> **Objectif :** Site personnel de développeur freelance, ciblant les professionnels de services (avocats, architectes, consultants, thérapeutes, experts-comptables, notaires…).
> **Contrainte principale :** Application React statique, déployée sur GitHub Pages. Zéro serveur, zéro base de données.

---

## Table des matières

1. [Vue d'ensemble du projet](#1-vue-densemble-du-projet)
2. [Stack technique](#2-stack-technique)
3. [Architecture du site](#3-architecture-du-site)
4. [Structure du projet](#4-structure-du-projet)
5. [Configuration Vite + GitHub Pages](#5-configuration-vite--github-pages)
6. [Tailwind CSS v4 — Configuration complète](#6-tailwind-css-v4--configuration-complète)
7. [Dark / Light Mode — Context React](#7-dark--light-mode--context-react)
8. [Internationalisation FR/EN — react-i18next](#8-internationalisation-fren--react-i18next)
9. [Routing — React Router v6 (HashRouter)](#9-routing--react-router-v6-hashrouter)
10. [Design System](#10-design-system)
11. [Formulaire de contact — Options statiques](#11-formulaire-de-contact--options-statiques)
12. [Animations — Framer Motion](#12-animations--framer-motion)
13. [Performance & Optimisation](#13-performance--optimisation)
14. [Déploiement GitHub Pages](#14-déploiement-github-pages)
15. [Domaine custom `.fr`](#15-domaine-custom-fr)
16. [Checklist production](#16-checklist-production)
17. [Roadmap de développement](#17-roadmap-de-développement)
18. [Setup initial pas-à-pas](#18-setup-initial-pas-à-pas)
19. [Architecture du produit client (site avocat type)](#19-architecture-du-produit-client)

---

## 1. Vue d'ensemble du projet

### Contexte

Site personnel de développeur freelance servant de vitrine commerciale. Niche : **professionnels de services** (avocats, architectes, consultants, thérapeutes, experts-comptables, notaires…) cherchant une présence web sobre et professionnelle.

### Contraintes architecture

| Contrainte | Détail |
|---|---|
| **Statique uniquement** | Pas de serveur Node, pas d'API routes, pas de SSR |
| **GitHub Pages** | Hébergement gratuit, HTTPS auto, fichiers `dist/` servis |
| **Pas d'env vars runtime** | Tout le contenu est hardcodé ou en fichiers JSON |
| **Performance < 1s** | Images optimisées, lazy loading, code splitting Vite |
| **Mobile-first** | Breakpoints Tailwind sm→lg, touch-friendly |

### Ce que votre site vend

Des **sites vitrines clé-en-main** pour professionnels de services :
- Page À propos (présentation du professionnel ou de la structure)
- Prise de rendez-vous (Cal.com embed ou Calendly)
- Formulaire de contact
- Présentation des domaines d'expertise / services proposés
- Bilingue FR/EN (optionnel selon offre)

### Persona client (le professionnel de services)

- 30–60 ans, indépendant ou petite structure (2–10 personnes)
- Profil : avocat, architecte, consultant, thérapeute, expert-comptable, notaire…
- Peu technique, veut que ça marche
- Sensible à la réputation et au professionnalisme
- Sans site ou avec un site vieilli/insatisfaisant

---

## 2. Stack technique

### Stack obligatoire

| Technologie | Version | Usage | Justification |
|---|---|---|---|
| **React** | 18+ | UI framework | Standard, écosystème riche |
| **Vite** | 6.x | Build tool | Rapide, optimisé, GitHub Pages-ready |
| **TypeScript** | 5.x | Typage | Maintenabilité, autocomplétion |
| **Tailwind CSS** | v4.x | Styles | Config PostCSS, dark mode natif |
| **React Router** | v6 | Navigation SPA | HashRouter → compatible GitHub Pages sans config serveur |
| **react-i18next** | 15.x | i18n FR/EN | Client-side, pas de serveur requis |
| **Framer Motion** | 12.x | Animations | Fluides, performantes |
| **lucide-react** | latest | Icônes | Léger, cohérent |

### Formulaire de contact (statique, sans serveur)

| Option | Service | Limite gratuite | Recommandation |
|---|---|---|---|
| **Formspree** | formspree.io | 50 submissions/mois | ✅ **Recommandé** — compatible GitHub Pages |
| **mailto simple** | Natif navigateur | Illimité | OK pour MVP, pas de validation |
| **Web3Forms** | web3forms.com | 250/mois | Alternative à Formspree |
| ~~Netlify Forms~~ | ~~netlify.com~~ | — | ❌ **Incompatible** — fonctionne uniquement sur Netlify |
| ~~Resend~~ | ~~resend.com~~ | — | ❌ **Impossible** — nécessite un serveur Node |

> **Pourquoi Netlify Forms est incompatible avec GitHub Pages :** Netlify Forms intercepte les requêtes POST au niveau de leur CDN lors du build Netlify. Ce mécanisme n'existe pas sur GitHub Pages. Si vous préférez Netlify Forms, il faut migrer l'hébergement vers Netlify (gratuit également).

### Dépendances optionnelles

| Feature | Solution |
|---|---|
| Prise de RDV | Cal.com embed script ou Calendly widget |
| Analytics RGPD-friendly | Plausible ou Umami (self-hosted) |
| Images responsive | `vite-imagetools` ou traitement manuel WebP |

### Versions Node

```
Node.js  >= 20.x (LTS)
npm      >= 10.x
```

---

## 3. Architecture du site

### 4 pages

```
/           (#/)          → Home        — Landing page principale
/services   (#/services)  → Services    — Détail des offres et tarifs
/portfolio  (#/portfolio) → Portfolio   — Mockups et exemples de sites avocats
/contact    (#/contact)   → Contact     — Formulaire + informations
```

> Les URLs avec `#` sont dues au HashRouter (voir section 9). Propres, sans configuration serveur.

### Wireframe — Page Home

```
┌─────────────────────────────────────────────────────────┐
│  NAVBAR (sticky, blur backdrop)                         │
│  [Logo] ············· [Services] [Portfolio] [Contact]  │
│                              [FR | EN]  [☀️/🌙]        │
├─────────────────────────────────────────────────────────┤
│  HERO                                           100vh   │
│                                                         │
│  "Votre activité mérite                                 │
│   un site à sa hauteur."                               │
│                                                         │
│  Spécialiste en sites web pour professionnels.         │
│  Simple. Professionnel. Livré en 3 semaines.           │
│                                                         │
│  [ Voir les offres ]    [ Prendre contact ]            │
│                                                         │
│  ↓ scroll indicator                                    │
├─────────────────────────────────────────────────────────┤
│  PROBLÈME (section accroche)                           │
│                                                         │
│  "Vos clients vous cherchent en ligne."                │
│  "Que trouvent-ils ?"                                  │
│                                                         │
│  [❌ Pas de site]  [😐 Site vieilli]  [📉 Pas de RDV] │
├─────────────────────────────────────────────────────────┤
│  SERVICES (3 cartes)                                   │
│                                                         │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐            │
│  │ Essentiel│  │ Premium  │  │ Support  │            │
│  │   X€     │  │   X€     │  │  /mois   │            │
│  │ • ...    │  │ • ...    │  │ • ...    │            │
│  │ [Choisir]│  │ [Choisir]│  │ [Choisir]│            │
│  └──────────┘  └──────────┘  └──────────┘            │
├─────────────────────────────────────────────────────────┤
│  POURQUOI MOI (4 arguments)                            │
│                                                         │
│  🎯 Spécialisé  ⚡ 3 semaines  🌍 FR/EN  🤝 Suivi    │
├─────────────────────────────────────────────────────────┤
│  APERÇU (mockup interactif dark/light)                 │
│  Screenshot ou démo animée d'un site avocat type       │
├─────────────────────────────────────────────────────────┤
│  TÉMOIGNAGES (à compléter)                             │
├─────────────────────────────────────────────────────────┤
│  CTA FINAL                                             │
│  "Prêt à donner une image professionnelle à            │
│   votre cabinet ?"                                     │
│                          [ Discutons de votre projet ] │
├─────────────────────────────────────────────────────────┤
│  FOOTER                                                │
│  © 2026 [Nom]  ·  Mentions légales  ·  [FR | EN]      │
└─────────────────────────────────────────────────────────┘
```

---

## 4. Structure du projet

```
front-view/
├── public/
│   ├── favicon.ico
│   ├── og-image.jpg          # 1200×630 — Open Graph
│   ├── robots.txt
│   └── CNAME                 # Domaine custom GitHub Pages (optionnel)
│
├── src/
│   ├── assets/
│   │   └── images/
│   │       ├── avatar.webp   # Votre photo (format WebP, < 100ko)
│   │       └── mockups/      # Screenshots sites avocats
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── MobileMenu.tsx
│   │   ├── sections/         # Sections de la page Home
│   │   │   ├── Hero.tsx
│   │   │   ├── Problem.tsx
│   │   │   ├── Services.tsx
│   │   │   ├── WhyMe.tsx
│   │   │   ├── SitePreview.tsx
│   │   │   ├── Testimonials.tsx
│   │   │   └── CallToAction.tsx
│   │   └── shared/
│   │       ├── ThemeToggle.tsx
│   │       ├── LanguageSwitcher.tsx
│   │       ├── ContactForm.tsx
│   │       └── SectionWrapper.tsx
│   │
│   ├── pages/
│   │   ├── Home.tsx
│   │   ├── Services.tsx
│   │   ├── Portfolio.tsx
│   │   └── Contact.tsx
│   │
│   ├── context/
│   │   └── ThemeContext.tsx   # Dark/light mode (custom, sans lib externe)
│   │
│   ├── i18n/
│   │   ├── index.ts           # Config react-i18next
│   │   ├── fr.json
│   │   └── en.json
│   │
│   ├── hooks/
│   │   └── useTheme.ts
│   │
│   ├── types/
│   │   └── index.ts
│   │
│   ├── lib/
│   │   └── utils.ts           # cn() + helpers
│   │
│   ├── App.tsx                # Router + Providers
│   ├── main.tsx               # Point d'entrée
│   └── index.css              # Tailwind v4 + CSS custom properties
│
├── index.html
├── vite.config.ts
├── tsconfig.json
├── tsconfig.node.json
├── postcss.config.js
├── eslint.config.js
├── .github/
│   └── workflows/
│       └── deploy.yml         # GitHub Actions → auto-deploy
└── package.json
```

---

## 5. Configuration Vite + GitHub Pages

### `vite.config.ts`

```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],

  // ⚠️ CRITIQUE pour GitHub Pages
  // Remplacer 'front-view' par le nom exact de votre repo GitHub
  base: '/front-view/',

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },

  build: {
    // Dossier de sortie (servi par GitHub Pages)
    outDir: 'dist',
    // Supprimer le dossier dist avant chaque build
    emptyOutDir: true,
    rollupOptions: {
      output: {
        // Code splitting manuel pour améliorer le cache navigateur
        manualChunks: {
          'vendor-react': ['react', 'react-dom'],
          'vendor-router': ['react-router-dom'],
          'vendor-i18n': ['i18next', 'react-i18next'],
          'vendor-motion': ['framer-motion'],
        },
      },
    },
  },

  server: {
    port: 5173,
    open: true,
  },
});
```

### `postcss.config.js`

```javascript
export default {
  plugins: {
    '@tailwindcss/postcss': {},
  },
};
```

> **Note :** Avec le plugin Vite `@tailwindcss/vite`, PostCSS n'est pas strictement nécessaire si on passe par Vite. Mais le fichier `postcss.config.js` assure la compatibilité avec des outils tiers (lint, scripts externes).

### `package.json` — Scripts clés

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "preview": "vite preview",
    "lint": "eslint . --ext ts,tsx",
    "deploy": "npm run build && gh-pages -d dist"
  }
}
```

---

## 6. Tailwind CSS v4 — Configuration complète

### Installation

```bash
npm install tailwindcss @tailwindcss/vite
# PostCSS (optionnel mais recommandé)
npm install @tailwindcss/postcss postcss
```

### `src/index.css` — Configuration complète

Tailwind v4 abandonne le fichier `tailwind.config.js` au profit de la configuration CSS-first :

```css
/* ─── Import Tailwind v4 ─────────────────────────── */
@import "tailwindcss";

/* ─── Police Google Fonts (auto-hébergé via Vite) ── */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@600;700&display=swap');

/* ─── Variant dark (classe sur <html>) ───────────── */
@custom-variant dark (&:where(.dark, .dark *));

/* ─── Tokens design — thème clair ───────────────── */
:root {
  --bg:              #FAFAFA;
  --bg-secondary:    #F4F4F6;
  --fg:              #1A1A2E;
  --fg-muted:        #6B7280;
  --primary:         #1E3A5F;
  --primary-light:   #2D5A8E;
  --primary-fg:      #FFFFFF;
  --accent:          #B8960C;
  --accent-fg:       #FFFFFF;
  --border:          #E2E8F0;
  --border-strong:   #CBD5E1;
  --shadow:          0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04);
  --shadow-md:       0 4px 6px rgba(0,0,0,0.07), 0 2px 4px rgba(0,0,0,0.06);
  --radius:          0.5rem;
  --font-sans:       'Inter', system-ui, sans-serif;
  --font-serif:      'Playfair Display', Georgia, serif;
}

/* ─── Tokens design — thème sombre ──────────────── */
.dark {
  --bg:              #0F1117;
  --bg-secondary:    #171B26;
  --fg:              #F2F2F5;
  --fg-muted:        #9CA3AF;
  --primary:         #7BA7D4;
  --primary-light:   #93BDE0;
  --primary-fg:      #0D1B2A;
  --accent:          #E5C450;
  --accent-fg:       #1A1200;
  --border:          #2D3340;
  --border-strong:   #3D4558;
  --shadow:          0 1px 3px rgba(0,0,0,0.4), 0 1px 2px rgba(0,0,0,0.3);
  --shadow-md:       0 4px 6px rgba(0,0,0,0.35), 0 2px 4px rgba(0,0,0,0.25);
}

/* ─── Reset global ───────────────────────────────── */
*,
*::before,
*::after {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
  /* Transition douce entre les thèmes */
  transition: background-color 0.2s ease, color 0.2s ease;
}

body {
  background-color: var(--bg);
  color: var(--fg);
  font-family: var(--font-sans);
  font-size: 1rem;
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* ─── Utilitaires custom ─────────────────────────── */
@layer utilities {
  .font-serif  { font-family: var(--font-serif); }
  .text-fg     { color: var(--fg); }
  .text-muted  { color: var(--fg-muted); }
  .bg-page     { background-color: var(--bg); }
  .bg-card     { background-color: var(--bg-secondary); }
  .border-main { border-color: var(--border); }
}

/* ─── Focus visible accessible ───────────────────── */
:focus-visible {
  outline: 2px solid var(--primary);
  outline-offset: 2px;
  border-radius: var(--radius);
}

/* ─── Scrollbar custom (subtile) ─────────────────── */
::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-track { background: var(--bg); }
::-webkit-scrollbar-thumb { background: var(--border-strong); border-radius: 3px; }
```

---

## 7. Dark / Light Mode — Context React

Pas de librairie externe. Solution légère basée sur `localStorage` + classe CSS sur `<html>`.

### `src/context/ThemeContext.tsx`

```typescript
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextValue {
  theme: Theme;
  toggle: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

function getInitialTheme(): Theme {
  // 1. Préférence sauvegardée
  const stored = localStorage.getItem('theme') as Theme | null;
  if (stored === 'light' || stored === 'dark') return stored;
  // 2. Préférence système
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggle = () => setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));

  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}
```

### `src/components/shared/ThemeToggle.tsx`

```typescript
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

export function ThemeToggle() {
  const { theme, toggle } = useTheme();

  return (
    <button
      onClick={toggle}
      className="rounded-md p-2 text-[var(--fg-muted)] hover:text-[var(--fg)] hover:bg-[var(--bg-secondary)] transition-colors"
      aria-label={theme === 'dark' ? 'Passer en mode clair' : 'Passer en mode sombre'}
    >
      {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}
```

### Initialisation sans flash (script inline dans `index.html`)

Injecter ce script **avant** le chargement React pour éviter le flash de thème au rechargement :

```html
<!-- index.html — dans <head>, AVANT les scripts Vite -->
<script>
  (function () {
    var stored = localStorage.getItem('theme');
    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    var theme = stored || (prefersDark ? 'dark' : 'light');
    document.documentElement.classList.add(theme);
  })();
</script>
```

---

## 8. Internationalisation FR/EN — react-i18next

### Installation

```bash
npm install i18next react-i18next i18next-browser-languagedetector
```

### `src/i18n/index.ts`

```typescript
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import fr from './fr.json';
import en from './en.json';

i18n
  .use(LanguageDetector)       // Détecte la langue du navigateur
  .use(initReactI18next)
  .init({
    resources: {
      fr: { translation: fr },
      en: { translation: en },
    },
    fallbackLng: 'fr',
    supportedLngs: ['fr', 'en'],
    interpolation: {
      escapeValue: false,      // React escape déjà par défaut
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
  });

export default i18n;
```

### `src/i18n/fr.json`

```json
{
  "nav": {
    "services": "Services",
    "portfolio": "Réalisations",
    "contact": "Contact",
    "cta": "Prendre contact"
  },
  "hero": {
    "headline": "Votre activité mérite un site à sa hauteur.",
    "subheadline": "Spécialiste en sites web pour professionnels. Simple, professionnel, livré en 3 semaines.",
    "cta_primary": "Voir les offres",
    "cta_secondary": "Prendre contact",
    "scroll_hint": "Découvrir"
  },
  "problem": {
    "title": "Vos clients vous cherchent en ligne.",
    "subtitle": "Que trouvent-ils ?",
    "items": [
      { "icon": "❌", "title": "Aucun site", "desc": "Vous êtes invisible en ligne." },
      { "icon": "😐", "title": "Site vieilli", "desc": "L'image ne reflète pas votre expertise." },
      { "icon": "📉", "title": "Pas de prise de RDV", "desc": "Vous perdez des clients avant même de les rencontrer." }
    ]
  },
  "services": {
    "title": "Mes offres",
    "subtitle": "Des sites taillés pour les professionnels de services.",
    "essential": {
      "name": "Essentiel",
      "price": "1 490 €",
      "description": "La présence en ligne indispensable.",
      "features": [
        "5 pages (Accueil, À propos, Services, RDV, Contact)",
        "Design sobre et professionnel",
        "Responsive mobile",
        "Formulaire de contact",
        "Livraison en 2 semaines"
      ],
      "cta": "Choisir cette offre"
    },
    "premium": {
      "name": "Premium",
      "price": "2 490 €",
      "description": "Un site complet qui convertit.",
      "features": [
        "Tout l'Essentiel +",
        "Bilingue FR/EN",
        "Prise de RDV en ligne (Cal.com)",
        "Animations et design sur-mesure",
        "SEO de base",
        "Livraison en 3-4 semaines"
      ],
      "cta": "Choisir cette offre",
      "badge": "Populaire"
    },
    "support": {
      "name": "Support & Évolutions",
      "price": "Dès 99 €/mois",
      "description": "Je m'occupe de tout, vous vous concentrez sur votre activité.",
      "features": [
        "Mises à jour de contenu",
        "Hébergement et nom de domaine",
        "Surveillance et sécurité",
        "Évolutions mineures incluses"
      ],
      "cta": "En savoir plus"
    }
  },
  "whyme": {
    "title": "Pourquoi me choisir ?",
    "items": [
      { "icon": "🎯", "title": "Spécialisé professionnels de services", "desc": "Je comprends vos enjeux : crédibilité, génération de contacts, image professionnelle." },
      { "icon": "⚡", "title": "Livraison rapide", "desc": "Votre site en ligne en 2 à 4 semaines, pas en 6 mois." },
      { "icon": "🌍", "title": "Bilingue FR/EN", "desc": "Pour les professionnels qui travaillent avec des clients internationaux." },
      { "icon": "🤝", "title": "Suivi inclus", "desc": "Un interlocuteur unique, disponible et réactif après la livraison." }
    ]
  },
  "contact": {
    "title": "Discutons de votre projet",
    "subtitle": "Répondez à quelques questions, je vous reviens sous 24h.",
    "fields": {
      "name": "Nom complet",
      "email": "Adresse email",
      "firm": "Nom du cabinet",
      "message": "Décrivez votre projet en quelques mots"
    },
    "submit": "Envoyer",
    "submitting": "Envoi en cours…",
    "success": "Message envoyé. Je vous réponds sous 24h.",
    "error": "Une erreur est survenue. Réessayez ou écrivez-moi directement.",
    "email_label": "Ou directement :",
    "email": "contact@votredomaine.fr"
  },
  "footer": {
    "tagline": "Sites web pour professionnels de services.",
    "legal": "Mentions légales",
    "copyright": "© 2026 [Votre Nom]. Tous droits réservés."
  }
}
```

### `src/i18n/en.json`

```json
{
  "nav": {
    "services": "Services",
    "portfolio": "Work",
    "contact": "Contact",
    "cta": "Get in touch"
  },
  "hero": {
    "headline": "Your practice deserves a website that works.",
    "subheadline": "Specialist in websites for service professionals. Clean, professional, delivered in 3 weeks.",
    "cta_primary": "View services",
    "cta_secondary": "Get in touch",
    "scroll_hint": "Discover"
  },
  "problem": {
    "title": "Your clients are searching for you online.",
    "subtitle": "What do they find?",
    "items": [
      { "icon": "❌", "title": "No website", "desc": "You are invisible online." },
      { "icon": "😐", "title": "Outdated site", "desc": "Your image doesn't reflect your expertise." },
      { "icon": "📉", "title": "No online booking", "desc": "You lose clients before they even reach you." }
    ]
  },
  "services": {
    "title": "Services",
    "subtitle": "Websites built for service professionals.",
    "essential": {
      "name": "Essential",
      "price": "€1,490",
      "description": "The essential online presence.",
      "features": [
        "5 pages (Home, About, Services, Booking, Contact)",
        "Clean, professional design",
        "Mobile responsive",
        "Contact form",
        "Delivered in 2 weeks"
      ],
      "cta": "Choose this plan"
    },
    "premium": {
      "name": "Premium",
      "price": "€2,490",
      "description": "A complete site that converts.",
      "features": [
        "Everything in Essential +",
        "Bilingual FR/EN",
        "Online booking (Cal.com)",
        "Custom animations & design",
        "Basic SEO",
        "Delivered in 3-4 weeks"
      ],
      "cta": "Choose this plan",
      "badge": "Popular"
    },
    "support": {
      "name": "Support & Updates",
      "price": "From €99/month",
      "description": "I handle everything, you focus on your practice.",
      "features": [
        "Content updates",
        "Hosting and domain name",
        "Monitoring and security",
        "Minor changes included"
      ],
      "cta": "Learn more"
    }
  },
  "whyme": {
    "title": "Why choose me?",
    "items": [
      { "icon": "🎯", "title": "Service professionals specialist", "desc": "I understand your challenges: credibility, lead generation, professional image." },
      { "icon": "⚡", "title": "Fast delivery", "desc": "Your site live in 2 to 4 weeks, not 6 months." },
      { "icon": "🌍", "title": "Bilingual FR/EN", "desc": "For professionals working with international clients." },
      { "icon": "🤝", "title": "Ongoing support", "desc": "One dedicated point of contact, available and responsive." }
    ]
  },
  "contact": {
    "title": "Let's talk about your project",
    "subtitle": "Answer a few questions, I'll get back to you within 24h.",
    "fields": {
      "name": "Full name",
      "email": "Email address",
      "firm": "Firm name",
      "message": "Briefly describe your project"
    },
    "submit": "Send",
    "submitting": "Sending…",
    "success": "Message sent. I'll reply within 24 hours.",
    "error": "Something went wrong. Please retry or email me directly.",
    "email_label": "Or directly:",
    "email": "contact@yourdomain.fr"
  },
  "footer": {
    "tagline": "Websites for service professionals.",
    "legal": "Legal notice",
    "copyright": "© 2026 [Your Name]. All rights reserved."
  }
}
```

### Utilisation dans les composants

```typescript
import { useTranslation } from 'react-i18next';

export function Hero() {
  const { t } = useTranslation();

  return (
    <section>
      <h1>{t('hero.headline')}</h1>
      <p>{t('hero.subheadline')}</p>
    </section>
  );
}
```

### `src/components/shared/LanguageSwitcher.tsx`

```typescript
import { useTranslation } from 'react-i18next';

export function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const current = i18n.language.startsWith('fr') ? 'fr' : 'en';
  const next = current === 'fr' ? 'en' : 'fr';

  return (
    <button
      onClick={() => i18n.changeLanguage(next)}
      className="text-sm font-medium text-[var(--fg-muted)] hover:text-[var(--fg)] transition-colors uppercase tracking-widest"
      aria-label={`Switch to ${next === 'en' ? 'English' : 'Français'}`}
    >
      {next}
    </button>
  );
}
```

### Import i18n dans `src/main.tsx`

```typescript
import './i18n/index'; // Doit être importé AVANT App
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

---

## 9. Routing — React Router v6 (HashRouter)

### Pourquoi HashRouter sur GitHub Pages

GitHub Pages sert des fichiers statiques. Avec `BrowserRouter`, une URL comme `tonsite.com/services` renverrait un 404 car GitHub Pages cherche un fichier `services/index.html` qui n'existe pas. HashRouter préfixe les routes avec `#`, ce qui est géré entièrement côté navigateur.

```
tonpseudo.github.io/front-view/#/          → Home
tonpseudo.github.io/front-view/#/services  → Services
tonpseudo.github.io/front-view/#/portfolio → Portfolio
tonpseudo.github.io/front-view/#/contact   → Contact
```

### `src/App.tsx`

```typescript
import { HashRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@/context/ThemeContext';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Suspense, lazy } from 'react';

// Home : chargé directement → affiché instantanément à l'arrivée
import { Home } from '@/pages/Home';

// Pages secondaires : lazy-loadées → bundle initial plus léger, navigation plus fluide
const ServicesPage  = lazy(() => import('@/pages/Services').then(m => ({ default: m.Services })));
const PortfolioPage = lazy(() => import('@/pages/Portfolio').then(m => ({ default: m.Portfolio })));
const ContactPage   = lazy(() => import('@/pages/Contact').then(m => ({ default: m.Contact })));

function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--bg)]">
      <div className="w-8 h-8 border-2 border-[var(--primary)] border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <HashRouter>
        <div className="flex flex-col min-h-screen bg-[var(--bg)] text-[var(--fg)]">
          <Navbar />
          <main className="flex-1">
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route path="/"          element={<Home />} />
                <Route path="/services"  element={<ServicesPage />} />
                <Route path="/portfolio" element={<PortfolioPage />} />
                <Route path="/contact"   element={<ContactPage />} />
              </Routes>
            </Suspense>
          </main>
          <Footer />
        </div>
      </HashRouter>
    </ThemeProvider>
  );
}
```

> **Pourquoi cette structure :** `Home` est importé directement pour un affichage immédiat au premier chargement. Les autres pages sont lazy-loadées : leur code n'est téléchargé que lorsque l'utilisateur navigue vers elles, ce qui réduit significativement la taille du bundle initial et améliore le Time to Interactive.

---

## 10. Design System

### Palette

| Token CSS | Light | Dark | Usage |
|---|---|---|---|
| `--bg` | `#FAFAFA` | `#0F1117` | Fond principal |
| `--bg-secondary` | `#F4F4F6` | `#171B26` | Cartes, sections alternées |
| `--fg` | `#1A1A2E` | `#F2F2F5` | Texte principal |
| `--fg-muted` | `#6B7280` | `#9CA3AF` | Texte secondaire, labels |
| `--primary` | `#1E3A5F` | `#7BA7D4` | Bleu marine → boutons, liens |
| `--accent` | `#B8960C` | `#E5C450` | Or → décoration, badges |
| `--border` | `#E2E8F0` | `#2D3340` | Bordures standard |

> L'or comme accent évoque le prestige et la crédibilité sans ostentation — adapté à tous les professionnels de services haut de gamme.

### Typographie

```
H1  : Playfair Display  700  3.5rem (56px)   → Headline Hero
H2  : Playfair Display  600  2.25rem (36px)  → Titres de sections
H3  : Inter             600  1.5rem (24px)   → Sous-titres, titres cartes
Body: Inter             400  1rem (16px)     → Texte courant
Sm  : Inter             400  0.875rem (14px) → Labels, mentions, footer
```

### Espacement et layout

```
Largeur max (content) : 1200px  → mx-auto max-w-7xl
Section padding vert  : 96px   → py-24
Section padding horiz : 24px   → px-6 sm:px-8
Card padding          : 32px   → p-8
Gap entre items       : 24–48px
Border radius         : 8px    → sobre, pas trop arrondi
Transition standard   : 0.2s ease
```

### Composants UI

Pas de shadcn/ui (incompatible CLI avec setup Vite custom non Next.js sans configuration supplémentaire). Les composants sont écrits à la main, ce qui donne un contrôle total et moins de dépendances.

**`src/components/shared/Button.tsx`** (exemple) :
```typescript
import { ReactNode, ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
}

export function Button({ variant = 'primary', size = 'md', className, children, ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        {
          'bg-[var(--primary)] text-[var(--primary-fg)] hover:bg-[var(--primary-light)] shadow-sm': variant === 'primary',
          'border border-[var(--border)] text-[var(--fg)] hover:border-[var(--primary)] hover:text-[var(--primary)]': variant === 'outline',
          'text-[var(--fg-muted)] hover:text-[var(--fg)] hover:bg-[var(--bg-secondary)]': variant === 'ghost',
        },
        {
          'text-sm px-3 py-1.5': size === 'sm',
          'text-sm px-5 py-2.5': size === 'md',
          'text-base px-7 py-3.5': size === 'lg',
        },
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
```

**`src/lib/utils.ts`** :
```typescript
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

```bash
npm install clsx tailwind-merge
```

---

## 11. Formulaire de contact — Options statiques

### Option A — Formspree (recommandé GitHub Pages)

1. Créer un compte sur formspree.io
2. Créer un nouveau form → récupérer l'endpoint (ex: `https://formspree.io/f/xabcdefg`)
3. Pas de serveur, pas d'env var

**`src/components/shared/ContactForm.tsx`** :
```typescript
import { useState, FormEvent } from 'react';
import { useTranslation } from 'react-i18next';

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/VOTRE_ID';

interface FormState {
  status: 'idle' | 'submitting' | 'success' | 'error';
}

export function ContactForm() {
  const { t } = useTranslation();
  const [state, setState] = useState<FormState>({ status: 'idle' });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setState({ status: 'submitting' });

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      });

      if (res.ok) {
        setState({ status: 'success' });
        form.reset();
      } else {
        setState({ status: 'error' });
      }
    } catch {
      setState({ status: 'error' });
    }
  };

  if (state.status === 'success') {
    return (
      <div className="rounded-lg bg-[var(--bg-secondary)] border border-[var(--border)] p-8 text-center">
        <p className="text-lg font-medium text-[var(--fg)]">{t('contact.success')}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Honeypot anti-spam */}
      <input type="text" name="_gotcha" className="hidden" tabIndex={-1} autoComplete="off" />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-[var(--fg)] mb-1.5">
            {t('contact.fields.name')} *
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            minLength={2}
            className="w-full px-4 py-3 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border)] text-[var(--fg)] placeholder:text-[var(--fg-muted)] focus:outline-none focus:border-[var(--primary)] transition-colors"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-[var(--fg)] mb-1.5">
            {t('contact.fields.email')} *
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="w-full px-4 py-3 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border)] text-[var(--fg)] placeholder:text-[var(--fg-muted)] focus:outline-none focus:border-[var(--primary)] transition-colors"
          />
        </div>
      </div>

      <div>
        <label htmlFor="firm" className="block text-sm font-medium text-[var(--fg)] mb-1.5">
          {t('contact.fields.firm')}
        </label>
        <input
          id="firm"
          name="firm"
          type="text"
          className="w-full px-4 py-3 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border)] text-[var(--fg)] placeholder:text-[var(--fg-muted)] focus:outline-none focus:border-[var(--primary)] transition-colors"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-[var(--fg)] mb-1.5">
          {t('contact.fields.message')} *
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          minLength={20}
          className="w-full px-4 py-3 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border)] text-[var(--fg)] placeholder:text-[var(--fg-muted)] focus:outline-none focus:border-[var(--primary)] transition-colors resize-none"
        />
      </div>

      {state.status === 'error' && (
        <p className="text-sm text-red-500">{t('contact.error')}</p>
      )}

      <button
        type="submit"
        disabled={state.status === 'submitting'}
        className="w-full py-3.5 rounded-lg bg-[var(--primary)] text-[var(--primary-fg)] font-medium hover:bg-[var(--primary-light)] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {state.status === 'submitting' ? t('contact.submitting') : t('contact.submit')}
      </button>
    </form>
  );
}
```

### Option B — mailto simple (MVP)

```typescript
// Ouvre le client mail du visiteur
<a
  href="mailto:contact@votredomaine.fr?subject=Demande de contact&body=Bonjour,"
  className="..." // bouton styled
>
  Écrire un email
</a>
```

### Option C — Netlify (si migration hébergement)

Si vous souhaitez Netlify Forms, remplacer GitHub Pages par Netlify (deploy gratuit, tout aussi simple) :
- Ajouter `netlify` à votre form HTML : `<form netlify name="contact">`
- Déployer sur Netlify (import repo GitHub → déploiement auto)
- Gestion des soumissions dans le dashboard Netlify

---

## 12. Animations — Framer Motion

### Installation

```bash
npm install framer-motion
```

### Pattern recommandé — Animation au scroll

```typescript
// src/components/shared/AnimatedSection.tsx
import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export function AnimatedSection({ children, delay = 0, className }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
```

**Utilisation :**
```typescript
<AnimatedSection delay={0.1}>
  <ServiceCard ... />
</AnimatedSection>
```

### Animations Navbar au scroll

```typescript
// src/components/layout/Navbar.tsx
import { motion, useScroll, useTransform } from 'framer-motion';

export function Navbar() {
  const { scrollY } = useScroll();
  // Devient opaque après 60px de scroll
  const opacity = useTransform(scrollY, [0, 60], [0, 1]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <motion.div
        style={{ opacity }}
        className="absolute inset-0 bg-[var(--bg)]/80 backdrop-blur-md border-b border-[var(--border)]"
      />
      {/* contenu navbar */}
    </header>
  );
}
```

### Règles animations production

- `once: true` sur `whileInView` — une seule fois, pas de répétition au scroll retour
- Durées courtes : 0.3–0.6s — animations subtiles, pas de spectacle
- `ease: 'easeOut'` — naturel, professionnel
- Pas d'animations sur les éléments critiques au-dessus du fold (hero text) — elles retardent la perception

---

## 13. Performance & Optimisation

### Images

```bash
# Convertir toutes les images en WebP avant intégration
# macOS (cwebp) :
brew install webp
cwebp -q 80 avatar.jpg -o avatar.webp

# Ou en ligne : squoosh.app
```

**Lazy loading natif HTML :**
```html
<img src="mockup.webp" alt="..." loading="lazy" decoding="async" width="800" height="600" />
```

**En JSX :**
```typescript
<img
  src={mockupUrl}
  alt="Exemple site avocat"
  loading="lazy"
  decoding="async"
  width={800}
  height={600}
  className="rounded-lg"
/>
```

### Code splitting automatique

La config Vite avec `manualChunks` (section 5) divise le bundle en :
- `vendor-react` — React + ReactDOM (mis en cache longtemps)
- `vendor-router` — React Router
- `vendor-i18n` — i18next + react-i18next
- `vendor-motion` — Framer Motion (plus lourd, isolé)
- Chaque page lazy-loadée = chunk séparé

### Règles production obligatoires

- **Zéro `console.log`** dans le code final
- **Zéro import inutilisé** — tree-shaking Vite les supprime mais ils polluent la lisibilité
- **`aria-label`** sur tous les boutons icônes (accessibilité + SEO)
- **Attributs `width`/`height`** sur toutes les images — évite le Cumulative Layout Shift
- **`loading="lazy"`** sur toutes les images hors viewport initial

### Objectifs Lighthouse

```
Performance     : > 90
Accessibility   : > 95
Best Practices  : 100
SEO             : > 90
```

---

## 14. Déploiement GitHub Pages

### Option A — GitHub Actions (recommandé, automatique)

**`.github/workflows/deploy.yml`** :
```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: true

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}

    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Setup Pages
        uses: actions/configure-pages@v4

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: dist

      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

**Activation sur GitHub :**
1. Repo GitHub → Settings → Pages
2. Source → **GitHub Actions**
3. Chaque `git push` sur `main` déclenche un build et deploy automatique

### Option B — Deploy manuel (simple)

```bash
npm install --save-dev gh-pages

# Dans package.json :
# "deploy": "npm run build && gh-pages -d dist"

npm run deploy
```

### Vérification après déploiement

```
https://tonpseudo.github.io/front-view/
https://tonpseudo.github.io/front-view/#/services
https://tonpseudo.github.io/front-view/#/portfolio
https://tonpseudo.github.io/front-view/#/contact
```

---

## 15. Domaine custom `.fr`

### Configuration

1. **Acheter le domaine** — OVH (recommandé pour `.fr`), Namecheap, Gandi
2. **Créer le fichier `public/CNAME`** :
   ```
   votredomaine.fr
   ```
3. **Configurer les DNS** chez votre registrar :

   | Type | Nom | Valeur |
   |---|---|---|
   | `A` | `@` | `185.199.108.153` |
   | `A` | `@` | `185.199.109.153` |
   | `A` | `@` | `185.199.110.153` |
   | `A` | `@` | `185.199.111.153` |
   | `CNAME` | `www` | `tonpseudo.github.io` |

4. **GitHub** → Repo → Settings → Pages → Custom domain → Saisir `votredomaine.fr`
5. Cocher **"Enforce HTTPS"** (disponible après propagation DNS, ~24h)

6. **Mettre à jour `vite.config.ts`** — avec domaine custom, `base` doit être `/` :
   ```typescript
   base: '/',  // Plus '/front-view/' avec domaine custom
   ```

---

## 16. Checklist production

### Avant le premier déploiement

**Code :**
- [ ] Zéro `console.log` dans `src/`
- [ ] Tous les `TODO` et placeholder résolus
- [ ] `base` dans `vite.config.ts` correspond au nom du repo GitHub
- [ ] `public/CNAME` présent si domaine custom

**Contenu :**
- [ ] Vos vraies coordonnées dans `fr.json` et `en.json`
- [ ] Votre photo `src/assets/images/avatar.webp` (< 100ko)
- [ ] Les tarifs définis et cohérents FR/EN
- [ ] Email de contact à jour dans `fr.json`

**Formulaire :**
- [ ] Endpoint Formspree configuré et testé
- [ ] Email de notification Formspree reçu lors du test

**i18n :**
- [ ] Toutes les clés FR présentes dans EN (aucune clé manquante)
- [ ] Switcher FR/EN fonctionne sur toutes les pages

**Dark/Light :**
- [ ] Pas de flash de thème au chargement (script inline `index.html` présent)
- [ ] Tous les composants respectent les variables CSS (pas de couleurs hardcodées)

**Performance :**
- [ ] Toutes les images en WebP avec `width` et `height` définis
- [ ] Lazy loading sur les images hors hero
- [ ] `npm run build` → vérifier la taille des chunks (< 200ko/chunk idéal)

**Accessibilité & SEO :**
- [ ] `aria-label` sur les boutons icônes (ThemeToggle, LanguageSwitcher, menu mobile)
- [ ] Balise `<title>` et `<meta name="description">` dans `index.html`
- [ ] `<meta property="og:image">` avec `og-image.jpg` (1200×630)
- [ ] `public/robots.txt` présent

**Légal :**
- [ ] Mentions légales accessibles depuis le footer
- [ ] RGPD : si analytics → cookie banner

**Test final :**
- [ ] Chrome DevTools → Lighthouse → toutes les métriques > 90
- [ ] Test sur mobile (vrai device ou DevTools iPhone SE)
- [ ] Test dark mode + light mode sur mobile
- [ ] Test formulaire de contact complet (réception email)
- [ ] Vérifier les URLs GitHub Pages sur 4 pages

---

## 17. Roadmap de développement

### Phase 1 — Setup & Base (Jour 1–2)

- [ ] Bootstrap Vite React TypeScript
- [ ] Config Tailwind v4 + CSS custom properties
- [ ] ThemeContext (dark/light + localStorage)
- [ ] react-i18next (FR/EN avec fichiers JSON)
- [ ] HashRouter + 4 pages skeleton
- [ ] Navbar responsive (desktop + mobile menu)
- [ ] Footer
- [ ] Script anti-flash dans `index.html`
- [ ] Premier push GitHub + GitHub Actions configuré

### Phase 2 — Page Home (Jour 3–5)

- [ ] Section Hero (headline, CTA, scroll indicator)
- [ ] Section Problème (3 pain points animés)
- [ ] Section Services (3 cartes avec tarifs)
- [ ] Section Pourquoi moi (4 arguments)
- [ ] Section Aperçu site avocat (mockup ou screenshot)
- [ ] Section Témoignages (placeholder pour l'instant)
- [ ] Section CTA final
- [ ] Animations Framer Motion sur chaque section

### Phase 3 — Pages secondaires (Jour 6–8)

- [ ] Page Services (détail complet des offres)
- [ ] Page Portfolio (mockups sites avocats)
- [ ] Page Contact (formulaire Formspree + informations)
- [ ] Mentions légales dans le footer (modal ou page)

### Phase 4 — Polish & Déploiement (Jour 9–10)

- [ ] Optimisation images (WebP, lazy loading)
- [ ] Audit Lighthouse et corrections
- [ ] SEO metadata (`index.html` + og:image)
- [ ] Test complet mobile dark/light
- [ ] Déploiement GitHub Pages
- [ ] (optionnel) Configuration domaine `.fr`

### Phase 5 — Acquisition (ongoing)

- [ ] Premiers témoignages clients réels
- [ ] Analytics (Plausible — RGPD-friendly, < 1ko)
- [ ] Articles blog SEO (MDX ou page statique)
- [ ] A/B test du CTA hero

---

## 18. Setup initial pas-à-pas

```bash
# ─── 1. Créer le projet Vite React TypeScript ─────────────────────
npm create vite@latest front-view -- --template react-ts
cd front-view

# ─── 2. Installer toutes les dépendances ──────────────────────────
npm install

# Core
npm install react-router-dom

# i18n
npm install i18next react-i18next i18next-browser-languagedetector

# Animations
npm install framer-motion

# Icônes
npm install lucide-react

# Utilitaires CSS
npm install clsx tailwind-merge

# ─── 3. Tailwind CSS v4 ───────────────────────────────────────────
npm install tailwindcss @tailwindcss/vite @tailwindcss/postcss postcss

# ─── 4. Dépendances de développement ─────────────────────────────
npm install --save-dev gh-pages @types/node

# ─── 5. Créer la structure de dossiers ───────────────────────────
mkdir -p src/{components/{layout,sections,shared},pages,context,i18n,hooks,types,lib,assets/images}
mkdir -p public
mkdir -p .github/workflows

# ─── 6. Fichiers de traduction ────────────────────────────────────
touch src/i18n/fr.json src/i18n/en.json src/i18n/index.ts

# ─── 7. Vérifier que tout démarre ────────────────────────────────
npm run dev
# → http://localhost:5173

# ─── 8. Build de test ────────────────────────────────────────────
npm run build
# → dist/ créé, vérifier taille des chunks

# ─── 9. Preview du build ─────────────────────────────────────────
npm run preview
# → http://localhost:4173

# ─── 10. Premier commit ───────────────────────────────────────────
git init
git add .
git commit -m "feat: initial project setup"
# Créer le repo GitHub, puis :
git remote add origin https://github.com/tonpseudo/front-view.git
git push -u origin main
# → GitHub Actions se déclenche automatiquement
```

### `index.html` complet

```html
<!doctype html>
<html lang="fr">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <!-- Anti-flash theme -->
    <script>
      (function () {
        var stored = localStorage.getItem('theme');
        var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        var theme = stored || (prefersDark ? 'dark' : 'light');
        document.documentElement.classList.add(theme);
      })();
    </script>

    <!-- SEO -->
    <title>Développeur Web — Sites pour Professionnels de Services</title>
    <meta name="description" content="Je crée des sites web professionnels pour avocats, architectes, consultants et autres professionnels de services. Sobre, rapide, bilingue FR/EN. Livraison en 3 semaines." />
    <meta name="robots" content="index, follow" />

    <!-- Open Graph -->
    <meta property="og:type" content="website" />
    <meta property="og:title" content="Développeur Web — Sites pour Professionnels de Services" />
    <meta property="og:description" content="Sites web professionnels pour avocats, architectes, consultants et autres professionnels de services." />
    <meta property="og:image" content="/og-image.jpg" />
    <meta property="og:locale" content="fr_FR" />

    <!-- Favicon -->
    <link rel="icon" type="image/ico" href="/favicon.ico" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

### `public/robots.txt`

```
User-agent: *
Allow: /
```

---

## 19. Architecture du produit client

Ce que vous livrez à chaque professionnel. Cette section sert de cahier des charges pour vos projets clients.

### Pages du site type (professionnel de services)

```
/              → Accueil
/a-propos      → Présentation du professionnel / de la structure
/services      → Services proposés (adaptés à chaque métier)
/rendez-vous   → Prise de RDV (Cal.com embed)
/contact       → Formulaire de contact
/mentions      → Mentions légales (obligatoire)
```

> Le nom des pages varie selon le métier : "Expertises" pour un avocat, "Projets" pour un architecte, "Accompagnements" pour un thérapeute, "Missions" pour un consultant, etc.

### Wireframe home type

```
┌────────────────────────────────────────────────────────┐
│  NAVBAR  [Logo / Nom]    [Services]  [RDV] [Contact]   │
├────────────────────────────────────────────────────────┤
│  HERO                                                  │
│  "[Prénom Nom]                                         │
│   [Titre / Métier]"                                    │
│  [Ville] · [Accréditation ou différenciateur]          │
│  [ Prendre rendez-vous ]                               │
├────────────────────────────────────────────────────────┤
│  SERVICES (3–5 domaines)                               │
│  Exemples :                                            │
│  Avocat      → Droit fiscal, contentieux, patrimoine   │
│  Architecte  → Rénovation, construction, intérieur     │
│  Consultant  → Stratégie, organisation, digital        │
│  Thérapeute  → TCC, accompagnement, groupes            │
├────────────────────────────────────────────────────────┤
│  À PROPOS                                              │
│  [Photo] + biographie, parcours, valeurs               │
├────────────────────────────────────────────────────────┤
│  PRENDRE RDV                                           │
│  Embed Cal.com ou Calendly                             │
├────────────────────────────────────────────────────────┤
│  CONTACT                                               │
│  Formulaire + adresse + téléphone                      │
├────────────────────────────────────────────────────────┤
│  FOOTER                                                │
│  © [Nom] · [Ville] · Mentions légales                  │
└────────────────────────────────────────────────────────┘
```

### Stack recommandée pour les sites clients

Même stack que votre site portfolio (React + Vite), simplifié :
- Pas forcément bilingue (selon offre)
- Pas d'animations complexes
- Cal.com embed pour le RDV (gratuit, RGPD-compliant)
- Formspree pour le contact
- Hébergement : GitHub Pages (inclus dans offre) ou Netlify (plus simple pour Netlify Forms)

---

## Ressources

| Ressource | URL |
|---|---|
| Vite documentation | https://vite.dev |
| React Router v6 | https://reactrouter.com |
| Tailwind CSS v4 | https://tailwindcss.com |
| react-i18next | https://react.i18next.com |
| Framer Motion | https://www.framer.com/motion |
| Formspree | https://formspree.io |
| Cal.com embed | https://cal.com/docs/embed |
| GitHub Pages | https://docs.github.com/pages |
| Squoosh (images WebP) | https://squoosh.app |
| Plausible Analytics | https://plausible.io |

---

*Documentation mise à jour le 25/02/2026 — Stack : React 18 + Vite + GitHub Pages.*
