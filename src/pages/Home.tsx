import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { features, home, brand, media } from '../content/copy';

// Text marquee — duplicated content so the -50% translate loops seamlessly
function Marquee() {
  const run = home.marquee.repeat(3);
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-inner">
        <span>{run}</span>
        <span>{run}</span>
      </div>
    </div>
  );
}

// Auto-scrolling film strip of live shots
function FilmStrip() {
  const shots = [
    media.party[1], media.laserAmber, media.djTrio,
    media.party[5], media.laserColor, media.boothPov,
    media.party[6], media.crew, media.party[2],
    media.laserAmber2, media.party[7],
  ];
  return (
    <div className="film-strip">
      <div className="film-strip-inner">
        {[...shots, ...shots].map((src, i) => (
          <img key={i} src={src} alt="" loading="lazy" />
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  useScrollReveal();
  // first paint of the session waits for the splash; route changes come in fast
  const [base] = useState(() => (performance.now() < 4000 ? 1.2 : 0.1));

  return (
    <>
      <div className="content" style={{ paddingTop: 0 }}>
        {/* hero — the logo owns the viewport; one line of type at the bottom */}
        <section style={{ minHeight: '100vh', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', paddingBottom: '7vh' }}>
          <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18 }}>
            <span className="mono hero-rise" style={{ color: 'var(--dim)', ['--d' as string]: `${base}s` }}>{home.kicker}</span>
            <div className="hero-rise" style={{ display: 'flex', gap: 12, marginTop: 8, ['--d' as string]: `${base + 0.15}s` }}>
              <Link to="/book" className="pill pill-lg pill-accent">Book us</Link>
            </div>
          </div>
        </section>

        <Marquee />

        {/* the fork — type does the work, no cards */}
        <section className="reveal">
          <div className="wrap giant-list">
            <Link to="/weddings" className="giant-link">
              <span className="gl-note">weddings · parties · corporate</span>
              Events
            </Link>
            {features.sets && (
              <Link to="/clubs" className="giant-link">
                <span className="gl-note">sets · mixes · the rooms we've played</span>
                Sets
              </Link>
            )}
            <Link to="/about" className="giant-link">
              <span className="gl-note">leon · cade · blake</span>
              About
            </Link>
          </div>
        </section>

        {/* live, moving */}
        <section className="reveal" style={{ paddingLeft: 0, paddingRight: 0 }}>
          <FilmStrip />
        </section>

        {/* minimal footer */}
        <section style={{ paddingBottom: '8vh' }}>
          <div className="wrap" style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: 14, alignItems: 'center' }}>
            <span className="mono">{home.footerLine}</span>
            <span className="mono" style={{ color: 'var(--dim)' }}>{brand.email} · {brand.instagram}</span>
          </div>
        </section>
      </div>
    </>
  );
}
