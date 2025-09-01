
# Code & Cauldrons — Next.js + Tailwind (Hogwarts Theme)

## Dev
```bash
npm i
npm run dev
```
Then open http://localhost:3000

## Files to replace
- `public/intro.mp4` — your intro video (autoplays muted, user can unmute; Chrome policy-safe).
- `public/brochure.pdf` — your brochure (download buttons wired).
- `public/logo.png`, `public/background.jpg` — branding.
- `public/hoggen.jpg`, `public/codeus.jpg`, `public/codewho.jpg` — carousel images.
- `public/member*.jpg` — committee photos.
- Text content in components: `Hero`, `SubEvents`, `Community`, `Committee`.

## Tailwind & PostCSS
This template uses **Tailwind 3.4** with PostCSS.
- If you upgrade to Tailwind v4, update `postcss.config.js` to use `@tailwindcss/postcss` plugin.

## Autoplay with sound (Chrome)
We start the intro video muted and display an overlay. When the user clicks **Enter with sound**, we unmute & replay (satisfies user-gesture requirement). The overlay is session-scoped (won’t reappear until new tab/session).

## Deploy
- Vercel: zero-config (Next.js).  
- Netlify: use Next adapter or build `npm run build` and serve `.next`.
- GitHub Pages: export not configured by default (SSR not used though); use a Next static export if needed.

## Theme
- Harry Potter vibes: gold accents, serif display, subtle glows, sparkles/candles, butterflies, moving background (pan animation).
- To add a Harry Potter font, include it with `@font-face` in `app/globals.css` or import via next/font if licensed.
