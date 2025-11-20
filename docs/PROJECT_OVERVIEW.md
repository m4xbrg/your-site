# Project Overview

## What this project is

This repository implements a **static learning platform** built with **Astro + TypeScript**.

Core idea:

- All learning content (subjects, macro-courses, courses, lessons, concepts, exercises, notes) lives in **Astro Content Collections**.
- The site is a set of **views over a content graph**:
  - subject → macro-course → course → lesson → concept → exercise
- Navigation, search, and scripts all operate on this graph, not on ad-hoc pages.

The goal is to have:

- A coherent, typed content graph
- Static builds that never break due to invalid content
- Scripts that can generate, migrate, and index content safely

---

## High-level architecture

- **Framework**: Astro (SSG)
- **Language**: TypeScript (+ MDX frontmatter + markdown content)
- **Content storage**: `src/content/**` using Astro’s `defineCollection` + `zod` schemas
- **UI**:
  - Layouts and components in `src/layouts/**` and `src/components/**`
  - Page routes in `src/pages/**`
- **Scripts & tools**:
  - Content generation CLI (`content:new`)
  - Search index generator (`search:index`)
  - Content migrations / maintenance scripts (e.g. for specific courses)

---

## Design principles

1. **Content-first, schema-driven**
   - The content collections and schemas define the source of truth.
   - Pages and scripts must respect these schemas.

2. **Graph, not a tree**
   - Courses, lessons, and concepts form a directed graph (with prerequisites and relations).
   - Routes are simply views over that graph.

3. **Static validation**
   - Fail at build/check/index time when content is invalid.
   - Prefer fixing content/schemas over weakening types.

4. **Minimal, composable scripts**
   - Scripts do one job (generate pages, build index, run migrations).
   - Scripts should be safe to run repeatedly.

---

## Key user flows

For a learner:

- Browse by subject → macro-course → course
- See the course overview (lessons + concepts)
- Open a lesson → see linked concepts + exercises
- Discover via search/tags

For a contributor:

- Use `content:new` to scaffold a concept, lesson, course, or exercise
- Edit frontmatter to align with schemas
- Run `search:index` and/or build/check to validate
- Keep relationships (prereqs, related concepts, course links) consistent
