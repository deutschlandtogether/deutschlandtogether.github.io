
import React, { useState } from 'react';
import { useI18n } from '../hooks/useI18n';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

const LawsuitGenerator: React.FC = () => {
  const { t } = useI18n();
  const [isAgreed, setIsAgreed] = useState(false);

  const aiStudioUrl = "https://aistudio.google.com/app/prompts?state=%7B%22ids%22:%5B%221oo7cCP6TnlR5YrhPlKD4j_-vLPHDTRUW%22%5D,%22action%22:%22open%22,%22userId%22:%22110797276523550952268%22,%22resourceKeys%22:%7B%7D%7D&usp=sharing";

  const handleRedirect = () => {
    if (isAgreed) {
      window.open(aiStudioUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const renderInstructionStep = (text: string) => {
    return text.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-gray-900 dark:text-gray-100">$1</strong>');
  };

  return (
    <div className="py-16 animate-fade-in">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-4xl mx-auto space-y-8">
          
          <h1 className="text-4xl font-extrabold text-center">{t('lawsuitGenerator.title')}</h1>

          <Card className="border-2 border-red-500/50 shadow-red-500/10 dark:shadow-red-500/20 hover:!shadow-red-500/40 dark:hover:!shadow-red-400/40">
            <div className="flex items-start">
              <i className="fas fa-exclamation-triangle text-3xl text-red-500 mr-4 mt-1"></i>
              <div>
                <h2 className="text-xl font-bold text-red-600 dark:text-red-400">{t('lawsuitGenerator.disclaimer.title')}</h2>
                <ul className="list-disc list-inside mt-2 space-y-2 text-gray-700 dark:text-gray-300">
                  <li>{t('lawsuitGenerator.disclaimer.content1')}</li>
                  <li>{t('lawsuitGenerator.disclaimer.content2')}</li>
                  <li>{t('lawsuitGenerator.disclaimer.content3')}</li>
                  <li>{t('lawsuitGenerator.disclaimer.content4')}</li>
                </ul>
              </div>
            </div>
          </Card>
          
          <Card>
            <h2 className="text-2xl font-bold text-center mb-4">{t('lawsuitGenerator.instruction.title')}</h2>
            <ol className="list-decimal list-inside space-y-3 text-gray-700 dark:text-gray-400 prose prose-blue dark:prose-invert max-w-none">
              <li dangerouslySetInnerHTML={{ __html: renderInstructionStep(t('lawsuitGenerator.instruction.step1')) }}></li>
              <li dangerouslySetInnerHTML={{ __html: renderInstructionStep(t('lawsuitGenerator.instruction.step2')) }}></li>
              <li dangerouslySetInnerHTML={{ __html: renderInstructionStep(t('lawsuitGenerator.instruction.step3')) }}></li>
              <li dangerouslySetInnerHTML={{ __html: renderInstructionStep(t('lawsuitGenerator.instruction.step4')) }}></li>
            </ol>
            
            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700 space-y-6">
               <div className="flex items-start p-2 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                 <input
                    type="checkbox"
                    id="agreement"
                    checked={isAgreed}
                    onChange={(e) => setIsAgreed(e.target.checked)}
                    className="h-5 w-5 mt-1 flex-shrink-0 text-blue-600 border-gray-400 dark:border-gray-500 rounded focus:ring-blue-500 dark:bg-gray-800 cursor-pointer"
                    aria-describedby="agreement-label"
                 />
                 <label id="agreement-label" htmlFor="agreement" className="ml-3 block text-sm text-gray-700 dark:text-gray-300 cursor-pointer">
                    {t('lawsuitGenerator.agreement.label')}
                 </label>
               </div>
               
               <Button 
                onClick={handleRedirect} 
                className="w-full" 
                disabled={!isAgreed}
                aria-label={t('lawsuitGenerator.agreement.button')}
               >
                  <i className="fas fa-gavel mr-2"></i>
                  {t('lawsuitGenerator.agreement.button')}
               </Button>
            </div>
          </Card>

        </div>
      </div>
    </div>
  );
};

export default LawsuitGenerator;