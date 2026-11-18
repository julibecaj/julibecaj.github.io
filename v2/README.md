# Portfolio V2

Next.js + TypeScript portfolio. Source is in v2/app; public assets are in v2/public.

Run from v2/: npm ci, npm run dev.
Production: npm run build. Static export: v2/out.

GitHub Pages serves the checked-in static export at the repository root on main. For future releases, build v2, copy the contents of v2/out to the root, commit and push main. Keep .nojekyll so Pages serves _next assets. The original site remains available in Git history at c300924.

KRE currently publishes only registration; the broader platform remains in development. Portrait pending user-provided photo. Badge supports pointer dragging, spring motion, keyboard controls and reduced motion.
