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
    id: z.string(),
    subject: z.string(),
    code: z.string(),
    order: z.number().default(0),
    description: z.string().optional(),
    outline: z
      .array(
        z.object({
          label: z.string(),
          conceptSlug: z.string().optional()
        })
      )
      .optional()
  })
})

const concepts = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    subject: z.string(),
    course: z.string().optional(),
    order: z.number().default(0),
    tags: z.array(z.string()).default([])
  })
})

export const collections = { subjects, courses, concepts }
