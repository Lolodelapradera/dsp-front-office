import { HashRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@/context/ThemeContext';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Suspense, lazy } from 'react';
import { Home } from '@/pages/Home';

const AboutPage    = lazy(() => import('@/pages/About').then(m => ({ default: m.About })));
const PortfolioPage = lazy(() => import('@/pages/Portfolio').then(m => ({ default: m.Portfolio })));
const ContactPage  = lazy(() => import('@/pages/Contact').then(m => ({ default: m.Contact })));

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
                <Route path="/about"     element={<AboutPage />} />
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
