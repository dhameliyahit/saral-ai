export type AvailabilityStatus =
  | 'immediate'
  | '2 weeks'
  | '1 month'
  | 'available'
  | 'unavailable'
  | 'notice'
  | 'unknown';

export interface CandidateApi {
  id: number | string;
  name: string;
  title?: string;
  jobTitle?: string;
  company?: string;
  currentCompany?: string;
  experience_years?: number;
  experience?: number;
  location?: string;
  skills?: string[];
  photo_url?: string;
  photoUrl?: string;
  image_url?: string;
  availability?: boolean | string;
  email?: string;
  phone?: string;
  strengths?: string[];
  areas_to_probe?: string[];
  areasToProbe?: string[];
  ai_verdict?: string;
  aiVerdict?: string;
  about?: string;
  match_percentage?: number;
  match_percent?: number;
  matchPercentage?: number;
  match_color?: string;
  created_at?: string;
  education?: string | string[];
}

export interface Candidate {
  _id: string;
  id: string;
  name: string;
  jobTitle: string;
  currentCompany: string;
  experience: number;
  location: string;
  skills: string[];
  photoUrl: string;
  availability: AvailabilityStatus;
  matchPercentage: number;
  matchColor?: string;
  email?: string;
  phone?: string;
  strengths?: string[];
  areasToProbe?: string[];
  aiVerdict?: string;
  about?: string;
  education?: string | string[];
  createdAt?: string;
  isLiked?: boolean;
  isDisliked?: boolean;
  isShortlisted?: boolean;
  isContactUnlocked?: boolean;
}

export interface CandidateDetail extends Candidate {
  careerTimeline?: {
    year: string;
    role: string;
    company: string;
  }[];
  workExperience?: {
    company: string;
    role: string;
    duration: string;
    description: string;
  }[];
  educationHistory?: {
    degree: string;
    institution: string;
    year: string;
  }[];
}

export interface SearchResponse {
  success: boolean;
  candidates: Candidate[];
  total: number;
  page: number;
  limit: number;
  credits_used?: number;
  credits_remaining?: number;
  error?: string;
}

export interface SearchResponseApi {
  success: boolean;
  candidates: CandidateApi[];
  total: number;
  page: number;
  limit: number;
  credits_used?: number;
  credits_remaining?: number;
  error?: string;
}