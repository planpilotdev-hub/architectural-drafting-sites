import OpenAI from 'openai';
import { SpunContent } from './types';

/**
 * OpenAI Service for generating unique city content
 */
export class OpenAIContentGenerator {
  private openai: OpenAI | null = null;

  constructor() {
    const apiKey = process.env.OPENAI_API_KEY;

    if (apiKey) {
      this.openai = new OpenAI({
        apiKey: apiKey,
      });
    } else {
      console.warn('OpenAI API key not found. Content generation will fall back to content spinner.');
    }
  }

  /**
   * Check if OpenAI is available
   */
  public isAvailable(): boolean {
    return this.openai !== null;
  }

  /**
   * Generate city-specific content using OpenAI
   */
  public async generateCityContent(
    city: string,
    state: string,
    options?: {
      population?: number;
      neighborhoods?: string[];
      landmarks?: string[];
    }
  ): Promise<SpunContent> {
    if (!this.openai) {
      throw new Error('OpenAI API key not configured');
    }

    const contextInfo = this.buildContextInfo(options);

    const prompt = `You are a professional content writer specializing in architectural drafting services SEO content.

Generate unique, engaging content for a local SEO page about architectural drafting services in ${city}, ${state}.
${contextInfo}

Please provide the following content pieces in a structured JSON format:

1. heroTitle: A compelling H1 title (50-70 characters) that includes the city name and highlights architectural drafting services
2. heroDescription: An engaging hero section description (120-160 characters) that explains the value proposition
3. cityInfo: A paragraph (150-200 words) about architectural drafting needs in ${city}, mentioning local building trends, architecture styles, and community development
4. servicesContent: A paragraph (150-200 words) describing the specific architectural drafting services offered in ${city}, including residential plans, commercial drafting, permit-ready plans, and 3D modeling

Requirements:
- Content must be unique and natural-sounding, not templated
- Include location-specific details about ${city}, ${state}
- Use professional but approachable tone
- Focus on benefits to local builders, architects, homeowners, and developers
- Incorporate relevant architectural drafting keywords naturally
- Make it SEO-friendly but human-readable
- Avoid generic phrases and clichés

Return ONLY valid JSON in this exact format:
{
  "heroTitle": "...",
  "heroDescription": "...",
  "cityInfo": "...",
  "servicesContent": "..."
}`;

    try {
      const response = await this.openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: 'You are an expert SEO content writer specializing in local architectural drafting services. You create unique, engaging, and location-specific content that ranks well in search engines while being genuinely useful to readers.',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.8, // Higher temperature for more creative, varied content
        max_tokens: 1500,
        response_format: { type: 'json_object' },
      });

      const content = response.choices[0]?.message?.content;
      if (!content) {
        throw new Error('No content generated from OpenAI');
      }

      const parsedContent = JSON.parse(content);

      return {
        heroTitle: parsedContent.heroTitle || `Professional Architectural Drafting Services in ${city}, ${state}`,
        heroDescription: parsedContent.heroDescription || `Expert CAD and drafting support for architects, builders, and homeowners in ${city}.`,
        cityInfo: parsedContent.cityInfo || `${city}, ${state} is a thriving community with diverse architectural needs.`,
        servicesContent: parsedContent.servicesContent || `Our architectural drafting services in ${city} include residential floor plans, commercial building designs, and construction documentation.`,
        uniquenessScore: 95, // OpenAI generated content is highly unique
      };
    } catch (error) {
      console.error('OpenAI content generation error:', error);
      throw error;
    }
  }

  /**
   * Generate specific content section
   */
  public async generateSection(
    city: string,
    state: string,
    sectionType: 'hero' | 'cityInfo' | 'services',
    existingContent?: Partial<SpunContent>
  ): Promise<string> {
    if (!this.openai) {
      throw new Error('OpenAI API key not configured');
    }

    const prompts = {
      hero: `Write a compelling 2-3 sentence hero description for an architectural drafting services page targeting ${city}, ${state}. Focus on the value proposition and local expertise.`,
      cityInfo: `Write a 150-200 word paragraph about architectural drafting opportunities and building trends in ${city}, ${state}. Include information about local architecture, development, and why professional drafting services are valuable in this area.`,
      services: `Write a 150-200 word paragraph describing architectural drafting services available in ${city}, ${state}. Include: residential plans, commercial drafting, permit-ready plans, 3D modeling, and CAD services. Focus on local building codes and regulations.`,
    };

    try {
      const response = await this.openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: 'You are an expert SEO content writer specializing in local architectural drafting services.',
          },
          {
            role: 'user',
            content: prompts[sectionType],
          },
        ],
        temperature: 0.8,
        max_tokens: 500,
      });

      return response.choices[0]?.message?.content || '';
    } catch (error) {
      console.error('OpenAI section generation error:', error);
      throw error;
    }
  }

  /**
   * Build context information string
   */
  private buildContextInfo(options?: {
    population?: number;
    neighborhoods?: string[];
    landmarks?: string[];
  }): string {
    if (!options) return '';

    const parts: string[] = [];

    if (options.population) {
      parts.push(`Population: ${options.population.toLocaleString()}`);
    }

    if (options.neighborhoods && options.neighborhoods.length > 0) {
      parts.push(`Notable neighborhoods: ${options.neighborhoods.join(', ')}`);
    }

    if (options.landmarks && options.landmarks.length > 0) {
      parts.push(`Local landmarks: ${options.landmarks.join(', ')}`);
    }

    return parts.length > 0 ? '\nAdditional context:\n' + parts.join('\n') : '';
  }

  /**
   * Batch generate content for multiple cities
   */
  public async batchGenerateCityContent(
    cities: Array<{ city: string; state: string; stateAbbr: string }>
  ): Promise<Array<{ city: string; state: string; stateAbbr: string; content: SpunContent }>> {
    if (!this.openai) {
      throw new Error('OpenAI API key not configured');
    }

    const results = [];

    for (const cityData of cities) {
      try {
        const content = await this.generateCityContent(cityData.city, cityData.state);
        results.push({
          ...cityData,
          content,
        });

        // Add a small delay to respect rate limits
        await new Promise(resolve => setTimeout(resolve, 500));
      } catch (error) {
        console.error(`Failed to generate content for ${cityData.city}, ${cityData.state}:`, error);
        // Continue with next city
      }
    }

    return results;
  }
}

// Export singleton instance
export const openaiContentGenerator = new OpenAIContentGenerator();
