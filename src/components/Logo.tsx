import { useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { media } from '../content/copy';

function lerp(a: number, b: number, t: number) { return a + (b - a) * t; }
function ease(t: number) { return t * t * t * (t * (t * 6 - 15) + 10); }

// 2D logo with the same "genie" behaviour the 3D one had:
// hero-sized centre stage on home, glides into the top-centre nav slot on
// scroll, parked there on subpages. Idle float + pointer drift keep it alive.
export default function Logo() {
  const { pathname } = useLocation();
  const ref = useRef<HTMLAnchorElement>(null);
  const curRef = useRef<number | null>(null); // smoothed genie progress, survives route changes
  const isHome = pathname === '/';

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let raf = 0;
    const tick = () => {
      const vw = window.innerWidth, vh = window.innerHeight;
      // genie completes over the first 70% of viewport height on home
      const goal = isHome ? Math.min(1, window.scrollY / (vh * 0.7)) : 1;
      if (curRef.current === null) curRef.current = goal; // no fly-in on first paint
      curRef.current += (goal - curRef.current) * (reduce ? 1 : 0.16);
      const e = ease(Math.max(0, Math.min(1, curRef.current)));

      const heroW = Math.min(vw * 0.86, 640);
      const miniW = Math.min(110, vw * 0.3);
      const w = lerp(heroW, miniW, e);
      const y = lerp(vh * 0.4, 36, e); // logo centre: 40vh -> nav slot

      el.style.width = `${w}px`;
      el.style.top = `${y}px`;
      el.style.transform = `translate(-50%, -50%)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
    };
  }, [isHome]);

  return (
    <Link ref={ref} to="/" className="logo-2d" aria-label="CaBaL home">
      <img src={media.logo} alt="CaBaL" draggable={false} />
    </Link>
  );
}
