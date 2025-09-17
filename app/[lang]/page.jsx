import LanguageSwitcher from '@/components/LanguageSwitcher';
import { getSupportedLanguages } from '@/lib/i18n';
import { renderPugForLang } from '@/lib/pugRender';
import { version } from '@/lib/contentVersion';

export async function generateStaticParams() {
  const languages = getSupportedLanguages();
  return languages.map((lang) => ({ lang }));
}

export default async function LangPage({ params }) {
  void version; // touch version for dev reload on content changes
  const languages = getSupportedLanguages();
  const current = languages.includes(params.lang) ? params.lang : 'en';
  const html = renderPugForLang(current);
  return (
    <>
      <LanguageSwitcher current={current} languages={languages} />
      <main className="content" dangerouslySetInnerHTML={{ __html: html }} />
    </>
  );
}

