
export enum LetterType {
  OralRefusal = 'oral-refusal',
  DecisionRequest = 'decision-request',
  EatDemand = 'eat-demand',
  FiktionDemand = 'fiktion-demand',
  NewApplication = 'new-application',
  TranslationCosts = 'translation-costs',
  Untaetigkeitsklage = 'untaetigkeitsklage',
}

export enum RvoComplaintType {
  Fiktion = 'rvo-fiktion',
  Delay = 'rvo-delay',
  Klebeetikett = 'rvo-klebeetikett',
}

export interface UserData {
  name: string;
  surname: string;
  dob: string;
  street: string;
  postcode: string;
  city: string;
  email: string;
  // Dynamic fields
  oralRefusalDate?: string;
  applicationDate?: string;
  lraLetterDate?: string;
  deadlineDate?: string;
}

export interface RvoUserData {
  name: string;
  surname: string;
  // Dynamic fields for different RVO templates
  firstRegistrationDate?: string;
  demandLetterDate?: string;
  applicationDate?: string;
  monthsWaited?: string;
  enquiryDate?: string;
  issueDate?: string;
}


// Special data for the Untätigkeitsklage template
export interface InactionTemplateData {
  alsoAppliedFiktion?: boolean;
  previousEnquiries?: boolean;
}

export interface Template {
  titleKey: string;
  descriptionKey: string;
  requiredFields: Array<keyof UserData>;
  templateFile: string;
  subject: string;
  recipient: {
    name: string;
    address: string[];
    fax: string;
    email: string[];
  };
}

export interface RvoTemplate {
  titleKey: string;
  descriptionKey: string;
  requiredFields: Array<keyof RvoUserData>;
  subjectTemplate: string;
  bodyTemplate: string;
}

export interface TemplateCategory {
  titleKey: string;
  templates: Partial<Record<LetterType, Template>>;
}
