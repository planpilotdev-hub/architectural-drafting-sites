export interface CityPage {
  id: string;
  city: string;
  state: string;
  stateAbbr: string;
  urlSlug: string;
  status: 'draft' | 'published';
  title: string;
  metaDescription: string;
  heroTitle: string;
  heroDescription: string;
  cityInfo: string;
  servicesContent: string;
  population?: number;
  neighborhoods?: string[];
  landmarks?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface SpunContent {
  heroTitle: string;
  heroDescription: string;
  servicesContent: string;
  cityInfo: string;
  uniquenessScore: number;
}
