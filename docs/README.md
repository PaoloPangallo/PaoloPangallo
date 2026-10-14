# Paolo Pangallo — AI Engineering Portfolio

A responsive static portfolio styled with the supplied **monochrome Mobbin-inspired design system**. Original content and layout, not a clone of any particular site.

## Design decisions

- White canvas, near-black ink, neutral hairlines and soft gray surfaces.
- Inter variable font as an accessible alternative to commercial Saans; 650 headings, 450 body, 300 display support text.
- Fully rounded navigation, buttons, filters and chips; 24px cards and 30%-radius app squircle icons.
- No colorful UI chrome, gradients, or card drop shadows. Feature illustrations are labeled conceptual diagrams rather than product screenshots.
- Dark inverse footer, semantic headings, keyboard focus indicators, reduced-motion support and responsive breakpoints.
- No framework or build requirement.

## Files

- `index.html` — sections and eight project links.
- `style.css` — self-contained responsive design system.
- `script.js` — accessible project filters and current year.
- `favicon.svg` — original monochrome favicon.
- `.nojekyll` — disable Jekyll for GitHub Pages.

## Local preview

```bash
python -m http.server 8000
```

Open `http://localhost:8000`. Works as static HTML without running external APIs. The remote Inter font and GitHub profile avatar require an internet connection; native font fallbacks apply offline.

## Deployment

### Existing profile repository

The site can be published from the `docs/` directory of `PaoloPangallo/PaoloPangallo`. In **Settings → Pages** choose **Deploy from a branch**, **main**, **/docs**. The URL will be similar to `https://paolopangallo.github.io/PaoloPangallo/` once GitHub enables Pages.

### Shorter user-site URL

To use `https://paolopangallo.github.io/`, create a new public repository named **PaoloPangallo.github.io** and copy the site files to the root. Enable Pages with `main/(root)`. If you purchase a custom `.io` domain, configure it with GitHub Pages and the registrar's DNS settings.

## Content notes

Project descriptions are based on the public repositories. The GraphRAG project is a research prototype, not a medical device. All feature diagrams are conceptual illustrations. The photo is the public GitHub avatar. There is no tracking, form backend, invented testimonials or claims of production deployment.
