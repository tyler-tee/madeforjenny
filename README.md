# Made for Jenny

A handcrafted Valentine's Day love letter website, built as a personal gift and deployed at [madeforjennywith.love](https://madeforjennywith.love).

## Overview

A single-page, interactive website celebrating Tyler and Jenny's love story. Visitors are greeted with an animated envelope that opens to reveal a love letter, photo gallery, timeline, and more -- all wrapped in a warm, scrapbook-inspired aesthetic.

### Sections

- **Envelope Entrance** -- 3D animated envelope that opens on click and starts the background music
- **Love Letter** -- A handwritten-style personal letter
- **Reasons I Love You** -- Scroll-animated cards with custom reasons
- **Photo Gallery** -- Horizontally scrollable, polaroid-style wedding photos loaded from Cloudflare R2
- **Our Song** -- Record player animation with an embedded YouTube video ("Precious Love" by James Morrison)
- **Our Story Timeline** -- Key milestones from first meeting to present
- **Dogs Note** -- A P.S. from Bruno and Dandy with animated paw prints

## Tech Stack

- **HTML / CSS / JavaScript** -- No frameworks, no build step
- **Cloudflare Workers** -- Static site hosting (configured via `wrangler.jsonc`)
- **Cloudflare R2** -- Photo storage with a JSON manifest for the gallery
- **Google Fonts** -- Caveat, Gaegu, DM Serif Display, Karla
- **YouTube IFrame API** -- Embedded song player

## Project Structure

```
madeforjenny/
├── dist/
│   ├── index.html      # Main page
│   ├── styles.css       # All styling (~740 lines)
│   └── main.js          # All interactivity (~160 lines)
├── wrangler.jsonc        # Cloudflare Workers config
└── README.md
```

## Running Locally

No build step required. Just open the HTML file:

```bash
# Option 1: Open directly
open dist/index.html

# Option 2: Serve with any static file server
npx serve dist
```

> **Note:** The photo gallery requires the R2 manifest at `photos.madeforjennywith.love/manifest.json` to be accessible. Without it, a "Photos coming soon!" fallback is shown.

## Deployment

The site is deployed to Cloudflare using [Wrangler](https://developers.cloudflare.com/workers/wrangler/):

```bash
wrangler deploy
```

This serves the `dist/` directory as static assets at [madeforjennywith.love](https://madeforjennywith.love).

## Customization

| What                | Where                                      |
|---------------------|--------------------------------------------|
| Color palette       | CSS variables at the top of `styles.css`   |
| Typography          | Google Fonts `<link>` tags in `index.html` |
| Content / copy      | Directly in `index.html`                   |
| Photos              | Add `.webp` files to R2, update manifest   |
| Song                | Change `videoId` in `main.js`              |
| Photo captions      | Update the `CAPTIONS` object in `main.js`  |
