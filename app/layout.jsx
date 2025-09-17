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
    icon: [
      { url: `${process.env.NEXT_BASE_PATH || ''}/favicon.ico` },
      { url: `${process.env.NEXT_BASE_PATH || ''}/favicon-32x32.png`, sizes: '32x32', type: 'image/png' },
      { url: `${process.env.NEXT_BASE_PATH || ''}/favicon-16x16.png`, sizes: '16x16', type: 'image/png' },
    ],
    apple: [{ url: `${process.env.NEXT_BASE_PATH || ''}/apple-touch-icon.png`, sizes: '180x180', type: 'image/png' }],
    shortcut: [`${process.env.NEXT_BASE_PATH || ''}/favicon.ico`],
  },
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0b0d12' },
  ],
  openGraph: {
    type: 'website',
    url: '/',
    title: 'As a Man Thinketh',
    description: 'Free multilingual edition (English, Gujarati, Hindi) — static, fast, readable.',
    siteName: 'As a Man Thinketh',
    images: [
      {
        url: `${SITE_URL}/android-chrome-512x512.png`,
        width: 512,
        height: 512,
        alt: 'As a Man Thinketh',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'As a Man Thinketh',
    description: 'Free multilingual edition (English, Gujarati, Hindi) — static, fast, readable.',
    images: [`${SITE_URL}/android-chrome-512x512.png`],
  },
  // Manifest is provided by app/manifest.js (Next injects link automatically)
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
