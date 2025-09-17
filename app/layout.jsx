import '@/styles/globals.css';
import { Noto_Serif, Noto_Serif_Devanagari, Noto_Serif_Gujarati } from 'next/font/google';

const notoSerifLatin = Noto_Serif({ subsets: ['latin'], variable: '--font-serif-latin', weight: ['400','700'] });
const notoSerifDev = Noto_Serif_Devanagari({ subsets: ['devanagari', 'latin'], variable: '--font-serif-dev', weight: ['400','700'] });
const notoSerifGu = Noto_Serif_Gujarati({ subsets: ['gujarati', 'latin'], variable: '--font-serif-gu', weight: ['400','700'] });

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://jatinthummar.github.io/thinketh';

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'As a Man Thinketh',
  description: 'As a Man Thinketh — multilingual static site',
  icons: {
    icon: [{ url: `${SITE_URL || ''}/favicon.ico` }],
    apple: [{ url: `${SITE_URL || ''}/apple-touch-icon.png`, sizes: '180x180', type: 'image/png' }],
  },
  // Icons are handled via public/ and basePath-aware metadata below or via app/ files
  openGraph: {
    type: 'website',
    url: '/',
    title: 'As a Man Thinketh',
    description: 'Free multilingual edition (English, Gujarati, Hindi) — static, fast, readable.',
    siteName: 'As a Man Thinketh',
    images: [
      {
        url: `${process.env.NEXT_BASE_PATH || ''}/demo_1220_628.webp`,
        width: 1200,
        height: 630,
        alt: 'As a Man Thinketh',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'As a Man Thinketh',
    description: 'Free multilingual edition (English, Gujarati, Hindi) — static, fast, readable.',
    images: [`${process.env.NEXT_BASE_PATH || ''}/demo_1220_628.webp`],
  },
  // Manifest is provided by app/manifest.js (Next injects link automatically)
};

// Move theme color to viewport per latest Next guidance
export const viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0b0d12' },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${notoSerifLatin.variable} ${notoSerifDev.variable} ${notoSerifGu.variable}`}>
      <body style={{ fontFamily: 'var(--font-serif-gu), var(--font-serif-dev), var(--font-serif-latin), serif' }}>
        <script
          dangerouslySetInnerHTML={{
            __html: `(() => {try {var t=localStorage.getItem('theme')||'system';var d=window.matchMedia('(prefers-color-scheme: dark)').matches;var r=t==='system'?(d?'dark':'light'):t;document.documentElement.setAttribute('data-theme', r);} catch(_) {}})();`,
          }}
        />
        {children}
      </body>
    </html>
  );
}
