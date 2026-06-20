import { useRef, useEffect } from 'react';

interface Props {
  src?: string;
  label?: string;
  aspect?: string;
  kind?: 'image' | 'video';
}

// Scroll-LINKED media entrance (continuous, not one-shot):
// - clip-path inset opens as the frame moves up through the viewport
// - outer scale settles 1.08 -> 1
// - the image inside parallaxes (moves slower than the frame) the whole time
// Honors prefers-reduced-motion (renders static).
export default function MediaFrame({ src, label, aspect = '16 / 9', kind = 'image' }: Props) {
  const frameRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const frame = frameRef.current, inner = innerRef.current;
    if (!frame || !inner) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      frame.style.clipPath = 'inset(0%)';
      frame.style.transform = 'none';
      frame.style.opacity = '1';
      return;
    }
    let raf = 0;
    const tick = () => {
      const r = frame.getBoundingClientRect();
      const vh = window.innerHeight;
      // entrance progress: 0 when frame top is at viewport bottom, 1 when it's 35% up
      const enter = Math.max(0, Math.min(1, (vh - r.top) / (vh * 0.65)));
      const e = enter * enter * (3 - 2 * enter); // smoothstep
      const inset = (1 - e) * 10;
      frame.style.clipPath = `inset(${inset}% ${inset * 1.4}% ${inset}% ${inset * 1.4}%)`;
      frame.style.transform = `scale(${1.08 - 0.08 * e}) translateY(${(1 - e) * 36}px)`;
      frame.style.opacity = String(Math.min(1, e * 1.6));
      // inner parallax: image drifts as the frame crosses the viewport
      const centre = (r.top + r.height / 2 - vh / 2) / vh; // -0.5..0.5 through view
      inner.style.transform = `translateY(${centre * -7}%) scale(1.16)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div
      ref={frameRef}
      className="frame"
      style={{ aspectRatio: aspect, willChange: 'clip-path, transform, opacity', opacity: 0 }}
    >
      <div ref={innerRef} style={{ position: 'absolute', inset: '-10%', willChange: 'transform' }}>
        {src ? (
          kind === 'video' ? (
            <video src={src} autoPlay muted loop playsInline style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : (
            <img src={src} alt={label || ''} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          )
        ) : (
          <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span className="placeholder">[ {label || 'media'} ]</span>
          </div>
        )}
      </div>
    </div>
  );
}
