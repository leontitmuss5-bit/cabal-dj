import { useRef, type ReactNode } from 'react';

// Cursor-follow 3D tilt — the interactive card feel from the reference sites.
export default function Tilt({ children, max = 7 }: { children: ReactNode; max?: number }) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(900px) rotateY(${px * max}deg) rotateX(${-py * max}deg) translateZ(0)`;
  };
  const onLeave = () => {
    const el = ref.current;
    if (el) el.style.transform = 'perspective(900px) rotateY(0deg) rotateX(0deg)';
  };

  return (
    <div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave}
      style={{ transition: 'transform 350ms cubic-bezier(0.16,1,0.3,1)', transformStyle: 'preserve-3d' }}>
      {children}
    </div>
  );
}
