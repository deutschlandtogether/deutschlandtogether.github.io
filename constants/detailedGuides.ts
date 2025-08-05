
import { LetterType } from '../types';

export interface GuideContent {
  id: string;
  titleKey: string;
  contentKey: string;
  templatePlaceholders?: { [placeholder: string]: LetterType };
  isDefaultOpen?: boolean;
}

export const detailedGuides: GuideContent[] = [
  {
    id: 'fiktion',
    titleKey: 'guides.detailed.fiktion.title',
    contentKey: 'guides.detailed.fiktion.content',
    templatePlaceholders: {
      '[BUTTON_FIKTION_DEMAND]': LetterType.FiktionDemand,
    },
    isDefaultOpen: true,
  },
  {
    id: 'duldung',
    titleKey: 'guides.detailed.duldung.title',
    contentKey: 'guides.detailed.duldung.content',
    templatePlaceholders: {
      '[BUTTON_DECISION_REQUEST]': LetterType.DecisionRequest,
      '[BUTTON_NEW_APPLICATION]': LetterType.NewApplication,
      '[BUTTON_ORAL_REFUSAL]': LetterType.OralRefusal,
    }
  },
  {
    id: 'eat_demand',
    titleKey: 'guides.detailed.eat_demand.title',
    contentKey: 'guides.detailed.eat_demand.content',
    templatePlaceholders: {
      '[BUTTON_EAT_DEMAND]': LetterType.EatDemand,
    },
  },
  {
    id: 'translation_costs',
    titleKey: 'guides.detailed.translation_costs.title',
    contentKey: 'guides.detailed.translation_costs.content',
    templatePlaceholders: {
      '[BUTTON_TRANSLATION_COSTS]': LetterType.TranslationCosts,
    }
  },
  {
    id: 'untaetigkeitsklage',
    titleKey: 'guides.detailed.untaetigkeitsklage.title',
    contentKey: 'guides.detailed.untaetigkeitsklage.content',
    templatePlaceholders: {
      '[BUTTON_UNTAETIGKEITSKLAGE]': LetterType.Untaetigkeitsklage,
    }
  },
  {
    id: 'complaint',
    titleKey: 'guides.detailed.complaint.title',
    contentKey: 'guides.detailed.complaint.content',
  },
];

export interface GuideCategory {
  id: string;
  titleKey: string;
  guideIds: string[];
}

export const guideCategories: GuideCategory[] = [
  {
    id: 'initial_problems',
    titleKey: 'guides.category.initialProblems',
    guideIds: ['duldung', 'fiktion', 'eat_demand'],
  },
  {
    id: 'advanced_actions',
    titleKey: 'guides.category.advancedActions',
    guideIds: ['untaetigkeitsklage', 'complaint'],
  },
  {
    id: 'other_issues',
    titleKey: 'guides.category.otherIssues2',
    guideIds: ['translation_costs'],
  },
];
