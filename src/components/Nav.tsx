import { Link, useLocation } from 'react-router-dom';

// Tame-style: pill buttons flank the logo, which lands top-centre.
const left = [
  { to: '/clubs', label: 'Sets' },
  { to: '/weddings', label: 'Events' },
];
const right = [
  { to: '/about', label: 'About' },
  { to: '/book', label: 'Book', accent: true },
];

export default function Nav() {
  const loc = useLocation();
  const pill = (l: { to: string; label: string; accent?: boolean }) => (
    <Link key={l.to} to={l.to}
      className={`pill${l.accent ? ' pill-accent' : ''}${loc.pathname === l.to ? ' active' : ''}`}>
      {l.label}
    </Link>
  );
  return (
    <>
      <nav className="top-nav" aria-label="Primary">
        <div className="nav-side">{left.map(pill)}</div>
        <div className="nav-gap" aria-hidden="true" />
        <div className="nav-side">{right.map(pill)}</div>
      </nav>
    </>
  );
}
