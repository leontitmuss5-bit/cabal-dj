import { Link } from 'react-router-dom';
import { useScrollReveal } from '../hooks/useScrollReveal';
import RigInteractive from '../components/RigInteractive';
import { weddings, media } from '../content/copy';

export default function Weddings() {
  useScrollReveal();

  const toMore = () => {
    document.getElementById('more')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="content">
      {/* hero */}
      <section style={{ minHeight: '66vh', display: 'flex', alignItems: 'flex-end', paddingBottom: '5vh' }}>
        <div className="wrap" style={{ width: '100%' }}>
          <h1 className="display hero-rise" style={{ fontSize: 'var(--t-display)' }}>{weddings.hero}</h1>
          <p className="hero-rise" style={{ color: 'var(--dim)', maxWidth: 520, marginTop: 20, fontSize: 'var(--t-body-lg)', ['--d' as string]: '0.28s' }}>
            {weddings.subline}
          </p>
          <button className="scroll-cue hero-rise" onClick={toMore} aria-label="Scroll for more" style={{ ['--d' as string]: '0.5s' }}>
            <span className="scroll-cue-label mono">Scroll — there's more</span>
            <span className="scroll-cue-chev" aria-hidden="true" />
          </button>
        </div>
      </section>

      {/* intro */}
      <section id="more" className="reveal">
        <div className="wrap">
          <p style={{ fontSize: 'var(--t-body-lg)', maxWidth: 680, color: 'var(--text)' }}>{weddings.intro}</p>
        </div>
      </section>

      {/* interactive rig */}
      <section className="reveal">
        <div className="wrap">
          <h2 className="display" style={{ fontSize: 'var(--t-h1)', marginBottom: 10 }}>Our rig</h2>
          <p className="mono" style={{ color: 'var(--dim)', textTransform: 'none', letterSpacing: '0.04em', marginBottom: 28 }}>
            We own it all — speakers, lights, decks. Have a look around.
          </p>
          <RigInteractive />
        </div>
      </section>

      {/* packages */}
      <section className="reveal">
        <div className="wrap">
          <h2 className="display" style={{ fontSize: 'var(--t-h1)', marginBottom: 28 }}>Packages</h2>
          <div>
            {weddings.packages.map((p) => (
              <div key={p.name} className="list-row" style={{ cursor: 'default' }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 18, flexWrap: 'wrap' }}>
                  <span className="display" style={{ fontSize: 'clamp(1.2rem, 2.4vw, 1.8rem)', color: p.featured ? 'var(--red)' : 'var(--text)' }}>{p.name}</span>
                  <span className="mono" style={{ color: 'var(--dim)', textTransform: 'none', letterSpacing: '0.04em' }}>{p.detail}</span>
                </div>
                <span className="display" style={{ fontSize: 'clamp(1rem, 2vw, 1.4rem)', color: 'var(--text)', whiteSpace: 'nowrap' }}>{p.price}</span>
              </div>
            ))}
          </div>
          <p className="mono" style={{ marginTop: 16, textTransform: 'none', letterSpacing: '0.04em' }}>{weddings.packageNote}</p>
        </div>
      </section>

      {/* what you get */}
      <section className="reveal">
        <div className="wrap">
          <h2 className="display" style={{ fontSize: 'var(--t-h1)', marginBottom: 28 }}>What you get</h2>
          <ul style={{ listStyle: 'none', maxWidth: 680 }}>
            {weddings.included.map((it) => (
              <li key={it} style={{ borderTop: '1px solid var(--hairline)', padding: '14px 0', color: 'var(--text)' }}>{it}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* recent set — scrolling gallery */}
      <section className="reveal">
        <div className="wrap" style={{ marginBottom: 24 }}>
          <h2 className="display" style={{ fontSize: 'var(--t-h1)', marginBottom: 10 }}>From a recent set</h2>
          <p className="mono" style={{ color: 'var(--dim)', textTransform: 'none', letterSpacing: '0.04em' }}>
            Straight off the floor — no staging.
          </p>
        </div>
        <div className="set-marquee">
          <div className="set-track">
            {[...media.recentSet, ...media.recentSet].map((src, i) => (
              <figure key={i} className="set-card" aria-hidden={i >= media.recentSet.length}>
                <img src={src} alt={i < media.recentSet.length ? `CaBaL recent set ${i + 1}` : ''} loading="lazy" />
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="reveal" style={{ paddingTop: 48, paddingBottom: '10vh' }}>
        <div className="wrap" style={{ textAlign: 'center' }}>
          <Link to="/book" className="pill pill-lg pill-accent">Book us</Link>
        </div>
      </section>
    </div>
  );
}
