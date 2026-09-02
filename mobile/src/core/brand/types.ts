export const BRAND_IDS = ['vita', 'nexo'] as const;

export type BrandId = (typeof BRAND_IDS)[number];

export type BrandCopy = {
  appName: string;
  homeTitle: string;
  homeSubtitle: string;
  homeGreeting: string;
  homeWalletHint: string;
  homePatientCount: string;
  patientsTitle: string;
  patientDetailTitle: string;
  patientDetailPlaceholder: string;
  patientsEmpty: string;
  healthCardTitle: string;
  healthOk: string;
  healthDown: string;
  healthPending: string;
  healthRetry: string;
  aiActionsLabel: string;
  aiActionsHint: string;
  aiActionsGenerate: string;
  aiActionsDisabled: string;
  aiActionsError: string;
  patientUnlockTitle: string;
  patientUnlockSubtitle: string;
  patientUnlockAction: string;
  patientUnlockCancel: string;
  patientUnlockPrompt: string;
  patientUnlockError: string;
  patientBirthDateLabel: string;
  patientSexLabel: string;
  patientNotesLabel: string;
  patientNotesSave: string;
  patientNotesPlaceholder: string;
  patientNotesError: string;
};

export type BrandLogo = {
  wordmark: string;
  monogram: string;
};

export type BrandIdentity = {
  id: BrandId;
  copy: BrandCopy;
  logo: BrandLogo;
};

export type BrandService = {
  brandId: BrandId;
  setBrandId: (brandId: BrandId) => void;
  identity: BrandIdentity;
};
