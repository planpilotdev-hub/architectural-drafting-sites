import { useRouter } from 'next/router';
import SeoHead from '@/components/SeoHead';

export default function CityPage() {
  const { query } = useRouter();
  const state = String(query.state || 'state');
  const city = String(query.city || 'city');
  return (
    <>
      <SeoHead title={`${city}, ${state} Drafting`} description={`Drafting services in ${city}, ${state}.`} />
      <main style={{ padding: 24 }}>
        <h1>
          {city}, {state} Architectural Drafting
        </h1>
        <p>Local details will be added soon.</p>
      </main>
    </>
  );
}

