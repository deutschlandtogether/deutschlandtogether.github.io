
import React from 'react';
import { useI18n } from '../hooks/useI18n';

const Footer: React.FC = () => {
  const { t } = useI18n();
  return (
    <footer className="bg-gray-800 dark:bg-black text-white py-8">
      <div className="container mx-auto text-center px-6">
        <p className="text-gray-400">{t('footer.disclaimer')}</p>
        <a 
          href="https://t.me/ErdingTogether" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-blue-400 hover:text-blue-300 transition mt-2 inline-block"
        >
          <i className="fab fa-telegram mr-2"></i>{t('footer.telegramLink')}
        </a>
      </div>
    </footer>
  );
};

export default Footer;