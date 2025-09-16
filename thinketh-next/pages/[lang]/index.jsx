import Head from 'next/head';
import LanguageSwitcher from '@/components/LanguageSwitcher';

export default function LangPage({ html, languages, current }) {
  return (
    <>
      <Head>
        <title>As a Man Thinketh</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="As a Man Thinketh" />
      </Head>
      <LanguageSwitcher current={current} languages={languages} />
      <main className="content" dangerouslySetInnerHTML={{ __html: html }} />
    </>
  );
}

export async function getStaticPaths() {
  const { getSupportedLanguages } = await import('@/lib/i18n');
  const languages = getSupportedLanguages();
  return {
    paths: languages.map((lang) => ({ params: { lang } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const [{ getSupportedLanguages }, { renderPugForLang }] = await Promise.all([
    import('@/lib/i18n'),
    import('@/lib/pugRender'),
  ]);
  const languages = getSupportedLanguages();
  const current = params.lang;
  const html = renderPugForLang(current);
  return { props: { html, languages, current } };
}
