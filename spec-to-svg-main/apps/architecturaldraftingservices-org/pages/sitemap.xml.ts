import type { NextApiRequest, NextApiResponse } from 'next';
import { absoluteBaseUrl } from '@/lib/config';

export default function handler(_req: NextApiRequest, res: NextApiResponse) {
  const base = absoluteBaseUrl();
  const xml = `<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n` +
    `<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\">\n` +
    `  <url><loc>${base}/</loc></url>\n` +
    `</urlset>`;
  res.setHeader('Content-Type', 'application/xml');
  res.status(200).send(xml);
}

