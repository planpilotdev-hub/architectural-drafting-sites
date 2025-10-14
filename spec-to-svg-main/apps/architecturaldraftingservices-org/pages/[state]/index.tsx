import { useRouter } from 'next/router';
import SeoHead from '@/components/SeoHead';

export default function StateHub() {
  const { query } = useRouter();
  const state = String(query.state || 'state');
  return (
    <>
      <SeoHead title={`${state} Drafting`} description={`Drafting services in ${state}.`} />
      <main style={{ padding: 24 }}>
        <h1>{state} Architectural Drafting</h1>
        <p>City pages will appear here.</p>
      </main>
    </>
  );
}

