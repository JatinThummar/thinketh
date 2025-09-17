"use client";
import { useEffect, useState } from 'react';

function getInitialTheme() {
  if (typeof window === 'undefined') return 'system';
  const saved = localStorage.getItem('theme');
  if (saved) return saved;
  return 'system';
}

function applyTheme(theme) {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  const resolved = theme === 'system'
    ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
    : theme;
  root.setAttribute('data-theme', resolved);
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState('system');
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
    const t = getInitialTheme();
    setTheme(t);
  }, []);
  useEffect(() => {
    if (!mounted) return;
    applyTheme(theme);
    try { localStorage.setItem('theme', theme); } catch {}
  }, [theme, mounted]);

  if (!mounted) {
    // Avoid any server/client markup mismatch by rendering nothing until mounted
    return null;
  }

  return (
    <div className="theme-toggle" role="group" aria-label="Toggle theme">
      <button
        className={theme === 'light' ? 'active' : ''}
        onClick={() => setTheme('light')}
        aria-pressed={theme === 'light'}
      >Light</button>
      <button
        className={theme === 'dark' ? 'active' : ''}
        onClick={() => setTheme('dark')}
        aria-pressed={theme === 'dark'}
      >Dark</button>
      <button
        className={theme === 'system' ? 'active' : ''}
        onClick={() => setTheme('system')}
        aria-pressed={theme === 'system'}
      >Auto</button>
    </div>
  );
}
