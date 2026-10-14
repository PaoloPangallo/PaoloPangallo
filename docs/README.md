# Paolo Pangallo — AI / ML Engineering Portfolio

Responsive portfolio site published with GitHub Pages from `docs/`.

## Motion and accessibility

- Progressive one-shot reveal animations and smooth, non-continuous hover feedback.
- Architecture explorer transitions preserve keyboard focus.
- `prefers-reduced-motion` support, no tracking or effects library.
- Site content remains visible without JavaScript; there are no added screenshots or gradients.

## What's included

- Interactive **system explorer** for MCP E-Commerce, MTB GraphRAG and Cephalopod AI; selectable stages and contextual source links
- Three editorial engineering case studies (problem, architecture, stack, limitations)
- Searchable and filterable directory of eight public projects
- Engineering approach, technologies, education, and contact information
- Mobile navigation and keyboard support
- Accessible reduced-motion CSS, responsive layouts and SEO metadata

All architecture illustrations are **conceptual**, not live model execution or verified benchmarks. No analytics or personal data collection.

## Run locally

```bash
cd docs
python -m http.server 8000
```

Open http://localhost:8000. No build step required; HTML, CSS and JavaScript remain separate editable files.

## Deployment

In repository `PaoloPangallo/PaoloPangallo`, GitHub Pages serves **main /docs** at https://paolopangallo.github.io/PaoloPangallo/.

Inspired by the supplied restrained design direction: strong typography, monochrome surfaces, shadow-free UI, pill controls, and detailed technical visual storytelling.
