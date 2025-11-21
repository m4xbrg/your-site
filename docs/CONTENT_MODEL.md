# Content Model

This document defines the learning-graph entities, lifecycle semantics, and the tooling that keeps relationships consistent.

## Current state snapshot
- Content lives in Astro content collections under `src/content/**` with explicit IDs in frontmatter.
- The calculus pilot (limits course) follows the canonical ID pattern (`math-calculus-*`) with linked lessons, concepts, and exercises.
- Lifecycle status is standardized to `draft | refine | stable`; legacy `published`/`archived` have been removed from schemas and content.
- Concepts record `prerequisites` and `relatedConcepts`, and lessons/exercises reference concepts directly for graph queries.

## Lifecycle semantics
- `draft`: early or incomplete work; may be missing links or polish.
- `refine`: content exists and links are credible, but quality/coverage still being improved.
- `stable`: publishable quality; ready for indexing, search, and downstream use.

## Entities

### Subject
Required:
- `id` (lowercase, hyphenated)
- `title`
- `status` (`draft | refine | stable`)

Optional:
- `description`
- `order`

### Macro-course
Required:
- `id` (e.g., `math-calculus`)
- `subject` (subject id)
- `title`
- `status` (`draft | refine | stable`)

Optional:
- `description`
- `order`

### Course
Required:
- `id` (e.g., `math-calculus-limits`)
- `subject`
- `macroId`
- `title`
- `status` (`draft | refine | stable`)

Optional:
- `description`
- `order`
- `tags` (string array)
- `learningGoals` (string array)
- `outline` (array of `{ label, conceptSlug? }`)

### Lesson
Required:
- `id` (e.g., `math-calculus-limits-lesson-01`)
- `subject`
- `macroId`
- `courseId`
- `title`
- `status` (`draft | refine | stable`)
- `order`

Optional:
- `description`
- `concepts` (array of concept ids)

### Concept
Required:
- `id` (e.g., `math-calculus-limits-notation`)
- `subject`
- `title`
- `status` (`draft | refine | stable`)
- `role` (`core | supporting | extension`)

Optional:
- `macroId`
- `courseId`
- `summary`
- `description`
- `order`
- `tags`
- `learningGoals`
- `prerequisites` (concept id array)
- `relatedConcepts` (concept id array)
- `difficulty`
- `kind`
- `proofLevel`

### Exercise
Required:
- `id`
- `subject`
- `macroId`
- `courseId`
- `lessonId`
- `title`
- `status` (`draft | refine | stable`)
- `order`
- `concepts` (non-empty array of concept ids)

Optional:
- `tags`
- `difficulty`
- `topics`
- `problems` (structured problems array)

### Notes / Misc
Required:
- `title`

Optional:
- `summary`

## Relationship rules
- Every macro-course, course, lesson, concept, and exercise must point to an existing subject.
- Every course must belong to a macro-course.
- Every lesson belongs to exactly one course (and by extension its macro-course/subject).
- Every concept should name its home course/macro when applicable and must use valid concept IDs for `prerequisites` and `relatedConcepts`.
- Exercises must reference valid lessons, courses, macros, subjects, and concept IDs.
- Concept prerequisite graphs should be acyclic.

### Example: Limits concept frontmatter (calculus pilot)
```
id: math-calculus-limits-infinite-limits
subject: mathematics
macroId: math-calculus
courseId: math-calculus-limits
title: Infinite Limits
status: stable
role: supporting
prerequisites:
  - math-calculus-limits-notation
  - math-calculus-limits-one-sided
relatedConcepts:
  - math-calculus-limits-at-infinity
  - math-calculus-limits-discontinuities-classification
  - math-calculus-limits-graphical-numerical
```
Use the fully qualified concept IDs in `prerequisites` and `relatedConcepts` to avoid mismatches during graph checks.

## Graph tooling
- `npm run graph:check` runs `scripts/check-content-graph.mjs` to validate IDs, statuses, and all cross-collection references, and to detect prerequisite cycles.
- `npm run query:core-concepts-without-exercises` reports calculus core concepts that are not yet linked from any exercise.
- `npm run query:lessons-covering-concept -- <concept-id>` (or run the default script entry) prints lessons that directly or indirectly cover a target concept via prerequisites/related concepts.

Keep this document aligned with `src/content/config.ts` and the frontmatter used across collections.
