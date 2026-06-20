import { useEffect, useRef } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Lenis from 'lenis';
import Logo from './components/Logo';
import Nav from './components/Nav';
import Splash from './components/Splash';
import Home from './pages/Home';
import Weddings from './pages/Weddings';
import Clubs from './pages/Clubs';
import About from './pages/About';
import Book from './pages/Book';
import { features, media } from './content/copy';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

// full-bleed photo backdrop — full strength on home, embers elsewhere.
// fades back as you scroll so the content owns the lower page.
const BG_BY_ROUTE: Record<string, string> = {
  '/': media.homeBg,
  '/weddings': media.party[1],
  '/clubs': media.laserAmber,
  '/about': media.crew,
  '/book': media.laserColor,
};

function Backdrop({ pathname }: { pathname: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onScroll = () => {
      const t = Math.min(1, window.scrollY / (window.innerHeight * 1.2));
      el.style.opacity = String(1 - t * 0.6);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [pathname]);
  const src = BG_BY_ROUTE[pathname] ?? media.homeBg;
  return (
    <div ref={ref} className={`hero-bg${pathname === '/' ? '' : ' hero-bg-dim'}`}>
      <img key={src} src={src} alt="" />
    </div>
  );
}

function Shell() {
  const loc = useLocation();

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const lenis = new Lenis({ duration: 1.1, smoothWheel: true });
    let raf = 0;
    const loop = (t: number) => { lenis.raf(t); raf = requestAnimationFrame(loop); };
    raf = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(raf); lenis.destroy(); };
  }, []);

  return (
    <>
      <Splash />
      <Logo />
      <Backdrop pathname={loc.pathname} />
      <div className="scanlines" />
      <div className="grain" />
      <div className="vignette" />
      <Nav />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/weddings" element={<Weddings />} />
        <Route path="/clubs" element={features.sets ? <Clubs /> : <Navigate to="/" replace />} />
        <Route path="/about" element={<About />} />
        <Route path="/book" element={<Book />} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Shell />
    </BrowserRouter>
  );
}
