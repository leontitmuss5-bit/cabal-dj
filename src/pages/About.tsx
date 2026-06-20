import { Link } from 'react-router-dom';
import { useScrollReveal } from '../hooks/useScrollReveal';
import MediaFrame from '../components/MediaFrame';
import { about, media } from '../content/copy';

export default function About() {
  useScrollReveal();
  const def = about.definition;

  return (
    <div className="content">
      {/* definition opener */}
      <section style={{ minHeight: '68vh', display: 'flex', alignItems: 'center', paddingTop: 'clamp(90px, 12vh, 150px)', paddingBottom: '8vh' }}>
        <div className="wrap" style={{ width: '100%' }}>
          <div className="definition hero-rise">
            <span className="def-word mono">{def.word}</span>
            <span className="def-pron mono">{def.pronunciation}</span>
            <p className="def-text display">{def.text}</p>
          </div>
        </div>
      </section>

      {/* story */}
      <section className="reveal">
        <div className="wrap">
          <h2 className="display" style={{ fontSize: 'var(--t-h1)', marginBottom: 20 }}>{about.hero}</h2>
          <p style={{ fontSize: 'var(--t-body-lg)', maxWidth: 720, color: 'var(--text)' }}>{about.story}</p>
        </div>
      </section>

      {/* the three */}
      <section className="reveal">
        <div className="wrap" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 24 }}>
          {about.members.map((m, i) => (
            <div key={m.name}>
              <div style={{ marginBottom: 16 }}>
                <MediaFrame src={[media.leon, media.cade, media.blake][i]} label="portrait" aspect="3 / 4" />
              </div>
              <h3 className="display" style={{ fontSize: '1.3rem', marginBottom: 6 }}>{m.name}</h3>
              <span className="mono" style={{ color: 'var(--accent)', display: 'block', marginBottom: 10 }}>{m.role}</span>
              <p style={{ color: 'var(--dim)' }}>{m.bio}</p>
            </div>
          ))}
        </div>
      </section>

      {/* setup */}
      <section className="reveal">
        <div className="wrap">
          <p style={{ fontSize: 'var(--t-body-lg)', color: 'var(--text)', maxWidth: 720 }}>{about.setup}</p>
        </div>
      </section>

      <section className="reveal" style={{ paddingBottom: '10vh' }}>
        <div className="wrap" style={{ textAlign: 'center' }}>
          <Link to="/book" className="pill pill-lg pill-accent">Book us</Link>
        </div>
      </section>
    </div>
  );
}
