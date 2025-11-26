import type { CampaignStep } from "./emailCampaign";

// types/campaignBuilder.ts
export interface CampaignTemplate {
  id: string;
  name: string;
  subject: string;
  body: string;
  variables: string[];
}

export interface CampaignFormData {
  name: string;
  type: 'linkedin' | 'email_sequence';
  subject: string;
  body: string;
  recipients: string[];
  steps: CampaignStep[];
}