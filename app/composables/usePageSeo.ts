interface PageSeo {
  title: string;
  description: string;
  type?: 'website' | 'article';
  /** The schema.org type of the page itself. */
  schema?: 'WebPage' | 'AboutPage' | 'ProfilePage' | 'CollectionPage';
  /** What the page is about as schema.org data (an article, a project, a list); the owner otherwise. */
  entity?: Record<string, unknown>;
  /** The small label above the title on the share image: "Project", "Article · Laravel". */
  eyebrow?: string;
  /** A share image drawn at build time, for pages rendered on request (`shared/live-pages.ts`). */
  image?: string;
}

/** schema.org ids of the nodes `app.vue` describes on every page. */
export function useSchemaIds () {
  const { site } = useAppConfig();

  return { person: `${site.url}/#person`, website: `${site.url}/#website` };
}

/** JSON-LD for a `<script>` tag, with "<" escaped so text can never close the tag. */
export const jsonLd = (data: Record<string, unknown>) => JSON.stringify(data).replace(/</g, '\\u003c');

/**
 * Title and description for a page, mirrored into the Open Graph and
 * Twitter tags so shared links show the same text as search results. Also
 * describes the page for search engines and agents: schema.org data with
 * breadcrumbs, and a link to its Markdown version (`server/middleware/markdown.ts`).
 * Every page gets its own share image (`components/OgImage/Page.takumi.vue`):
 * drawn while the page is prerendered, or for pages rendered on request, ahead
 * of time by `server/routes/og/[...image].ts` and passed as `image`.
 */
export function usePageSeo (seo: PageSeo) {
  const { site, nav } = useAppConfig();
  const route = useRoute();
  const ids = useSchemaIds();

  const path = route.path.replace(/(.)\/$/, '$1');
  const url = `${site.url}${path === '/' ? '' : path}`;
  const fullTitle = seo.title === site.name ? site.title : `${seo.title} · ${site.name}`;

  useSeoMeta({
    title: seo.title,
    description: seo.description,
    ogTitle: fullTitle,
    ogDescription: seo.description,
    ogType: seo.type ?? 'website',
    twitterTitle: fullTitle,
    twitterDescription: seo.description
  });

  const alt = `${seo.title}: ${seo.description}`;

  if (seo.image) {
    useSeoMeta({
      ogImage: `${site.url}${seo.image}`,
      ogImageWidth: 1200,
      ogImageHeight: 630,
      ogImageAlt: alt,
      twitterImage: `${site.url}${seo.image}`,
      twitterImageAlt: alt
    });
  }
  else {
    defineOgImage('Page', {
      title: seo.title,
      description: seo.description,
      eyebrow: seo.eyebrow ?? site.name
    }, { alt });
  }

  // Home, then the section (Projects, Blog), then the page.
  const section = path.split('/').length > 2
    ? nav.find(item => 'to' in item && path.startsWith(`${item.to}/`))
    : undefined;
  const trail = [
    { name: 'Home', url: site.url },
    ...section && 'to' in section ? [{ name: section.label, url: `${site.url}${section.to}` }] : [],
    ...path === '/' ? [] : [{ name: seo.title, url }]
  ];

  useHead({
    link: [{ rel: 'alternate', type: 'text/markdown', href: `${path === '/' ? '/index' : path}.md`, title: 'This page as Markdown' }],
    script: [{
      key: 'ld-page',
      type: 'application/ld+json',
      innerHTML: jsonLd({
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': seo.schema ?? 'WebPage',
            '@id': `${url}#webpage`,
            'url': url,
            'name': fullTitle,
            'description': seo.description,
            'inLanguage': 'en',
            'isPartOf': { '@id': ids.website },
            'breadcrumb': { '@id': `${url}#breadcrumb` },
            ...seo.entity
              ? { mainEntity: { ...seo.entity, mainEntityOfPage: { '@id': `${url}#webpage` } } }
              : { about: { '@id': ids.person } }
          },
          {
            '@type': 'BreadcrumbList',
            '@id': `${url}#breadcrumb`,
            'itemListElement': trail.map((item, index) => ({ '@type': 'ListItem', 'position': index + 1, 'name': item.name, 'item': item.url }))
          }
        ]
      })
    }]
  });
}
