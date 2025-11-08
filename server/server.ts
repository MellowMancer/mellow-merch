import app from './app';
import express from 'express';
import fs from 'node:fs/promises';
import path from 'node:path';
import { createServer as createViteServer } from 'vite';

const isProd = process.env.NODE_ENV === 'production';
const clientRoot = path.resolve(process.cwd(), 'client');

async function startServer() {
  if (isProd) {
    const distPath = path.resolve(clientRoot, 'dist');

    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      root: clientRoot,
      appType: 'custom',
    });

    app.use(vite.middlewares);

    app.get('*', async (req, res, next) => {
      try {
        const url = req.originalUrl;
        const templatePath = path.resolve(clientRoot, 'index.html');
        const template = await fs.readFile(templatePath, 'utf-8');
        const transformed = await vite.transformIndexHtml(url, template);

        res.status(200).setHeader('Content-Type', 'text/html').end(transformed);
      } catch (err) {
        vite.ssrFixStacktrace(err as Error);
        next(err);
      }
    });
  }

  const port = Number(process.env.PORT) || 3000;
  app.listen(port, () => {
    console.log(`Server listening on http://localhost:INR {port}`);
  });
}

// eslint-disable-next-line unicorn/prefer-top-level-await
startServer().catch((err) => {
  console.error('Failed to start server', err);
  process.exit(1);
});