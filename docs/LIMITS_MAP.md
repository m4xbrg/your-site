# Limits Vertical Map

## Repository snapshot
- **Framework & intent:** Astro-based static learning site with content-first graph model (subjects → macro-courses → courses → lessons → concepts → exercises). Content lives in Astro content collections defined under `src/content` with typed schemas. See `docs/PROJECT_OVERVIEW.md` and `src/content/config.ts` for architecture and collection shapes.
- **Top-level structure:**
  - `src/content/` – content collections (subjects, macro-courses, courses, concepts, lessons, exercises, notes) plus collection config.
  - `src/components`, `src/layouts`, `src/pages` – UI building blocks and routes.
  - `scripts/` and `tools/` – utilities for content generation/indexing.
  - `docs/` – contributor and architecture documentation (this file extends it).

## Limits vertical – content graph
- **Subject:** `mathematics`
- **Macro-course:** `math-calculus`
- **Course:** `math-calculus-limits` — “Limits & Continuity,” status `refine`, with six lessons plus a review set.

### Concepts
| id | title | role | status | difficulty | prerequisites | related |
| --- | --- | --- | --- | --- | --- | --- |
| math-calculus-limits-informal-idea | Informal Notion of a Limit | core | stable | intro | math-foundations-functions-basic | graphical-numerical; notation; one-sided |
| math-calculus-limits-graphical-numerical | Graphical & Numerical Interpretation of Limits | supporting | stable | intro | math-calculus-limits-informal-idea; math-foundations-functions-basic | one-sided; infinite-limits; discontinuities-classification |
| math-calculus-limits-notation | Limit Notation & Vocabulary | core | stable | intro | math-calculus-limits-informal-idea | one-sided; epsilon-delta-definition; graphical-numerical |
| math-calculus-limits-one-sided | One-Sided Limits | core | stable | intro | math-calculus-limits-notation; math-calculus-limits-graphical-numerical | infinite-limits; discontinuities-classification; continuity-point |
| math-calculus-limits-limit-laws | Limit Laws | core | stable | intro | math-calculus-limits-notation; math-calculus-limits-informal-idea | computation-strategies; continuity-point; epsilon-delta-proofs |
| math-calculus-limits-computation-strategies | Strategies for Computing Limits | supporting | stable | intro | math-calculus-limits-limit-laws; math-calculus-limits-notation | squeeze-theorem; computation-strategies; removable-discontinuities |
| math-calculus-limits-epsilon-delta-definition | Epsilon–Delta Definition of a Limit | core | stable | intermediate | math-calculus-limits-notation; math-calculus-limits-informal-idea | epsilon-delta-proofs; limit-laws; continuity-point |
| math-calculus-limits-epsilon-delta-proofs | Building Epsilon–Delta Proofs | supporting | stable | intermediate | math-calculus-limits-epsilon-delta-definition; math-calculus-limits-limit-laws | squeeze-theorem; continuity-point; computation-strategies |
| math-calculus-limits-infinite-limits | Infinite Limits | supporting | stable | intro | math-calculus-limits-notation; math-calculus-limits-one-sided | at-infinity; discontinuities-classification; graphical-numerical |
| math-calculus-limits-at-infinity | Limits at Infinity | supporting | stable | intro | math-calculus-limits-notation; math-calculus-limits-limit-laws | infinite-limits; computation-strategies; squeeze-theorem |
| math-calculus-limits-continuity-point | Continuity at a Point | core | stable | intro | math-calculus-limits-one-sided; math-calculus-limits-notation | continuity-interval; discontinuities-classification; removable-discontinuities |
| math-calculus-limits-continuity-interval | Continuity on an Interval | core | stable | intro | math-calculus-limits-continuity-point | ivt; discontinuities-classification; removable-discontinuities |
| math-calculus-limits-discontinuities-classification | Classifying Discontinuities | supporting | stable | intro | math-calculus-limits-continuity-point; math-calculus-limits-one-sided | removable-discontinuities; infinite-limits; graphical-numerical |
| math-calculus-limits-removable-discontinuities | Removable Discontinuities | supporting | stable | intro | math-calculus-limits-continuity-point; math-calculus-limits-limit-laws | discontinuities-classification; computation-strategies; continuity-interval |
| math-calculus-limits-squeeze-theorem | Squeeze Theorem | supporting | stable | intro | math-calculus-limits-limit-laws; math-calculus-limits-notation | computation-strategies; epsilon-delta-proofs; at-infinity |
| math-calculus-limits-ivt | Intermediate Value Theorem | core | stable | intro | math-calculus-limits-continuity-interval; math-calculus-limits-graphical-numerical | squeeze-theorem; informal-idea; limit-laws |

### Lessons
| id | title | concepts |
| --- | --- | --- |
| math-calculus-limits-lesson-01 | Introduction to Limits: Informal Idea, Numerical Behavior, and Notation | informal-idea; graphical-numerical; notation |
| math-calculus-limits-lesson-02 | Algebraic Limit Laws and Computation Strategies | limit-laws; computation-strategies |
| math-calculus-limits-lesson-03 | One-Sided Limits, Infinite Limits, and Limits at Infinity | one-sided; infinite-limits; at-infinity |
| math-calculus-limits-lesson-04 | Continuity and Classification of Discontinuities | continuity-point; continuity-interval; discontinuities-classification; removable-discontinuities |
| math-calculus-limits-lesson-05 | The Epsilon–Delta Definition of Limit | epsilon-delta-definition |
| math-calculus-limits-lesson-06 | Epsilon–Delta Proofs, Squeeze Theorem, and the Intermediate Value Theorem | epsilon-delta-proofs; squeeze-theorem; ivt |

### Exercise sets
| id | lesson | concepts targeted |
| --- | --- | --- |
| math-calculus-limits-lesson-01-exercises | math-calculus-limits-lesson-01 | informal-idea; graphical-numerical; notation |
| math-calculus-limits-lesson-02-exercises | math-calculus-limits-lesson-02 | limit-laws; computation-strategies |
| math-calculus-limits-lesson-03-exercises | math-calculus-limits-lesson-03 | one-sided; infinite-limits; at-infinity |
| math-calculus-limits-lesson-04-exercises | math-calculus-limits-lesson-04 | continuity-point; continuity-interval; discontinuities-classification; removable-discontinuities |
| math-calculus-limits-lesson-05-exercises | math-calculus-limits-lesson-05 | epsilon-delta-definition; epsilon-delta-proofs |
| math-calculus-limits-lesson-06-exercises | math-calculus-limits-lesson-06 | squeeze-theorem; ivt; epsilon-delta-proofs |
| math-calculus-limits-review | (course capstone) | informal-idea; graphical-numerical; notation; limit-laws; computation-strategies; one-sided; infinite-limits; at-infinity; continuity-point; continuity-interval; discontinuities-classification; removable-discontinuities; epsilon-delta-definition; epsilon-delta-proofs; squeeze-theorem; ivt |

## Obvious structural issues
- **Self-related concept:** `math-calculus-limits-computation-strategies` lists itself in `relatedConcepts`, creating a self-reference. No other clear linkage problems surfaced.
