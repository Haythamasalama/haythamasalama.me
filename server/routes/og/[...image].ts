import { liveImages, livePages } from '#shared/live-pages';

/**
 * The share images of the pages rendered on request: `/og/home.png`,
 * `/og/about.png`, `/og/open-source.png` and `/og/snippets.png`. They are
 * prerendered once at build time through nuxt-og-image's renderer (which only
 * runs while prerendering) and served as static files after that.
 */
export default defineEventHandler(async (event) => {
  const name = getRouterParam(event, 'image')?.replace(/\.png$/, '');

  if (!import.meta.prerender || !liveImages.includes(name as typeof liveImages[number])) {
    throw createError({ statusCode: 404, statusMessage: 'Not found' });
  }

  const { site } = useAppConfig();
  // Home and About lead with the name; the others like every other page (usePageSeo).
  const props = name === 'home'
    ? { title: site.name, description: site.description, eyebrow: site.role.split(' · ')[0] }
    : name === 'about'
      ? { title: site.name, description: livePages.about.description, eyebrow: 'About' }
      : { ...livePages[name as keyof typeof livePages], eyebrow: site.name };

  const image = await event.$fetch<ArrayBuffer>('/_og/d/default.png', {
    query: { component: 'Page', title: props.title, description: props.description, eyebrow: props.eyebrow },
    responseType: 'arrayBuffer'
  });

  setResponseHeader(event, 'Content-Type', 'image/png');

  return Buffer.from(image);
});
