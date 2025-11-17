import { defineCollection, z } from 'astro:content'

const subjects = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    order: z.number().default(0),
    description: z.string().optional(),
  }),
})

// NEW: macro-courses collection (territories inside a subject)
const macroCourses = defineCollection({
  type: 'content',
  schema: z.object({
    id: z.string(),          // e.g. "math-calculus"
    subject: z.string(),     // e.g. "mathematics"
    title: z.string(),
    description: z.string().optional(),
    order: z.number().default(0),
  }),
})

// UPDATED: courses collection (sub-courses inside a macro)
const courses = defineCollection({
  type: 'content',
  schema: z.object({
    id: z.string(),                 // e.g. "math-calculus-limits"
    subject: z.string(),            // "mathematics", "computer-science", etc.
    macroId: z.string().optional(), // e.g. "math-calculus"
    title: z.string(),
    description: z.string().optional(),
    order: z.number().default(0),
    tags: z.array(z.string()).default([]),

    // Optional extras; can be empty for now
    code: z.string().optional(),
    learningGoals: z.array(z.string()).default([]),
    outline: z
      .array(
        z.object({
          label: z.string(),
          conceptSlug: z.string().optional(),
        }),
      )
      .default([]),
  }),
})

const concepts = defineCollection({
  type: 'content',
  schema: z.object({
    // Identity & placement
    id: z.string(),                  // global concept id, e.g. "math-limits-intuitive"
    subject: z.string(),             // "mathematics", "physics", "computer-science", ...

    macroId: z.string().optional(),  // e.g. "math-calculus"
    courseId: z.string().optional(), // e.g. "math-calculus-limits"

    // Legacy / compatibility field (current code still uses this)
    course: z.string().optional(),   // existing slug/id like "math-101", "cs-101"

    // Descriptive content
    title: z.string(),
    description: z.string().optional(),
    summary: z.string().optional(),

    order: z.number().default(0),
    tags: z.array(z.string()).default([]),
    learningGoals: z.array(z.string()).default([]),

    // Graph structure
    prerequisites: z.array(z.string()).default([]),
    relatedConcepts: z.array(z.string()).default([]),

    // Meta / lifecycle
    role: z.enum(['core', 'supporting', 'extension']).default('core'),
    status: z.enum(['draft', 'stable', 'refine']).default('draft'),

    // Extra metadata we already had
    lessons: z.array(z.string()).default([]),
    estimatedTime: z.string().optional(),
    difficulty: z.string().optional(),

    // NEW: to support pilot concept frontmatter
    kind: z.string().optional(),        // e.g. "definition", "theorem", "technique"
    proofLevel: z.string().optional(),  // e.g. "none", "sketch", "formal"
  }),
})

// UPDATED: lessons collection to support both legacy and new pilot lessons
const lessons = defineCollection({
  type: 'content',
  schema: z.object({
    // New pilot fields (used by math-calculus-limits lessons)
    id: z.string().optional(),        // e.g. "math-calculus-limits-lesson-01"
    subject: z.string().optional(),   // e.g. "mathematics"
    macroId: z.string().optional(),   // e.g. "math-calculus"
    courseId: z.string().optional(),  // e.g. "math-calculus-limits"

    title: z.string(),
    description: z.string().optional(),

    // Legacy course linkage
    course: z.string().optional(),

    // Legacy concept linkage
    concept: z.string().optional(),

    order: z.number().default(0),

    // Legacy fields
    durationMinutes: z.number().default(0),
    objectives: z.array(z.string()).default([]),
    exercises: z.array(z.string()).default([]),
    notes: z.array(z.string()).default([]),

    // NEW: status + concept list for pilot lessons
    status: z
      .enum(['draft', 'published', 'archived'])
      .default('draft')
      .optional(),
    concepts: z.array(z.string()).default([]),
  }),
})

// REPLACED: exercises collection to match new pilot exercise files,
// while still allowing old fields as optional.
const exercises = defineCollection({
  type: 'content',
  schema: z.object({
    id: z.string(),
    subject: z.string(),
    macroId: z.string(),
    courseId: z.string(),
    lessonId: z.string(),

    title: z.string(),
    order: z.number().default(0),

    status: z
      .enum(['draft', 'published', 'archived'])
      .default('draft'),

    concepts: z.array(z.string()).nonempty(),
    tags: z.array(z.string()).default([]),

    // Structured problems (optional)
    problems: z
      .array(
        z.object({
          id: z.string().optional(),
          label: z.string().optional(),        // "1", "A-1", etc.
          title: z.string().optional(),        // short name
          difficulty: z.string().optional(),   // "A", "B", "C", "challenge"
          topics: z.array(z.string()).default([]),
          prompt: z.string(),                  // markdown/LaTeX allowed
          solution: z.string().optional(),     // markdown/LaTeX allowed
        }),
      )
      .default([]),

    // Legacy fields (keep for now)
    prompt: z.string().optional(),
    lesson: z.string().optional(),
    concept: z.string().optional(),
    course: z.string().optional(),
    difficulty: z.string().optional(),
    topics: z.array(z.string()).default([]),
    solution: z.string().optional(),
  }),
})


const notes = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    summary: z.string().optional(),
  }),
})

// NOTE: collection key for macro-courses is "macro-courses" (hyphen)
export const collections = {
  subjects,
  'macro-courses': macroCourses,
  courses,
  concepts,
  lessons,
  exercises,
  notes,
}
