# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Project state

This is a freshly bootstrapped `create-next-app` project (App Router) named `book-cab` — a car/cab booking app. At present it contains only the default scaffold (`app/layout.tsx`, `app/page.tsx`, `app/globals.css`); no routes, components, data layer, or tests have been built yet. There is no existing architecture to preserve — early structural decisions here will set the pattern for the rest of the app.

## Commands

```bash
npm run dev      # start dev server (http://localhost:3000)
npm run build    # production build
npm run start    # serve production build
npm run lint     # eslint (flat config: eslint-config-next core-web-vitals + typescript)
```

There is no test runner configured yet (no Jest/Vitest/Playwright). If you add tests, you'll need to set up the runner and its scripts first.

## Stack notes

- **Next.js 16.2.10 / React 19.2.4** — versions newer than your training data. Per `AGENTS.md`, consult `node_modules/next/dist/docs/` (App Router docs under `01-app/`) before relying on remembered Next.js APIs or conventions; behavior may have changed.
- **Tailwind CSS v4** via `@tailwindcss/postcss` (no `tailwind.config.js` — v4 is CSS-first, configured in `app/globals.css`).
- TypeScript is `strict: true`; path alias `@/*` maps to the repo root (`tsconfig.json`).
- Module resolution is `bundler`; this project uses ESM (`"module": "esnext"`).
