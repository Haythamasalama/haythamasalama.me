// Serves .cache/figures on http://localhost:4321 so a browser can screenshot
// preview.html and export.html (browsers and Playwright block file:// pages).
// Usage: npm run figures:serve
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { join, normalize } from 'node:path';

const root = join(import.meta.dirname, '../../.cache/figures');
const port = Number(process.env.PORT ?? 4321);

createServer(async (request, response) => {
  const path = normalize(decodeURIComponent(new URL(request.url ?? '/', 'http://localhost').pathname)).replace(/^(\.\.[/\\])+/, '');

  try {
    const body = await readFile(join(root, path === '/' ? 'export.html' : path));

    response.writeHead(200, { 'Content-Type': path.endsWith('.html') || path === '/' ? 'text/html; charset=utf-8' : 'application/octet-stream' });
    response.end(body);
  }
  catch {
    response.writeHead(404);
    response.end('Not found. Run npm run figures:export first.');
  }
}).listen(port, '127.0.0.1', () => console.log(`figures on http://localhost:${port}/export.html and /preview.html`));
