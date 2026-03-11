'use client';

const explorations = [
  { id: '01', name: 'Hero Widget', file: '01-hero-widget.html', desc: 'Bio inside a draggable widget card in the hero area, alongside the existing Lisbon Studio and Recent widgets.' },
  { id: '04', name: 'Toolbelt Cell', file: '04-toolbelt-cell.html', desc: 'Bio as its own "About" cell in the toolbelt strip, first position before Theme, Draw, Random, and Radio.' },
];

export default function BioExplorationsPage() {
  return (
    <div style={{
      fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
      background: '#0a0a0a',
      color: '#fff',
      minHeight: '100vh',
      padding: '48px 32px',
    }}>
      <div style={{ maxWidth: 1400, margin: '0 auto' }}>
        <div style={{ marginBottom: 48 }}>
          <a href="/" style={{ color: '#555', textDecoration: 'none', fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase' as const }}>
            &larr; Back to site
          </a>
          <h1 style={{ fontSize: 36, fontWeight: 500, letterSpacing: '-0.02em', marginTop: 16 }}>
            Bio Explorations
          </h1>
          <p style={{ color: '#666', fontSize: 14, marginTop: 8 }}>
            Different approaches to presenting a short bio on the portfolio site.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(420px, 1fr))',
          gap: 24,
        }}>
          {explorations.map((exp) => (
            <a
              key={exp.id}
              href={`/explorations/bio/${exp.file}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'block',
                background: '#111',
                border: '1px solid #222',
                borderRadius: 12,
                overflow: 'hidden',
                textDecoration: 'none',
                color: 'inherit',
                transition: 'border-color 0.2s, transform 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#444';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#222';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div style={{
                height: 320,
                background: '#0a0a0a',
                borderBottom: '1px solid #222',
                position: 'relative',
                overflow: 'hidden',
              }}>
                <iframe
                  src={`/explorations/bio/${exp.file}`}
                  style={{
                    width: '200%',
                    height: '200%',
                    border: 'none',
                    transform: 'scale(0.5)',
                    transformOrigin: 'top left',
                    pointerEvents: 'none',
                  }}
                  tabIndex={-1}
                />
              </div>
              <div style={{ padding: '16px 20px' }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 6 }}>
                  <span style={{ fontSize: 11, color: '#555', fontVariantNumeric: 'tabular-nums' }}>{exp.id}</span>
                  <span style={{ fontSize: 15, fontWeight: 500 }}>{exp.name}</span>
                </div>
                <p style={{ fontSize: 12, color: '#666', lineHeight: 1.5, margin: 0 }}>{exp.desc}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
