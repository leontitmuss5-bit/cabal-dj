import { useState } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { clubs, brand } from '../content/copy';

// interactive set showcase — hover/tap to fluidly expand a panel.
// blank slots for now: drop a muted looping <video> into each panel
// when the set films are ready.
function SetShowcase() {
  const [open, setOpen] = useState(0);
  return (
    <div className="set-strip">
      {clubs.sets.map((s, i) => (
        <div key={s.title}
          className={`set-panel${open === i ? ' open' : ''}`}
          onMouseEnter={() => setOpen(i)}
          onClick={() => setOpen(i)}>
          <div className="set-placeholder">
            <span className="placeholder">[ insert set video here ]</span>
          </div>
          <span className="set-play">▶ play</span>
          <div className="set-meta">
            <span className="set-title">{s.title}</span>
            <span className="mono set-tag">{s.tag}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function Clubs() {
  useScrollReveal();

  return (
    <div className="content">
      <section style={{ minHeight: '48vh', display: 'flex', alignItems: 'flex-end', paddingBottom: '6vh' }}>
        <div className="wrap" style={{ width: '100%' }}>
          <h1 className="display hero-rise" style={{ fontSize: 'var(--t-display)' }}>{clubs.hero}</h1>
          <p className="hero-rise" style={{ color: 'var(--dim)', maxWidth: 520, marginTop: 20, fontSize: 'var(--t-body-lg)', ['--d' as string]: '0.28s' }}>{clubs.intro}</p>
        </div>
      </section>

      <section className="reveal" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <SetShowcase />
        </div>
      </section>

      {/* mixes as objects */}
      <section className="reveal">
        <div className="wrap">
          <h2 className="display" style={{ fontSize: 'var(--t-h1)', marginBottom: 28 }}>Listen</h2>
          <div>
            {clubs.mixes.map((m) => (
              <div key={m.title} className="list-row">
                <div>
                  <span style={{ color: 'var(--text)', fontSize: '1.1rem' }}>{m.title}</span>
                  <span className="mono" style={{ display: 'block', marginTop: 6 }}>{m.tag}</span>
                </div>
                <span style={{ color: 'var(--accent)', fontFamily: 'var(--font-mono)', fontSize: '0.7rem' }}>▶ play</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* played at — poster type, not a list */}
      <section className="reveal">
        <div className="wrap">
          <p className="display" style={{ fontSize: 'clamp(1.6rem, 4.5vw, 3.4rem)', color: 'var(--faint)', lineHeight: 1.08 }}>
            {clubs.playedAt.map((v, i) => (
              <span key={v}>
                <span style={{ color: i % 2 === 0 ? 'var(--text)' : 'var(--faint)' }}>{v}</span>
                {i < clubs.playedAt.length - 1 && <span style={{ color: 'var(--red)' }}> · </span>}
              </span>
            ))}
          </p>
        </div>
      </section>

      {/* industry contact + EPK */}
      <section className="reveal" style={{ paddingBottom: '10vh' }}>
        <div className="wrap" style={{ display: 'flex', flexWrap: 'wrap', gap: 24, alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <span className="mono" style={{ display: 'block', marginBottom: 8 }}>{clubs.industryContact}</span>
            <p style={{ color: 'var(--text)' }}>{brand.email} · {brand.instagram}</p>
          </div>
          <a href="#" className="pill pill-lg">Press kit</a>
        </div>
      </section>
    </div>
  );
}
