import { getSupportedLanguages } from '@/lib/i18n';

export default function sitemap() {
  const site = process.env.NEXT_PUBLIC_SITE_URL || 'https://jatinthummar.github.io/thinketh';
  const languages = getSupportedLanguages();
  const pages = [
    { url: `${site}/`, lastModified: new Date() },
    ...languages.filter((l) => l !== 'en').map((l) => ({ url: `${site}/${l}/`, lastModified: new Date() })),
  ];
  return pages;
}

