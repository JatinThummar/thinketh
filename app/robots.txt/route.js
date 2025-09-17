export function GET() {
  const site = process.env.NEXT_PUBLIC_SITE_URL || 'https://jatinthummar.github.io/thinketh';
  const body = `User-agent: *\nAllow: /\nSitemap: ${site}/sitemap.xml\n`;
  return new Response(body, { headers: { 'content-type': 'text/plain' } });
}

