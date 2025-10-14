import SeoHead from './SeoHead';
import { CityPage } from '@/lib/types';

interface CityPageTemplateProps {
  cityData: CityPage;
}

export default function CityPageTemplate({ cityData }: CityPageTemplateProps) {
  const { city, state, title, metaDescription, heroTitle, heroDescription, cityInfo, servicesContent, heroImage, heroImageAlt, reviews } = cityData;

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
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, alignItems: 'center' }}>
            <div style={{ borderRadius: 12, overflow: 'hidden', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', background: '#f3f4f6' }}>
              {heroImage ? (
                <img
                  src={heroImage}
                  alt={heroImageAlt || `Architectural drafting services in ${city}, ${state}`}
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                />
              ) : (
                <div style={{
                  width: '100%',
                  height: 300,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  flexDirection: 'column',
                  gap: 12
                }}>
                  <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <path d="M21 15l-5-5L5 21" />
                  </svg>
                  <p style={{ margin: 0, fontSize: 16, opacity: 0.9 }}>
                    {city}, {state}
                  </p>
                </div>
              )}
            </div>
            <div style={{ fontSize: 18, lineHeight: 1.8, color: '#4b5563' }}>
              <p>{cityInfo}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" style={{ padding: '80px 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <h2 style={{ fontSize: 36, fontWeight: 700, marginBottom: 24, textAlign: 'center' }}>
            Architectural Drafting in {city}
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

      {/* Reviews Section */}
      {reviews && reviews.length > 0 && (
        <section style={{ padding: '80px 24px', background: '#f9fafb' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <h2 style={{ fontSize: 36, fontWeight: 700, marginBottom: 48, textAlign: 'center' }}>
              What Our Clients Say
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: 24 }}>
              {reviews.slice(0, 3).map((review) => (
                <div key={review.id} style={{
                  background: 'white',
                  padding: 24,
                  borderRadius: 12,
                  boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                  border: '1px solid #e5e7eb'
                }}>
                  {/* Star Rating */}
                  <div style={{ marginBottom: 12 }}>
                    {[...Array(5)].map((_, i) => (
                      <span key={i} style={{ color: i < review.rating ? '#fbbf24' : '#d1d5db', fontSize: 20 }}>
                        ★
                      </span>
                    ))}
                  </div>

                  {/* Review Text */}
                  <p style={{ color: '#4b5563', fontSize: 16, lineHeight: 1.6, marginBottom: 16 }}>
                    "{review.text}"
                  </p>

                  {/* Author Info */}
                  <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: 12 }}>
                    <p style={{ fontWeight: 600, color: '#111827', marginBottom: 4 }}>
                      {review.author}
                    </p>
                    <p style={{ fontSize: 14, color: '#6b7280' }}>
                      {review.projectType} • {new Date(review.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Contact Section */}
      <section id="contact" style={{ padding: '80px 24px', background: reviews && reviews.length > 0 ? 'white' : '#f9fafb' }}>
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
          © {new Date().getFullYear()} Architectural Drafting. Serving {city}, {state}
        </p>
      </footer>
    </>
  );
}
