import React from 'react';
import Card from '../components/ui/Card';
import { useI18n } from '../hooks/useI18n';

interface Contact {
  nameKey: string;
  address?: string;
  email?: string | string[];
  phone?: string;
  url?: string;
  descriptionKey: string;
}

const importantContacts: Contact[] = [
    { nameKey: 'support.contacts.abh.name', address: 'Alois-Schießl-Platz 2, 85435 Erding', email: ['auslaenderamt@lra-ed.de', 'auslaenderamt-ukraine@lra-ed.de'], phone: '+49 8122 58-1700', descriptionKey: 'support.contacts.abh.description' },
    { nameKey: 'support.contacts.asyl.name', address: 'Max-Planck-Str. 2, 85435 Erding', email: ['soziales@lra-ed.de', 'asylmanagement@lra-ed.de'], phone: '+49 8122 58-0', descriptionKey: 'support.contacts.asyl.description' },
    { nameKey: 'support.contacts.regOb.name', address: 'Maximilianstraße 39, 80538 München', email: 'poststelle@reg-ob.bayern.de', descriptionKey: 'support.contacts.regOb.description' },
    { nameKey: 'support.contacts.stmi.name', address: 'Odeonsplatz 3, 80539 München', email: 'poststelle@bmi.bund.de', descriptionKey: 'support.contacts.stmi.description' },
    { nameKey: 'support.contacts.landtag.name', address: 'Max-Planck-Straße 1, 81675 München', email: 'petitionen@bayern.landtag.de', url: 'www.bayern.landtag.de', descriptionKey: 'support.contacts.landtag.description' },
    { nameKey: 'support.contacts.quarteera.name', email: 'kontakt@quarteera.de', url: 'www.quarteera.de', descriptionKey: 'support.contacts.quarteera.description' },
    { nameKey: 'support.contacts.unhcr.name', email: 'gfrbe@unhcr.org', url: 'www.unhcr.org/de', descriptionKey: 'support.contacts.unhcr.description' },
    { nameKey: 'support.contacts.proasyl.name', email: 'beratung@proasyl.de', url: 'https://www.proasyl.de', descriptionKey: 'support.contacts.proasyl.description' },
    { nameKey: 'support.contacts.refugio.name', address: 'Rosenheimer Str. 38, 81669 München', email: 'info@refugio-muenchen.de', phone: '+49 89 9829570', url: 'https://www.refugio-muenchen.de', descriptionKey: 'support.contacts.refugio.description' },
];

const Support: React.FC = () => {
  const { t } = useI18n();
  return (
    <div className="py-16 animate-fade-in">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold mb-2">{t('support.title')}</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">{t('support.subtitle')}</p>
        </div>
        
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8 mb-12">
            <Card>
                <h2 className="text-2xl font-bold mb-3 text-blue-700 dark:text-blue-400">{t('support.mfr.title')}</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {t('support.mfr.description')}
                </p>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {t('support.mfr.collaboration')}
                </p>
                 <div className="space-y-3">
                    <p className="font-medium flex items-center"><i className="fas fa-envelope mr-3 text-blue-500 w-5 text-center"></i><a href="mailto:info@muenchner-fluechtlingsrat.de" className="hover:underline">info@muenchner-fluechtlingsrat.de</a></p>
                    <p className="font-medium flex items-center"><i className="fas fa-envelope mr-3 text-blue-500 w-5 text-center"></i><a href="mailto:info@mfr.ngo" className="hover:underline">info@mfr.ngo</a></p>
                    <p className="font-medium flex items-center"><i className="fas fa-phone-alt mr-3 text-blue-500 w-5 text-center"></i><span>089-123-900-96</span></p>
                    <p className="font-medium flex items-center"><i className="fas fa-globe mr-3 text-blue-500 w-5 text-center"></i><a href="https://muenchner-fluechtlingsrat.de/" target="_blank" rel="noopener noreferrer" className="hover:underline">muenchner-fluechtlingsrat.de</a></p>
                    <p className="font-medium flex items-start"><i className="fas fa-map-marker-alt mr-3 mt-1 text-blue-500 w-5 text-center"></i><a href="https://www.google.com/maps/search/?api=1&query=Dachauerstr.+17,+80335+München" target="_blank" rel="noopener noreferrer" className="hover:underline">Dachauerstr. 17, 80335 München</a></p>
                </div>
            </Card>
             <Card className="flex flex-col">
                <h2 className="text-2xl font-bold mb-3 text-blue-700 dark:text-blue-400">{t('support.telegram.title')}</h2>
                <div className="flex-grow flex flex-col sm:flex-row gap-4 items-center">
                    <div className="flex-grow">
                        <p className="text-gray-600 dark:text-gray-400 mb-4">
                          {t('support.telegram.description')}
                        </p>
                        <a href="https://t.me/ErdingTogether" target="_blank" rel="noopener noreferrer" className="font-medium flex items-center text-blue-500 hover:underline">
                            <i className="fab fa-telegram mr-3 text-2xl w-5 text-center"></i>
                            <span>{t('support.telegram.link')}</span>
                        </a>
                    </div>
                    <div className="flex-shrink-0 mt-4 sm:mt-0">
                        <img 
                            src="https://api.qrserver.com/v1/create-qr-code/?size=128x128&data=https://t.me/ErdingTogether" 
                            alt="Telegram QR Code" 
                            className="w-32 h-32 rounded-lg shadow-md bg-white p-1" 
                            aria-label="QR Code to join Telegram group"
                        />
                    </div>
                </div>
            </Card>
        </div>

        <div className="mt-16">
            <h2 className="text-3xl font-bold text-center mb-8">{t('support.contacts.title')}</h2>
            <div className="max-w-4xl mx-auto space-y-6">
                {importantContacts.map(contact => (
                    <Card key={contact.nameKey}>
                        <h3 className="text-xl font-bold mb-2 text-blue-600 dark:text-blue-400">{t(contact.nameKey)}</h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-4">{t(contact.descriptionKey)}</p>
                        <div className="space-y-2 text-sm">
                            {contact.address && <p className="flex items-start"><i className="fas fa-map-marker-alt mr-3 mt-1 text-blue-500 w-4 text-center"></i><span>{contact.address}</span></p>}
                            {contact.phone && <p className="flex items-center"><i className="fas fa-phone-alt mr-3 text-blue-500 w-4 text-center"></i><span>{contact.phone}</span></p>}
                            {contact.email && (Array.isArray(contact.email) ? contact.email.map(e => <p key={e} className="flex items-center"><i className="fas fa-envelope mr-3 text-blue-500 w-4 text-center"></i><a href={`mailto:${e}`} className="hover:underline">{e}</a></p>) : <p className="flex items-center"><i className="fas fa-envelope mr-3 text-blue-500 w-4 text-center"></i><a href={`mailto:${contact.email}`} className="hover:underline">{contact.email}</a></p>)}
                            {contact.url && <p className="flex items-center"><i className="fas fa-globe mr-3 text-blue-500 w-4 text-center"></i><a href={`https://${contact.url}`} target="_blank" rel="noopener noreferrer" className="hover:underline">{contact.url}</a></p>}
                        </div>
                    </Card>
                ))}
            </div>
        </div>

        <div className="mt-16">
            <h3 className="text-2xl font-bold text-center mb-6">{t('support.mfr.addressTitle')}</h3>
             <Card className="max-w-4xl mx-auto">
                <div className="aspect-w-16 aspect-h-9">
                <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2661.884024343834!2d11.565492076874447!3d48.14982604677707!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x479e75f3a4ca4f95%3A0x42387791845cec46!2sDachauer%20Str.%2017%2C%2080335%20M%C3%BCnchen!5e0!3m2!1sen!2sde!4v1716307137887!5m2!1sen!2sde" 
                    width="100%" 
                    height="400" 
                    style={{border:0}} 
                    allowFullScreen={true} 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                    className="rounded-lg shadow-md"
                    title="Map to Münchner Flüchtlingsrat"
                ></iframe>
                </div>
            </Card>
        </div>
      </div>
    </div>
  );
};

export default Support;