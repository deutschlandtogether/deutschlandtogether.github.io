
import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { useI18n } from '../hooks/useI18n';
import { detailedGuides, guideCategories } from '../constants/detailedGuides';
import { getAllTemplates } from '../constants/templates';
import { LetterType, Template } from '../types';

const allTemplates = getAllTemplates() as Record<LetterType, Template>;

const GuideContentRenderer: React.FC<{ text: string; placeholders?: { [key: string]: LetterType } }> = ({ text, placeholders }) => {
  const { t } = useI18n();

  if (!text) return null;

  const internalLinkPlaceholders: Record<string, { to: string, textKey: string, icon: string }> = {
    '[LINK_LAWSUIT_GENERATOR]': { to: '/lawsuit-generator', textKey: 'lawsuitGenerator.title', icon: 'fas fa-gavel' },
    '[LINK_RVO_GENERATOR]': { to: '/rvo-generator', textKey: 'rvoGenerator.title', icon: 'fas fa-university' },
  };

  const placeholderKeys = Object.keys(placeholders || {});
  const internalLinkKeys = Object.keys(internalLinkPlaceholders);
  let parts: string[];
  
  const allKeys = [...placeholderKeys, ...internalLinkKeys];

  if (allKeys.length > 0) {
    const regex = new RegExp(`(${allKeys.map(k => k.replace(/\[/g, '\\[').replace(/\]/g, '\\]')).join('|')})`, 'g');
    parts = text.split(regex).filter(part => part);
  } else {
    parts = [text];
  }

  const processLine = (line: string) => {
    // Icons and lists
    line = line.replace(/^(✔️|📌|⚖️|⚠️|📄|📝|✅|❌|▶️|•|-|1️⃣|2️⃣|3️⃣|4️⃣|5️⃣|6️⃣|🌕|❗️|➡️)\s/, (match) => {
        return `<span class="mr-2">${match.trim()}</span>`;
    });
    // Autolink URLs
    const urlRegex = /(https?:\/\/\S+)/g;
    line = line.replace(urlRegex, '<a href="$1" target="_blank" rel="noopener noreferrer" class="text-blue-500 dark:text-blue-400 hover:underline break-all">$1</a>');
    // Inline code for specific terms
    line = line.replace(/`([^`]+)`/g, '<span class="bg-gray-200 dark:bg-gray-700 rounded px-1 py-0.5 font-mono text-sm">\$1</span>');
    // Bold text
    line = line.replace(/\*\*(.+?)\*\*/g, '<strong class="font-semibold text-gray-900 dark:text-gray-100">\$1</strong>');
    return { __html: line };
  };
  
  return (
    <div className="prose prose-blue dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 space-y-4">
      {parts.map((part, index) => {
        if (placeholders && placeholders[part as keyof typeof placeholders]) {
          const letterType = placeholders[part as keyof typeof placeholders];
          const template = allTemplates[letterType];
          if (!template) return <p key={index} className="text-red-500">Error: Template for {letterType} not found.</p>;
          
          return (
            <div key={index} className="my-6 text-center">
              <Link to={`/generator?type=${letterType}`}>
                <Button>
                  <i className="fas fa-pen-to-square mr-2"></i>
                  {t(template.titleKey)}
                </Button>
              </Link>
            </div>
          );
        }

        if (internalLinkPlaceholders[part]) {
          const linkInfo = internalLinkPlaceholders[part];
          return (
            <div key={index} className="my-6 text-center">
              <Link to={linkInfo.to}>
                <Button variant="secondary">
                  <i className={`${linkInfo.icon} mr-2`}></i>
                  {t(linkInfo.textKey)}
                </Button>
              </Link>
            </div>
          )
        }
        
        return (
          <div key={index}>
            {part.split('\n').map((line, i) => {
                if (line.trim() === '---') {
                    return <hr key={i} className="my-6 border-dashed border-gray-300 dark:border-gray-600" />;
                }
                
                return (
                    <p 
                      key={i} 
                      dangerouslySetInnerHTML={processLine(line)} 
                      className={'leading-relaxed'}
                    />
                )
            })}
          </div>
        );
      })}
    </div>
  );
};


const AccordionItem: React.FC<{ guide: typeof detailedGuides[0], isOpen: boolean, onClick: () => void }> = ({ guide, isOpen, onClick }) => {
    const { t } = useI18n();

    return (
        <div className="border-b border-gray-200 dark:border-gray-700 last:border-b-0">
            <button
                onClick={onClick}
                className="w-full text-left flex justify-between items-center py-5 px-1 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                aria-expanded={isOpen}
            >
                <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">{t(guide.titleKey)}</h2>
                <i className={`fas fa-chevron-down transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}></i>
            </button>
            <div className={`grid transition-all duration-500 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                <div className="overflow-hidden">
                    <div className="px-1 py-6">
                       <GuideContentRenderer text={t(guide.contentKey)} placeholders={guide.templatePlaceholders} />
                    </div>
                </div>
            </div>
        </div>
    );
};

const GuideCategorySection: React.FC<{ category: typeof guideCategories[0], guides: typeof detailedGuides, openAccordion: string | null, setOpenAccordion: (id: string | null) => void }> = ({ category, guides, openAccordion, setOpenAccordion }) => {
    const { t } = useI18n();
    
    const categoryGuides = useMemo(() => {
        return guides.filter(guide => category.guideIds.includes(guide.id))
    }, [category, guides]);
    
    const handleToggle = (id: string) => {
        setOpenAccordion(openAccordion === id ? null : id);
    };

    return (
        <div key={category.id}>
            <h2 className="text-3xl font-extrabold text-gray-800 dark:text-gray-200 mt-16 mb-6">{t(category.titleKey)}</h2>
            <Card className="p-4 sm:p-6 !shadow-xl dark:!shadow-gray-700/60">
                {categoryGuides.map(guide => (
                    <AccordionItem 
                        key={guide.id}
                        guide={guide}
                        isOpen={openAccordion === guide.id}
                        onClick={() => handleToggle(guide.id)}
                    />
                ))}
            </Card>
        </div>
    )
};


const Guides: React.FC = () => {
    const { t } = useI18n();
    const [openAccordion, setOpenAccordion] = useState<string | null>(() => {
        const defaultOpen = detailedGuides.find(g => g.isDefaultOpen);
        return defaultOpen ? defaultOpen.id : null;
    });

    return (
        <div className="py-16 animate-fade-in">
            <div className="container mx-auto px-4 sm:px-6">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-extrabold mb-2">{t('guides.title')}</h1>
                    <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">{t('guides.newSubtitle')}</p>
                </div>
                
                <div className="max-w-4xl mx-auto">
                    {guideCategories.map(category => (
                         <GuideCategorySection 
                            key={category.id}
                            category={category}
                            guides={detailedGuides}
                            openAccordion={openAccordion}
                            setOpenAccordion={setOpenAccordion}
                         />
                    ))}
                </div>

                <div className="max-w-4xl mx-auto mt-16">
                    <Card className="text-center bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800/50">
                        <h2 className="text-2xl font-bold mb-2 text-blue-800 dark:text-blue-300">{t('guides.seeFaq.title')}</h2>
                        <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">{t('guides.seeFaq.description')}</p>
                        <div className="flex justify-center">
                            <Link to="/faq">
                                <Button variant="secondary">
                                    <i className="fas fa-question-circle mr-2"></i>
                                    {t('guides.seeFaq.button')}
                                </Button>
                            </Link>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default Guides;
