# LCDj — site

Premium dark site for LCDj, a 3-piece Sydney DJ collective. Vite + React + TypeScript + React-Three-Fiber. One brand, two modes (cold/club = grungy gunmetal, warm/wedding = clean polished silver), a persistent interactive 3D LCDj wordmark with a scroll-linked genie effect, scroll-transitioning media, and a smart branching booking form.

## Run it
```bash
npm install
npm run dev      # http://localhost:5173
npm run build
npm run preview
```

## What changed in this build
- Branded as LCDj throughout; logo geometry now includes the lowercase j (descender + dot), styled after the 3DLogoLab renders.
- GENIE EFFECT: the big hero logo scroll-shrinks to a small mark top-centre (real 3D, scroll-linked via scrollRef in App.tsx -> LCDScene). Club mode keeps rotating; wedding mode eases to a static front-facing rest.
- Two materials: cold = grungy gunmetal w/ heavy scratch roughness map + red key; warm = clean high-polish silver w/ bright silver env map, red pulled right back.
- MediaFrame component: media now transitions INTO frame on scroll (clip-path wipe + scale + fade), not static.
- Real photos wired in from /public/media (processed from your uploads). Live shots across Home/Clubs/About.
- Added atmosphere layers: moving vignette + colour bleed + heavier grain.

## Structure
```
src/three/LCDScene.tsx     persistent canvas: genie scroll, mode morph, postprocessing, fallback
src/three/lcdGeometry.ts   LCDj extruded shapes (L C D j + dot), env/rough maps, MODE_PRESETS
src/components/MediaFrame.tsx  scroll-reveal media w/ clip-path transition
src/hooks/useMode.tsx      cold/warm context
src/content/copy.ts        ALL copy + media manifest (single source of truth)
src/pages/                 Home, Weddings, Clubs, About, Book
src/App.tsx                shell: persistent canvas + scrollRef + Lenis + router
public/media/              real processed photos (live-01..09, portrait-dj)
```

## Still placeholder / TODO
- WEDDING media: all uploaded photos are club/party shots in coloured light. Wedding page film + warm/clean stills still needed.
- Real vector wordmark -> replace hand-built shapes in lcdGeometry.ts for a portfolio-grade mark.
- Hero reel video (currently a still stands in).
- 2-3 named couple testimonials (biggest wedding-conversion lever).
- Wire Book form to Netlify Forms / Formspree (currently client-side only).
- Confirm contact@lcd.com / @lcdsyd are real (copy.ts).
- Code-split Three.js to cut initial bundle (~300KB gzip now).
