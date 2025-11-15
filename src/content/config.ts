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
    id: z.string(),               // e.g. "math-calculus-limits"
    subject: z.string(),          // "mathematics", "computer-science", etc.
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
    title: z.string(),
    summary: z.string().optional(),
    subject: z.string(),
    course: z.string().optional(), // slug or id of the course
    order: z.number().default(0),
    tags: z.array(z.string()).default([]),
  }),
})

// NOTE: collection key for macro-courses is "macro-courses" (hyphen)
export const collections = {
  subjects,
  'macro-courses': macroCourses,
  courses,
  concepts,
}
