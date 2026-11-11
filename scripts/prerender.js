import puppeteer from 'puppeteer';
import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.resolve(__dirname, '../dist');

const routes = [
  '/',
  '/why-us',
  '/process',
  '/testimonials',
  '/contact',
  '/blog'
];

async function prerender() {
  const failed = [];
  const app = express();
  
  // Serve static assets from dist
  app.use(express.static(distDir));
  
  // Catch-all to serve index.html for client-side routing
  app.get(/(.*)/, (req, res) => {
    res.sendFile(path.join(distDir, 'index.html'));
  });

  // Port 0 lets the OS pick a free port, and binding 127.0.0.1 explicitly avoids
  // colliding with anything else already serving on this host.
  const server = app.listen(0, '127.0.0.1', async () => {
    const origin = `http://127.0.0.1:${server.address().port}`;
    console.log(`Server started on ${origin}`);

    // Guard against scraping a foreign server: every page we prerender must
    // reference an asset from this build.
    const buildMarker = fs
      .readFileSync(path.join(distDir, 'index.html'), 'utf8')
      .match(/\/assets\/index-[\w-]+\.(?:js|css)/)?.[0];

    const browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    for (const route of routes) {
      console.log(`Prerendering ${route}...`);
      const page = await browser.newPage();
      
      try {
        await page.goto(`${origin}${route}`, { waitUntil: 'domcontentloaded', timeout: 30000 });
        
        // Wait for the main content to mount (ensures React Suspense is finished)
        await page.waitForSelector('.min-h-screen', { timeout: 10000 }).catch(() => console.log('Timeout waiting for .min-h-screen'));
        
        // Give Helmet a moment to inject tags
        await new Promise(r => setTimeout(r, 1000));
        
        const html = await page.content();

        if (buildMarker && !html.includes(buildMarker)) {
          throw new Error(
            `Prerendered HTML for ${route} does not reference ${buildMarker} — ` +
            `${origin} served a different app. Refusing to overwrite index.html.`
          );
        }

        const routeDir = path.join(distDir, route === '/' ? '' : route);
        if (!fs.existsSync(routeDir)) {
          fs.mkdirSync(routeDir, { recursive: true });
        }
        
        fs.writeFileSync(path.join(routeDir, 'index.html'), html);
        console.log(`Saved ${routeDir}/index.html`);
      } catch (err) {
        console.error(`Failed to prerender ${route}:`, err);
        failed.push(route);
      } finally {
        await page.close();
      }
    }

    await browser.close();
    server.close();

    if (failed.length) {
      console.error(`Prerendering failed for: ${failed.join(', ')}`);
      process.exitCode = 1;
      return;
    }

    console.log('Prerendering complete!');
  });
}

prerender();
