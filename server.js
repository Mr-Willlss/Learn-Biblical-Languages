const http = require('http');
const fs = require('fs');
const path = require('path');

const root = process.cwd();
const port = Number(process.env.PORT || 3001);

const contentTypes = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2'
};

function sendFile(res, filePath) {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('Not found');
      return;
    }
    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, { 'Content-Type': contentTypes[ext] || 'application/octet-stream' });
    res.end(data);
  });
}

http
  .createServer((req, res) => {
    const urlPath = decodeURIComponent((req.url || '/').split('?')[0]);
    const safePath = path.normalize(urlPath).replace(/^([/\\])+/, '');
    const resolvedPath = path.resolve(root, '.' + path.sep + safePath);
    const filePath = resolvedPath.startsWith(root) ? resolvedPath : path.join(root, 'index.html');

    if (safePath.endsWith('/')) {
      const dirResolved = path.resolve(root, '.' + path.sep + safePath, 'index.html');
      if (dirResolved.startsWith(root)) {
        return sendFile(res, dirResolved);
      }
    }

    fs.stat(filePath, (err, stat) => {
      if (!err && stat.isFile()) {
        sendFile(res, filePath);
        return;
      }

      const fallback = path.join(root, 'index.html');
      sendFile(res, fallback);
    });
  })
  .listen(port, () => {
    console.log(`Static server running on http://127.0.0.1:${port}`);
  });
