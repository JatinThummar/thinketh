import fs from 'fs';
import path from 'path';

export const contentDir = path.join(process.cwd(), 'content');

export function getSupportedLanguages() {
  if (!fs.existsSync(contentDir)) return ['en'];
  const dirs = fs
    .readdirSync(contentDir, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name)
    .filter((d) => fs.existsSync(path.join(contentDir, d, 'content.pug')));
  const ordered = ['en', ...dirs.filter((d) => d !== 'en')];
  return Array.from(new Set(ordered));
}

