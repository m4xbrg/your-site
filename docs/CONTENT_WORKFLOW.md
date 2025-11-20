# Content Workflow

This document describes how to add or modify content safely.

---

## 1. Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Run the dev server during content work:

   ```bash
   npm run dev
   ```

3. Keep a browser open on:
   - Home page
   - `/subjects/…`
   - `/courses/…`
   - `/lessons/…`
   - `/concepts/…`
   - `/tags/…`
   - `/search/`

---

## 2. Creating new content

Use the content generator script (`content:new`) to scaffold new entries
(if configured in `package.json`), for example:

```bash
npm run content:new concept mathematics "Right-hand limits"
npm run content:new lesson mathematics "Introduction to limits"
npm run content:new course mathematics "Calculus – Limits"
```

The generator should:

- Place files under `src/content/<collection>/<subject>/…`
- Emit frontmatter that matches the schemas in `src/content/config.*`

If you create files by hand, ensure:

- Correct directory (collection + subject)
- Correct filename/slug (see `NAMING.md`)
- Frontmatter matches `SCHEMA_REFERENCE.md`

---

## 3. Linking content into the graph

When creating **courses**:

- Set `subject` and `macroId` consistently.
- Define `learningGoals` and `tags`.

When creating **lessons**:

- Assign `courseId`.
- Add `concepts` (array of concept ids) that this lesson explains.
- Assign `order` (1, 2, 3, …) unique within the course.

When creating **concepts**:

- Set `subject`, `macroId`, `courseId` (where applicable).
- Add `prerequisites` and `relatedConcepts` using existing concept ids.
- Choose appropriate `role`, `status`, `difficulty`.

When creating **exercises**:

- Link to at least one `conceptId` or include the relevant course/concept in metadata.
- Tag with difficulty and topic tags.

---

## 4. Validating content

After adding or editing content:

1. **Run the build or check**:

   ```bash
   npm run build
   # or
   npm run check   # if configured
   ```

2. **Regenerate search index** (if available):

   ```bash
   npm run search:index
   ```

3. **Spot-check routes**:

   - Open related course page
   - Open lesson pages
   - Open concept pages
   - Check that newly created items appear in `/search` and tag pages

If anything fails:

- Fix frontmatter to satisfy the schemas.
- Ensure all referenced ids exist.

---

## 5. Review and status updates

Before treating content as “published”:

- Ensure explanations are clear and self-contained.
- Verify prerequisites are correct.
- Check exercises for correctness and alignment.

Then:

- Set `status: "stable"` for finalized entries.
- Use `"refine"` for content that’s good enough but needs improvement.
- Keep unfinished work at `"draft"`.

---

## 6. Before committing

Run, at minimum:

```bash
npm run build
npm run search:index
```

Optionally add:

```bash
npm run lint
npm run check
```

Fix any issues before pushing. This keeps the content graph and build stable.
