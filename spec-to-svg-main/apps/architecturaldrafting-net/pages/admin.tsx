import { useState, useEffect } from 'react';
import SeoHead from '@/components/SeoHead';
import { CityPage } from '@/lib/types';

const US_STATES = [
  { name: 'Alabama', abbr: 'AL' }, { name: 'Alaska', abbr: 'AK' }, { name: 'Arizona', abbr: 'AZ' },
  { name: 'Arkansas', abbr: 'AR' }, { name: 'California', abbr: 'CA' }, { name: 'Colorado', abbr: 'CO' },
  { name: 'Connecticut', abbr: 'CT' }, { name: 'Delaware', abbr: 'DE' }, { name: 'Florida', abbr: 'FL' },
  { name: 'Georgia', abbr: 'GA' }, { name: 'Hawaii', abbr: 'HI' }, { name: 'Idaho', abbr: 'ID' },
  { name: 'Illinois', abbr: 'IL' }, { name: 'Indiana', abbr: 'IN' }, { name: 'Iowa', abbr: 'IA' },
  { name: 'Kansas', abbr: 'KS' }, { name: 'Kentucky', abbr: 'KY' }, { name: 'Louisiana', abbr: 'LA' },
  { name: 'Maine', abbr: 'ME' }, { name: 'Maryland', abbr: 'MD' }, { name: 'Massachusetts', abbr: 'MA' },
  { name: 'Michigan', abbr: 'MI' }, { name: 'Minnesota', abbr: 'MN' }, { name: 'Mississippi', abbr: 'MS' },
  { name: 'Missouri', abbr: 'MO' }, { name: 'Montana', abbr: 'MT' }, { name: 'Nebraska', abbr: 'NE' },
  { name: 'Nevada', abbr: 'NV' }, { name: 'New Hampshire', abbr: 'NH' }, { name: 'New Jersey', abbr: 'NJ' },
  { name: 'New Mexico', abbr: 'NM' }, { name: 'New York', abbr: 'NY' }, { name: 'North Carolina', abbr: 'NC' },
  { name: 'North Dakota', abbr: 'ND' }, { name: 'Ohio', abbr: 'OH' }, { name: 'Oklahoma', abbr: 'OK' },
  { name: 'Oregon', abbr: 'OR' }, { name: 'Pennsylvania', abbr: 'PA' }, { name: 'Rhode Island', abbr: 'RI' },
  { name: 'South Carolina', abbr: 'SC' }, { name: 'South Dakota', abbr: 'SD' }, { name: 'Tennessee', abbr: 'TN' },
  { name: 'Texas', abbr: 'TX' }, { name: 'Utah', abbr: 'UT' }, { name: 'Vermont', abbr: 'VT' },
  { name: 'Virginia', abbr: 'VA' }, { name: 'Washington', abbr: 'WA' }, { name: 'West Virginia', abbr: 'WV' },
  { name: 'Wisconsin', abbr: 'WI' }, { name: 'Wyoming', abbr: 'WY' }
];

export default function AdminPage() {
  const [cities, setCities] = useState<CityPage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingCity, setEditingCity] = useState<CityPage | null>(null);

  // Form fields
  const [cityName, setCityName] = useState('');
  const [stateName, setStateName] = useState('');
  const [stateAbbr, setStateAbbr] = useState('');
  const [population, setPopulation] = useState('');
  const [neighborhoods, setNeighborhoods] = useState('');
  const [landmarks, setLandmarks] = useState('');
  const [useOpenAI, setUseOpenAI] = useState(true);

  // Load cities on mount
  useEffect(() => {
    loadCities();
  }, []);

  const loadCities = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/cities');
      if (!response.ok) throw new Error('Failed to load cities');
      const data = await response.json();
      setCities(data);
      setError('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load cities');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setCityName('');
    setStateName('');
    setStateAbbr('');
    setPopulation('');
    setNeighborhoods('');
    setLandmarks('');
    setUseOpenAI(true);
    setEditingCity(null);
    setShowForm(false);
  };

  const handleStateChange = (abbr: string) => {
    setStateAbbr(abbr);
    const state = US_STATES.find(s => s.abbr === abbr);
    if (state) setStateName(state.name);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const payload = {
        city: cityName,
        state: stateName,
        stateAbbr,
        population: population ? parseInt(population) : undefined,
        neighborhoods: neighborhoods ? neighborhoods.split(',').map(n => n.trim()) : undefined,
        landmarks: landmarks ? landmarks.split(',').map(l => l.trim()) : undefined,
        useOpenAI: useOpenAI,
        regenerateContent: editingCity ? true : undefined
      };

      const url = editingCity ? `/api/cities?id=${editingCity.id}` : '/api/cities';
      const method = editingCity ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to save city');
      }

      const result = await response.json();
      const sourceMessage = result.contentSource === 'openai' ? ' (AI Generated)' : ' (Template Based)';
      setSuccess(
        editingCity
          ? 'City updated successfully!' + sourceMessage
          : `City added successfully! Uniqueness score: ${result.uniquenessScore}%${sourceMessage}`
      );

      resetForm();
      loadCities();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save city');
    }
  };

  const handleEdit = (city: CityPage) => {
    setEditingCity(city);
    setCityName(city.city);
    setStateName(city.state);
    setStateAbbr(city.stateAbbr);
    setPopulation(city.population?.toString() || '');
    setNeighborhoods(city.neighborhoods?.join(', ') || '');
    setLandmarks(city.landmarks?.join(', ') || '');
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this city?')) return;

    try {
      const response = await fetch(`/api/cities?id=${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Failed to delete city');
      setSuccess('City deleted successfully!');
      loadCities();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete city');
    }
  };

  const toggleStatus = async (city: CityPage) => {
    try {
      const newStatus = city.status === 'published' ? 'draft' : 'published';
      const response = await fetch(`/api/cities?id=${city.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });

      if (!response.ok) throw new Error('Failed to update status');
      setSuccess(`City ${newStatus === 'published' ? 'published' : 'unpublished'} successfully!`);
      loadCities();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update status');
    }
  };

  return (
    <>
      <SeoHead title="Admin - Manage Cities" description="Manage city pages" />

      <div style={{ minHeight: '100vh', background: '#f9fafb', padding: '40px 24px' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
          {/* Header */}
          <div style={{ marginBottom: 40 }}>
            <h1 style={{ fontSize: 36, fontWeight: 700, marginBottom: 16 }}>
              City Management Admin
            </h1>
            <button
              onClick={() => { resetForm(); setShowForm(!showForm); }}
              style={{
                background: '#667eea',
                color: 'white',
                padding: '12px 24px',
                borderRadius: 8,
                border: 'none',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              {showForm ? 'Cancel' : '+ Add New City'}
            </button>
          </div>

          {/* Messages */}
          {error && (
            <div style={{
              background: '#fee',
              border: '1px solid #fcc',
              color: '#c00',
              padding: 16,
              borderRadius: 8,
              marginBottom: 20
            }}>
              {error}
            </div>
          )}

          {success && (
            <div style={{
              background: '#efe',
              border: '1px solid #cfc',
              color: '#060',
              padding: 16,
              borderRadius: 8,
              marginBottom: 20
            }}>
              {success}
            </div>
          )}

          {/* Add/Edit Form */}
          {showForm && (
            <div style={{
              background: 'white',
              padding: 32,
              borderRadius: 12,
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
              marginBottom: 40
            }}>
              <h2 style={{ fontSize: 24, fontWeight: 600, marginBottom: 24 }}>
                {editingCity ? 'Edit City' : 'Add New City'}
              </h2>
              <form onSubmit={handleSubmit}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: 8, fontWeight: 600 }}>
                      City Name *
                    </label>
                    <input
                      type="text"
                      value={cityName}
                      onChange={(e) => setCityName(e.target.value)}
                      required
                      style={{
                        width: '100%',
                        padding: 12,
                        border: '1px solid #ddd',
                        borderRadius: 8,
                        fontSize: 16
                      }}
                      placeholder="e.g., Los Angeles"
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', marginBottom: 8, fontWeight: 600 }}>
                      State *
                    </label>
                    <select
                      value={stateAbbr}
                      onChange={(e) => handleStateChange(e.target.value)}
                      required
                      style={{
                        width: '100%',
                        padding: 12,
                        border: '1px solid #ddd',
                        borderRadius: 8,
                        fontSize: 16
                      }}
                    >
                      <option value="">Select a state</option>
                      {US_STATES.map(state => (
                        <option key={state.abbr} value={state.abbr}>
                          {state.name} ({state.abbr})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', marginBottom: 8, fontWeight: 600 }}>
                      Population (optional)
                    </label>
                    <input
                      type="number"
                      value={population}
                      onChange={(e) => setPopulation(e.target.value)}
                      style={{
                        width: '100%',
                        padding: 12,
                        border: '1px solid #ddd',
                        borderRadius: 8,
                        fontSize: 16
                      }}
                      placeholder="e.g., 3900000"
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', marginBottom: 8, fontWeight: 600 }}>
                      Neighborhoods (comma-separated, optional)
                    </label>
                    <input
                      type="text"
                      value={neighborhoods}
                      onChange={(e) => setNeighborhoods(e.target.value)}
                      style={{
                        width: '100%',
                        padding: 12,
                        border: '1px solid #ddd',
                        borderRadius: 8,
                        fontSize: 16
                      }}
                      placeholder="e.g., Downtown, Westside, Hollywood"
                    />
                  </div>
                </div>

                <div style={{ marginBottom: 20 }}>
                  <label style={{ display: 'block', marginBottom: 8, fontWeight: 600 }}>
                    Landmarks (comma-separated, optional)
                  </label>
                  <input
                    type="text"
                    value={landmarks}
                    onChange={(e) => setLandmarks(e.target.value)}
                    style={{
                      width: '100%',
                      padding: 12,
                      border: '1px solid #ddd',
                      borderRadius: 8,
                      fontSize: 16
                    }}
                    placeholder="e.g., City Hall, Central Park, Historic District"
                  />
                </div>

                <div style={{ marginBottom: 20 }}>
                  <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={useOpenAI}
                      onChange={(e) => setUseOpenAI(e.target.checked)}
                      style={{
                        width: 20,
                        height: 20,
                        marginRight: 12,
                        cursor: 'pointer'
                      }}
                    />
                    <span style={{ fontWeight: 600 }}>
                      Use OpenAI for content generation
                    </span>
                    <span style={{
                      marginLeft: 8,
                      fontSize: 14,
                      color: '#6b7280',
                      fontWeight: 400
                    }}>
                      (Generates unique, high-quality content using AI)
                    </span>
                  </label>
                </div>

                <div style={{ display: 'flex', gap: 12 }}>
                  <button
                    type="submit"
                    style={{
                      background: '#667eea',
                      color: 'white',
                      padding: '12px 32px',
                      borderRadius: 8,
                      border: 'none',
                      fontWeight: 600,
                      cursor: 'pointer'
                    }}
                  >
                    {editingCity ? 'Update City' : 'Generate & Add City'}
                  </button>
                  <button
                    type="button"
                    onClick={resetForm}
                    style={{
                      background: '#f3f4f6',
                      color: '#374151',
                      padding: '12px 32px',
                      borderRadius: 8,
                      border: '1px solid #d1d5db',
                      fontWeight: 600,
                      cursor: 'pointer'
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Cities List */}
          <div style={{ background: 'white', padding: 32, borderRadius: 12, boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
            <h2 style={{ fontSize: 24, fontWeight: 600, marginBottom: 24 }}>
              All Cities ({cities.length})
            </h2>

            {loading ? (
              <p style={{ textAlign: 'center', color: '#6b7280', padding: 40 }}>Loading cities...</p>
            ) : cities.length === 0 ? (
              <p style={{ textAlign: 'center', color: '#6b7280', padding: 40 }}>
                No cities yet. Add your first city to get started!
              </p>
            ) : (
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ borderBottom: '2px solid #e5e7eb' }}>
                      <th style={{ padding: 12, textAlign: 'left', fontWeight: 600 }}>City</th>
                      <th style={{ padding: 12, textAlign: 'left', fontWeight: 600 }}>State</th>
                      <th style={{ padding: 12, textAlign: 'left', fontWeight: 600 }}>Status</th>
                      <th style={{ padding: 12, textAlign: 'left', fontWeight: 600 }}>URL</th>
                      <th style={{ padding: 12, textAlign: 'left', fontWeight: 600 }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cities.map(city => (
                      <tr key={city.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                        <td style={{ padding: 12 }}>{city.city}</td>
                        <td style={{ padding: 12 }}>{city.state}</td>
                        <td style={{ padding: 12 }}>
                          <span style={{
                            display: 'inline-block',
                            padding: '4px 12px',
                            borderRadius: 12,
                            fontSize: 12,
                            fontWeight: 600,
                            background: city.status === 'published' ? '#d1fae5' : '#fee2e2',
                            color: city.status === 'published' ? '#065f46' : '#991b1b'
                          }}>
                            {city.status}
                          </span>
                        </td>
                        <td style={{ padding: 12 }}>
                          <a
                            href={`/${city.stateAbbr.toLowerCase()}/${city.urlSlug}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ color: '#667eea', textDecoration: 'underline' }}
                          >
                            View Page
                          </a>
                        </td>
                        <td style={{ padding: 12 }}>
                          <div style={{ display: 'flex', gap: 8 }}>
                            <button
                              onClick={() => toggleStatus(city)}
                              style={{
                                padding: '6px 12px',
                                background: '#f3f4f6',
                                border: '1px solid #d1d5db',
                                borderRadius: 6,
                                fontSize: 14,
                                cursor: 'pointer'
                              }}
                            >
                              {city.status === 'published' ? 'Unpublish' : 'Publish'}
                            </button>
                            <button
                              onClick={() => handleEdit(city)}
                              style={{
                                padding: '6px 12px',
                                background: '#667eea',
                                color: 'white',
                                border: 'none',
                                borderRadius: 6,
                                fontSize: 14,
                                cursor: 'pointer'
                              }}
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDelete(city.id)}
                              style={{
                                padding: '6px 12px',
                                background: '#ef4444',
                                color: 'white',
                                border: 'none',
                                borderRadius: 6,
                                fontSize: 14,
                                cursor: 'pointer'
                              }}
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
