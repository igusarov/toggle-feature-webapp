export interface Customer {
  id: number;
  displayName: string;
}
export interface FeatureToggle {
  id?: number;
  displayName: string;
  technicalName: string;
  expiresOn: string;
  description: string;
  archive: boolean;
  inverted: boolean;
  customers: Customer[];
}
