import React, { useState } from 'react';
import { useI18n } from '../../hooks/useI18n';

interface EmailHelperProps {
  recipientEmails: string[];
  subject: string;
  body: string;
  titleKey?: string;
  descriptionKey?: string;
}

const CopyButton: React.FC<{ textToCopy: string }> = ({ textToCopy }) => {
  const { t } = useI18n();
  const [copied, setCopied] = useState(false);

  const fallbackCopyTextToClipboard = (text: string) => {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    
    // Avoid scrolling to bottom
    textArea.style.position = "fixed";
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.width = "1px";
    textArea.style.height = "1px";
    textArea.style.background = "transparent";
    textArea.style.border = "none";
    textArea.style.outline = "none";
    textArea.style.boxShadow = "none";


    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
      const successful = document.execCommand('copy');
      if (successful) {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } else {
        console.error('Fallback: Oops, unable to copy');
      }
    } catch (err) {
      console.error('Fallback: Oops, unable to copy', err);
    }

    document.body.removeChild(textArea);
  };

  const handleCopy = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(textToCopy).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }).catch(err => {
        console.error('Clipboard API failed, falling back.', err);
        fallbackCopyTextToClipboard(textToCopy);
      });
    } else {
      fallbackCopyTextToClipboard(textToCopy);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="absolute top-2 right-2 text-sm bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 text-gray-700 dark:text-gray-200 font-semibold py-1 px-3 rounded-md transition-all"
    >
      {copied ? <><i className="fas fa-check mr-1"></i> {t('generator.email.copySuccess')}</> : <><i className="fas fa-copy mr-1"></i> {t('generator.email.copy')}</>}
    </button>
  );
};

const EmailHelper: React.FC<EmailHelperProps> = ({ recipientEmails, subject, body, titleKey, descriptionKey }) => {
  const { t } = useI18n();

  return (
    <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
      <h3 className="font-semibold text-lg mb-2">{t(titleKey || 'generator.email.title')}</h3>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{t(descriptionKey || 'generator.email.description')}</p>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t('generator.email.recipient')}</label>
          <div className="relative">
            <div className="p-3 bg-gray-100 dark:bg-gray-900/50 rounded-lg text-gray-700 dark:text-gray-300 pr-24">
              {recipientEmails.join(', ')}
            </div>
            <CopyButton textToCopy={recipientEmails.join(', ')} />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t('generator.email.subject')}</label>
          <div className="relative">
            <div className="p-3 bg-gray-100 dark:bg-gray-900/50 rounded-lg text-gray-700 dark:text-gray-300 pr-24">
              {subject}
            </div>
            <CopyButton textToCopy={subject} />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t('generator.email.body')}</label>
          <div className="relative">
            <div className="p-3 bg-gray-100 dark:bg-gray-900/50 rounded-lg text-gray-700 dark:text-gray-300 whitespace-pre-wrap pr-24">
              {body}
            </div>
            <CopyButton textToCopy={body} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailHelper;