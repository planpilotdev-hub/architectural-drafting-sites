// Review Type
export interface Review {
  id: string;
  author: string;
  rating: number; // 1-5
  text: string;
  date: string;
  projectType: string;
}

// City SEO Page Types
export interface CityPage {
  id: string;
  city: string;
  state: string;
  stateAbbr: string;
  urlSlug: string;
  status: 'draft' | 'published';

  // SEO Fields
  title: string;
  metaDescription: string;

  // Content Fields
  heroTitle: string;
  heroDescription: string;
  cityInfo: string;
  servicesContent: string;

  // Image
  heroImage?: string;
  heroImageAlt?: string;

  // Reviews
  reviews?: Review[];

  // Optional Fields
  population?: number;
  neighborhoods?: string[];
  landmarks?: string[];

  // Timestamps
  createdAt: string;
  updatedAt: string;
}

export interface CityData {
  cities: CityPage[];
}

// Content Spinner Result
export interface SpunContent {
  heroTitle: string;
  heroDescription: string;
  servicesContent: string;
  cityInfo: string;
  uniquenessScore: number;
}
