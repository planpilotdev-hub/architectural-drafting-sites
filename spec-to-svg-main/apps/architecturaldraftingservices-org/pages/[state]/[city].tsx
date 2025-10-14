import { GetStaticPaths, GetStaticProps } from 'next';
import { CityPage } from '@/lib/types';
import CityPageTemplate from '@/components/CityPageTemplate';
import fs from 'fs';
import path from 'path';

interface CityPageProps {
  cityData: CityPage | null;
}

export default function CityDraftingPage({ cityData }: CityPageProps) {
  if (!cityData) {
    return (
      <div style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', padding: 24 }}>
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: 36, fontWeight: 700, marginBottom: 16 }}>City Not Found</h1>
          <p style={{ color: '#6b7280' }}>This location page does not exist.</p>
          <a href="/locations" style={{ color: '#667eea', textDecoration: 'underline', marginTop: 16, display: 'inline-block' }}>
            View All Locations
          </a>
        </div>
      </div>
    );
  }

  return <CityPageTemplate cityData={cityData} />;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const citiesFilePath = path.join(process.cwd(), 'public', 'data', 'cities.json');
  let cities: CityPage[] = [];
  try {
    const fileContents = fs.readFileSync(citiesFilePath, 'utf8');
    const data = JSON.parse(fileContents);
    cities = data.cities || [];
  } catch (error) {
    console.log('No cities data found yet');
  }

  const paths = cities
    .filter(city => city.status === 'published')
    .map(city => ({ params: { state: city.stateAbbr.toLowerCase(), city: city.urlSlug } }));

  return { paths, fallback: 'blocking' };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const state = params?.state as string;
  const citySlug = params?.city as string;
  const citiesFilePath = path.join(process.cwd(), 'public', 'data', 'cities.json');

  try {
    const fileContents = fs.readFileSync(citiesFilePath, 'utf8');
    const data = JSON.parse(fileContents);
    const cities: CityPage[] = data.cities || [];
    const cityData = cities.find(
      city => city.urlSlug === citySlug && city.stateAbbr.toLowerCase() === state && city.status === 'published'
    );

    if (!cityData) return { props: { cityData: null }, revalidate: 60 };
    return { props: { cityData }, revalidate: 3600 };
  } catch (error) {
    return { props: { cityData: null }, revalidate: 60 };
  }
};
