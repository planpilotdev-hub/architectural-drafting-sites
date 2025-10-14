import SeoHead from './SeoHead';
import { CityPage } from '@/lib/types';

interface CityPageTemplateProps {
  cityData: CityPage;
}

export default function CityPageTemplate({ cityData }: CityPageTemplateProps) {
  const { city, state, title, metaDescription, heroTitle, heroDescription, cityInfo, servicesContent } = cityData;

  return (
    <>
      <SeoHead title={title} description={metaDescription} />

      {/* Hero Section */}
      <section style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: '80px 24px',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{
            display: 'inline-block',
            background: 'rgba(255,255,255,0.2)',
            padding: '6px 16px',
            borderRadius: 20,
            fontSize: 14,
            marginBottom: 24
          }}>
            {city}, {state}
          </div>
          <h1 style={{ fontSize: 48, fontWeight: 700, marginBottom: 24, lineHeight: 1.2 }}>
            {heroTitle}
          </h1>
          <p style={{ fontSize: 20, marginBottom: 32, opacity: 0.9, maxWidth: 700, margin: '0 auto 32px' }}>
            {heroDescription}
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a
              href="#contact"
              style={{
                background: 'white',
                color: '#667eea',
                padding: '14px 32px',
                borderRadius: 8,
                fontWeight: 600,
                textDecoration: 'none',
                display: 'inline-block'
              }}
            >
              Get a Free Quote
            </a>
            <a
              href="#services"
              style={{
                background: 'rgba(255,255,255,0.2)',
                color: 'white',
                padding: '14px 32px',
                borderRadius: 8,
                fontWeight: 600,
                textDecoration: 'none',
                display: 'inline-block',
                border: '2px solid white'
              }}
            >
              Our Services
            </a>
          </div>
        </div>
      </section>

      {/* City Info Section */}
      <section style={{ padding: '80px 24px', background: '#f9fafb' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <h2 style={{ fontSize: 36, fontWeight: 700, marginBottom: 24, textAlign: 'center' }}>
            About {city}, {state}
          </h2>
          <div style={{ fontSize: 18, lineHeight: 1.8, color: '#4b5563' }}>
            <p>{cityInfo}</p>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" style={{ padding: '80px 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <h2 style={{ fontSize: 36, fontWeight: 700, marginBottom: 24, textAlign: 'center' }}>
            Our Drafting Services in {city}
          </h2>
          <div style={{ fontSize: 18, lineHeight: 1.8, color: '#4b5563', marginBottom: 48 }}>
            <p>{servicesContent}</p>
          </div>

          {/* Service Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 32 }}>
            {[
              { title: 'Residential Plans', desc: 'Custom home designs, additions, and renovations' },
              { title: 'Commercial Drafting', desc: 'Office buildings, retail spaces, and industrial facilities' },
              { title: 'Permit Ready Plans', desc: 'Code-compliant drawings for building department approval' },
              { title: '3D Modeling', desc: 'Visualize your project before construction begins' }
            ].map((service, idx) => (
              <div key={idx} style={{
                background: 'white',
                padding: 32,
                borderRadius: 12,
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                border: '1px solid #e5e7eb'
              }}>
                <h3 style={{ fontSize: 24, fontWeight: 600, marginBottom: 12 }}>
                  {service.title}
                </h3>
                <p style={{ color: '#6b7280', lineHeight: 1.6 }}>
                  {service.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" style={{ padding: '80px 24px', background: '#f9fafb' }}>
        <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: 36, fontWeight: 700, marginBottom: 24 }}>
            Ready to Start Your Project in {city}?
          </h2>
          <p style={{ fontSize: 18, color: '#4b5563', marginBottom: 32 }}>
            Contact us today for a free consultation and quote. Fast turnaround, professional results.
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a
              href="mailto:info@architecturaldrafting.net"
              style={{
                background: '#667eea',
                color: 'white',
                padding: '14px 32px',
                borderRadius: 8,
                fontWeight: 600,
                textDecoration: 'none',
                display: 'inline-block'
              }}
            >
              Email Us
            </a>
            <a
              href="tel:+18001234567"
              style={{
                background: 'white',
                color: '#667eea',
                padding: '14px 32px',
                borderRadius: 8,
                fontWeight: 600,
                textDecoration: 'none',
                display: 'inline-block',
                border: '2px solid #667eea'
              }}
            >
              Call Now
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: '#1f2937', color: 'white', padding: '32px 24px', textAlign: 'center' }}>
        <p style={{ margin: 0, opacity: 0.7 }}>
          © {new Date().getFullYear()} Architectural Drafting Services. Serving {city}, {state}
        </p>
      </footer>
    </>
  );
}
