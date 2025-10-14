import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';
import { CityPage } from '@/lib/types';
import { contentSpinner } from '@/lib/contentSpinner';
import { openaiContentGenerator } from '@/lib/openaiService';

const citiesFilePath = path.join(process.cwd(), 'public', 'data', 'cities.json');

// Helper to read cities data
function readCitiesData(): { cities: CityPage[] } {
  try {
    const fileContents = fs.readFileSync(citiesFilePath, 'utf8');
    return JSON.parse(fileContents);
  } catch (error) {
    return { cities: [] };
  }
}

// Helper to write cities data
function writeCitiesData(data: { cities: CityPage[] }): void {
  fs.writeFileSync(citiesFilePath, JSON.stringify(data, null, 2), 'utf8');
}

// Helper to generate URL slug
function generateSlug(city: string): string {
  return city
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Helper to generate unique ID
function generateId(): string {
  return `city_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  try {
    switch (method) {
      case 'GET': {
        // Get all cities or a specific city
        const data = readCitiesData();
        const { id } = req.query;

        if (id && typeof id === 'string') {
          const city = data.cities.find(c => c.id === id);
          if (!city) {
            return res.status(404).json({ error: 'City not found' });
          }
          return res.status(200).json(city);
        }

        return res.status(200).json(data.cities);
      }

      case 'POST': {
        // Create a new city
        const { city, state, stateAbbr, population, neighborhoods, landmarks, useOpenAI } = req.body;

        if (!city || !state || !stateAbbr) {
          return res.status(400).json({ error: 'Missing required fields: city, state, stateAbbr' });
        }

        const data = readCitiesData();

        // Generate URL slug
        const urlSlug = generateSlug(city);

        // Check if city already exists
        const existingCity = data.cities.find(
          c => c.urlSlug === urlSlug && c.stateAbbr.toLowerCase() === stateAbbr.toLowerCase()
        );

        if (existingCity) {
          return res.status(400).json({ error: 'City already exists with this name in this state' });
        }

        // Generate content using OpenAI if available and requested, otherwise fallback to content spinner
        let spunContent;
        let contentSource = 'content-spinner';

        if (useOpenAI !== false && openaiContentGenerator.isAvailable()) {
          try {
            spunContent = await openaiContentGenerator.generateCityContent(city, state, {
              population,
              neighborhoods,
              landmarks,
            });
            contentSource = 'openai';
          } catch (error) {
            console.error('OpenAI generation failed, falling back to content spinner:', error);
            spunContent = contentSpinner.spinCityContent(city, state);
          }
        } else {
          spunContent = contentSpinner.spinCityContent(city, state);
        }

        // Create new city object
        const newCity: CityPage = {
          id: generateId(),
          city,
          state,
          stateAbbr: stateAbbr.toUpperCase(),
          urlSlug,
          status: 'draft',
          title: `${spunContent.heroTitle} | Architectural Drafting`,
          metaDescription: spunContent.heroDescription.substring(0, 160),
          heroTitle: spunContent.heroTitle,
          heroDescription: spunContent.heroDescription,
          cityInfo: spunContent.cityInfo,
          servicesContent: spunContent.servicesContent,
          population: population || undefined,
          neighborhoods: neighborhoods || undefined,
          landmarks: landmarks || undefined,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };

        // Add to cities array
        data.cities.push(newCity);

        // Save to file
        writeCitiesData(data);

        return res.status(201).json({
          success: true,
          city: newCity,
          uniquenessScore: spunContent.uniquenessScore,
          contentSource
        });
      }

      case 'PUT': {
        // Update an existing city
        const { id } = req.query;
        if (!id || typeof id !== 'string') {
          return res.status(400).json({ error: 'Missing city ID' });
        }

        const updates = req.body;
        const data = readCitiesData();

        const cityIndex = data.cities.findIndex(c => c.id === id);
        if (cityIndex === -1) {
          return res.status(404).json({ error: 'City not found' });
        }

        // Update city data
        data.cities[cityIndex] = {
          ...data.cities[cityIndex],
          ...updates,
          id, // Ensure ID doesn't change
          updatedAt: new Date().toISOString()
        };

        // If city or state changed, or if regenerate is requested, regenerate content
        if (updates.city || updates.state || updates.regenerateContent) {
          const city = updates.city || data.cities[cityIndex].city;
          const state = updates.state || data.cities[cityIndex].state;
          const useOpenAI = updates.useOpenAI !== false;

          let spunContent;
          let contentSource = 'content-spinner';

          if (useOpenAI && openaiContentGenerator.isAvailable()) {
            try {
              spunContent = await openaiContentGenerator.generateCityContent(city, state, {
                population: data.cities[cityIndex].population,
                neighborhoods: data.cities[cityIndex].neighborhoods,
                landmarks: data.cities[cityIndex].landmarks,
              });
              contentSource = 'openai';
            } catch (error) {
              console.error('OpenAI generation failed, falling back to content spinner:', error);
              spunContent = contentSpinner.spinCityContent(city, state);
            }
          } else {
            spunContent = contentSpinner.spinCityContent(city, state);
          }

          data.cities[cityIndex] = {
            ...data.cities[cityIndex],
            heroTitle: spunContent.heroTitle,
            heroDescription: spunContent.heroDescription,
            cityInfo: spunContent.cityInfo,
            servicesContent: spunContent.servicesContent,
            title: `${spunContent.heroTitle} | Architectural Drafting`,
            metaDescription: spunContent.heroDescription.substring(0, 160)
          };
        }

        // Save to file
        writeCitiesData(data);

        return res.status(200).json({
          success: true,
          city: data.cities[cityIndex]
        });
      }

      case 'DELETE': {
        // Delete a city
        const { id } = req.query;
        if (!id || typeof id !== 'string') {
          return res.status(400).json({ error: 'Missing city ID' });
        }

        const data = readCitiesData();
        const cityIndex = data.cities.findIndex(c => c.id === id);

        if (cityIndex === -1) {
          return res.status(404).json({ error: 'City not found' });
        }

        // Remove city
        data.cities.splice(cityIndex, 1);

        // Save to file
        writeCitiesData(data);

        return res.status(200).json({ success: true });
      }

      default:
        res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
        return res.status(405).json({ error: `Method ${method} Not Allowed` });
    }
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
