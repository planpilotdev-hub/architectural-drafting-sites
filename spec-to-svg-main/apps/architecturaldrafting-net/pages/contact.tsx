import { useState } from 'react';
import SeoHead from '@/components/SeoHead';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      setStatus('success');
      setFormData({ name: '', email: '', phone: '', projectType: '', message: '' });
    } catch (error) {
      setStatus('error');
      setErrorMessage('Failed to send message. Please try again or email us directly.');
    }
  };

  return (
    <>
      <SeoHead
        title="Contact Us - Architectural Drafting Services"
        description="Get in touch with our architectural drafting team. Free quotes, expert consultation, and professional CAD drafting services."
      />

      {/* Hero Section */}
      <section style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: '80px 24px',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <h1 style={{ fontSize: 48, fontWeight: 700, marginBottom: 24, lineHeight: 1.2 }}>
            Contact Our Drafting Experts
          </h1>
          <p style={{ fontSize: 20, marginBottom: 32, opacity: 0.9, maxWidth: 700, margin: '0 auto' }}>
            Ready to bring your project to life? Get a free quote and expert consultation from our professional drafting team.
          </p>
        </div>
      </section>

      {/* Contact Form Section */}
      <section style={{ padding: '80px 24px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <div style={{
            background: 'white',
            padding: 48,
            borderRadius: 12,
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            border: '1px solid #e5e7eb'
          }}>
            {status === 'success' ? (
              <div style={{
                textAlign: 'center',
                padding: 40
              }}>
                <div style={{
                  width: 80,
                  height: 80,
                  background: '#10b981',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 24px',
                  fontSize: 40
                }}>
                  ✓
                </div>
                <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 16, color: '#111827' }}>
                  Message Sent Successfully!
                </h2>
                <p style={{ fontSize: 18, color: '#6b7280', marginBottom: 32 }}>
                  Thank you for contacting us. We'll get back to you within 24 hours.
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  style={{
                    background: '#667eea',
                    color: 'white',
                    padding: '12px 32px',
                    borderRadius: 8,
                    border: 'none',
                    fontWeight: 600,
                    cursor: 'pointer',
                    fontSize: 16
                  }}
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <>
                <h2 style={{ fontSize: 32, fontWeight: 700, marginBottom: 24, color: '#111827' }}>
                  Get a Free Quote
                </h2>
                <p style={{ fontSize: 16, color: '#6b7280', marginBottom: 32 }}>
                  Fill out the form below and our team will respond to your inquiry within 24 hours.
                </p>

                <form onSubmit={handleSubmit}>
                  <div style={{ marginBottom: 24 }}>
                    <label style={{ display: 'block', marginBottom: 8, fontWeight: 600, color: '#374151' }}>
                      Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      style={{
                        width: '100%',
                        padding: 12,
                        border: '1px solid #d1d5db',
                        borderRadius: 8,
                        fontSize: 16,
                        fontFamily: 'inherit'
                      }}
                      placeholder="Your full name"
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 24 }}>
                    <div>
                      <label style={{ display: 'block', marginBottom: 8, fontWeight: 600, color: '#374151' }}>
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        style={{
                          width: '100%',
                          padding: 12,
                          border: '1px solid #d1d5db',
                          borderRadius: 8,
                          fontSize: 16,
                          fontFamily: 'inherit'
                        }}
                        placeholder="your@email.com"
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', marginBottom: 8, fontWeight: 600, color: '#374151' }}>
                        Phone
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        style={{
                          width: '100%',
                          padding: 12,
                          border: '1px solid #d1d5db',
                          borderRadius: 8,
                          fontSize: 16,
                          fontFamily: 'inherit'
                        }}
                        placeholder="(555) 123-4567"
                      />
                    </div>
                  </div>

                  <div style={{ marginBottom: 24 }}>
                    <label style={{ display: 'block', marginBottom: 8, fontWeight: 600, color: '#374151' }}>
                      Project Type *
                    </label>
                    <select
                      name="projectType"
                      value={formData.projectType}
                      onChange={handleChange}
                      required
                      style={{
                        width: '100%',
                        padding: 12,
                        border: '1px solid #d1d5db',
                        borderRadius: 8,
                        fontSize: 16,
                        fontFamily: 'inherit',
                        background: 'white'
                      }}
                    >
                      <option value="">Select project type</option>
                      <option value="residential">Residential Plans</option>
                      <option value="commercial">Commercial Drafting</option>
                      <option value="permit">Permit Ready Plans</option>
                      <option value="3d-modeling">3D Modeling</option>
                      <option value="renovation">Renovation/Addition</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div style={{ marginBottom: 32 }}>
                    <label style={{ display: 'block', marginBottom: 8, fontWeight: 600, color: '#374151' }}>
                      Project Details *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      style={{
                        width: '100%',
                        padding: 12,
                        border: '1px solid #d1d5db',
                        borderRadius: 8,
                        fontSize: 16,
                        fontFamily: 'inherit',
                        resize: 'vertical'
                      }}
                      placeholder="Please describe your project, timeline, and any specific requirements..."
                    />
                  </div>

                  {status === 'error' && (
                    <div style={{
                      background: '#fee2e2',
                      border: '1px solid #fecaca',
                      color: '#991b1b',
                      padding: 16,
                      borderRadius: 8,
                      marginBottom: 24
                    }}>
                      {errorMessage}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    style={{
                      width: '100%',
                      background: status === 'submitting' ? '#9ca3af' : '#667eea',
                      color: 'white',
                      padding: '16px 32px',
                      borderRadius: 8,
                      border: 'none',
                      fontWeight: 600,
                      cursor: status === 'submitting' ? 'not-allowed' : 'pointer',
                      fontSize: 18
                    }}
                  >
                    {status === 'submitting' ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Contact Info Section */}
      <section style={{ padding: '80px 24px', background: '#f9fafb' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <h2 style={{ fontSize: 36, fontWeight: 700, marginBottom: 48, textAlign: 'center' }}>
            Other Ways to Reach Us
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 32 }}>
            <div style={{
              background: 'white',
              padding: 32,
              borderRadius: 12,
              textAlign: 'center',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
            }}>
              <div style={{ fontSize: 40, marginBottom: 16 }}>📧</div>
              <h3 style={{ fontSize: 20, fontWeight: 600, marginBottom: 12 }}>Email</h3>
              <a
                href="mailto:design@planpilot.org"
                style={{ color: '#667eea', textDecoration: 'none', fontSize: 16 }}
              >
                design@planpilot.org
              </a>
            </div>

            <div style={{
              background: 'white',
              padding: 32,
              borderRadius: 12,
              textAlign: 'center',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
            }}>
              <div style={{ fontSize: 40, marginBottom: 16 }}>📞</div>
              <h3 style={{ fontSize: 20, fontWeight: 600, marginBottom: 12 }}>Phone</h3>
              <a
                href="tel:+18001234567"
                style={{ color: '#667eea', textDecoration: 'none', fontSize: 16 }}
              >
                (800) 123-4567
              </a>
            </div>

            <div style={{
              background: 'white',
              padding: 32,
              borderRadius: 12,
              textAlign: 'center',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
            }}>
              <div style={{ fontSize: 40, marginBottom: 16 }}>⏰</div>
              <h3 style={{ fontSize: 20, fontWeight: 600, marginBottom: 12 }}>Business Hours</h3>
              <p style={{ color: '#6b7280', margin: 0, fontSize: 16 }}>
                Monday - Friday<br />
                9:00 AM - 6:00 PM EST
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: '#1f2937', color: 'white', padding: '32px 24px', textAlign: 'center' }}>
        <p style={{ margin: 0, opacity: 0.7 }}>
          © {new Date().getFullYear()} Architectural Drafting Services
        </p>
      </footer>
    </>
  );
}
