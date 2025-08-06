
import React from 'react';
import { Link } from 'react-router-dom';
import { useI18n } from '../hooks/useI18n';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

const Home: React.FC = () => {
  const { t } = useI18n();

  return (
    <>
      <section className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-20 md:py-28">
        <div className="container mx-auto text-center px-6">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 animate-fade-in">{t('home.hero.title')}</h1>
          <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto animate-fade-in">
            {t('home.hero.subtitle')}
          </p>
          <div className="flex justify-center">
            <Link to="/faq">
              <Button className="text-lg shadow-xl hover:shadow-2xl transform hover:scale-105">
                <i className="fas fa-list-check mr-3"></i>
                {t('home.hero.cta')}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-800/50">
        <div className="container mx-auto px-6">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold">{t('home.gettingStarted.title')}</h2>
                <p className="text-gray-600 dark:text-gray-400 mt-2">{t('home.gettingStarted.subtitle')}</p>
            </div>
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                <Link to="/faq" className="flex">
                    <Card className="h-full w-full transform hover:-translate-y-2 text-center flex flex-col items-center justify-center p-8">
                        <div className="mx-auto bg-green-100 dark:bg-green-900/50 text-green-600 dark:text-green-300 rounded-full h-20 w-20 flex items-center justify-center mb-4">
                            <i className="fas fa-question-circle text-4xl"></i>
                        </div>
                        <h3 className="text-2xl font-bold mb-2">{t('home.gettingStarted.faq.title')}</h3>
                        <p className="text-gray-600 dark:text-gray-400">{t('home.gettingStarted.faq.description')}</p>
                    </Card>
                </Link>
                <Link to="/guides" className="flex">
                    <Card className="h-full w-full transform hover:-translate-y-2 text-center flex flex-col items-center justify-center p-8">
                        <div className="mx-auto bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-300 rounded-full h-20 w-20 flex items-center justify-center mb-4">
                             <i className="fas fa-book-open text-4xl"></i>
                        </div>
                        <h3 className="text-2xl font-bold mb-2">{t('home.gettingStarted.guides.title')}</h3>
                        <p className="text-gray-600 dark:text-gray-400">{t('home.gettingStarted.guides.description')}</p>
                    </Card>
                </Link>
            </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">{t('home.howItWorks.title')}</h2>
            <p className="text-gray-600 dark:text-gray-400 mt-2">{t('home.howItWorks.subtitle')}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <Card className="transform hover:-translate-y-2">
              <div className="mx-auto bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-300 rounded-full h-16 w-16 flex items-center justify-center mb-4">
                <i className="fas fa-question-circle text-3xl"></i>
              </div>
              <h3 className="text-xl font-bold mb-2">{t('home.howItWorks.step1.title')}</h3>
              <p className="text-gray-600 dark:text-gray-400">{t('home.howItWorks.step1.description')}</p>
            </Card>
            <Card className="transform hover:-translate-y-2">
              <div className="mx-auto bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-300 rounded-full h-16 w-16 flex items-center justify-center mb-4">
                <i className="fas fa-keyboard text-3xl"></i>
              </div>
              <h3 className="text-xl font-bold mb-2">{t('home.howItWorks.step2.title')}</h3>
              <p className="text-gray-600 dark:text-gray-400">{t('home.howItWorks.step2.description')}</p>
            </Card>
            <Card className="transform hover:-translate-y-2">
              <div className="mx-auto bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-300 rounded-full h-16 w-16 flex items-center justify-center mb-4">
                <i className="fas fa-file-word text-3xl"></i>
              </div>
              <h3 className="text-xl font-bold mb-2">{t('home.howItWorks.step3.title')}</h3>
              <p className="text-gray-600 dark:text-gray-400">{t('home.howItWorks.step3.description')}</p>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;