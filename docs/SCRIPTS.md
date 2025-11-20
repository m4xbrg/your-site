# Scripts

This document describes the main npm scripts and what they are expected to do.

> The exact script names live in `package.json`. Update this file when scripts
> are added/removed/renamed.

---

## Core scripts

### `npm run dev`

- Starts the Astro development server.
- Hot-reloads pages and content.
- Used during UI and content editing.

### `npm run build`

- Runs the Astro production build.
- Must fail if:
  - Types are incompatible with schemas.
  - Content collections are invalid.
  - Routes reference non-existent content.

### `npm run preview`

- Serves the production build locally.
- Used to check final output before deployment.

---

## Type-checking / linting (if configured)

### `npm run check` / `npm run astro:check`

- Runs Astro’s check / TypeScript validation.
- Ensures `.astro` and `.ts` files type-check against their declarations.

### `npm run lint`

- Runs ESLint (and possibly other linters).
- Keeps code style and best practices consistent.

---

## Content & tooling scripts

### `npm run content:new`

- CLI tool for scaffolding new content entries.
- Typical usage:

  ```bash
  npm run content:new concept mathematics "Right-hand limits"
  ```

- Responsibilities:
  - Choose the correct collection (concept/lesson/course/exercise).
  - Place file under the right directory (by subject).
  - Emit valid frontmatter according to `SCHEMA_REFERENCE.md`.

---

### `npm run search:index`

- Builds the search index used by `/search/`.
- Responsibilities:
  - Scan all relevant content collections in `src/content/**`.
  - Respect `status` / `published` flags (exclude drafts).
  - Emit a JSON file (e.g. `public/search-index.json`).
  - Align with whatever fields the search UI expects.

If this command fails, content is likely inconsistent (missing fields, invalid
enums, unexpected data shape).

---

### Migration / maintenance scripts

You may have scripts under `scripts/**` for tasks like:

- Updating frontmatter for a specific course.
- Normalizing fields (e.g. status, difficulty).
- Generating “mixed review” exercises.

These scripts should:

- Be idempotent (safe to run multiple times).
- Be tightly scoped (one script per logical operation).
- Log what they changed and why.

---

## Best practices

- Always run `npm run build` after modifying scripts that touch content.
- For large content changes, also run `npm run search:index`.
- Keep script behavior aligned with:
  - `SCHEMA_REFERENCE.md`
  - `CONTENT_MODEL.md`
  - `NAMING.md`
