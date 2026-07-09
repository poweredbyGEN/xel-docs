# XEL Docs

Astro Starlight documentation site for `docs.xel.xyz`.

## Commands

```bash
npm ci
npm run update:whitepaper
npm run build
npm run preview
```

`npm run update:whitepaper` regenerates `src/content/docs/whitepaper.md` from:

```text
/root/mac/Downloads/people-that-live-forever-whitepaper.md
```

Override the source with:

```bash
WHITEPAPER_SOURCE=/path/to/whitepaper.md npm run update:whitepaper
```

## Deploy

The site deploys through GitHub Pages via `.github/workflows/deploy.yml`.
`public/CNAME` sets the custom domain to `docs.xel.xyz`.
