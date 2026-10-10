# Yan Zhang — Personal Website

Static React portfolio at https://kkyan1105.github.io/.

Includes selected projects with expandable details, experience, education, a portrait, public professional links, and the original resume download. The AI chat and server endpoints are intentionally excluded from this version.

## Local development

Requires Node.js 22.13 or newer.

```sh
npm ci
npm run dev
```

## Update and deploy

Edit `src/Portfolio.tsx` for layout, `src/data/resume.json` for project facts, or files in `public/` for images and the downloadable PDF. Push to `main`; GitHub Actions builds and deploys to GitHub Pages.

```sh
npm run build
npm run preview
```

Never commit API keys or environment files. This static site needs no secrets.

School logos come from the universities’ official websites. Outreach information comes from https://github.com/kkyan1105/Outreach. The portrait and resume are supplied by Yan Zhang.
