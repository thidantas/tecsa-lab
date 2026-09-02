export const BRAND_IDS = ['vita', 'nexo'] as const;

export type BrandId = (typeof BRAND_IDS)[number];

export type BrandCopy = {
  appName: string;
  homeTitle: string;
  homeSubtitle: string;
  patientsTitle: string;
  patientDetailTitle: string;
  patientDetailPlaceholder: string;
  patientsEmpty: string;
  healthCardTitle: string;
  aiActionsLabel: string;
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
