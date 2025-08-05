
import React, { useState } from 'react';
import { useI18n } from '../hooks/useI18n';
import Card from '../components/ui/Card';

const renderContent = (text: string) => {
    return text.split('\n').map((paragraph, index) => {
        if (paragraph.trim() === '') return null;
        let htmlContent = paragraph
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/`([^`]+)`/g, '<code class="bg-gray-200 dark:bg-gray-700 rounded px-1.5 py-1 font-mono text-sm">$1</code>');

        const urlRegex = /(https?:\/\/\S+)/g;
        htmlContent = htmlContent.replace(urlRegex, '<a href="$1" target="_blank" rel="noopener noreferrer" class="text-blue-500 dark:text-blue-400 hover:underline break-all">$1</a>');
        
        return <p key={index} dangerouslySetInnerHTML={{ __html: htmlContent }} />;
    });
};

const AccordionItem: React.FC<{ q: string, a: string, isOpen: boolean, onClick: () => void }> = ({ q, a, isOpen, onClick }) => (
    <div className="border-b border-gray-200 dark:border-gray-700 last:border-b-0">
      <button
        onClick={onClick}
        className="w-full text-left flex justify-between items-center py-4 px-2 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
        aria-expanded={isOpen}
      >
        <h3 className="font-semibold text-lg flex items-center pr-4 flex-1">
            <i className="fas fa-question-circle text-blue-500 dark:text-blue-400 mr-3 w-5 text-center flex-shrink-0"></i>
            <span>{q}</span>
        </h3>
        <i className={`fas fa-chevron-down transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}></i>
      </button>
      <div className={`grid transition-all duration-500 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
        <div className="overflow-hidden">
            <div className="p-4 pt-0 text-gray-600 dark:text-gray-400 prose prose-blue dark:prose-invert max-w-none">
                {renderContent(a)}
            </div>
        </div>
      </div>
    </div>
);


const FAQ: React.FC = () => {
  const { t } = useI18n();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqKeys = [
    'glossary',
    'fiktion',
    'fiktionEntitlement',
    'applicationFiled',
    'duldung',
    'duldungOffer',
    'duldungSigned',
    'translations',
    'processingTime',
    'rejection',
    'einschreiben'
  ];

  const handleClick = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="py-16 animate-fade-in">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold mb-2">{t('faq.title')}</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">{t('faq.subtitle')}</p>
        </div>
        
        <div className="max-w-3xl mx-auto space-y-12">
            {/* Part 1 */}
            <Card>
                <h2 className="text-2xl font-bold mb-4 text-blue-700 dark:text-blue-400">{t('faq.part1.title')}</h2>
                <div className="prose prose-blue dark:prose-invert max-w-none text-gray-700 dark:text-gray-300">
                    {renderContent(t('faq.part1.content'))}
                </div>
            </Card>

            {/* Part 2 */}
            <Card className="p-0 sm:p-0">
                <div className="px-6 pt-6">
                     <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-400">{t('faq.part2.title')}</h2>
                </div>
                <div className="pt-2">
                    {faqKeys.map((key, index) => (
                        <AccordionItem 
                            key={key}
                            q={t(`faq.${key}.q`)}
                            a={t(`faq.${key}.a`)}
                            isOpen={openIndex === index}
                            onClick={() => handleClick(index)}
                        />
                    ))}
                </div>
            </Card>
            
            {/* Part 3 */}
            <Card>
                <h2 className="text-2xl font-bold mb-4 text-blue-700 dark:text-blue-400">{t('faq.part3.title')}</h2>
                <div className="prose prose-blue dark:prose-invert max-w-none text-gray-700 dark:text-gray-300">
                    {renderContent(t('faq.part3.content'))}
                </div>
            </Card>
            
            {/* Part 4: Courts */}
            <Card>
                <h2 className="text-2xl font-bold mb-4 text-blue-700 dark:text-blue-400">{t('faq.part4.title')}</h2>
                <div className="prose prose-blue dark:prose-invert max-w-none text-gray-700 dark:text-gray-300">
                    {renderContent(t('faq.part4.content'))}
                </div>
            </Card>
        </div>
      </div>
    </div>
  );
};

export default FAQ;