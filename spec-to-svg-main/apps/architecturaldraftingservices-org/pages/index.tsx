import Link from 'next/link';
import SeoHead from '@/components/SeoHead';

export default function Home() {
  return (
    <>
      <SeoHead title="Architectural Drafting Services" description="Professional architectural drafting, national coverage." />
      <main style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', padding: 24 }}>
        <div style={{ textAlign: 'center', maxWidth: 700 }}>
          <h1 style={{ fontSize: 36, fontWeight: 700, marginBottom: 16 }}>Architectural Drafting Services</h1>
          <p style={{ color: '#6b7280', marginBottom: 24 }}>
            CAD production and drafting support for firms across the US.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
            <Link href="/locations" style={{ padding: '10px 16px', border: '1px solid #e5e7eb', borderRadius: 8 }}>Get Started</Link>
            <a href="mailto:hello@example.com" style={{ padding: '10px 16px', border: '1px solid #e5e7eb', borderRadius: 8 }}>Contact</a>
          </div>
        </div>
      </main>
    </>
  );
}

