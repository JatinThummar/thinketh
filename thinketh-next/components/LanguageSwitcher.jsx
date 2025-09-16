import Link from 'next/link';

function labelFor(lang) {
  if (lang === 'en') return 'English';
  if (lang === 'gu') return 'Gujarati';
  if (lang === 'hi') return 'Hindi';
  return lang.toUpperCase();
}

export default function LanguageSwitcher({ current, languages }) {
  return (
    <nav className="language-switcher">
      {languages.map((l) => {
        const href = l === 'en' ? '/' : `/${l}/`;
        return (
          <Link key={l} href={href} className={l === current ? 'active' : ''}>
            {labelFor(l)}
          </Link>
        );
      })}
    </nav>
  );
}

