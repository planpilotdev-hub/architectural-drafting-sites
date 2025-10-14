import Head from 'next/head';
import { absoluteBaseUrl } from '@/lib/config';
import { professionalServiceJsonLd } from '@/lib/schema';

type Props = { title: string; description: string; ogImagePath?: string };

export default function SeoHead({ title, description, ogImagePath = '/og-default.png' }: Props) {
  const base = absoluteBaseUrl();
  const url = `${base}`;
  const ogImage = `${base}${ogImagePath}`;
  const jsonLd = professionalServiceJsonLd({ base });
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={ogImage} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </Head>
  );
}

