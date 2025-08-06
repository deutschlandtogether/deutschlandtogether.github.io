import { TemplateCategory, LetterType, Template } from '../types';

// Recipients
const LRA_ERDING = {
  name: 'Landratsamt Erding',
  address: [
    'Sachgebiet 31-3 Ausländerwesen',
    'Alois-Schießl-Platz 2',
    '85435 Erding'
  ],
  fax: '+49 8122 58 1272',
  email: ['auslaenderamt@lra-ed.de', 'auslaenderamt-ukraine@lra-ed.de'],
};

const SOZIALAMT_ERDING = {
  name: 'Landratsamt Erding',
  address: [
    'Fachbereich 24 - Asylmanagement',
    'Max-Planck-Straße 2',
    '85435 Erding'
  ],
  fax: '+49 8122 58 1530',
  email: ['soziales@lra-ed.de', 'asylmanagement@lra-ed.de'],
};

// Templates
const templates: Record<LetterType, Template> = {
  [LetterType.OralRefusal]: {
    titleKey: 'templates.oralRefusal.title',
    descriptionKey: 'templates.oralRefusal.description',
    requiredFields: ['oralRefusalDate'],
    templateFile: 'ERDING_ABH_90Day_OralRefuse_TEMPLATE.docx',
    subject: 'Aufforderung zur schriftlichen Bescheidung - {NAME} {SURNAME}, geb. {DOB}',
    recipient: LRA_ERDING,
  },
  [LetterType.DecisionRequest]: {
    titleKey: 'templates.decisionRequest.title',
    descriptionKey: 'templates.decisionRequest.description',
    requiredFields: ['applicationDate'],
    templateFile: 'ERDING_ABH_Duldung_KeinBescheid_TEMPLATE.docx',
    subject: 'Aufforderung zur Bescheidung meines Antrags auf § 24 AufenthG - {NAME} {SURNAME}, geb. {DOB}',
    recipient: LRA_ERDING,
  },
  [LetterType.EatDemand]: {
    titleKey: 'templates.eatDemand.title',
    descriptionKey: 'templates.eatDemand.description',
    requiredFields: [],
    templateFile: 'ERDING_ABH_eAT_TEMPLATE.docx',
    subject: 'Antrag auf Ausstellung eines eAT - {NAME} {SURNAME}, geb. {DOB}',
    recipient: LRA_ERDING,
  },
  [LetterType.FiktionDemand]: {
    titleKey: 'templates.fiktionDemand.title',
    descriptionKey: 'templates.fiktionDemand.description',
    requiredFields: ['applicationDate'],
    templateFile: 'ERDING_ABH_Fiktion_TEMPLATE.docx',
    subject: 'Antrag auf Ausstellung einer Fiktionsbescheinigung - {NAME} {SURNAME}, geb. {DOB}',
    recipient: LRA_ERDING,
  },
  [LetterType.NewApplication]: {
    titleKey: 'templates.newApplication.title',
    descriptionKey: 'templates.newApplication.description',
    requiredFields: ['applicationDate'],
    templateFile: 'ERDING_ABH_New_Antrag_TEMPLATE.docx',
    subject: 'Erneuter Antrag auf § 24 AufenthG - {NAME} {SURNAME}, geb. {DOB}',
    recipient: LRA_ERDING,
  },
  [LetterType.TranslationCosts]: {
    titleKey: 'templates.translationCosts.title',
    descriptionKey: 'templates.translationCosts.description',
    requiredFields: ['lraLetterDate'],
    templateFile: 'ERDING_ASYLMGMT_TranslationCosts_TEMPLATE.docx',
    subject: 'Antrag auf Kostenübernahme für Übersetzungen - {NAME} {SURNAME}, geb. {DOB}',
    recipient: SOZIALAMT_ERDING,
  },
  [LetterType.Untaetigkeitsklage]: {
    titleKey: 'templates.untaetigkeitsklage.title',
    descriptionKey: 'templates.untaetigkeitsklage.description',
    requiredFields: ['applicationDate', 'deadlineDate'],
    templateFile: 'ERDING_ABH_Inaction_TEMPLATE.docx',
    subject: 'Mahnung und Fristsetzung (Antrag auf § 24 AufenthG) - {NAME} {SURNAME}, geb. {DOB}',
    recipient: LRA_ERDING,
  },
};

// Categories
export const templateCategories: TemplateCategory[] = [
  {
    titleKey: 'guides.category.notYet24',
    templates: {
      [LetterType.FiktionDemand]: templates[LetterType.FiktionDemand],
      [LetterType.DecisionRequest]: templates[LetterType.DecisionRequest],
      [LetterType.OralRefusal]: templates[LetterType.OralRefusal],
    },
  },
  {
    titleKey: 'guides.category.klebeetikett',
    templates: {
      [LetterType.EatDemand]: templates[LetterType.EatDemand],
    },
  },
  {
    titleKey: 'guides.category.withdrewApplication',
    templates: {
      [LetterType.NewApplication]: templates[LetterType.NewApplication],
    },
  },
  {
    titleKey: 'guides.category.otherIssues',
    templates: {
      [LetterType.TranslationCosts]: templates[LetterType.TranslationCosts],
      [LetterType.Untaetigkeitsklage]: templates[LetterType.Untaetigkeitsklage],
    },
  },
];

// Getter for all templates
export const getAllTemplates = (): Record<LetterType, Template> => {
  return templates;
};
