# Content Model

This document defines the entities in the learning graph and how they relate.

---

## Entities

### Subject

**Examples**: `mathematics`, `physics`

- Top-level domain of knowledge.
- Used to group macro-courses, courses, concepts, lessons, exercises.

**Core fields (conceptual)**:
- `id` (string, stable, lowercase)
- `title`
- `description`

---

### Macro-course

A **large territory** within a subject.

**Examples**: `math-calculus`, `math-algebra`

**Purpose**:

- Group one or more courses that logically belong together.
- Provide a medium-scale entry point (e.g. “Calculus”).

**Core fields (conceptual)**:
- `id` (string, stable)
- `subject` (subject id)
- `title`
- `description`

---

### Course

A **coherent learning arc** inside a macro-course.

**Examples**: `math-calculus-limits`

**Purpose**:

- Organize a set of lessons and concepts into a structured progression.
- Expose metadata (goals, tags, outline) for navigation and search.

**Core fields (conceptual)**:
- `id`
- `subject`
- `macroId`
- `title`
- `description`
- `learningGoals` (array of strings)
- `tags` (array of strings)
- `status` (`draft` | `stable` | `refine`)

---

### Lesson

A **concrete, teachable unit** (page) that explains one or more concepts.

**Purpose**:

- Provide narrative, examples, exercises.
- Connect concepts in a sequence within a course.

**Core fields (conceptual)**:
- `title`
- `description`
- `courseId`
- `concepts` (array of concept ids)
- `order` (number, for within-course ordering)
- `status`
- `tags`
- `objectives` / `summary` (text)

---

### Concept

A **single idea** in the knowledge graph (e.g. “right-hand limit at a point”).

**Purpose**:

- Smallest meaningful semantic unit.
- Can be referenced from multiple lessons and exercises.
- Forms a graph via prerequisites and relations.

**Core fields (conceptual)**:
- `id`
- `title`
- `description`
- `subject`
- `macroId`
- `courseId` (optional if cross-course?)
- `prerequisites` (concept id array)
- `relatedConcepts` (concept id array)
- `role` (`core` | `supporting` | `extension`)
- `status`
- `difficulty` (enum or numeric)
- `tags`
- `learningGoals`

---

### Exercise

A **practice item** tied to a concept and/or lesson.

**Purpose**:

- Assess understanding.
- Provide spaced and mixed practice.

**Core fields (conceptual)**:
- `title`
- `courseId` (optional but recommended)
- `conceptId` or `concepts` (concepts this exercise targets)
- `difficulty`
- `status`
- `tags`
- `problem` (markdown/MDX)
- `solution` (optional MDX)

---

### Notes / Misc content

Used for:

- Meta commentary
- Design notes
- Non-student-facing content

---

## Relationship Rules

- Every **course** belongs to exactly one **subject**, and usually one **macro-course**.
- Every **lesson** belongs to exactly one **course**.
- Every **concept** belongs to one **subject**, usually one macro-course and one main course.
- **Prerequisite** and **relatedConcepts** must point to valid concept IDs.
- **Exercises** must be linked to at least one concept or course.

---

## Invariants

- No broken references:
  - All `subject`, `macroId`, `courseId`, `concepts`, `prerequisites`, `relatedConcepts` refer to real entries.
- No orphan concepts:
  - Every concept is reachable from at least one course or lesson.
- Lessons in a given course have strictly increasing `order` values with no duplicates.
