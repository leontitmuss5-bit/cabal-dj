import { useState } from 'react';
import { rigParts } from '../content/copy';

// Interactive rig: hover a part to highlight it, click to lock the info panel.
// Hotspot boxes are % of the image, defined in copy.ts (rigParts).
export default function RigInteractive() {
  // selected = clicked (sticky), hovered = transient. Either one drives the panel.
  const [selected, setSelected] = useState<string | null>('decks');
  const [hovered, setHovered] = useState<string | null>(null);

  const activeId = hovered ?? selected;
  const active = rigParts.find((p) => p.id === activeId) ?? rigParts[0];

  return (
    <div className="rig-interactive">
      <div className="rig-stage">
        <img className="rig-photo" src="/media/rig-setup.jpg" alt="CaBaL's full rig — JBL speakers, GigBAR lighting and Denon decks" />

        {rigParts.map((part) =>
          part.boxes.map((b, i) => {
            const on = activeId === part.id;
            return (
              <button
                key={`${part.id}-${i}`}
                className={`rig-hotspot${on ? ' on' : ''}${selected === part.id ? ' locked' : ''}`}
                style={{ left: `${b.x}%`, top: `${b.y}%`, width: `${b.w}%`, height: `${b.h}%` }}
                onMouseEnter={() => setHovered(part.id)}
                onMouseLeave={() => setHovered(null)}
                onFocus={() => setHovered(part.id)}
                onBlur={() => setHovered(null)}
                onClick={() => setSelected(part.id)}
                aria-label={`${part.label} — ${part.spec}`}
                aria-pressed={selected === part.id}
              >
                {i === 0 && <span className="rig-tag">{part.label}</span>}
              </button>
            );
          })
        )}
      </div>

      <aside className="rig-panel" aria-live="polite">
        <div className="rig-panel-tabs">
          {rigParts.map((p) => (
            <button
              key={p.id}
              className={`rig-tab${activeId === p.id ? ' on' : ''}`}
              onMouseEnter={() => setHovered(p.id)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => setSelected(p.id)}
            >
              {p.label}
            </button>
          ))}
        </div>
        <p className="rig-panel-kicker mono">{active.label}</p>
        <h3 className="rig-panel-spec display">{active.spec}</h3>
        <p className="rig-panel-blurb">{active.blurb}</p>
        <p className="rig-panel-hint mono">Tap a part of the rig to explore</p>
      </aside>
    </div>
  );
}
