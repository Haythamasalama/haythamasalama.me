import { defineCollection, defineContentConfig, z } from '@nuxt/content';
import { defineSitemapSchema } from '@nuxtjs/sitemap/content';
import { toolCategoryNames } from './shared/tool-categories';

/** A small square visual: one-colour logo, Iconify icon, colour image or monogram. */
const mark = z.object({
  logo: z.string().optional(),
  icon: z.string().optional(),
  image: z.string().optional(),
  text: z.string().optional()
});

const link = z.object({
  label: z.string(),
  to: z.string()
});

export default defineContentConfig({
  collections: {
    articles: defineCollection({
      type: 'page',
      source: 'articles/**/*.md',
      schema: z.object({
        date: z.string().date(),
        category: z.string(),
        icon: z.string(),
        readingTime: z.string(),
        sitemap: defineSitemapSchema({ z })
      })
    }),

    experience: defineCollection({
      type: 'data',
      source: 'experience/*.yml',
      schema: z.object({
        company: z.string(),
        url: z.string().url().optional(),
        mark,
        role: z.string(),
        detail: z.string().optional(),
        start: z.string(),
        end: z.string(),
        summary: z.string(),
        order: z.number()
      })
    }),

    education: defineCollection({
      type: 'data',
      source: 'education/*.yml',
      schema: z.object({
        school: z.string(),
        mark,
        degree: z.string(),
        period: z.string(),
        order: z.number()
      })
    }),

    projects: defineCollection({
      type: 'data',
      source: 'projects/*.yml',
      schema: z.object({
        title: z.string(),
        year: z.number(),
        context: z.string().optional(),
        description: z.string(),
        mark,
        tags: z.array(z.object({ label: z.string(), icon: z.string().optional() })).default([]),
        links: z.array(link).default([]),
        order: z.number(),
        /** Shown in "Selected work" on the home page when set. */
        highlight: z.object({
          title: z.string(),
          description: z.string(),
          period: z.string(),
          order: z.number()
        }).optional()
      })
    }),

    /**
     * What GitHub cannot tell: roles, discussions and projects I started.
     * Pull requests and issues are read live from GitHub (`server/api/open-source.get.ts`).
     */
    contributions: defineCollection({
      type: 'data',
      source: 'contributions/*.yml',
      schema: z.object({
        repo: z.string(),
        url: z.string().url(),
        avatar: z.string(),
        kind: z.enum(['maintainer', 'discussion', 'created']),
        /** Short role line, e.g. "Maintainer · 2 months". */
        role: z.string().optional(),
        note: z.string().optional(),
        links: z.array(link).default([]),
        order: z.number()
      })
    }),

    technologies: defineCollection({
      type: 'data',
      source: 'technologies/*.yml',
      schema: z.object({
        name: z.string(),
        icon: z.string(),
        url: z.string().url().optional(),
        group: z.enum(['Main stack', 'Back end', 'Front end', 'Testing', 'Deployment', 'Languages', 'Hardware']),
        order: z.number(),
        /** Listed under "Skills & stack" on the home page. */
        home: z.boolean().default(false)
      })
    }),

    tools: defineCollection({
      type: 'data',
      source: 'tools/*.yml',
      schema: z.object({
        name: z.string(),
        /** One of the categories in `shared/tool-categories.ts`. */
        category: z.enum(toolCategoryNames),
        /** Where it runs: Web, Extension, App, VS Code… */
        kind: z.string(),
        description: z.string(),
        url: z.string().url(),
        icon: z.string(),
        /** One of my favourites; listed first in its category. */
        featured: z.boolean().default(false)
      })
    }),

    uses: defineCollection({
      type: 'data',
      source: 'uses/*.yml',
      schema: z.object({
        title: z.string(),
        order: z.number(),
        items: z.array(z.object({
          name: z.string(),
          note: z.string(),
          mark,
          /** Position in "On my desk" on the home page, if pinned there. */
          desk: z.number().optional()
        }))
      })
    })
  }
});
