#!/usr/bin/env node
import { writeFileSync, mkdirSync } from 'node:fs';
import { resolve } from 'node:path';

const base = (process.env.NEXT_PUBLIC_BASE_URL || '').replace(/\/$/, '');
const xml = `<?xml version="1.0" encoding="UTF-8"?>\n` +
  `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  `  <url><loc>${base || 'http://localhost:3031'}/</loc></url>\n` +
  `</urlset>\n`;

const out = resolve(process.cwd(), 'public', 'sitemap.xml');
mkdirSync(resolve(process.cwd(), 'public'), { recursive: true });
writeFileSync(out, xml);
console.log('Wrote', out);

