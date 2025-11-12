import { defineCollection, z } from 'astro:content';

const concepts = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    subject: z.enum(['mathematics', 'computer-science']),
    tags: z.array(z.string()).optional(),
    order: z.number().optional()
  })
});

const courses = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    id: z.string(), // e.g., MATH_101
    subject: z.enum(['mathematics', 'computer-science']).optional(),
    outline: z.array(z.object({
      label: z.string(),
      conceptSlug: z.string().optional() // e.g., "mathematics/limits"
    })).optional()
  })
});

export const collections = { concepts, courses };
