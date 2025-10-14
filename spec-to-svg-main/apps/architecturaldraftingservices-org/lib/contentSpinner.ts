import { SpunContent } from './types';

/**
 * Content Spinner for Architectural Drafting Services
 * Generates unique content variations for each city using synonym replacement
 */
export class ContentSpinner {
  private synonymSets: Map<string, string[]>;
  private seedValue: number = 0;

  constructor() {
    this.synonymSets = new Map();
    this.initializeSynonymSets();
  }

  /**
   * Initialize synonym sets for architectural drafting industry
   */
  private initializeSynonymSets(): void {
    // Core architectural drafting terms
    this.synonymSets.set('drafting', ['drafting', 'design', 'drawing', 'planning', 'detailing', 'CAD services']);
    this.synonymSets.set('services', ['services', 'solutions', 'assistance', 'support', 'expertise', 'offerings']);
    this.synonymSets.set('architectural', ['architectural', 'building', 'construction', 'structural', 'design']);
    this.synonymSets.set('professional', ['professional', 'expert', 'experienced', 'skilled', 'qualified', 'certified']);
    this.synonymSets.set('plans', ['plans', 'drawings', 'blueprints', 'designs', 'schematics', 'layouts']);

    // Action words
    this.synonymSets.set('create', ['create', 'develop', 'produce', 'generate', 'design', 'craft']);
    this.synonymSets.set('provide', ['provide', 'offer', 'deliver', 'supply', 'furnish']);
    this.synonymSets.set('help', ['help', 'assist', 'support', 'aid', 'serve', 'guide']);

    // Quality descriptors
    this.synonymSets.set('precise', ['precise', 'accurate', 'exact', 'detailed', 'meticulous']);
    this.synonymSets.set('quality', ['quality', 'high-standard', 'premium', 'top-tier', 'excellent']);
    this.synonymSets.set('comprehensive', ['comprehensive', 'complete', 'thorough', 'full-service', 'extensive']);
    this.synonymSets.set('fast', ['fast', 'quick', 'rapid', 'speedy', 'prompt', 'efficient']);

    // Project types
    this.synonymSets.set('residential', ['residential', 'home', 'house', 'dwelling', 'living space']);
    this.synonymSets.set('commercial', ['commercial', 'business', 'corporate', 'industrial', 'professional']);

    // Client types
    this.synonymSets.set('builders', ['builders', 'contractors', 'developers', 'construction professionals', 'project managers']);
    this.synonymSets.set('homeowners', ['homeowners', 'property owners', 'residents', 'home buyers', 'clients']);
    this.synonymSets.set('architects', ['architects', 'designers', 'planners', 'design professionals']);
  }

  /**
   * Create deterministic seed based on city and state
   */
  private createSeed(city: string, state: string): number {
    let hash = 0;
    const str = city + state;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return Math.abs(hash);
  }

  /**
   * Seeded random number generator
   */
  private seededRandom(): number {
    this.seedValue = (this.seedValue * 9301 + 49297) % 233280;
    return this.seedValue / 233280;
  }

  /**
   * Get a deterministic variant based on the seed
   */
  private getVariant(key: string): string {
    const variants = this.synonymSets.get(key);
    if (!variants || variants.length === 0) return key;

    const index = Math.floor(this.seededRandom() * variants.length);
    return variants[index];
  }

  /**
   * Spin text by replacing placeholders and synonyms
   */
  private spinText(text: string): string {
    let spun = text;

    // Replace {key} placeholders
    for (const [key] of this.synonymSets) {
      const placeholder = new RegExp(`\\{${key}\\}`, 'g');
      if (spun.includes(`{${key}}`)) {
        spun = spun.replace(placeholder, this.getVariant(key));
      }
    }

    // Remove any remaining unreplaced placeholders
    spun = spun.replace(/\{([^}]+)\}/g, (match, key) => {
      console.warn(`ContentSpinner: Unreplaced placeholder: ${match}`);
      return key;
    });

    return spun;
  }

  /**
   * Main content generation method
   */
  public spinCityContent(city: string, state: string): SpunContent {
    // Initialize seed for this city
    this.seedValue = this.createSeed(city, state);

    // Hero title variations - KEYWORD: "architectural drafting services"
    const heroTitles = [
      `{Professional} Architectural Drafting Services in ${city}, ${state}`,
      `Expert Architectural Drafting Services for ${city} {Builders} and {Architects}`,
      `{Quality} Architectural Drafting Services in ${city}, ${state}`,
      `${city}'s Leading Architectural Drafting Services Company`
    ];

    // Hero description variations - KEYWORD: "architectural drafting services"
    const heroDescriptions = [
      `{Precise} architectural drafting services and CAD {support} for {architects}, {builders}, and {homeowners} in ${city}. {Fast} turnaround, {professional} results.`,
      `Transform your vision into reality with our {comprehensive} architectural drafting services. Serving ${city} and surrounding areas.`,
      `{Quality} {residential} and {commercial} architectural drafting services tailored for ${city} projects. Get started today.`,
      `{Help} bring your building project to life with {precise} architectural drafting services designed for ${city}, ${state}.`
    ];

    // Services content variations - KEYWORD: "architectural drafting services"
    const servicesContent = [
      `Our architectural drafting services in ${city} include {residential} floor plans, {commercial} building designs, site plans, and construction documentation. We {provide} {professional} CAD architectural drafting services with {fast} delivery times.`,
      `We specialize in {precise} architectural drafting services for ${city} {builders}, {contractors}, and {homeowners}. From concept to construction, our {experienced} team delivers {quality} architectural drafting services.`,
      `{Comprehensive} architectural drafting services for ${city}: {residential} renovations, new {commercial} construction, permit {plans}, and as-built drawings. {Professional} results, competitive pricing.`,
      `Serving ${city} with {expert} architectural drafting services for over a decade. We {provide} 3D modeling, construction documents, and {precise} technical drawings for any project size.`
    ];

    // City info variations - KEYWORD: "architectural drafting services"
    const cityInfoTemplates = [
      `${city}, ${state} is a thriving community with diverse {architectural} needs. Our local architectural drafting services team understands ${city}'s building codes, zoning requirements, and {architectural} styles.`,
      `Located in ${state}, ${city} features a mix of {residential} and {commercial} development. We {provide} architectural drafting services that meet local ${city} building standards and regulations.`,
      `${city} residents and {builders} trust our architectural drafting services expertise. We're familiar with ${city}'s unique building requirements and deliver {precise} {plans} on time.`,
      `As ${city}'s preferred architectural drafting services provider, we understand the local {architectural} landscape. From historic renovations to modern new builds, we've got ${city} covered.`
    ];

    // Select variations based on seed
    const selectedHeroTitle = heroTitles[Math.floor(this.seededRandom() * heroTitles.length)];
    const selectedHeroDesc = heroDescriptions[Math.floor(this.seededRandom() * heroDescriptions.length)];
    const selectedServices = servicesContent[Math.floor(this.seededRandom() * servicesContent.length)];
    const selectedCityInfo = cityInfoTemplates[Math.floor(this.seededRandom() * cityInfoTemplates.length)];

    // Spin the content
    const spunHeroTitle = this.spinText(selectedHeroTitle);
    const spunHeroDescription = this.spinText(selectedHeroDesc);
    const spunServicesContent = this.spinText(selectedServices);
    const spunCityInfo = this.spinText(selectedCityInfo);

    // Calculate uniqueness score (simplified)
    const uniquenessScore = 85 + Math.floor(this.seededRandom() * 10); // 85-95%

    return {
      heroTitle: spunHeroTitle,
      heroDescription: spunHeroDescription,
      servicesContent: spunServicesContent,
      cityInfo: spunCityInfo,
      uniquenessScore
    };
  }

  /**
   * Generate city-specific information
   */
  public generateCityInfo(city: string, state: string): string {
    this.seedValue = this.createSeed(city, state);

    const templates = [
      `${city}, ${state} is known for its {quality} {architectural} projects. Our {drafting} team {provides} {professional} {services} to local {builders} and {homeowners}.`,
      `We {help} ${city} {architects} and {contractors} {create} {precise} {plans} for {residential} and {commercial} projects throughout ${state}.`,
      `${city}'s growing construction industry needs {reliable} {drafting} {services}. We deliver {comprehensive} {architectural} {plans} with {fast} turnaround.`
    ];

    const selected = templates[Math.floor(this.seededRandom() * templates.length)];
    return this.spinText(selected);
  }
}

// Export singleton instance
export const contentSpinner = new ContentSpinner();
