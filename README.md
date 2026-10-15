# Advait Saxena - Portfolio

Interactive portfolio built with **React + Vite + GSAP** (ScrollTrigger, SplitText) and **Lenis** smooth scrolling.

Live: [advaitsaxena0.pages.dev](https://advaitsaxena0.pages.dev/)

## Develop

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # outputs to dist/
npm run preview  # serve the production build
```

## Deploy (Cloudflare Pages)

| Setting                | Value           |
| ---------------------- | --------------- |
| Framework preset       | Vite (or None)  |
| Build command          | `npm run build` |
| Build output directory | `dist`          |
| Node version           | 20+ (22 used)   |

## Editing content

All text lives in [src/data.js](src/data.js): projects, education, skills, achievements, clubs and social links.
Styles are in [src/styles.css](src/styles.css); each section is a component in [src/components/](src/components/).
