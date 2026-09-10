import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { resolve, extname, sep } from 'node:path';
import { pathToFileURL } from 'node:url';

export async function startStaticServer(directory, prefix = '/kurego-goroku', port = 0) {
  const folder = resolve(directory);
  const types = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.webp': 'image/webp', '.png': 'image/png', '.json': 'application/json', '.rsc': 'text/x-component', '.svg': 'image/svg+xml' };
  const server = createServer(async (request, response) => {
    try {
      const pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
      if (!pathname.startsWith(prefix + '/')) { response.writeHead(404).end(); return; }
      let file = resolve(folder, '.' + pathname.slice(prefix.length));
      if (file !== folder && !file.startsWith(folder + sep)) { response.writeHead(403).end(); return; }
      if ((await stat(file)).isDirectory()) file = resolve(file, 'index.html');
      const body = await readFile(file);
      response.writeHead(200, { 'Content-Type': types[extname(file)] || 'application/octet-stream', 'Cache-Control': 'no-store' });
      response.end(body);
    } catch {
      response.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
      response.end(await readFile(resolve(folder, '404.html')).catch(() => 'Not found'));
    }
  });
  await new Promise((ready, reject) => { server.once('error', reject); server.listen(port, '127.0.0.1', ready); });
  return { server, url: `http://127.0.0.1:${server.address().port}${prefix}/` };
}
if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  const { url } = await startStaticServer(process.argv[2] || 'dist/client', process.argv[3] || '/kurego-goroku', Number(process.argv[4] || 4196));
  console.log('Static preview: ' + url);
}
