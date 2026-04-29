import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const defaultSiteUrl = 'https://twitch.chrisldo.com';
const siteUrl = (process.env.VITE_SITE_URL || defaultSiteUrl).replace(/\/+$/, '');
const publicDir = path.resolve(process.cwd(), 'public');

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${siteUrl}/</loc>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${siteUrl}/transparent</loc>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
</urlset>
`;

const robots = `User-agent: *
Allow: /

Sitemap: ${siteUrl}/sitemap.xml
`;

await mkdir(publicDir, { recursive: true });
await writeFile(path.join(publicDir, 'robots.txt'), robots, 'utf8');
await writeFile(path.join(publicDir, 'sitemap.xml'), sitemap, 'utf8');
