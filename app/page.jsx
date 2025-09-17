import HeaderBar from '@/components/HeaderBar';
import ContentRenderer from '@/components/ContentRenderer';
import { getSupportedLanguages } from '@/lib/i18n';
import { renderPugForLang } from '@/lib/pugRender';
import { version } from '@/lib/contentVersion';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://jatinthummar.github.io/thinketh';

export async function generateMetadata() {
  const languages = getSupportedLanguages();
  const alternates = Object.fromEntries(
    languages.map((l) => [l, l === 'en' ? '/' : `/${l}/`])
  );
  return {
    metadataBase: new URL(SITE_URL),
    alternates: { canonical: '/', languages: alternates },
    title: 'As a Man Thinketh – English',
    description: 'Free multilingual edition in English, Gujarati and Hindi.',
    openGraph: {
      locale: 'en',
      images: [{ url: `${SITE_URL || ''}/demo_1220_628.webp`, width: 1200, height: 630, alt: 'As a Man Thinketh' }],
    },
    twitter: {
      images: [`${SITE_URL || ''}/demo_1220_628.webp`],
    },
  };
}

export default async function Page() {
  // version is read to ensure dev hot-reload when content changes
  void version;
  const languages = getSupportedLanguages();
  const current = 'en';
  const html = null; // no longer needed here; rendered via ContentRenderer
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Book',
    name: 'As a Man Thinketh',
    author: { '@type': 'Person', name: 'James Allen' },
    inLanguage: 'en',
    url: `${SITE_URL}/`,
  };

  return (
    <>
      <HeaderBar current={current} languages={languages} />
      <ContentRenderer lang={current} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
