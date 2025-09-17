import LanguageSwitcher from '@/components/LanguageSwitcher';
import ThemeToggle from '@/components/ThemeToggle';

export default function HeaderBar({ current, languages }) {
  return (
    <header className="header" role="banner">
      <div className="header-inner">
        <div className="lang-list" aria-label="Languages">
          <LanguageSwitcher current={current} languages={languages} />
        </div>
        <ThemeToggle />
      </div>
    </header>
  );
}
