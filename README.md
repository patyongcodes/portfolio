# Portfolio

Personal portfolio site built with React + Vite.

## Getting started

```bash
npm install
npm run dev
```

## Project structure

```
src/
  components/
    Hero/        Hero section (name, tagline, intro)
    About/       About/bio section
    Projects/    Projects grid, pulls from data/projects.js
    Contact/     Contact section
    layout/      Header, Footer, shared layout pieces
  data/          Static content (projects, links, etc.) — edit here to update site content
  hooks/         Custom React hooks
  utils/         Helper functions
  styles/        Shared/global styles
  assets/        Images, icons, fonts
```

## Workflow

- Create a branch per feature/section: `git checkout -b feature/hero-section`
- Commit in small, logical chunks
- Merge into `main` once a section is working
