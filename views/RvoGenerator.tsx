
import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { RvoComplaintType, RvoUserData, RvoTemplate } from '../types';
import { useI18n } from '../hooks/useI18n';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import Select from '../components/ui/Select';
import Button from '../components/ui/Button';
import EmailHelper from '../components/ui/EmailHelper';

const RVO_RECIPIENT_EMAILS = ['auslaenderrecht@reg-ob.bayern.de', 'poststelle@reg-ob.bayern.de'];

const rvoTemplates: Record<RvoComplaintType, RvoTemplate> = {
  [RvoComplaintType.Fiktion]: {
    titleKey: 'rvoTemplates.fiktion.title',
    descriptionKey: 'rvoTemplates.fiktion.description',
    requiredFields: ['name', 'surname', 'firstRegistrationDate', 'demandLetterDate'],
    subjectTemplate: 'Dienstaufsichtsbeschwerde wegen der Verweigerung der Ausstellung einer Fiktionsbescheinigung durch die Ausländerbehörde des Landkreises Erding',
    bodyTemplate: `Sehr geehrte Damen und Herren,

hiermit erhebe ich formell Dienstaufsichtsbeschwerde gegen die Ausländerbehörde des Landkreises Erding (ABH Erding) wegen der rechtswidrigen Verweigerung, mir eine Fiktionsbescheinigung auszustellen.

Sachverhalt:
1. Ich bin ukrainische/r Staatsangehörige/r. Mein Antrag auf Erteilung einer Aufenthaltserlaubnis nach § 24 AufenthG gilt seit meiner Ersterfassung in Deutschland am {firstRegistrationDate} als gestellt.
2. Trotz meines Antrags und einer schriftlichen Aufforderung an die ABH Erding vom {demandLetterDate} weigert sich die Behörde, mir die gesetzlich zustehende Fiktionsbescheinigung gemäß § 81 Abs. 5 AufenthG auszustellen.
3. Das Fehlen dieses Dokuments hindert mich am Zugang zum Arbeitsmarkt und an der Beantragung von Leistungen nach dem SGB II (Bürgergeld), was zu erheblichen existenziellen Nachteilen führt.

Rechtliche Würdigung:
Das Vorgehen der ABH Erding verletzt § 81 Abs. 5 i.V.m. Abs. 3 Satz 1 AufenthG. Laut dieser Vorschrift ist dem Antragsteller eine Fiktionsbescheinigung auszustellen; die Behörde hat hier kein Ermessen. Dies wird durch die Anwendungshinweise des Bundesministeriums des Innern (z.B. Fassung vom 30.05.2024, Punkt 8.3) bekräftigt, die eine unverzügliche Ausstellung vorsehen. Die Praxis der ABH Erding, die Ausstellung zu verweigern, ist systematisch und rechtswidrig.

Ich fordere Sie als zuständige Fach- und Dienstaufsichtsbehörde dringend auf:
1. Die sofortige dienstaufsichtliche Überprüfung dieser rechtswidrigen Praxis der ABH Erding einzuleiten.
2. Darauf hinzuwirken, dass mir unverzüglich die gesetzlich zustehende Fiktionsbescheinigung ausgestellt wird.

Bitte bestätigen Sie mir den Eingang dieser Beschwerde.

Mit freundlichen Grüßen
{name} {surname}`
  },
  [RvoComplaintType.Delay]: {
    titleKey: 'rvoTemplates.delay.title',
    descriptionKey: 'rvoTemplates.delay.description',
    requiredFields: ['name', 'surname', 'applicationDate', 'monthsWaited', 'enquiryDate'],
    subjectTemplate: 'Dienstaufsichtsbeschwerde wegen unangemessener Verfahrensverzögerung bei der Bearbeitung meines Antrags auf § 24 AufenthG durch die Ausländerbehörde des Landkreises Erding',
    bodyTemplate: `Sehr geehrte Damen und Herren,

hiermit erhebe ich formell Dienstaufsichtsbeschwerde gegen die Ausländerbehörde des Landkreises Erding (ABH Erding) wegen der unangemessenen und rechtswidrigen Verzögerung bei der Bearbeitung meines Antrags.

Sachverhalt:
1. Ich bin ukrainische/r Staatsangehörige/r. Mein Antrag auf Erteilung einer Aufenthaltserlaubnis nach § 24 AufenthG wurde am {applicationDate} bei der ABH Erding gestellt.
2. Seit der Antragstellung sind nunmehr {monthsWaited} Monate vergangen, ohne dass eine abschließende Entscheidung getroffen wurde.
3. Meine schriftlichen Nachfragen zum Bearbeitungsstand vom {enquiryDate} blieben unbeantwortet. Eine sachliche Begründung für die lange Verfahrensdauer wurde mir nicht mitgeteilt.

Rechtliche Würdigung:
Eine Verfahrensdauer von über drei Monaten ohne besonderen sachlichen Grund ist gemäß der Verwaltungsrechtsprechung als unangemessen und rechtswidrig anzusehen (vgl. § 75 VwGO). Die Praxis der ABH Erding, Anträge systematisch über viele Monate hinweg nicht zu bearbeiten, widerspricht dem Zweck der EU-Richtlinie 2001/55/EG, die eine schnelle und unbürokratische Schutzgewährung vorsieht.

Ich fordere Sie als zuständige Fach- und Dienstaufsichtsbehörde dringend auf:
1. Die sofortige dienstaufsichtliche Überprüfung der langen Bearbeitungszeiten bei der ABH Erding einzuleiten.
2. Darauf hinzuwirken, dass über meinen Antrag auf § 24 AufenthG zeitnah entschieden wird.

Bitte bestätigen Sie mir den Eingang dieser Beschwerde.

Mit freundlichen Grüßen
{name} {surname}`
  },
  [RvoComplaintType.Klebeetikett]: {
    titleKey: 'rvoTemplates.klebeetikett.title',
    descriptionKey: 'rvoTemplates.klebeetikett.description',
    requiredFields: ['name', 'surname', 'issueDate', 'demandLetterDate'],
    subjectTemplate: 'Dienstaufsichtsbeschwerde wegen rechtswidriger Ausstellung einer Aufenthaltserlaubnis als Klebeetikett anstelle eines elektronischen Aufenthaltstitels (eAT) durch die Ausländerbehörde des Landkreises Erding',
    bodyTemplate: `Sehr geehrte Damen und Herren,

hiermit erhebe ich formell Dienstaufsichtsbeschwerde gegen die Ausländerbehörde des Landkreises Erding (ABH Erding), da diese Aufenthaltstitel nach § 24 AufenthG systematisch in einer rechtswidrigen Form ausstellt.

Sachverhalt:
1. Mir wurde am {issueDate} eine Aufenthaltserlaubnis nach § 24 AufenthG erteilt.
2. Dieser Aufenthaltstitel wurde jedoch nicht, wie gesetzlich vorgeschrieben, als elektronischer Aufenthaltstitel (eAT-Karte) ausgestellt, sondern lediglich als Klebeetikett (Zusatzblatt) in meinem Reisepass.
3. Auf meine Aufforderung vom {demandLetterDate}, mir einen eAT auszustellen, hat die Behörde nicht reagiert oder dies abgelehnt.

Rechtliche Würdigung:
Gemäß § 78 Abs. 1 AufenthG sind Aufenthaltstitel grundsätzlich als eigenständiges Dokument mit elektronischem Speicher- und Verarbeitungsmedium (eAT) auszustellen. Die Ausstellung in Form eines Klebeetiketts ist nur in eng begrenzten Ausnahmefällen nach § 78a AufenthG zulässig, deren Voraussetzungen hier nicht vorliegen. Insbesondere ist die aktuelle Fassung des § 78a AufenthG nur für Verlängerungen von höchstens einem Monat anwendbar. Die von der ABH Erding auf den Zusatzblättern angegebene Rechtsgrundlage (§ 78a Abs. 1 S. 1 Nr. 2 AufenthG a.F.) ist zudem seit dem 01.11.2023 aufgehoben und somit ungültig. Die Praxis der ABH Erding ist daher gesetzeswidrig.

Ich fordere Sie als zuständige Fach- und Dienstaufsichtsbehörde dringend auf:
1. Die sofortige dienstaufsichtliche Überprüfung dieser rechtswidrigen Praxis der ABH Erding einzuleiten.
2. Darauf hinzuwirken, dass mir mein Aufenthaltstitel in der gesetzlich vorgeschriebenen Form eines eAT ausgestellt wird.

Bitte bestätigen Sie mir den Eingang dieser Beschwerde.

Mit freundlichen Grüßen
{name} {surname}`
  },
};

const RvoGenerator: React.FC = () => {
  const { t } = useI18n();
  const [complaintType, setComplaintType] = useState<RvoComplaintType | ''>('');
  const [userData, setUserData] = useState<RvoUserData>({
    name: '', surname: '',
    firstRegistrationDate: '', demandLetterDate: '', applicationDate: '',
    monthsWaited: '', enquiryDate: '', issueDate: ''
  });

  const currentTemplate = useMemo(() => complaintType ? rvoTemplates[complaintType] : null, [complaintType]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setUserData(prev => ({ ...prev, [id]: value }));
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setComplaintType(e.target.value as RvoComplaintType);
  };

  const processTemplate = (template: string) => {
    if (!template) return '';
    return template
      .replace(/{name}/g, userData.name || '<ИМЯ>')
      .replace(/{surname}/g, userData.surname || '<ФАМИЛИЯ>')
      .replace(/{firstRegistrationDate}/g, userData.firstRegistrationDate || '<ДАТА ПЕРВОЙ РЕГИСТРАЦИИ>')
      .replace(/{demandLetterDate}/g, userData.demandLetterDate || '<ДАТА ПИСЬМА-ТРЕБОВАНИЯ>')
      .replace(/{applicationDate}/g, userData.applicationDate || '<ДАТА ПОДАЧИ ЗАЯВЛЕНИЯ>')
      .replace(/{monthsWaited}/g, userData.monthsWaited || '<КОЛ-ВО МЕСЯЦЕВ>')
      .replace(/{enquiryDate}/g, userData.enquiryDate || '<ДАТА ЗАПРОСА СТАТУСА>')
      .replace(/{issueDate}/g, userData.issueDate || '<ДАТА ВЫДАЧИ ВКЛЕЙКИ>');
  };

  const processedSubject = useMemo(() => currentTemplate ? currentTemplate.subjectTemplate : '', [currentTemplate]);
  const processedBody = useMemo(() => currentTemplate ? processTemplate(currentTemplate.bodyTemplate) : '', [currentTemplate, userData]);
  
  const dobPlaceholder = t('generator.yourData.dobPlaceholder');

  return (
    <div className="py-16 animate-fade-in">
      <div className="container mx-auto px-4 sm:px-6">
        <Card className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-2">{t('rvoGenerator.title')}</h1>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-8">{t('rvoGenerator.subtitle')}</p>
          
          <form className="space-y-6">
            <Select label={t('rvoGenerator.selectType.label')} id="complaintType" value={complaintType} onChange={handleSelectChange}>
              <option value="">{t('rvoGenerator.selectType.placeholder')}</option>
              {Object.entries(rvoTemplates).map(([key, template]) => (
                <option key={key} value={key}>{t(template.titleKey)}</option>
              ))}
            </Select>

            {currentTemplate && (
              <>
                <div className="border-t border-gray-200 dark:border-gray-700 pt-6 space-y-6">
                    <h3 className="font-semibold text-lg">{t('rvoGenerator.yourData.title')}</h3>
                    <div className="grid sm:grid-cols-2 gap-6">
                        <Input label={t('rvoGenerator.yourData.name')} id="name" placeholder="Mariia" value={userData.name} onChange={handleInputChange} required />
                        <Input label={t('rvoGenerator.yourData.surname')} id="surname" placeholder="Shevchenko" value={userData.surname} onChange={handleInputChange} required />
                    </div>
                </div>

                <div className="space-y-4 pt-6 border-t border-gray-200 dark:border-gray-700">
                    <h3 className="font-semibold text-lg">{t('rvoGenerator.additionalInfo.title')}</h3>
                    {currentTemplate && <p className="text-sm text-gray-500 dark:text-gray-400 -mt-2">{t(currentTemplate.descriptionKey)}</p>}
                    {currentTemplate.requiredFields.includes('firstRegistrationDate') && <Input label={t('rvoGenerator.additionalInfo.firstRegistrationDate')} id="firstRegistrationDate" type="text" placeholder={dobPlaceholder} value={userData.firstRegistrationDate || ''} onChange={handleInputChange} required />}
                    {currentTemplate.requiredFields.includes('demandLetterDate') && <Input label={t('rvoGenerator.additionalInfo.demandLetterDate')} id="demandLetterDate" type="text" placeholder={dobPlaceholder} value={userData.demandLetterDate || ''} onChange={handleInputChange} required />}
                    {currentTemplate.requiredFields.includes('applicationDate') && <Input label={t('rvoGenerator.additionalInfo.applicationDate')} id="applicationDate" type="text" placeholder={dobPlaceholder} value={userData.applicationDate || ''} onChange={handleInputChange} required />}
                    {currentTemplate.requiredFields.includes('monthsWaited') && <Input label={t('rvoGenerator.additionalInfo.monthsWaited')} id="monthsWaited" type="text" placeholder="например, 8" value={userData.monthsWaited || ''} onChange={handleInputChange} required />}
                    {currentTemplate.requiredFields.includes('enquiryDate') && <Input label={t('rvoGenerator.additionalInfo.enquiryDate')} id="enquiryDate" type="text" placeholder={dobPlaceholder} value={userData.enquiryDate || ''} onChange={handleInputChange} required />}
                    {currentTemplate.requiredFields.includes('issueDate') && <Input label={t('rvoGenerator.additionalInfo.issueDate')} id="issueDate" type="text" placeholder={dobPlaceholder} value={userData.issueDate || ''} onChange={handleInputChange} required />}
                </div>
                
                <EmailHelper
                    recipientEmails={RVO_RECIPIENT_EMAILS}
                    subject={processedSubject}
                    body={processedBody}
                    titleKey="rvoGenerator.howToSend.title"
                    descriptionKey="rvoGenerator.howToSend.description"
                />
              </>
            )}
          </form>
          {currentTemplate && (
            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                <h3 className="font-semibold text-lg mb-2 text-center">{t('rvoGenerator.nextStep.title')}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 max-w-2xl mx-auto text-center">
                    {t('rvoGenerator.nextStep.description')}
                </p>
                <div className="flex justify-center">
                    <Link to="/lawsuit-generator">
                        <Button variant="secondary">
                            <i className="fas fa-gavel mr-2"></i>
                            {t('rvoGenerator.nextStep.button')}
                        </Button>
                    </Link>
                </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default RvoGenerator;
