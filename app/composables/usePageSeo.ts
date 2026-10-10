/**
 * Title and description for a page, mirrored into the Open Graph and
 * Twitter tags so shared links show the same text as search results.
 */
export function usePageSeo (seo: { title: string; description: string; type?: 'website' | 'article' }) {
  const { site } = useAppConfig();
  const fullTitle = seo.title === site.name ? site.title : `${seo.title} — ${site.name}`;

  useSeoMeta({
    title: seo.title,
    description: seo.description,
    ogTitle: fullTitle,
    ogDescription: seo.description,
    ogType: seo.type ?? 'website',
    twitterTitle: fullTitle,
    twitterDescription: seo.description
  });
}
