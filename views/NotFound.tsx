
import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import { useI18n } from '../hooks/useI18n';

const NotFound: React.FC = () => {
  const { t } = useI18n();
  return (
    <div className="flex items-center justify-center py-24 px-6">
      <div className="text-center">
        <h1 className="text-9xl font-extrabold text-blue-600 dark:text-blue-500">404</h1>
        <p className="text-2xl md:text-3xl font-light text-gray-800 dark:text-gray-200 mt-4 mb-6">
          {t('notFound.title')}
        </p>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
          {t('notFound.subtitle')}
        </p>
        <Link to="/">
          <Button>
            <i className="fas fa-home mr-2"></i>
            {t('notFound.button')}
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;