# Repo Audit

## Project overview
- Astro + MDX site with Tailwind; content organized through Astro content collections for subjects, macro-courses, courses, concepts, lessons, exercises, and notes.【F:src/content/config.ts†L3-L192】
- Content-driven pages under `src/pages` render dynamic routes for collections (e.g., subjects, courses, concepts, lessons, exercises) with shared `DocsLayout` components.

## Tooling & scripts
| Script | Purpose | Status (run?) | Notes |
| --- | --- | --- | --- |
| `npm run dev` | Local dev server via Astro | Not run | Assumed standard Astro dev flow. |
| `npm run build` | Production build | ✅ | Failed initially due to schema enum mismatch; passes after content fixes. |
| `npm run preview` | Preview built site | ✅ | Served build at :4321 for manual spot checks. |
| `npm run format` | Prettier formatting | Not run | Available for manual use. |
| `npm run lint` | ESLint across repo | ✅ | Added minimal ESLint flat config with TS parser so command succeeds. |
| `npm run content:new` | Page generator via `tools/generate-page.ts` | Not run | Aligns with content schemas. |
| `npm run search:index` | Builds search index JSON from content | ✅ | Generates `public/search-index.json`. |

## Build & type-check
- Build continues to pass after re-running `npm run build` to validate the latest content graph.
- `npm run graph:check` now passes after correcting a relatedConcept ID mismatch so dependent concepts point at the existing "limits at infinity" entry.【F:src/content/concepts/mathematics/calculus/limits/infinite-limits.mdx†L19-L25】【F:src/content/concepts/mathematics/calculus/limits/squeeze-theorem.mdx†L19-L24】【F:src/content/concepts/mathematics/calculus/limits/limits-at-infinity.mdx†L1-L26】

## Routing & pages
- Dynamic routes (`concepts/[...slug]`, `lessons/[...slug]`, `exercises/[...slug]`, `subjects/[slug]`, `macro-courses/[slug]`, `courses/[id]`) are generated from collection entries and aligned with the content IDs/slugs. No routing adjustments required after content fixes.

## Content collections & data model
- Schema enforces lifecycle enums for lessons and exercises; updated all calculus/limits lessons and exercises to use `status: published` to satisfy schema expectations and ensure inclusion in build/search outputs.【F:src/content/lessons/mathematics/calculus/limits/lesson-01-introduction.mdx†L2-L13】【F:src/content/exercises/mathematics/calculus/limits/lesson-01-exercises.mdx†L2-L16】
- Other collections (subjects, macro-courses, courses, concepts, notes) already conform to schemas; no additional frontmatter fixes required this pass.

## Scripts & tooling
- Added `eslint.config.mjs` using `@typescript-eslint/parser` and ignore rules for generated/output folders so `npm run lint` parses TypeScript sources without failing on Astro outputs.【F:eslint.config.mjs†L1-L18】
- Regenerated `public/search-index.json` via `npm run search:index` to reflect corrected publication statuses and current content set.

## Navigation & UX
- Manually spot-checked the calculus limits course → lesson → concept → exercise chain via the preview server (200 responses, populated content rather than stubs); no routing gaps found.

## Code hygiene & minor cleanups
- Minimal changes: schema-aligned status fields and lint configuration to keep tooling working without suppressing types or weakening schemas.

## Final status
- Commands run:
  - `npm run build` (pass)
  - `npm run lint` (pass after config addition)
  - `npm run search:index` (pass)
  - `npm run graph:check` (pass after ID fix)
  - `npm run preview -- --host --port 4321` (pass; used for manual page traversal)
- Remaining TODOs: extend graph validation coverage beyond the calculus pilot (e.g., prerequisites across other subjects) and add automated smoke navigation for other course stacks.

## Content model status (current)
- Standardized lifecycle status to `draft | refine | stable` across subjects, courses, lessons, concepts, and exercises.
- Added explicit subject IDs and codified naming conventions so IDs align with file paths.
- Introduced graph validation/query scripts to check references (subjects, macros, courses, concepts, lessons, exercises) and to surface gaps like core concepts without exercises.
- Known follow-ups: expand relationship coverage beyond the calculus pilot, backfill missing concepts that are referenced but not yet authored (e.g., foundational math prerequisites), and keep graph checks running in CI.
