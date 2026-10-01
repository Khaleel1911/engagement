# Rahul's Sagai: Invitation Website

A mobile-first Gujarati-style engagement invitation ("Blush Lotus" theme) built with React, Tailwind 4,
Motion (Framer Motion), Lenis smooth scroll and canvas-confetti.

## Run
```
npm install
npm run dev      # local dev
npm run build    # production build in /dist (deploy to Netlify / Vercel / GitHub Pages)
```

## Customise
**Everything lives in `src/config.js`**: names, parents, dates, events, venue, map search,
story, gallery photos and captions, and contact numbers.

### Photos & artwork (`src/assets/`)
Your originals stay in `src/assets/`; the site uses optimised WebP copies:

| File | Used for |
|---|---|
| `ganesh.webp` | Ganesh ji (from `ganesh.jpg`, checkerboard removed): envelope, hero, card, footer |
| `logo.webp`, `rings.webp` | Transparent cut-outs of `logo.jpeg` / `rings.jpeg` |
| `groom.webp`, `bride.webp` | Arches in *The Couple*. Adjust the crop with `photoPosition` in `config.js` |
| `couple1.webp` | *Hamari Jodi* featured portrait + gallery |
| `couple2.webp` | End of *Our Story* + gallery |

To add gallery photos: drop them in `src/assets/`, import them in `config.js` and add them to `gallery`.

### Music (`public/music/shehnai.mp3`)
Optional background shehnai/instrumental. It starts when the guest opens the envelope;
the music button stays hidden if the file doesn't exist.

### Contacts
The footer's *For any queries* phone numbers come from `rsvp.contacts` in `config.js`.

### How the page works
- **Envelope intro**: guests tap *Open Invitation* (or the wax seal); the seal cracks, the flap opens,
  the card slides out and grows to reveal the site. Music starts on that tap.
- Every section is a **stacked page** (the diya page has a `hold`, so it stays fully on screen
  for a while before the footer slides over).
- Every section is a **stacked page** (`<Page>` in `src/components/ui.jsx`): the next page slides up over the
  previous one, which sinks back and dims. **Parallax** layers use `<Parallax speed={…}>`.
- Performance: all scroll effects are transform/opacity only, driven by one scroll listener with cached
  layout (no layout reads while scrolling). Covered / off-screen pages are hidden and their animations paused.
