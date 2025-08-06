
import React, { useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider } from './hooks/useTheme';
import { I18nProvider, useI18n } from './hooks/useI18n';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './views/Home';
import Guides from './views/Guides';
import Generator from './views/Generator';
import RvoGenerator from './views/RvoGenerator';
import LawsuitGenerator from './views/LawsuitGenerator';
import FAQ from './views/FAQ';
import Support from './views/Support';
import NotFound from './views/NotFound';

const AppContent: React.FC = () => {
  const { isLoading } = useI18n();
  const { pathname } = useLocation();

  useEffect(() => {
    // Force scroll to top on path change, bypassing CSS smooth scrolling
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0; // For Safari
  }, [pathname]);
  
  return (
      <div className={`flex flex-col min-h-screen transition-opacity duration-300 ease-in-out ${isLoading ? 'opacity-50 blur-sm' : 'opacity-100 blur-0'}`}>
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/guides" element={<Guides />} />
            <Route path="/generator" element={<Generator />} />
            <Route path="/rvo-generator" element={<RvoGenerator />} />
            <Route path="/lawsuit-generator" element={<LawsuitGenerator />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/support" element={<Support />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
  );
}

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <I18nProvider>
        <HashRouter>
          <AppContent />
        </HashRouter>
      </I18nProvider>
    </ThemeProvider>
  );
};

export default App;