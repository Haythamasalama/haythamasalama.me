import { defineContentConfig, defineCollection, z } from '@nuxt/content';

export default defineContentConfig({
  collections: {
    articles: defineCollection({
      type: 'page',
      source: 'articles/**/*.md',
      schema: z.object({
        author: z.object({
          username: z.string(),
          platform: z.enum(['github', 'twitter']).optional()
        }).optional(),
        date: z.string(),
        readTime: z.string().optional(),
        tags: z.array(z.string()).optional()
      })
    }),
    projects: defineCollection({
      type: 'page',
      source: 'projects/**/*.md',
      schema: z.object({
        startAt: z.string(),
        endAt: z.string(),
        associated: z.string().optional()
      })
    }),
    contributions: defineCollection({
      type: 'page',
      source: 'contributions/**/*.md',
      schema: z.object({
        name: z.string(),
        username: z.string(),
        types: z.array(z.string()),
        links: z.array(z.string()).optional(),
        url: z.string().optional()
      })
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
        tags: z.array(z.string()).optional()
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
