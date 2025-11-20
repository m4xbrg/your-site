# Schema Reference

> This is a **specification** of frontmatter fields. When schemas change in
> `src/content/config.*`, this document must be updated.

---

## Subjects

Frontmatter fields (conceptual):

- `id: string` — required, stable
- `title: string` — required
- `description?: string`
- `tags?: string[]`
- `status?: "draft" | "stable" | "refine"`

---

## Macro-courses

Fields:

- `id: string` — required
- `subject: string` — subject id (required)
- `title: string` — required
- `description?: string`
- `tags?: string[]`
- `status?: "draft" | "stable" | "refine"`

---

## Courses

Fields:

- `id: string` — required
- `subject: string` — required
- `macroId?: string` — macro-course id
- `title: string` — required
- `description?: string`
- `learningGoals?: string[]`
- `tags?: string[]`
- `status?: "draft" | "stable" | "refine"`
- `difficulty?: "intro" | "intermediate" | "advanced" | "mixed"` (example enum)

---

## Concepts

Fields:

- `id: string` — required, globally unique
- `title: string` — required
- `description?: string`
- `subject: string` — required
- `macroId?: string`
- `courseId?: string`
- `prerequisites?: string[]` — concept ids
- `relatedConcepts?: string[]` — concept ids
- `role?: "core" | "supporting" | "extension"`
- `status?: "draft" | "stable" | "refine"`
- `difficulty?: "intro" | "intermediate" | "advanced"`
- `tags?: string[]`
- `learningGoals?: string[]`

---

## Lessons

Fields:

- `title: string` — required
- `description?: string`
- `courseId: string` — required for new content
- `concepts?: string[]` — concept ids
- `order?: number` — ordering within course
- `status?: "draft" | "stable" | "refine"`
- `tags?: string[]`
- `objectives?: string[]`
- `summary?: string`

---

## Exercises

Fields:

- `title: string` — required
- `courseId?: string`
- `conceptId?: string` or `concepts?: string[]`
- `difficulty?: "trivial" | "easy" | "medium" | "hard" | "challenge"`
- `status?: "draft" | "stable" | "refine"`
- `tags?: string[]`
- `problem: string` (markdown/MDX)
- `solution?: string` (markdown/MDX)

---

## Notes / meta

Fields:

- `title: string`
- `tags?: string[]`
- `status?: "draft" | "stable" | "refine"`
- `kind?: "design" | "internal" | "guide"`

---

## Status semantics (shared)

Common enum:

- `"draft"` — not ready for students; may be incomplete or structurally wrong.
- `"stable"` — student-facing quality; can be indexed and surfaced.
- `"refine"` — usable, but explicitly marked for improvement.

Scripts (e.g. search index) should treat `"stable"` and possibly `"refine"` as
published, while `"draft"` is excluded or down-ranked.
