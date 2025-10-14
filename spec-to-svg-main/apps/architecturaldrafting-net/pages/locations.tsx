import { GetStaticProps } from 'next';
import Link from 'next/link';
import SeoHead from '@/components/SeoHead';
import { CityPage } from '@/lib/types';
import fs from 'fs';
import path from 'path';

interface LocationsProps {
  cities: CityPage[];
}

export default function LocationsPage({ cities }: LocationsProps) {
  // Group cities by state
  const citiesByState = cities.reduce((acc, city) => {
    if (!acc[city.state]) {
      acc[city.state] = [];
    }
    acc[city.state].push(city);
    return acc;
  }, {} as Record<string, CityPage[]>);

  const states = Object.keys(citiesByState).sort();

  return (
    <>
      <SeoHead 
        title="Architectural Drafting Services - All Locations" 
        description="Find professional architectural drafting services in your city. We serve locations across the United States."
      />

      <div style={{ minHeight: '100vh', background: '#f9fafb' }}>
        {/* Header */}
        <div style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', padding: '60px 24px', textAlign: 'center' }}>
          <h1 style={{ fontSize: 42, fontWeight: 700, marginBottom: 16 }}>
            Our Service Locations
          </h1>
          <p style={{ fontSize: 18, opacity: 0.9 }}>
            Professional architectural drafting services across the United States
          </p>
        </div>

        {/* Cities Grid */}
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '60px 24px' }}>
          {states.map(state => (
            <div key={state} style={{ marginBottom: 60 }}>
              <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 24, color: '#1f2937' }}>
                {state} ({citiesByState[state].length} {citiesByState[state].length === 1 ? 'city' : 'cities'})
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 24 }}>
                {citiesByState[state].map(city => (
                  <Link
                    key={city.id}
                    href={`/${city.stateAbbr.toLowerCase()}/${city.urlSlug}`}
                    style={{
                      background: 'white',
                      padding: 24,
                      borderRadius: 12,
                      textDecoration: 'none',
                      color: 'inherit',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                      border: '1px solid #e5e7eb',
                      transition: 'transform 0.2s, box-shadow 0.2s',
                      display: 'block'
                    }}
                  >
                    <h3 style={{ fontSize: 20, fontWeight: 600, marginBottom: 8, color: '#667eea' }}>
                      {city.city}, {city.stateAbbr}
                    </h3>
                    <p style={{ color: '#6b7280', fontSize: 14, lineHeight: 1.5, margin: 0 }}>
                      {city.metaDescription.substring(0, 100)}...
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          ))}

          {cities.length === 0 && (
            <div style={{ textAlign: 'center', padding: 60 }}>
              <p style={{ fontSize: 18, color: '#6b7280' }}>
                No locations available yet. Check back soon!
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const citiesFilePath = path.join(process.cwd(), 'public', 'data', 'cities.json');

  try {
    const fileContents = fs.readFileSync(citiesFilePath, 'utf8');
    const data = JSON.parse(fileContents);
    const cities: CityPage[] = data.cities || [];
    
    const publishedCities = cities.filter(city => city.status === 'published');

    return {
      props: { cities: publishedCities },
      revalidate: 3600
    };
  } catch (error) {
    return {
      props: { cities: [] },
      revalidate: 60
    };
  }
};
