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

- `[course-prefix]-<specific-concept>`

Where `course-prefix` is the course id or a shortened version.

**Examples**:

- `limits-introduction`
- `limits-right-hand-limit`
- `limits-two-sided-limit`
- `limits-epsilon-delta-definition`

Guidelines:

- Avoid generic names like `introduction` or `main-definition` without prefix.
- Use consistent patterns for related concepts.

---

## Lessons

Lessons typically use the file path as a slug.

Two possible styles are possible:

1. **Flat with course prefix**:

   - `limits-introduction`
   - `limits-numerical-exploration`

2. **Nested folders** (if supported):

   - `limits/introduction`
   - `limits/numerical-exploration`

Choose one style and stick to it across the repo.

---

## Exercises

Tie exercises to their parent concept or lesson in the slug.

**Examples**:

- `limits-introduction-q1`
- `limits-introduction-q2`
- `limits-right-hand-limit-practice-1`
- `limits-mixed-review-1`

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
