import { defineCollection, z } from 'astro:content'

const subjects = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    order: z.number().default(0),
    description: z.string().optional()
  })
})

const courses = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    subject: z.string(),
    code: z.string(),
    order: z.number().default(0),
    description: z.string().optional(),
    difficulty: z.enum(['beginner', 'intermediate', 'advanced']).default('beginner'),
    prerequisites: z.array(z.string()).default([]),
    outline: z
      .array(
        z.object({
          title: z.string(),
          slug: z.string().optional(),
          description: z.string().optional()
        })
      )
      .default([])
  })
})

const concepts = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    summary: z.string().optional(),
    subject: z.string(),
    course: z.string().optional(),
    order: z.number().default(0),
    tags: z.array(z.string()).default([])
  })
})

export const collections = { subjects, courses, concepts }
