# Routing

This document describes how URLs are structured and how they map to content.

---

## 1. Static vs dynamic routes

The Astro app defines routes under `src/pages/**`:

- Static pages: `index.astro`, `about.astro`, etc.
- Dynamic routes: `[param].astro`, `[...slug].astro`, directory-based pages.

The routing strategy is:

- Human-readable URLs that reflect the content graph.
- Minimal per-page logic; use helpers and content collections.

---

## 2. Core routes

Conceptual mapping (actual implementation lives in `src/pages`):

- `/`  
  Landing page and high-level navigation.

- `/subjects/`  
  List of subjects.

- `/subjects/[subject]/`  
  Subject overview + macro-courses + courses for that subject.

- `/courses/`  
  List of courses (possibly grouped by subject or macro-course).

- `/courses/[courseId]/`  
  Course page:
  - metadata
  - lessons list (ordered by `order`)
  - concepts list

- `/lessons/[...slug]/` or `/lessons/[courseId]/[lessonSlug]/`  
  Lesson page:
  - content
  - related concepts
  - related exercises
  - previous/next within course

- `/concepts/[conceptId]/`  
  Concept page:
  - explanation
  - prerequisites
  - related concepts
  - linked lessons/exercises

- `/tags/[tag]/`  
  Tag page:
  - all courses/lessons/concepts/exercises with that tag.

- `/search/`  
  Global discovery page based on the generated search index.

---

## 3. Mapping rules

### Course routes

- Use `courseId` (from content) directly as the parameter in `/courses/[courseId]/`.
- Course ids are stable and slug-safe.

### Lesson routes

Two broad strategies are possible:

1. **Nested under course**  
   - `/lessons/[courseId]/[lessonSlug]/`
   - Use `courseId` + slug from file path or frontmatter.

2. **Flat with unique slug**  
   - `/lessons/[slug]/`
   - Enforce globally unique lesson slugs.

Whatever the repo currently uses, new lessons must follow the same pattern.

### Concept routes

- Concepts are addressed by `id`:
  - `/concepts/[id]/`
- `id` must be URL-safe and unique.

---

## 4. getStaticPaths / getStaticProps (Astro)

Dynamic routes must:

- Use `getStaticPaths` (or Astro equivalent) to enumerate content entries.
- Read from the content collections (e.g. `getCollection("courses")`).
- Map each entry’s id/slug to a `params` object compatible with the route structure.

When editing a route:

- Ensure that `params` names match the `[param]` parts of the route.
- Ensure that any lookup by id or slug matches the fields in the content schemas.

---

## 5. Error handling

If a requested entry is missing:

- Prefer failing at build time (missing content) rather than rendering a broken page.
- For routes that may receive unknown slugs:
  - Render a clear 404 page.
  - Do not silently fallback to another course/lesson.

---

## 6. Navigation consistency

- Subject → macro-course → course → lesson → concept should be navigable through routes.
- No route should point to an id that doesn’t exist in the content collections.
- Breadcrumbs (if implemented) should derive from the content graph, not hardcoded paths.
