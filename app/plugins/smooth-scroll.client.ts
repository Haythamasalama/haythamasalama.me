/**
 * Links to a section (`/about#experience`) glide to it instead of jumping, on
 * the same page and when they open a new one. Visitors who ask for reduced
 * motion get the jump.
 */
export default defineNuxtPlugin(() => {
  const options = useRouter().options as { scrollBehaviorType?: ScrollBehavior };
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  const apply = () => {
    options.scrollBehaviorType = reducedMotion.matches ? 'auto' : 'smooth';
  };

  apply();
  reducedMotion.addEventListener('change', apply);
});
