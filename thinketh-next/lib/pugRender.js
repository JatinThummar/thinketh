import path from 'path';
import pug from 'pug';
import { contentDir } from './i18n.js';

export function renderPugForLang(lang) {
  const filePath = path.join(contentDir, lang, 'content.pug');
  // renderFile sets filename internally; includes resolve relative to this file
  const html = pug.renderFile(filePath, { pretty: true });
  return html;
}

