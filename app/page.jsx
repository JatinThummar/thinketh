import LanguageSwitcher from '@/components/LanguageSwitcher';
import { getSupportedLanguages } from '@/lib/i18n';
import { renderPugForLang } from '@/lib/pugRender';
import { version } from '@/lib/contentVersion';

export default async function Page() {
  // version is read to ensure dev hot-reload when content changes
  void version;
  const languages = getSupportedLanguages();
  const current = 'en';
  const html = renderPugForLang(current);
  return (
    <>
      <LanguageSwitcher current={current} languages={languages} />
      <main className="content" dangerouslySetInnerHTML={{ __html: html }} />
    </>
  );
}

