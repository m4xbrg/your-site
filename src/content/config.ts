import { defineCollection, z } from 'astro:content'

const course = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    subject: z.string(),
    code: z.string().optional(),
    order: z.number().default(0),
    concepts: z.array(z.string()).default([]),
    lessons: z
      .array(
        z.object({
          slug: z.string(),
          title: z.string().optional()
        })
      )
      .default([]),
    prerequisites: z.array(z.string()).default([])
  })
})

const concept = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    subject: z.string().optional(),
    course: z.string().optional(),
    order: z.number().default(0),
    tags: z.array(z.string()).default([]),
    lessons: z.array(z.string()).default([]),
    relatedConcepts: z.array(z.string()).default([])
  })
})

const lesson = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    course: z.string().optional(),
    concept: z.string(),
    order: z.number().default(0),
    durationMinutes: z.number().int().positive().optional(),
    objectives: z.array(z.string()).default([]),
    exercises: z.array(z.string()).default([]),
    notes: z.array(z.string()).default([])
  })
})

const exercise = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    prompt: z.string().optional(),
    lesson: z.string(),
    concept: z.string().optional(),
    course: z.string().optional(),
    difficulty: z.enum(['beginner', 'intermediate', 'advanced']).default('beginner'),
    order: z.number().default(0),
    topics: z.array(z.string()).default([]),
    solution: z.string().optional()
  })
})

const note = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    summary: z.string().optional(),
    course: z.string().optional(),
    concept: z.string().optional(),
    lesson: z.string().optional(),
    order: z.number().default(0),
    tags: z.array(z.string()).default([])
  })
})

export const collections = { course, concept, lesson, exercise, note }
