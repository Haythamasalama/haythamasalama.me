import { readFile } from 'node:fs/promises';
import { addVitePlugin, defineNuxtModule } from 'nuxt/kit';
import { renderSketch } from './render';

/**
 * Turns `.excalidraw` files into SVG strings at build time, so figures are
 * drawn once with rough.js and ship as plain markup. Import one (or glob them)
 * and the default export is the SVG.
 */
export default defineNuxtModule({
  meta: { name: 'sketch-figures' },
  setup () {
    addVitePlugin({
      name: 'sketch-figures',
      enforce: 'pre',
      async load (id) {
        const [file] = id.split('?');

        if (!file?.endsWith('.excalidraw')) {
          return;
        }

        const scene = JSON.parse(await readFile(file, 'utf8'));

        return `export default ${JSON.stringify(renderSketch(scene))};`;
      }
    });
  }
});
