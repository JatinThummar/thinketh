import LanguageSwitcher from '@/components/LanguageSwitcher';
import ThemeToggle from '@/components/ThemeToggle';
import { getSupportedLanguages } from '@/lib/i18n';
import { renderPugForLang } from '@/lib/pugRender';
import { version } from '@/lib/contentVersion';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://jatinthummar.github.io/thinketh';

export async function generateMetadata({ params }) {
  const languages = getSupportedLanguages();
  const current = languages.includes(params.lang) ? params.lang : 'en';
  const alternates = Object.fromEntries(
    languages.map((l) => [l, l === 'en' ? '/' : `/${l}/`])
  );
  return {
    metadataBase: new URL(SITE_URL),
    alternates: { canonical: current === 'en' ? '/' : `/${current}/`, languages: alternates },
    title: `As a Man Thinketh – ${current.toUpperCase()}`,
    description: 'Free multilingual edition in English, Gujarati and Hindi.',
  };
}

export async function generateStaticParams() {
  const languages = getSupportedLanguages();
  return languages.map((lang) => ({ lang }));
}

export default async function LangPage({ params }) {
  void version; // touch version for dev reload on content changes
  const languages = getSupportedLanguages();
  const current = languages.includes(params.lang) ? params.lang : 'en';
  const html = renderPugForLang(current);
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Book',
    name: 'As a Man Thinketh',
    author: { '@type': 'Person', name: 'James Allen' },
    inLanguage: current,
    url: `${SITE_URL}${current === 'en' ? '/' : `/${current}/`}`,
  };

  return (
    <>
      <div className="topbar">
        <LanguageSwitcher current={current} languages={languages} />
        <ThemeToggle />
      </div>
      <main className="content" dangerouslySetInnerHTML={{ __html: html }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
