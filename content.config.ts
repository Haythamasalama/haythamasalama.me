import { defineCollection, defineContentConfig, z } from '@nuxt/content';
import { defineSitemapSchema } from '@nuxtjs/sitemap/content';
import { patternGroupNames } from './shared/pattern-groups';
import { skillGroups } from './shared/skill-groups';
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
        /** The file as written, for the article's Markdown version (`<path>.md`). */
        rawbody: z.string(),
        sitemap: defineSitemapSchema({ z })
      })
    }),

    /** The About page: headline, story, organizations, awards and vision. */
    profile: defineCollection({
      type: 'data',
      source: 'profile.yml',
      schema: z.object({
        headline: z.string(),
        focus: z.string(),
        location: z.string(),
        /** First paid engineering work, `YYYY-MM`; "years shipping" counts from here. */
        careerStart: z.string().regex(/^\d{4}-\d{2}$/),
        about: z.array(z.string()),
        organizations: z.array(z.object({
          name: z.string(),
          url: z.string().url(),
          image: z.string()
        })),
        awards: z.array(z.object({
          title: z.string(),
          issuer: z.string(),
          year: z.string(),
          note: z.string().optional()
        })),
        vision: z.object({
          line: z.string(),
          text: z.string()
        })
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
        /** How the job was held, as on LinkedIn: "Full-time · Jeddah, Saudi Arabia · Remote". */
        type: z.enum(['Full-time', 'Part-time']).optional(),
        location: z.string().optional(),
        workplace: z.enum(['Remote', 'On-site', 'Hybrid']).optional(),
        start: z.string(),
        end: z.string(),
        summary: z.string(),
        /** Bullet points shown on the About page, LinkedIn style. */
        highlights: z.array(z.string()).default([]),
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
     * A project's own page at /projects/<file>: the story and figures behind
     * the card in `projects`, which shares its file name and gives the title,
     * period and tags.
     */
    projectPages: defineCollection({
      type: 'page',
      source: 'projects/*.md',
      schema: z.object({
        /** For search results and link previews; the card's description is usually too long. */
        description: z.string(),
        /** The file as written, for the page's Markdown version (`<path>.md`). */
        rawbody: z.string(),
        sitemap: defineSitemapSchema({ z })
      })
    }),

    /** Free apps I build and maintain myself, on /apps; client and product work is in `projects`. */
    apps: defineCollection({
      type: 'data',
      source: 'apps/*.yml',
      schema: z.object({
        name: z.string(),
        /** What it is in a few words: "Screenshot app for macOS". */
        kind: z.string(),
        description: z.string(),
        mark,
        /** Where it runs: macOS, Docker, Web. */
        platforms: z.array(z.string()).default([]),
        /** First release, as "Oct 2026". */
        since: z.string(),
        license: z.string().optional(),
        repo: z.string().url(),
        /** Ways to get it: the website, a download, a live demo. */
        links: z.array(link).default([]),
        order: z.number()
      })
    }),

    /** An app's own page at /apps/<file>, next to its card in `apps` (like `projectPages`). */
    appPages: defineCollection({
      type: 'page',
      source: 'apps/*.md',
      schema: z.object({
        description: z.string(),
        rawbody: z.string(),
        sitemap: defineSitemapSchema({ z })
      })
    }),

    /** The Vue.js learning path on /learn/vue: stages in order, each with its topics and resources. */
    vuePath: defineCollection({
      type: 'data',
      source: 'learn/vue-path.yml',
      schema: z.object({
        description: z.string(),
        intro: z.string(),
        source: z.string().url(),
        before: z.array(z.object({
          title: z.string(),
          topics: z.array(z.string()).default([]),
          links: z.array(link).default([])
        })),
        steps: z.array(z.object({
          title: z.string(),
          /** A small project to build, instead of a stage to study. */
          project: z.boolean().default(false),
          note: z.string().optional(),
          topics: z.array(z.string()).default([]),
          links: z.array(link).default([])
        }))
      })
    }),

    /** One design pattern per file, on /learn/design-patterns/<file>, with the Java example from GitHub. */
    patterns: defineCollection({
      type: 'page',
      source: 'learn/design-patterns/*.md',
      schema: z.object({
        group: z.enum(patternGroupNames),
        /** The idea in one sentence, for the cards. */
        summary: z.string(),
        description: z.string(),
        /** What the example models: "A tweet and its followers". */
        example: z.string(),
        order: z.number(),
        /** The pattern's folder in the GitHub repository. */
        source: z.string().url(),
        rawbody: z.string(),
        sitemap: defineSitemapSchema({ z })
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
        /** Display name, e.g. "Uptime Kuma"; the repository name otherwise. */
        name: z.string().optional(),
        url: z.string().url(),
        avatar: z.string().optional(),
        /** Iconify name, used instead of the avatar. */
        icon: z.string().optional(),
        kind: z.enum(['maintainer', 'contributor', 'discussion', 'created']),
        /** Listed under "Contributed to" at the top of /open-source. */
        featured: z.boolean().default(false),
        /** What the project is, in one line. */
        description: z.string().optional(),
        /**
         * Pull requests read from GitHub one by one, so they show even when
         * GitHub doesn't count them as merged.
         */
        pullRequests: z.array(z.number().int()).default([]),
        /** Short role line, e.g. "Maintainer · 2 months". */
        role: z.string().optional(),
        badge: z.string().optional(),
        note: z.string().optional(),
        /** Figures GitHub can't tell, shown beside the live ones. */
        stats: z.array(z.object({ label: z.string(), value: z.string() })).default([]),
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
        group: z.enum(skillGroups),
        order: z.number(),
        /** Also listed under "Skills & stack" on the home page, in its group's row. */
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
          /** The colour theme I run it with, for editors and terminals. */
          theme: z.string().optional(),
          /** Position in "On my desk" on the home page, if pinned there. */
          desk: z.number().optional()
        }))
      })
    })
  }
});
