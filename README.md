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
the parents' names, photos and addresses, and contact numbers.

### Photos & artwork (`src/assets/`)
Your originals stay in `src/assets/`; the site uses optimised WebP copies:

| File | Used for |
|---|---|
| `ganesh.webp` | Ganesh ji (from `ganesh.jpg`, checkerboard removed): hero, card, footer |
| `logo.webp`, `rings.webp` | Transparent cut-outs of `logo.jpeg` / `rings.jpeg` |
| `groom.webp`, `bride.webp` | Side-by-side portraits in *Made for Each Other*, and the frames in *The Couple*. Adjust the crop with `photoPosition` in `config.js` |
| `groomfather.webp`, `groommother.webp`, `bridefather.webp`, `bridemother.webp` | Parents' portraits in *Our Families* (from the `.jpeg` originals). Adjust the crop with `photoPosition` in `families` |

To change a photo: replace the file in `src/assets/` (or import a new one in `config.js`).

### Music (`src/assets/bgm.mp3`)
Background music. It starts when the guest opens the doors; replace the file (or change the
`bgm` import in `config.js`) to use a different track.

### Contacts
The footer's *For any queries* phone numbers come from `rsvp.contacts` in `config.js`.

### How the page works
- **Doors intro**: two carved doors each cover half the screen. Guests tap *Open Invitation* (or the
  doors); they swing open to reveal Ganesh ji on the first page. Music starts on that tap.
- Every section is a **stacked page** (the diya page has a `hold`, so it stays fully on screen
  for a while before the footer slides over).
- Every section is a **stacked page** (`<Page>` in `src/components/ui.jsx`): the next page slides up over the
  previous one, which sinks back and dims. **Parallax** layers use `<Parallax speed={…}>`.
- Performance: all scroll effects are transform/opacity only, driven by one scroll listener with cached
  layout (no layout reads while scrolling). Covered / off-screen pages are hidden and their animations paused.
