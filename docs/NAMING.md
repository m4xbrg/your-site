# Naming Conventions

This document defines naming and ID conventions to keep the content graph tidy.

---

## General rules

- **Lowercase**
- **Hyphen-separated**
- No spaces, special characters, or uppercase letters in ids or slugs.
- Be explicit rather than clever.

---

## Subjects

- Short, lowercase, single word where possible.

**Examples**:

- `mathematics`
- `physics`
- `computer-science`

---

## Macro-courses

Format:

- `<subject>-<macro>`

**Examples**:

- `math-calculus`
- `math-algebra`
- `cs-programming-basics`

---

## Courses

Format:

- `<macro-course>-<topic>`

**Examples**:

- `math-calculus-limits`
- `math-calculus-derivatives`
- `math-algebra-linear-equations`

Courses should be uniquely identifiable by their id and used directly in URLs:

- `/courses/math-calculus-limits/`

---

## Concepts

Format:

- `[course-id]-<specific-concept>`

Where `course-id` is the full course id (e.g., `math-calculus-limits`).

**Examples**:

- `math-calculus-limits-informal-idea`
- `math-calculus-limits-notation`
- `math-calculus-limits-squeeze-theorem`

Guidelines:

- Avoid generic names like `introduction` or `main-definition` without prefix.
- Use consistent patterns for related concepts.

---

## Lessons

Lessons use explicit IDs and slugs that carry course context.

Format:

- `<course-id>-lesson-<##>-<short-slug>`

**Examples**:

- `math-calculus-limits-lesson-01-introduction`
- `math-calculus-limits-lesson-02-limit-laws`
- `math-calculus-limits-lesson-05-epsilon-delta`

File paths should mirror the hierarchy (e.g., `src/content/lessons/mathematics/calculus/limits/lesson-01-introduction.mdx`).

---

## Exercises

Tie exercises to their parent concept or lesson in the slug.

**Examples**:

- `math-calculus-limits-lesson-01-exercises`
- `math-calculus-limits-lesson-03-exercises`
- `math-calculus-limits-review`

---

## Tags

Tags are:

- lowercase
- hyphen-separated if multi-word

**Examples**:

- `calculus`
- `limits`
- `graphing`
- `mixed-review`
- `diagnostic`

Tags can be used across entity types, but avoid creating synonyms unless needed.

---

## Script names

NPM script names:

- Use `:` to denote namespaces.
- Be explicit about purpose.

**Examples**:

- `dev`
- `build`
- `preview`
- `check`
- `lint`
- `content:new`
- `search:index`
- `migrate:limits`
- `migrate:normalize-status`

---

## Files and directories

- Content under `src/content/<collection>/<subject>/…`
- Components under `src/components/**` with PascalCase for component names.
- Layouts under `src/layouts/**` with `SomethingLayout.astro`.

Consistent naming keeps the content graph predictable and makes it easier to
write robust scripts.
