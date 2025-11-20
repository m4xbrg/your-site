# Documentation Index

This file is the entry point for all project documentation.

The documentation is intentionally minimal but structured. Everything lives under
the `/docs` directory.

---

## High-level docs

- [`docs/PROJECT_OVERVIEW.md`](docs/PROJECT_OVERVIEW.md)  
  What this project is, how it’s structured, and the core design principles.

- [`docs/CONTENT_MODEL.md`](docs/CONTENT_MODEL.md)  
  The conceptual content graph: subjects, macro-courses, courses, lessons,
  concepts, exercises, and how they relate.

- [`docs/SCHEMA_REFERENCE.md`](docs/SCHEMA_REFERENCE.md)  
  The specification of frontmatter fields used in content collections.

---

## Contributor workflow

- [`docs/CONTENT_WORKFLOW.md`](docs/CONTENT_WORKFLOW.md)  
  How to create/edit content, link it into the graph, and validate it.

- [`docs/ROUTING.md`](docs/ROUTING.md)  
  How URLs are structured, how they map to content, and how dynamic routes work.

- [`docs/SCRIPTS.md`](docs/SCRIPTS.md)  
  NPM scripts and what they are expected to do (dev, build, search:index, etc.).

---

## Governance & conventions

- [`docs/NAMING.md`](docs/NAMING.md)  
  Naming conventions for ids, slugs, tags, and scripts.

---

## How to extend this

If you add more documentation later, prefer extending the `/docs` directory with
focused files instead of inflating this index. Keep this file as:

- A **map**, not an encyclopedia.
- A stable starting point for new contributors.
