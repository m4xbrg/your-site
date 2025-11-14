import { defineCollection, z } from 'astro:content'

const subjects = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    summary: z.string().optional(),
    icon: z.string().optional(),
    order: z.number().default(0)
  })
})

const courses = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    order: z.number().default(0)
  })
})

const courses = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    id: z.string(),
    subject: z.string(),
    code: z.string().optional(),
    difficulty: z.enum(['beginner', 'intermediate', 'advanced']).default('beginner'),
    order: z.number().default(0),
    outline: z
      .array(
        z.object({
          label: z.string(),
          conceptSlug: z.string().optional()
        })
      )
      .default([])
  })
})

const concepts = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    subject: z.string().optional(),
    course: z.string().optional(),
    order: z.number().default(0),
    tags: z.array(z.string()).default([]),
    lessons: z.array(z.string()).default([]),
    relatedConcepts: z.array(z.string()).default([]),
    prerequisites: z.array(z.string()).default([])
    learningGoals: z.array(z.string()).default([]),
    relatedConcepts: z.array(z.string()).default([])
  })
})

const lessons = defineCollection({
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

const exercises = defineCollection({
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

const notes = defineCollection({
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

export const collections = { subjects, courses, concepts, lessons, exercises, notes }
