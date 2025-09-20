"use client";
import { useEffect, useRef, useState } from 'react';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import ThemeToggle from '@/components/ThemeToggle';

export default function HeaderBar({ current, languages }) {
  const [open, setOpen] = useState(false);
  const closeBtnRef = useRef(null);

  // Close on ESC and lock scroll when open
  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') setOpen(false);
    }
    if (open) {
      window.addEventListener('keydown', onKey);
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      // Focus an element for accessibility
      setTimeout(() => {
        try { closeBtnRef.current?.focus(); } catch {}
      }, 0);
      return () => {
        window.removeEventListener('keydown', onKey);
        document.body.style.overflow = prev;
      };
    }
  }, [open]);

  return (
    <>
      <header className="header" role="banner">
        <div className="header-inner">
          <div className="lang-list" aria-label="Languages">
            <LanguageSwitcher current={current} languages={languages} />
          </div>
          {/* <ThemeToggle /> */}
        </div>
      </header>

      {/* Floating Action Button (always visible) */}
      <button
        type="button"
        className="fab"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls="bottom-sheet"
        aria-label={open ? 'Close menu' : 'Open menu'}
        title={open ? 'Close menu' : 'Open menu'}
        onClick={() => setOpen(true)}
      >
        <svg
          aria-hidden="true"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
        <span className="fab-label">Menu</span>
      </button>

      {/* Bottom Sheet Drawer */}
      <div
        className="sheet-overlay"
        data-open={open}
        aria-hidden={!open}
        onClick={() => setOpen(false)}
      />
      <div
        id="bottom-sheet"
        className="sheet"
        role="dialog"
        aria-modal="true"
        aria-labelledby="sheet-title"
        aria-hidden={!open}
        data-open={open}
      >
        <div className="sheet-handle" aria-hidden="true" />
        <div className="sheet-header">
          <h2 id="sheet-title">Menu</h2>
          <button
            type="button"
            className="sheet-close"
            ref={closeBtnRef}
            onClick={() => setOpen(false)}
          >
            Close
          </button>
        </div>
        <div className="sheet-content">
          <section aria-label="Languages" className="sheet-section">
            <h3 className="sheet-section-title">Language</h3>
            <div className="sheet-language">
              <LanguageSwitcher current={current} languages={languages} />
            </div>
          </section>
          <section aria-label="Theme" className="sheet-section">
            <h3 className="sheet-section-title">Theme</h3>
            <ThemeToggle />
          </section>
        </div>
      </div>
    </>
  );
}
