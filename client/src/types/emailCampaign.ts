// types/emailCampaign.ts
export interface EmailCampaign {
  id: string;
  name: string;
  type: 'linkedin' | 'email_sequence';
  status: 'draft' | 'active' | 'paused' | 'completed';
  subject: string;
  totalRecipients: number;
  sentCount: number;
  openedCount: number;
  repliedCount: number;
  deliveryRate: number;
  openRate: number;
  replyRate: number;
  createdAt: string;
  updatedAt: string;
}

export interface CampaignStep {
  id: string;
  campaignId: string;
  stepNumber: number;
  subject: string;
  body: string;
  delayDays: number;
  isActive: boolean;
}

export interface CampaignRecipient {
  id: string;
  campaignId: string;
  candidateId: string;
  emailStatus: 'sent' | 'delivered' | 'opened' | 'replied';
  sentAt?: string;
  openedAt?: string;
  repliedAt?: string;
}