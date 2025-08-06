
import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { LetterType, UserData, InactionTemplateData, Template } from '../types';
import { getAllTemplates } from '../constants/templates';
import { downloadDocx, downloadPdf } from '../services/pdfGenerator';
import { useI18n } from '../hooks/useI18n';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import Select from '../components/ui/Select';
import Button from '../components/ui/Button';
import EmailHelper from '../components/ui/EmailHelper';

const allTemplates = getAllTemplates() as Record<LetterType, Template>;

const SendingInstructions: React.FC<{ recipient: Template['recipient'] }> = ({ recipient }) => {
  const { t } = useI18n();
  return (
    <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
      <h3 className="font-semibold text-lg mb-4 text-center">{t('generator.sending.title')}</h3>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="p-4 bg-gray-100 dark:bg-gray-900/50 rounded-lg border border-gray-200 dark:border-gray-700">
          <h4 className="font-bold flex items-center text-blue-600 dark:text-blue-400"><i className="fas fa-fax mr-3 w-5 text-center"></i>{t('generator.sending.fax.title')}</h4>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2" dangerouslySetInnerHTML={{ __html: t('generator.sending.fax.description') }}></p>
          <p className="text-sm font-mono mt-2 bg-white dark:bg-gray-800 p-2 rounded text-center font-semibold tracking-wider">{recipient.fax}</p>
        </div>
        <div className="p-4 bg-gray-100 dark:bg-gray-900/50 rounded-lg border border-gray-200 dark:border-gray-700">
          <h4 className="font-bold flex items-center text-blue-600 dark:text-blue-400"><i className="fas fa-mail-bulk mr-3 w-5 text-center"></i>{t('generator.sending.mail.title')}</h4>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">{t('generator.sending.mail.description')}</p>
          <div className="text-sm mt-2 bg-white dark:bg-gray-800 p-2 rounded">
            <p className="font-semibold">{recipient.name}</p>
            {recipient.address.map((line, i) => <p key={i}>{line}</p>)}
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2" dangerouslySetInnerHTML={{ __html: t('generator.sending.mail.addressingGuide') }}></p>
        </div>
      </div>
      <p className="text-xs text-gray-500 dark:text-gray-400 mt-4 text-center italic">{t('generator.sending.emailInfo')}</p>
    </div>
  );
};


const Generator: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { t } = useI18n();

  const [letterType, setLetterType] = useState<LetterType | ''>('');
  const [userData, setUserData] = useState<UserData>({
    name: '', surname: '', dob: '', street: '', postcode: '', city: '', email: '',
    oralRefusalDate: '', applicationDate: '', lraLetterDate: '', deadlineDate: ''
  });
  const [inactionData, setInactionData] = useState<InactionTemplateData>({
    alsoAppliedFiktion: false,
    previousEnquiries: false,
  });
  const [isGeneratingDocx, setIsGeneratingDocx] = useState(false);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);


  const currentTemplate = useMemo(() => letterType ? allTemplates[letterType] : null, [letterType]);

  useEffect(() => {
    const typeFromUrl = searchParams.get('type') as LetterType;
    if (typeFromUrl && Object.values(LetterType).includes(typeFromUrl)) {
      setLetterType(typeFromUrl);
    }
  }, [searchParams]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value, type, checked } = e.target;
    if (id === 'alsoAppliedFiktion' || id === 'previousEnquiries') {
        setInactionData(prev => ({...prev, [id]: checked}));
    } else {
        setUserData(prev => ({ ...prev, [id]: value }));
    }
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newType = e.target.value as LetterType;
    setLetterType(newType);
    setSearchParams(newType ? { type: newType } : {});
  };
  
  const getFilename = () => {
      if (!currentTemplate) return '';
      const templateName = currentTemplate.templateFile.replace('_TEMPLATE.docx', '').replace(/ERDING_(ABH|ASYLMGMT)_/, '');
      return `${templateName}_${userData.surname.replace(/ /g,'_')}_${new Date().toLocaleDateString('de-DE')}`;
  }

  const handleDocxDownload = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!currentTemplate || !letterType) return;

    setIsGeneratingDocx(true);
    try {
        await downloadDocx(
            letterType,
            currentTemplate.templateFile,
            { ...userData, ...inactionData }, 
            `${getFilename()}.docx`
        );
    } catch(err: any) {
        console.error("Failed to generate DOCX:", err);
        const errorMessage = `${t('generator.errors.docx')}\n\n${t('generator.errors.details')}: ${err.message || 'Unknown error'}`;
        alert(errorMessage);
    } finally {
        setIsGeneratingDocx(false);
    }
  };
  
  const handlePdfDownload = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!currentTemplate || !letterType) return;

    setIsGeneratingPdf(true);
    try {
        await downloadPdf(
            letterType,
            currentTemplate.templateFile,
            { ...userData, ...inactionData }, 
            `${getFilename()}.pdf`
        );
    } catch(err: any) {
        console.error("Failed to generate PDF:", err);
        const errorMessage = `${t('generator.errors.pdf')}\n\n${t('generator.errors.details')}: ${err.message || 'Unknown error'}`;
        alert(errorMessage);
    } finally {
        setIsGeneratingPdf(false);
    }
  };

  const processedSubject = useMemo(() => {
    if (!currentTemplate) return '';
    return currentTemplate.subject
      .replace('{NAME}', userData.name)
      .replace('{SURNAME}', userData.surname)
      .replace('{DOB}', userData.dob);
  }, [currentTemplate, userData.name, userData.surname, userData.dob]);


  return (
    <div className="py-16 animate-fade-in">
      <div className="container mx-auto px-4 sm:px-6">
        <Card className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-2">{t('generator.title')}</h1>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-8">
            {t('generator.subtitle')}
          </p>
          <form className="space-y-6">
            <Select label={t('generator.selectType.label')} id="letterType" value={letterType} onChange={handleSelectChange}>
              <option value="">{t('generator.selectType.placeholder')}</option>
              {Object.entries(allTemplates).map(([key, template]) => (
                template && <option key={key} value={key}>{t(template.titleKey)}</option>
              ))}
            </Select>

            {currentTemplate && (
              <>
                <div className="border-t border-gray-200 dark:border-gray-700 pt-6 space-y-6">
                    <h3 className="font-semibold text-lg">{t('generator.yourData.title')}</h3>
                    <div className="grid sm:grid-cols-2 gap-6">
                      <Input label={t('generator.yourData.name')} id="name" placeholder="Mariia" value={userData.name} onChange={handleInputChange} required />
                      <Input label={t('generator.yourData.surname')} id="surname" placeholder="Shevchenko" value={userData.surname} onChange={handleInputChange} required />
                      <Input label={t('generator.yourData.dob')} id="dob" type="text" placeholder={t('generator.yourData.dobPlaceholder')} value={userData.dob} onChange={handleInputChange} required />
                      <Input label="Email" id="email" type="email" placeholder="example@email.com" value={userData.email} onChange={handleInputChange} required />
                      <Input label={t('generator.yourData.address')} id="street" placeholder="Hauptstr. 10" value={userData.street} onChange={handleInputChange} required />
                      <div className="grid grid-cols-2 gap-4">
                        <Input label={t('generator.yourData.postcode')} id="postcode" placeholder="85435" value={userData.postcode} onChange={handleInputChange} required />
                        <Input label={t('generator.yourData.city')} id="city" placeholder="Erding" value={userData.city} onChange={handleInputChange} required />
                      </div>
                    </div>
                </div>

                {currentTemplate.requiredFields.length > 0 && (
                  <div className="space-y-4 pt-6 border-t border-gray-200 dark:border-gray-700">
                    <h3 className="font-semibold text-lg">{t('generator.additionalInfo.title')}</h3>
                    {currentTemplate.requiredFields.includes('oralRefusalDate') && <Input label={t('generator.additionalInfo.oralRefusalDate')} id="oralRefusalDate" type="text" placeholder={t('generator.yourData.dobPlaceholder')} value={userData.oralRefusalDate || ''} onChange={handleInputChange} required />}
                    {currentTemplate.requiredFields.includes('applicationDate') && <Input label={t('generator.additionalInfo.applicationDate')} id="applicationDate" type="text" placeholder={t('generator.yourData.dobPlaceholder')} value={userData.applicationDate || ''} onChange={handleInputChange} required />}
                    {currentTemplate.requiredFields.includes('lraLetterDate') && <Input label={t('generator.additionalInfo.lraLetterDate')} id="lraLetterDate" type="text" placeholder={t('generator.yourData.dobPlaceholder')} value={userData.lraLetterDate || ''} onChange={handleInputChange} required />}
                    {currentTemplate.requiredFields.includes('deadlineDate') && <Input label={t('generator.additionalInfo.deadlineDate')} id="deadlineDate" type="text" placeholder={t('generator.yourData.dobPlaceholder')} value={userData.deadlineDate || ''} onChange={handleInputChange} required />}
                  </div>
                )}
                
                {letterType === LetterType.Untaetigkeitsklage && (
                     <div className="space-y-4 pt-6 border-t border-gray-200 dark:border-gray-700">
                        <h3 className="font-semibold text-lg">{t('generator.inactionOptions.title')}</h3>
                        <div className="flex items-center">
                            <input type="checkbox" id="alsoAppliedFiktion" checked={inactionData.alsoAppliedFiktion} onChange={handleInputChange} className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600" />
                            <label htmlFor="alsoAppliedFiktion" className="ml-3 block text-sm text-gray-700 dark:text-gray-300">{t('generator.inactionOptions.alsoAppliedFiktion')}</label>
                        </div>
                        <div className="flex items-center">
                            <input type="checkbox" id="previousEnquiries" checked={inactionData.previousEnquiries} onChange={handleInputChange} className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600" />
                            <label htmlFor="previousEnquiries" className="ml-3 block text-sm text-gray-700 dark:text-gray-300">{t('generator.inactionOptions.previousEnquiries')}</label>
                        </div>
                     </div>
                )}
                                
                <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                        <strong>{t('generator.nextStep.title')}</strong> {t('generator.nextStep.description')}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <Button type="button" onClick={handleDocxDownload} className="w-full" disabled={isGeneratingDocx || isGeneratingPdf}>
                          <i className={`fas ${isGeneratingDocx ? 'fa-spinner fa-spin' : 'fa-file-word'} mr-2`}></i>
                          {isGeneratingDocx ? t('generator.buttons.creating') : t('generator.buttons.downloadDocx')}
                        </Button>
                        <Button type="button" onClick={handlePdfDownload} className="w-full" variant="secondary" disabled={isGeneratingDocx || isGeneratingPdf}>
                          <i className={`fas ${isGeneratingPdf ? 'fa-spinner fa-spin' : 'fa-file-pdf'} mr-2`}></i>
                          {isGeneratingPdf ? t('generator.buttons.creating') : t('generator.buttons.downloadPdf')}
                        </Button>
                    </div>
                </div>
                
                <SendingInstructions recipient={currentTemplate.recipient} />

                <EmailHelper
                  recipientEmails={currentTemplate.recipient.email}
                  subject={processedSubject}
                  body={t('generator.email.bodyTemplate').replace('{fullName}', `${userData.name} ${userData.surname}`)}
                />
              </>
            )}
          </form>
        </Card>
      </div>
    </div>
  );
};

export default Generator;