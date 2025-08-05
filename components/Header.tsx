
import React, { useState, useRef, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useTheme } from '../hooks/useTheme';
import { useI18n } from '../hooks/useI18n';
import { SunIcon, MoonIcon } from './icons';

const NavDropdown: React.FC<{ title: React.ReactNode, children: React.ReactNode, isMobile?: boolean }> = ({ title, children, isMobile = false }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const baseButtonClass = "px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 w-full text-left flex items-center justify-between";
    const desktopButtonClass = `text-gray-600 hover:bg-gray-200 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white`;
    const mobileButtonClass = `text-gray-600 hover:bg-gray-200 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white`;

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                type="button"
                className={`${baseButtonClass} ${isMobile ? mobileButtonClass : desktopButtonClass}`}
                onClick={() => setIsOpen(prev => !prev)}
                aria-haspopup="true"
                aria-expanded={isOpen}
            >
                {title}
                <i className={`fas fa-chevron-down transform transition-transform duration-200 ml-1 text-xs ${isOpen ? 'rotate-180' : ''}`}></i>
            </button>
            {isOpen && (
                <div 
                  className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 dark:ring-gray-700 focus:outline-none py-1 z-10 animate-fade-in"
                  style={{ animationDuration: '150ms'}}
                  role="menu" 
                  aria-orientation="vertical"
                >
                    {React.Children.map(children, child => 
                        React.isValidElement(child) ? React.cloneElement(child, { onClick: () => setIsOpen(false) } as any) : child
                    )}
                </div>
            )}
        </div>
    );
};

const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, t } = useI18n();

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `block sm:inline-block px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
      isActive
        ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300'
        : 'text-gray-600 hover:bg-gray-200 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white'
    }`;
  
  const dropdownLinkClass = ({ isActive }: { isActive: boolean }) =>
    `block px-4 py-2 text-sm ${
        isActive
        ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300'
        : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
    }`;
    
  const langButtonClass = (lang: 'ru' | 'ua') =>
    `px-3 py-1 text-sm font-semibold rounded-md transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-900 ${
        language === lang
        ? 'bg-white dark:bg-gray-600 text-blue-700 dark:text-blue-300 shadow-sm'
        : 'text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700/50'
    }`;


  return (
    <header className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md shadow-lg sticky top-0 z-50 transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center py-3">
          <NavLink to="/" className="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400">
            Erding Together
          </NavLink>
          
          <nav className="hidden md:flex items-center space-x-1">
            <NavLink to="/guides" className={linkClass}>{t('header.nav.guides')}</NavLink>
            <NavDropdown title={t('header.nav.generators')}>
                <NavLink to="/generator" className={dropdownLinkClass}>{t('header.nav.generatorLra')}</NavLink>
                <NavLink to="/rvo-generator" className={dropdownLinkClass}>{t('header.nav.generatorRvo')}</NavLink>
                <NavLink to="/lawsuit-generator" className={dropdownLinkClass}>{t('header.nav.generatorLawsuit')}</NavLink>
            </NavDropdown>
            <NavLink to="/faq" className={linkClass}>{t('header.nav.faq')}</NavLink>
            <NavLink to="/support" className={linkClass}>{t('header.nav.support')}</NavLink>
          </nav>

          <div className="flex items-center space-x-2">
            <div className="bg-gray-200 dark:bg-gray-700 rounded-lg p-1 flex items-center space-x-1">
                <button onClick={() => setLanguage('ru')} className={langButtonClass('ru')}>Русский</button>
                <button onClick={() => setLanguage('ua')} className={langButtonClass('ua')}>Українська</button>
            </div>
            <button
              onClick={toggleTheme}
              className="text-gray-600 dark:text-gray-300 focus:outline-none rounded-full p-2 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? <MoonIcon className="h-5 w-5" /> : <SunIcon className="h-5 w-5" />}
            </button>
          </div>
        </div>
        
        <nav className="md:hidden flex flex-wrap justify-around items-center py-2 border-t border-gray-200 dark:border-gray-700/50">
            <NavLink to="/guides" className={linkClass}>{t('header.nav.guides')}</NavLink>
            <NavDropdown title={t('header.nav.generators')} isMobile>
                <NavLink to="/generator" className={dropdownLinkClass}>{t('header.nav.generatorLra')}</NavLink>
                <NavLink to="/rvo-generator" className={dropdownLinkClass}>{t('header.nav.generatorRvo')}</NavLink>
                <NavLink to="/lawsuit-generator" className={dropdownLinkClass}>{t('header.nav.generatorLawsuit')}</NavLink>
            </NavDropdown>
            <NavLink to="/faq" className={linkClass}>{t('header.nav.faq')}</NavLink>
            <NavLink to="/support" className={linkClass}>{t('header.nav.support')}</NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Header;