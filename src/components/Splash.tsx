import { useEffect, useState } from 'react';

// Minimal intro: solid background hides the site content (z-index 58),
// but the logo (z-index 60) sits on top and fades in over it.
// A minimal dot waveform plays, then the background fades out to reveal the site.
const DOTS = 5;

export default function Splash() {
  const [done, setDone] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDone(true);
      const t = setTimeout(() => setHidden(true), 200);
      return () => clearTimeout(t);
    }
    const fill = setTimeout(() => setDone(true), 1200); // dots done
    const gone = setTimeout(() => setHidden(true), 1800); // after fade
    return () => { clearTimeout(fill); clearTimeout(gone); };
  }, []);

  if (hidden) return null;

  return (
    <div className={`splash${done ? ' splash-out' : ''}`} aria-hidden="true">
      <div className="splash-inner">
        <div className={`splash-dots${done ? ' splash-dots-done' : ''}`}>
          {Array.from({ length: DOTS }).map((_, i) => (
            <span
              key={i}
              className="splash-dot"
              style={{ ['--i' as string]: i }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
