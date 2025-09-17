import '@/styles/globals.css';
import { Noto_Serif, Noto_Serif_Devanagari, Noto_Serif_Gujarati } from 'next/font/google';

const notoSerifLatin = Noto_Serif({ subsets: ['latin'], variable: '--font-serif-latin', weight: ['400','700'] });
const notoSerifDev = Noto_Serif_Devanagari({ subsets: ['devanagari', 'latin'], variable: '--font-serif-dev', weight: ['400','700'] });
const notoSerifGu = Noto_Serif_Gujarati({ subsets: ['gujarati', 'latin'], variable: '--font-serif-gu', weight: ['400','700'] });

export const metadata = {
  title: 'As a Man Thinketh',
  description: 'As a Man Thinketh — multilingual static site',
  icons: { icon: '/favicon.svg' },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${notoSerifLatin.variable} ${notoSerifDev.variable} ${notoSerifGu.variable}`}>
      <body style={{ fontFamily: 'var(--font-serif-gu), var(--font-serif-dev), var(--font-serif-latin), serif' }}>
        {children}
      </body>
    </html>
  );
}
