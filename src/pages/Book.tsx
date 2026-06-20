import { useState } from 'react';
import { brand } from '../content/copy';

type Occasion = 'wedding' | 'party' | 'corporate' | 'club' | null;

const occasions: { id: Exclude<Occasion, null>; label: string }[] = [
  { id: 'wedding', label: 'Wedding' },
  { id: 'party', label: 'Party / private' },
  { id: 'corporate', label: 'Corporate' },
  { id: 'club', label: 'Venue / club' },
];

export default function Book() {
  const [occasion, setOccasion] = useState<Occasion>(null);
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState('');
  const isClub = occasion === 'club';

  if (submitted) {
    return (
      <div className="content">
        <section style={{ minHeight: '80vh', display: 'flex', alignItems: 'center' }}>
          <div className="wrap" style={{ maxWidth: 640 }}>
            <h1 className="display" style={{ fontSize: 'clamp(2rem, 6vw, 4rem)', marginBottom: 18 }}>Got it</h1>
            <p style={{ fontSize: 'var(--t-body-lg)', color: 'var(--text)' }}>
              Thanks{name ? `, ${name}` : ''}. We'll be back within {brand.replyHours} hours.
              Until then — the sets are on the portfolio, and we're at {brand.instagram}.
            </p>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="content">
      <section style={{ paddingTop: '16vh', paddingBottom: '6vh' }}>
        <div className="wrap" style={{ maxWidth: 720 }}>
          <h1 className="display hero-rise" style={{ fontSize: 'clamp(2.4rem, 7vw, 4.6rem)', marginBottom: 16 }}>Your night</h1>
          <p className="hero-rise" style={{ color: 'var(--dim)', marginBottom: 48, ['--d' as string]: '0.28s' }}>
            A few questions. We reply within {brand.replyHours} hours.
          </p>

          {/* step 1 — occasion */}
          <div className="field">
            <label>What's the occasion?</label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 12 }}>
              {occasions.map((o) => (
                <button key={o.id} onClick={() => setOccasion(o.id)} className="mono"
                  style={{ padding: '16px', cursor: 'pointer', background: occasion === o.id ? 'rgba(240,137,46,0.14)' : 'var(--surface-2)',
                    border: occasion === o.id ? '1px solid var(--accent)' : '1px solid var(--hairline)',
                    color: occasion === o.id ? 'var(--text)' : 'var(--dim)' }}>
                  {o.label}
                </button>
              ))}
            </div>
          </div>

          {/* branched fields */}
          {occasion && (
            <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} style={{ marginTop: 32 }}>
              <div className="field">
                <label>Your name</label>
                <input value={name} onChange={(e) => setName(e.target.value)} required />
              </div>
              <div className="field">
                <label>{isClub ? 'Email / @' : 'Email'}</label>
                <input type={isClub ? 'text' : 'email'} required />
              </div>
              {!isClub && (
                <div className="field">
                  <label>Phone (optional)</label>
                  <input type="tel" />
                </div>
              )}
              <div className="field">
                <label>{isClub ? 'Date' : 'Event date (or "still deciding")'}</label>
                <input type={isClub ? 'date' : 'text'} />
              </div>
              <div className="field">
                <label>{isClub ? 'Venue or night' : 'Venue or suburb'}</label>
                <input />
              </div>
              {!isClub ? (
                <>
                  <div className="field">
                    <label>Approx. guest count</label>
                    <input type="number" min={0} />
                  </div>
                  <div className="field">
                    <label>Hours needed</label>
                    <input />
                  </div>
                  <div className="field">
                    <label>The vibe / genres you're after</label>
                    <input />
                  </div>
                </>
              ) : (
                <>
                  <div className="field">
                    <label>Slot & set length</label>
                    <input />
                  </div>
                  <div className="field">
                    <label>Genre wanted</label>
                    <input />
                  </div>
                </>
              )}
              <div className="field">
                <label>Anything else?</label>
                <textarea />
              </div>
              <button type="submit" className="btn" style={{ animation: 'none', marginTop: 12 }}>Send enquiry</button>
            </form>
          )}

          <p className="mono" style={{ marginTop: 48, textTransform: 'none', letterSpacing: '0.02em' }}>
            Prefer to talk? {brand.email} · {brand.instagram}
          </p>
        </div>
      </section>
    </div>
  );
}
