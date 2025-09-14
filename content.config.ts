import { defineContentConfig, defineCollection, z } from '@nuxt/content';

export default defineContentConfig({
  collections: {
    articles: defineCollection({
      type: 'page',
      source: 'articles/**/*.md'
    }),
    projects: defineCollection({
      type: 'page',
      source: 'projects/**/*.md'
    }),
    technologies: defineCollection({
      type: 'data',
      source: 'technologies/**/*.yml',
      schema: z.object({
        name: z.string(),
        description: z.string().optional(),
        icon: z.string().optional(),
        website: z.string().optional(),
        category: z.array(z.string())
      })
    }),
    tools: defineCollection({
      type: 'data',
      source: 'tools/**/*.yml',
      schema: z.object({
        name: z.string(),
        description: z.string().optional(),
        icon: z.string().optional(),
        website: z.string().optional(),
        category: z.string(),
        tags: z.array(z.string())
      })
    }),
    uses: defineCollection({
      type: 'data',
      source: 'uses/**/*.yml',
      schema: z.object({
        title: z.string(),
        items: z.array(
          z.object({
            label: z.string(),
            description: z.string().optional(),
            list: z.array(z.string()).optional()
          })
        )
      })
    })
  }
});