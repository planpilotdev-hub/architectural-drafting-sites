type ProfessionalServiceOpts = { base: string };

export function professionalServiceJsonLd({ base }: ProfessionalServiceOpts) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'PlanPilot Drafting',
    url: base,
    telephone: '+1-000-000-0000',
    priceRange: '$$',
    address: { '@type': 'PostalAddress', addressLocality: 'City', addressRegion: 'State', addressCountry: 'US' }
  } as const;
}

